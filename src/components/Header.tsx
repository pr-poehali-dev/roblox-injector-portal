import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';

interface HeaderProps {
  docsOpen: boolean;
  setDocsOpen: (open: boolean) => void;
  mainDownloadOpen: boolean;
  setMainDownloadOpen: (open: boolean) => void;
  handleDownload: () => void;
}

const Header = ({ docsOpen, setDocsOpen, mainDownloadOpen, setMainDownloadOpen, handleDownload }: HeaderProps) => {
  const { user, isLoading, login, logout } = useGoogleAuth();

  return (
    <header className="container mx-auto px-4 py-8">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-3 animate-fade-in">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center animate-glow">
            <Icon name="Code" className="text-white" size={24} />
          </div>
          <h1 className="text-3xl font-rajdhani font-bold text-foreground">ROBLOX INJECTORS</h1>
        </div>
        <div className="flex gap-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Dialog open={docsOpen} onOpenChange={setDocsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Icon name="BookOpen" size={18} />
                Документация
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-rajdhani">Документация</DialogTitle>
                <DialogDescription>Руководство по использованию инжектора</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <h3 className="font-rajdhani text-xl font-semibold flex items-center gap-2">
                    <Icon name="Key" size={20} className="text-primary" />
                    Получение ключа
                  </h3>
                  <p className="text-muted-foreground">1. Скачайте и запустите инжектор</p>
                  <p className="text-muted-foreground">2. Нажмите кнопку "Get Key" в инжекторе</p>
                  <p className="text-muted-foreground">3. Откроется страница - пройдите все проверки</p>
                  <p className="text-muted-foreground">4. Скопируйте полученный ключ</p>
                  <p className="text-muted-foreground">5. Вставьте ключ в инжектор и нажмите "Verify"</p>
                  <div className="bg-primary/10 p-3 rounded-lg border border-primary/30 mt-3">
                    <p className="text-sm text-primary font-medium">💡 Ключ действует 24 часа</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-rajdhani text-xl font-semibold flex items-center gap-2">
                    <Icon name="Download" size={20} className="text-primary" />
                    Установка
                  </h3>
                  <p className="text-muted-foreground">1. Скачайте инжектор с нашего сайта</p>
                  <p className="text-muted-foreground">2. Отключите антивирус (может блокировать)</p>
                  <p className="text-muted-foreground">3. Запустите файл от имени администратора</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-rajdhani text-xl font-semibold flex items-center gap-2">
                    <Icon name="Play" size={20} className="text-primary" />
                    Использование
                  </h3>
                  <p className="text-muted-foreground">1. Откройте Roblox и зайдите в игру</p>
                  <p className="text-muted-foreground">2. Запустите инжектор</p>
                  <p className="text-muted-foreground">3. Скопируйте нужный скрипт из каталога</p>
                  <p className="text-muted-foreground">4. Вставьте в инжектор и нажмите Execute</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-rajdhani text-xl font-semibold flex items-center gap-2">
                    <Icon name="Shield" size={20} className="text-primary" />
                    Безопасность
                  </h3>
                  <p className="text-muted-foreground">• Все скрипты проверены на вирусы</p>
                  <p className="text-muted-foreground">• Используйте на свой страх и риск</p>
                  <p className="text-muted-foreground">• Не передавайте файлы третьим лицам</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={mainDownloadOpen} onOpenChange={setMainDownloadOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                <Icon name="Download" size={18} />
                Скачать
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-2xl font-rajdhani">Скачать инжектор</DialogTitle>
                <DialogDescription>Выберите версию для вашей системы</DialogDescription>
              </DialogHeader>
              <div className="space-y-3 mt-4">
                <Button 
                  className="w-full justify-start gap-3 h-14" 
                  variant="outline"
                  onClick={handleDownload}
                >
                  <Icon name="Monitor" size={24} />
                  <div className="text-left">
                    <div className="font-semibold">Windows 10/11</div>
                    <div className="text-xs text-muted-foreground">Версия 2.4.1 • 15.2 MB</div>
                  </div>
                </Button>
                <Button 
                  className="w-full justify-start gap-3 h-14" 
                  variant="outline"
                  onClick={handleDownload}
                >
                  <Icon name="Laptop" size={24} />
                  <div className="text-left">
                    <div className="font-semibold">macOS</div>
                    <div className="text-xs text-muted-foreground">Версия 2.4.1 • 18.7 MB</div>
                  </div>
                </Button>
                <div className="relative py-3">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-background px-3 text-sm text-muted-foreground">Мобильные</span>
                  </div>
                </div>
                <Button 
                  className="w-full justify-start gap-3 h-14" 
                  variant="outline"
                  onClick={handleDownload}
                >
                  <Icon name="Smartphone" size={24} />
                  <div className="text-left">
                    <div className="font-semibold">Android</div>
                    <div className="text-xs text-muted-foreground">Версия 2.4.1 • 12.8 MB</div>
                  </div>
                </Button>
                <Button 
                  className="w-full justify-start gap-3 h-14" 
                  variant="outline"
                  onClick={handleDownload}
                >
                  <Icon name="Tablet" size={24} />
                  <div className="text-left">
                    <div className="font-semibold">iOS</div>
                    <div className="text-xs text-muted-foreground">Версия 2.4.1 • 14.3 MB</div>
                  </div>
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  {user.picture ? (
                    <img src={user.picture} alt={user.name} className="w-6 h-6 rounded-full" />
                  ) : (
                    <Icon name="User" size={18} />
                  )}
                  {user.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive cursor-pointer">
                  <Icon name="LogOut" size={16} className="mr-2" />
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={login}
              disabled={isLoading}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {isLoading ? 'Вход...' : 'Войти через Google'}
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;