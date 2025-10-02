import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  docsOpen: boolean;
  setDocsOpen: (open: boolean) => void;
  mainDownloadOpen: boolean;
  setMainDownloadOpen: (open: boolean) => void;
  handleDownload: () => void;
}

const Header = ({ docsOpen, setDocsOpen, mainDownloadOpen, setMainDownloadOpen, handleDownload }: HeaderProps) => {
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
        </div>
      </nav>
    </header>
  );
};

export default Header;
