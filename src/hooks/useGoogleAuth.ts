import { useState, useEffect } from 'react';

interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

const GOOGLE_AUTH_URL = 'https://functions.poehali.dev/17328ec4-afc1-4bdd-90a3-3c87c1f1e793';

export const useGoogleAuth = () => {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('google_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('google_user');
      }
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
        const userData: GoogleUser = event.data.user;
        setUser(userData);
        localStorage.setItem('google_user', JSON.stringify(userData));
        setIsLoading(false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const login = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(GOOGLE_AUTH_URL);
      const data = await response.json();
      
      if (data.authUrl) {
        const width = 500;
        const height = 600;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;
        
        window.open(
          data.authUrl,
          'Google Login',
          `width=${width},height=${height},left=${left},top=${top}`
        );
      } else {
        console.error('Auth URL not found');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('google_user');
  };

  return { user, isLoading, login, logout };
};
