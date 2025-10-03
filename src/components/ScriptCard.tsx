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
}

interface ScriptCardProps {
  script: Script;
  index: number;
  handleCopyScript: (code: string, title: string) => void;
}

const ScriptCard = ({ script, index, handleCopyScript }: ScriptCardProps) => {
  return (
    <Card 
      id={`script-${script.id}`}
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
  );
};

export default ScriptCard;