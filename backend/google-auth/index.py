'''
Business: Google OAuth 2.0 авторизация для входа через Google аккаунт
Args: event - dict с httpMethod, queryStringParameters (code, state), body
      context - объект с request_id, function_name
Returns: HTTP response с redirect URL или user data JSON
'''
import json
import os
import urllib.parse
import urllib.request
from typing import Dict, Any, Optional


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    # CORS preflight
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    client_id: str = os.environ.get('GOOGLE_CLIENT_ID', '')
    client_secret: str = os.environ.get('GOOGLE_CLIENT_SECRET', '')
    
    if not client_id or not client_secret:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Google OAuth не настроен. Добавьте GOOGLE_CLIENT_ID и GOOGLE_CLIENT_SECRET'})
        }
    
    # GET /google-auth - начало OAuth flow
    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        code: Optional[str] = params.get('code')
        
        # Если есть code - это callback от Google
        if code:
            return handle_callback(code, client_id, client_secret)
        
        # Иначе - редирект на Google
        return start_oauth(client_id)
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({'error': 'Method not allowed'})
    }


def start_oauth(client_id: str) -> Dict[str, Any]:
    '''Начинает OAuth flow - редирект на Google'''
    redirect_uri = 'https://functions.poehali.dev/17328ec4-afc1-4bdd-90a3-3c87c1f1e793'
    
    auth_url = 'https://accounts.google.com/o/oauth2/v2/auth?' + urllib.parse.urlencode({
        'client_id': client_id,
        'redirect_uri': redirect_uri,
        'response_type': 'code',
        'scope': 'openid email profile',
        'access_type': 'online'
    })
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({'authUrl': auth_url})
    }


def handle_callback(code: str, client_id: str, client_secret: str) -> Dict[str, Any]:
    '''Обрабатывает callback от Google и получает user info'''
    redirect_uri = 'https://functions.poehali.dev/17328ec4-afc1-4bdd-90a3-3c87c1f1e793'
    
    # Обмен code на access token
    token_data = urllib.parse.urlencode({
        'code': code,
        'client_id': client_id,
        'client_secret': client_secret,
        'redirect_uri': redirect_uri,
        'grant_type': 'authorization_code'
    }).encode('utf-8')
    
    token_request = urllib.request.Request(
        'https://oauth2.googleapis.com/token',
        data=token_data,
        headers={'Content-Type': 'application/x-www-form-urlencoded'}
    )
    
    try:
        with urllib.request.urlopen(token_request) as response:
            token_response = json.loads(response.read().decode('utf-8'))
    except Exception as e:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': f'Token exchange failed: {str(e)}'})
        }
    
    access_token: str = token_response.get('access_token', '')
    
    # Получение user info
    user_request = urllib.request.Request(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        headers={'Authorization': f'Bearer {access_token}'}
    )
    
    try:
        with urllib.request.urlopen(user_request) as response:
            user_info = json.loads(response.read().decode('utf-8'))
    except Exception as e:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': f'User info fetch failed: {str(e)}'})
        }
    
    # Возвращаем HTML с данными пользователя (можно улучшить)
    html_response = f'''
    <!DOCTYPE html>
    <html>
    <head>
        <title>Успешный вход</title>
        <script>
            // Отправляем данные в opener window и закрываем popup
            if (window.opener) {{
                window.opener.postMessage({{
                    type: 'GOOGLE_AUTH_SUCCESS',
                    user: {json.dumps(user_info)}
                }}, '*');
                window.close();
            }}
        </script>
    </head>
    <body>
        <h1>Вход выполнен успешно!</h1>
        <p>Это окно можно закрыть.</p>
    </body>
    </html>
    '''
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'text/html',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': html_response
    }