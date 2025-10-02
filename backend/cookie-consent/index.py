'''
Business: Сохранение согласий пользователей на использование cookie в БД
Args: event - dict с httpMethod, body (session_id, consent_type, user_id)
      context - объект с request_id
Returns: HTTP response с результатом сохранения
'''
import json
import os
import psycopg2
from typing import Dict, Any, Optional


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    database_url: str = os.environ.get('DATABASE_URL', '')
    if not database_url:
        return error_response('DATABASE_URL not configured', 500)
    
    if method == 'POST':
        return save_consent(event, database_url)
    
    if method == 'GET':
        return get_consent(event, database_url)
    
    return error_response('Method not allowed', 405)


def save_consent(event: Dict[str, Any], database_url: str) -> Dict[str, Any]:
    '''Сохраняет согласие пользователя в БД'''
    try:
        body_data = json.loads(event.get('body', '{}'))
    except json.JSONDecodeError:
        return error_response('Invalid JSON', 400)
    
    session_id: str = body_data.get('session_id', '')
    consent_type: str = body_data.get('consent_type', '')
    user_id: Optional[str] = body_data.get('user_id')
    
    if not session_id or not consent_type:
        return error_response('session_id and consent_type required', 400)
    
    if consent_type not in ['accepted', 'declined']:
        return error_response('consent_type must be accepted or declined', 400)
    
    headers = event.get('headers', {})
    ip_address: str = headers.get('X-Forwarded-For', headers.get('X-Real-IP', 'unknown'))[:45]
    user_agent: str = headers.get('User-Agent', 'unknown')[:500]
    
    conn = None
    try:
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        cur.execute('''
            INSERT INTO t_p76487198_roblox_injector_port.cookie_consents (session_id, user_id, consent_type, ip_address, user_agent)
            VALUES (%s, %s, %s, %s, %s)
            ON CONFLICT (session_id) 
            DO UPDATE SET 
                consent_type = EXCLUDED.consent_type,
                user_id = EXCLUDED.user_id,
                created_at = CURRENT_TIMESTAMP
            RETURNING id, created_at
        ''', (session_id, user_id, consent_type, ip_address, user_agent))
        
        result = cur.fetchone()
        conn.commit()
        cur.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': True,
                'id': result[0],
                'created_at': result[1].isoformat()
            })
        }
    except Exception as e:
        return error_response(f'Database error: {str(e)}', 500)
    finally:
        if conn:
            conn.close()


def get_consent(event: Dict[str, Any], database_url: str) -> Dict[str, Any]:
    '''Получает согласие по session_id'''
    params = event.get('queryStringParameters') or {}
    session_id: str = params.get('session_id', '')
    
    if not session_id:
        return error_response('session_id required', 400)
    
    conn = None
    try:
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        cur.execute('''
            SELECT consent_type, created_at, user_id
            FROM t_p76487198_roblox_injector_port.cookie_consents
            WHERE session_id = %s
        ''', (session_id,))
        
        result = cur.fetchone()
        cur.close()
        
        if not result:
            return {
                'statusCode': 404,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'found': False})
            }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'found': True,
                'consent_type': result[0],
                'created_at': result[1].isoformat(),
                'user_id': result[2]
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