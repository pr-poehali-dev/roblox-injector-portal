import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface FAQSectionProps {
  mainDownloadOpen: boolean;
  setMainDownloadOpen: (open: boolean) => void;
}

const FAQSection = ({ mainDownloadOpen, setMainDownloadOpen }: FAQSectionProps) => {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h3 className="text-4xl font-rajdhani font-bold mb-4">Частые вопросы</h3>
        <p className="text-muted-foreground">Ответы на популярные вопросы пользователей</p>
      </div>
      
      <div className="max-w-3xl mx-auto space-y-4 mb-20">
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
          <h4 className="font-rajdhani text-xl font-semibold mb-2 flex items-center gap-2">
            <Icon name="HelpCircle" size={20} className="text-primary" />
            Безопасно ли использовать инжектор?
          </h4>
          <p className="text-muted-foreground">Все наши инструменты проверены на вирусы. Однако использование скриптов может привести к бану в Roblox. Используйте на альтернативных аккаунтах.</p>
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
          <h4 className="font-rajdhani text-xl font-semibold mb-2 flex items-center gap-2">
            <Icon name="HelpCircle" size={20} className="text-primary" />
            Почему антивирус блокирует инжектор?
          </h4>
          <p className="text-muted-foreground">Антивирусы часто считают инжекторы вредоносными из-за способа их работы. Временно отключите антивирус при запуске или добавьте файл в исключения.</p>
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
          <h4 className="font-rajdhani text-xl font-semibold mb-2 flex items-center gap-2">
            <Icon name="HelpCircle" size={20} className="text-primary" />
            Как часто нужно обновлять ключ?
          </h4>
          <p className="text-muted-foreground">Ключ активации действует 24 часа. После истечения срока получите новый ключ через кнопку "Get Key" в инжекторе.</p>
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
          <h4 className="font-rajdhani text-xl font-semibold mb-2 flex items-center gap-2">
            <Icon name="HelpCircle" size={20} className="text-primary" />
            Работает ли на мобильных устройствах?
          </h4>
          <p className="text-muted-foreground">Да! У нас есть версии для Android и iOS. Скачайте соответствующую версию из раздела загрузок. Для iOS может потребоваться jailbreak.</p>
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
          <h4 className="font-rajdhani text-xl font-semibold mb-2 flex items-center gap-2">
            <Icon name="HelpCircle" size={20} className="text-primary" />
            Скрипт не работает, что делать?
          </h4>
          <p className="text-muted-foreground">Убедитесь что: 1) Вы в правильной игре, 2) Инжектор обновлён до последней версии, 3) Вы активировали ключ. Если проблема сохраняется, попробуйте другой скрипт.</p>
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
          <h4 className="font-rajdhani text-xl font-semibold mb-2 flex items-center gap-2">
            <Icon name="HelpCircle" size={20} className="text-primary" />
            Можно ли использовать несколько скриптов одновременно?
          </h4>
          <p className="text-muted-foreground">Это зависит от скриптов. Некоторые конфликтуют между собой. Рекомендуем использовать по одному скрипту за раз для стабильной работы.</p>
        </div>
      </div>

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
  );
};

export default FAQSection;
