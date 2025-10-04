import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface Script {
  id: number;
  title: string;
  description: string;
  category: string;
  downloads: string;
  icon: string;
  game: string;
  code: string;
  image?: string;
}

interface ScriptCardProps {
  script: Script;
  index: number;
  handleCopyScript: (code: string, title: string) => void;
  scriptCount?: number;
}

const ScriptCard = memo(({ script, index, handleCopyScript, scriptCount }: ScriptCardProps) => {
  return (
    <Card 
      id={`script-${script.id}`}
      className="group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-border/50 animate-fade-in overflow-hidden"
      style={{ animationDelay: `${index * 0.05 + 0.3}s` }}
    >
      {script.image && (
        <div className="relative h-48 overflow-hidden bg-muted">
          <img 
            src={script.image} 
            alt={script.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent"></div>
          <div className="absolute top-3 right-3 flex gap-2">
            {scriptCount && scriptCount > 1 && (
              <Badge variant="default" className="bg-primary/90 text-primary-foreground border-primary backdrop-blur-sm">
                <Icon name="Layers" size={12} className="mr-1" />
                {scriptCount}
              </Badge>
            )}
            <Badge variant="secondary" className="bg-secondary/90 text-secondary-foreground border-secondary backdrop-blur-sm">
              {script.category}
            </Badge>
          </div>
        </div>
      )}
      <CardHeader className={script.image ? 'pt-4' : ''}>
        {!script.image && (
          <div className="flex items-start justify-between mb-3">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Icon name={script.icon as any} className="text-white" size={28} />
            </div>
            <div className="flex gap-2">
              {scriptCount && scriptCount > 1 && (
                <Badge variant="default" className="bg-primary/20 text-primary border-primary/30">
                  <Icon name="Layers" size={12} className="mr-1" />
                  {scriptCount}
                </Badge>
              )}
              <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30">
                {script.category}
              </Badge>
            </div>
          </div>
        )}
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
  );
});

ScriptCard.displayName = 'ScriptCard';

export default ScriptCard;