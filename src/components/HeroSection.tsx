import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const HeroSection = ({ searchQuery, setSearchQuery }: HeroSectionProps) => {
  return (
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
  );
};

export default HeroSection;
