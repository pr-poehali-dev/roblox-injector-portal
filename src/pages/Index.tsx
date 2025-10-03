import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ScriptCard from '@/components/ScriptCard';
import ReviewsSection from '@/components/ReviewsSection';
import FAQSection from '@/components/FAQSection';
import CookieConsent from '@/components/CookieConsent';
import { scripts, categories } from '@/components/ScriptsData';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [docsOpen, setDocsOpen] = useState(false);
  const [mainDownloadOpen, setMainDownloadOpen] = useState(false);
  const { toast } = useToast();

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
        <Header 
          docsOpen={docsOpen}
          setDocsOpen={setDocsOpen}
          mainDownloadOpen={mainDownloadOpen}
          setMainDownloadOpen={setMainDownloadOpen}
          handleDownload={handleDownload}
        />

        <section className="container mx-auto px-4 py-20">
          <div data-animate="fade-up">
            <HeroSection 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>

          <div className="flex justify-center gap-3 mb-12 flex-wrap" data-animate="fade-up" data-delay="200">
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
                <div 
                  key={script.id}
                  data-animate="fade-up"
                  data-delay={Math.min(index * 50, 400)}
                >
                  <ScriptCard 
                    script={script}
                    index={index}
                    handleCopyScript={handleCopyScript}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        <div data-animate="fade-up">
          <ReviewsSection />
        </div>

        <div data-animate="fade-up">
          <FAQSection 
            mainDownloadOpen={mainDownloadOpen}
            setMainDownloadOpen={setMainDownloadOpen}
          />
        </div>

        <CookieConsent />
      </div>
    </div>
  );
};

export default Index;