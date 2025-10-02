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
    title: '99 Nights in the Forest',
    description: 'ESP для монстров, авто-сбор предметов, телепорт к сундукам',
    category: 'Horror',
    downloads: '24.3K',
    icon: 'Moon',
    game: '99 Nights in the Forest',
    code: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/scripts/99nights.lua"))()'
  },
  {
    id: 2,
    title: 'Blue Lock: Rivals',
    description: 'Автоматические пасы, усиление удара, авто-гол',
    category: 'Sports',
    downloads: '31.7K',
    icon: 'Trophy',
    game: 'Blue Lock: Rivals',
    code: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/scripts/bluelock.lua"))()'
  },
  {
    id: 3,
    title: 'Murder Mystery 2',
    description: 'ESP для убийцы и шерифа, авто-сбор монет, показ оружия',
    category: 'Mystery',
    downloads: '45.2K',
    icon: 'Knife',
    game: 'Murder Mystery 2',
    code: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/scripts/mm2.lua"))()'
  },
  {
    id: 4,
    title: 'Murders vs Sheriffs Duels',
    description: 'Авто-парирование, ESP игроков, улучшенный прицел',
    category: 'PvP',
    downloads: '28.9K',
    icon: 'Swords',
    game: 'Murders vs Sheriffs Duels',
    code: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/scripts/mvsd.lua"))()'
  },
  {
    id: 5,
    title: 'Blox Fruits',
    description: 'Авто-фарм фруктов, телепорт к боссам, бесконечная выносливость',
    category: 'RPG',
    downloads: '89.5K',
    icon: 'Apple',
    game: 'Blox Fruits',
    code: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/scripts/bloxfruits.lua"))()'
  },
  {
    id: 6,
    title: 'Jailbreak',
    description: 'Авто-грабеж, телепорт, бесконечная выносливость',
    category: 'Action',
    downloads: '52.1K',
    icon: 'Car',
    game: 'Jailbreak',
    code: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/scripts/jailbreak.lua"))()'
  },
  {
    id: 7,
    title: 'Arsenal',
    description: 'Аимбот, ESP врагов, авто-стрельба, телепорт к оружию',
    category: 'FPS',
    downloads: '67.8K',
    icon: 'Target',
    game: 'Arsenal',
    code: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/scripts/arsenal.lua"))()'
  },
  {
    id: 8,
    title: 'Adopt Me',
    description: 'Авто-фарм питомцев, дюп предметов, телепорт',
    category: 'Roleplay',
    downloads: '38.4K',
    icon: 'Heart',
    game: 'Adopt Me',
    code: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/scripts/adoptme.lua"))()'
  },
  {
    id: 9,
    title: 'Brookhaven',
    description: 'Разблокировка всех домов, телепорт, авто-работа',
    category: 'Roleplay',
    downloads: '41.2K',
    icon: 'Home',
    game: 'Brookhaven',
    code: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/scripts/brookhaven.lua"))()'
  },
  {
    id: 10,
    title: 'Blade Ball',
    description: 'Авто-парирование, ESP мяча, улучшенная реакция',
    category: 'Action',
    downloads: '73.6K',
    icon: 'Circle',
    game: 'Blade Ball',
    code: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/scripts/bladeball.lua"))()'
  },
  {
    id: 11,
    title: 'Doors',
    description: 'ESP монстров, авто-открытие дверей, подсветка ключей',
    category: 'Horror',
    downloads: '55.3K',
    icon: 'DoorOpen',
    game: 'Doors',
    code: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/scripts/doors.lua"))()'
  },
  {
    id: 12,
    title: 'Pet Simulator X',
    description: 'Авто-сбор монет, дюп питомцев, телепорт к сундукам',
    category: 'Simulator',
    downloads: '49.7K',
    icon: 'PawPrint',
    game: 'Pet Simulator X',
    code: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/scripts/petx.lua"))()'
  }
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [docsOpen, setDocsOpen] = useState(false);
  const [mainDownloadOpen, setMainDownloadOpen] = useState(false);
  const { toast } = useToast();
  const categories = ['All', 'Horror', 'Sports', 'Mystery', 'PvP', 'RPG', 'Action', 'FPS', 'Roleplay', 'Simulator'];

  const filteredScripts = scripts.filter(script => {
    const matchesCategory = selectedCategory === 'All' || script.category === selectedCategory;
    const matchesSearch = script.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         script.game.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         script.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

        <section className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto mb-16 animate-slide-up">
            <Badge className="mb-6 text-sm px-4 py-1 bg-primary/20 text-primary border-primary/30">
              Мощные инструменты для Roblox
            </Badge>
            <h2 className="text-6xl md:text-7xl font-rajdhani font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
              Скрипты для любых задач
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Коллекция проверенных скриптов для Roblox. Безопасно, быстро и эффективно
            </p>
            <div className="max-w-xl mx-auto relative">
              <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Поиск по названию игры или скрипта..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-card/50 backdrop-blur-sm border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon name="X" size={20} />
                </button>
              )}
            </div>
          </div>

          <div className="flex justify-center gap-3 mb-12 animate-fade-in flex-wrap" style={{ animationDelay: '0.4s' }}>
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

          {filteredScripts.length === 0 ? (
            <div className="text-center py-20">
              <Icon name="SearchX" className="mx-auto mb-4 text-muted-foreground" size={64} />
              <h3 className="text-2xl font-rajdhani font-semibold mb-2">Ничего не найдено</h3>
              <p className="text-muted-foreground">Попробуйте изменить поисковый запрос или категорию</p>
            </div>
          ) : (
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
                          <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg border border-primary/30">
                            <Icon name="Gamepad2" size={18} className="text-primary" />
                            <span className="text-sm font-medium">Игра: {script.game}</span>
                          </div>
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
          )}
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