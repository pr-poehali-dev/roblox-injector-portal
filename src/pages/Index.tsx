import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const scripts = [
  {
    id: 1,
    title: 'Infinite Jump',
    description: 'Позволяет делать бесконечные прыжки в любой игре',
    category: 'Movement',
    downloads: '12.5K',
    icon: 'Rocket',
    code: 'loadstring(game:HttpGet("https://api.script.com/infinite-jump"))()'
  },
  {
    id: 2,
    title: 'Speed Boost',
    description: 'Увеличивает скорость персонажа до максимума',
    category: 'Movement',
    downloads: '8.3K',
    icon: 'Zap',
    code: 'loadstring(game:HttpGet("https://api.script.com/speed-boost"))()'
  },
  {
    id: 3,
    title: 'Wall Hack',
    description: 'Проходите сквозь стены и препятствия',
    category: 'Exploit',
    downloads: '15.2K',
    icon: 'Shield',
    code: 'loadstring(game:HttpGet("https://api.script.com/wall-hack"))()'
  },
  {
    id: 4,
    title: 'Auto Farm',
    description: 'Автоматическая фарма ресурсов и опыта',
    category: 'Automation',
    downloads: '20.1K',
    icon: 'Cog',
    code: 'loadstring(game:HttpGet("https://api.script.com/auto-farm"))()'
  },
  {
    id: 5,
    title: 'Teleport',
    description: 'Мгновенное перемещение в любую точку карты',
    category: 'Movement',
    downloads: '9.7K',
    icon: 'MapPin',
    code: 'loadstring(game:HttpGet("https://api.script.com/teleport"))()'
  },
  {
    id: 6,
    title: 'God Mode',
    description: 'Полная неуязвимость персонажа',
    category: 'Exploit',
    downloads: '18.4K',
    icon: 'Crown',
    code: 'loadstring(game:HttpGet("https://api.script.com/god-mode"))()'
  }
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [docsOpen, setDocsOpen] = useState(false);
  const [mainDownloadOpen, setMainDownloadOpen] = useState(false);
  const { toast } = useToast();
  const categories = ['All', 'Movement', 'Exploit', 'Automation'];

  const filteredScripts = selectedCategory === 'All' 
    ? scripts 
    : scripts.filter(script => script.category === selectedCategory);

  const handleCopyScript = (code: string, title: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Скопировано!",
      description: `Скрипт "${title}" скопирован в буфер обмена`,
    });
  };

  const handleDownload = () => {
    toast({
      title: "Загрузка началась",
      description: "Инжектор скачивается на ваше устройство",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM2MzY2RjEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAgMi4yMDktMS43OTEgNC00IDRDOC43OTEgMjAgNyAyMS43OTEgNyAyNHMxLjc5MSA0IDQgNGMyLjIwOSAwIDQtMS43OTEgNC00czEuNzkxLTQgNC00IDQgMS43OTEgNCA0LTEuNzkxIDQtNCA0LTQtMS43OTEtNC00IDEuNzkxLTQgNC00IDQgMS43OTEgNCA0LTEuNzkxIDQtNCA0LTQtMS43OTEtNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      
      <div className="relative">
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
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </nav>
        </header>

        <section className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto mb-16 animate-slide-up">
            <Badge className="mb-6 text-sm px-4 py-1 bg-primary/20 text-primary border-primary/30">
              Мощные инструменты для Roblox
            </Badge>
            <h2 className="text-6xl md:text-7xl font-rajdhani font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
              Скрипты для любых задач
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Коллекция проверенных скриптов для Roblox. Безопасно, быстро и эффективно
            </p>
          </div>

          <div className="flex justify-center gap-3 mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="transition-all duration-300"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScripts.map((script, index) => (
              <Card 
                key={script.id} 
                className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 bg-card/50 backdrop-blur-sm border-border/50 animate-fade-in"
                style={{ animationDelay: `${index * 0.1 + 0.6}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon name={script.icon as any} className="text-white" size={28} />
                    </div>
                    <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30">
                      {script.category}
                    </Badge>
                  </div>
                  <CardTitle className="font-rajdhani text-2xl">{script.title}</CardTitle>
                  <CardDescription className="text-base">{script.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="Download" size={16} />
                      <span className="text-sm font-medium">{script.downloads}</span>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          className="gap-2 bg-primary hover:bg-primary/90 group-hover:gap-3 transition-all"
                        >
                          Получить
                          <Icon name="ArrowRight" size={16} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-rajdhani flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                              <Icon name={script.icon as any} className="text-white" size={24} />
                            </div>
                            {script.title}
                          </DialogTitle>
                          <DialogDescription>{script.description}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div className="bg-muted/50 p-4 rounded-lg border border-border">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-muted-foreground">Код скрипта</span>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => handleCopyScript(script.code, script.title)}
                                className="gap-2"
                              >
                                <Icon name="Copy" size={16} />
                                Копировать
                              </Button>
                            </div>
                            <code className="text-sm text-foreground block break-all">{script.code}</code>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Icon name="Download" size={16} />
                            <span>{script.downloads} загрузок</span>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-3xl p-12 text-center animate-fade-in border border-primary/20">
            <Icon name="Sparkles" className="mx-auto mb-6 text-primary" size={48} />
            <h3 className="text-4xl font-rajdhani font-bold mb-4">Готовы начать?</h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Присоединяйтесь к тысячам пользователей, которые уже используют наши инструменты
            </p>
            <Dialog open={mainDownloadOpen} onOpenChange={setMainDownloadOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="gap-3 bg-primary hover:bg-primary/90 text-lg px-8">
                  <Icon name="Rocket" size={20} />
                  Начать сейчас
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
