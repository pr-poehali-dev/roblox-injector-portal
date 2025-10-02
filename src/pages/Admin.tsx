import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface CookieStats {
  total: number;
  accepted: number;
  declined: number;
  acceptance_rate: number;
  period_days: number;
  daily_stats: Array<{
    date: string;
    consent_type: string;
    count: number;
  }>;
  recent_consents: Array<{
    session_id: string;
    user_id: string | null;
    consent_type: string;
    ip_address: string;
    created_at: string;
  }>;
}

const API_URL = 'https://functions.poehali.dev/de16b350-2205-43e1-a745-489552d1f903';
const ADMIN_PASSWORD = '1488';

const Admin = () => {
  const [stats, setStats] = useState<CookieStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState(7);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchStats();
    }
  }, [period, isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword('');
    }
  };

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}?period=${period}`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 flex items-center justify-center">
        <Card className="w-full max-w-md bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Lock" size={32} className="text-primary" />
            </div>
            <CardTitle className="text-2xl font-rajdhani">Вход в админ-панель</CardTitle>
            <CardDescription>Введите пароль для доступа к статистике</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={error ? 'border-red-500' : ''}
                  autoFocus
                />
                {error && (
                  <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
                    <Icon name="AlertCircle" size={14} />
                    Неверный пароль
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full gap-2">
                <Icon name="LogIn" size={18} />
                Войти
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" size={48} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Загрузка статистики...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-rajdhani font-bold mb-2">Админ-панель</h1>
              <p className="text-muted-foreground">Статистика согласий на cookie</p>
            </div>
            <Button variant="outline" onClick={() => window.location.href = '/'} className="gap-2">
              <Icon name="Home" size={18} />
              На главную
            </Button>
          </div>
        </div>

        <div className="flex gap-3 mb-8">
          {[7, 30, 90].map((days) => (
            <Button
              key={days}
              variant={period === days ? 'default' : 'outline'}
              onClick={() => setPeriod(days)}
            >
              {days} дней
            </Button>
          ))}
          <Button variant="outline" onClick={fetchStats} className="gap-2 ml-auto">
            <Icon name="RefreshCw" size={16} />
            Обновить
          </Button>
        </div>

        {stats && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Всего</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-rajdhani font-bold">{stats.total}</div>
                  <p className="text-xs text-muted-foreground mt-1">За {stats.period_days} дней</p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-green-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Приняли</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-rajdhani font-bold text-green-500">{stats.accepted}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stats.acceptance_rate}% от общего</p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-red-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Отклонили</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-rajdhani font-bold text-red-500">{stats.declined}</div>
                  <p className="text-xs text-muted-foreground mt-1">{(100 - stats.acceptance_rate).toFixed(1)}% от общего</p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Принятие</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-rajdhani font-bold text-primary">{stats.acceptance_rate}%</div>
                  <p className="text-xs text-muted-foreground mt-1">Процент принятия</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="History" size={20} />
                  Последние согласия
                </CardTitle>
                <CardDescription>50 последних действий пользователей</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Дата</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Session ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Решение</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">IP адрес</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recent_consents.map((consent, idx) => (
                        <tr key={idx} className="border-b border-border/50 hover:bg-muted/20">
                          <td className="py-3 px-4 text-sm">{formatDate(consent.created_at)}</td>
                          <td className="py-3 px-4 text-sm font-mono text-xs">{consent.session_id.slice(0, 20)}...</td>
                          <td className="py-3 px-4 text-sm font-mono text-xs">
                            {consent.user_id ? consent.user_id.slice(0, 15) + '...' : '-'}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                              consent.consent_type === 'accepted' 
                                ? 'bg-green-500/20 text-green-500' 
                                : 'bg-red-500/20 text-red-500'
                            }`}>
                              <Icon 
                                name={consent.consent_type === 'accepted' ? 'Check' : 'X'} 
                                size={12} 
                              />
                              {consent.consent_type === 'accepted' ? 'Принял' : 'Отклонил'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm font-mono text-xs">{consent.ip_address.split(',')[0]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;