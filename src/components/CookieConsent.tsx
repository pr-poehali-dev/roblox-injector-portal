import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const API_URL = 'https://functions.poehali.dev/988b9709-6759-4397-a742-143d3b27f936';

const getSessionId = () => {
  let sessionId = localStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('session_id', sessionId);
  }
  return sessionId;
};

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkConsent = async () => {
      const sessionId = getSessionId();
      const localConsent = localStorage.getItem('cookie_consent');
      
      if (localConsent) {
        return;
      }

      try {
        const response = await fetch(`${API_URL}?session_id=${sessionId}`);
        const data = await response.json();
        
        if (data.found) {
          localStorage.setItem('cookie_consent', data.consent_type);
        } else {
          setTimeout(() => setIsVisible(true), 1000);
        }
      } catch (error) {
        setTimeout(() => setIsVisible(true), 1000);
      }
    };

    checkConsent();
  }, []);

  const saveConsent = async (consentType: 'accepted' | 'declined') => {
    setIsLoading(true);
    const sessionId = getSessionId();
    const userId = localStorage.getItem('google_user');
    let parsedUserId = null;

    if (userId) {
      try {
        const user = JSON.parse(userId);
        parsedUserId = user.id;
      } catch (e) {
        console.error('Failed to parse user:', e);
      }
    }

    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          consent_type: consentType,
          user_id: parsedUserId
        })
      });

      localStorage.setItem('cookie_consent', consentType);
      setIsVisible(false);
    } catch (error) {
      console.error('Failed to save consent:', error);
      localStorage.setItem('cookie_consent', consentType);
      setIsVisible(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = () => saveConsent('accepted');
  const handleDecline = () => saveConsent('declined');

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
      <div className="container mx-auto">
        <div className="bg-card border border-border rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <Icon name="Cookie" size={24} className="text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-rajdhani font-semibold text-lg mb-1">
                Мы используем файлы cookie
              </h3>
              <p className="text-sm text-muted-foreground">
                Мы используем cookie для улучшения работы сайта, анализа трафика и персонализации контента. 
                Продолжая использовать сайт, вы соглашаетесь с использованием cookie.
              </p>
            </div>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Button 
              variant="outline" 
              onClick={handleDecline}
              disabled={isLoading}
              className="gap-2"
            >
              <Icon name="X" size={16} />
              Отклонить
            </Button>
            <Button 
              onClick={handleAccept}
              disabled={isLoading}
              className="gap-2"
            >
              <Icon name="Check" size={16} />
              {isLoading ? 'Сохранение...' : 'Принять'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;