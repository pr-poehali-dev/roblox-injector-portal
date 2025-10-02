'''
Business: Получение статистики согласий на cookie для админ-панели
Args: event - dict с httpMethod, queryStringParameters (period)
      context - объект с request_id
Returns: HTTP response со статистикой согласий
'''
import json
import os
import psycopg2
from typing import Dict, Any, List
from datetime import datetime, timedelta


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    database_url: str = os.environ.get('DATABASE_URL', '')
    if not database_url:
        return error_response('DATABASE_URL not configured', 500)
    
    if method == 'GET':
        return get_stats(event, database_url)
    
    return error_response('Method not allowed', 405)


def get_stats(event: Dict[str, Any], database_url: str) -> Dict[str, Any]:
    '''Получает статистику согласий'''
    params = event.get('queryStringParameters') or {}
    period: str = params.get('period', '7')
    
    try:
        days = int(period)
    except ValueError:
        days = 7
    
    conn = None
    try:
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        cur.execute('''
            SELECT 
                COUNT(*) as total,
                SUM(CASE WHEN consent_type = 'accepted' THEN 1 ELSE 0 END) as accepted,
                SUM(CASE WHEN consent_type = 'declined' THEN 1 ELSE 0 END) as declined
            FROM t_p76487198_roblox_injector_port.cookie_consents
            WHERE created_at >= NOW() - INTERVAL '%s days'
        ''' % days)
        
        stats = cur.fetchone()
        
        cur.execute('''
            SELECT 
                DATE(created_at) as date,
                consent_type,
                COUNT(*) as count
            FROM t_p76487198_roblox_injector_port.cookie_consents
            WHERE created_at >= NOW() - INTERVAL '%s days'
            GROUP BY DATE(created_at), consent_type
            ORDER BY date DESC
        ''' % days)
        
        daily_stats = cur.fetchall()
        
        cur.execute('''
            SELECT 
                session_id,
                user_id,
                consent_type,
                ip_address,
                created_at
            FROM t_p76487198_roblox_injector_port.cookie_consents
            ORDER BY created_at DESC
            LIMIT 50
        ''')
        
        recent_consents = cur.fetchall()
        cur.close()
        
        daily_data: List[Dict[str, Any]] = []
        for row in daily_stats:
            daily_data.append({
                'date': row[0].isoformat(),
                'consent_type': row[1],
                'count': row[2]
            })
        
        recent_data: List[Dict[str, Any]] = []
        for row in recent_consents:
            recent_data.append({
                'session_id': row[0],
                'user_id': row[1],
                'consent_type': row[2],
                'ip_address': row[3],
                'created_at': row[4].isoformat()
            })
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'total': stats[0] or 0,
                'accepted': stats[1] or 0,
                'declined': stats[2] or 0,
                'acceptance_rate': round((stats[1] or 0) / (stats[0] or 1) * 100, 1),
                'daily_stats': daily_data,
                'recent_consents': recent_data,
                'period_days': days
            })
        }
    except Exception as e:
        return error_response(f'Database error: {str(e)}', 500)
    finally:
        if conn:
            conn.close()


def error_response(message: str, status: int) -> Dict[str, Any]:
    '''Возвращает ошибку'''
    return {
        'statusCode': status,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({'error': message})
    }
