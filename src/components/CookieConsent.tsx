import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setIsVisible(false);
  };

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
              className="gap-2"
            >
              <Icon name="X" size={16} />
              Отклонить
            </Button>
            <Button 
              onClick={handleAccept}
              className="gap-2"
            >
              <Icon name="Check" size={16} />
              Принять
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
