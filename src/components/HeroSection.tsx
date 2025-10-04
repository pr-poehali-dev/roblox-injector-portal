import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useState, useRef, useEffect } from 'react';
import { scripts } from './ScriptsData';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onScriptSelect?: (scriptId: number) => void;
}

const HeroSection = ({ searchQuery, setSearchQuery, onScriptSelect }: HeroSectionProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const suggestions = searchQuery.length > 0 
    ? scripts.filter(script => 
        script.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        script.game.toLowerCase().includes(searchQuery.toLowerCase()) ||
        script.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && focusedIndex >= 0) {
      e.preventDefault();
      handleSelectSuggestion(suggestions[focusedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (script: typeof scripts[0]) => {
    setSearchQuery(script.title);
    setShowSuggestions(false);
    if (onScriptSelect) {
      onScriptSelect(script.id);
    }
    const element = document.getElementById(`script-${script.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() 
        ? <mark key={i} className="bg-primary/30 text-foreground">{part}</mark>
        : part
    );
  };

  return (
    <div className="text-center max-w-4xl mx-auto mb-16 animate-slide-up">
      <Badge className="mb-6 text-sm px-4 py-1 bg-primary/20 text-primary border-primary/30">
        Бесплатные браузерные игры
      </Badge>
      <h2 className="text-6xl md:text-7xl font-rajdhani font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
        Играй прямо в браузере
      </h2>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
        Огромная коллекция браузерных игр. Без установки, без регистрации
      </p>
      <div className="max-w-xl mx-auto relative">
        <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground z-10" size={20} />
        <input
          ref={inputRef}
          type="text"
          placeholder="Поиск игр..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSuggestions(true);
            setFocusedIndex(-1);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          className="w-full pl-12 pr-12 py-4 bg-card/50 backdrop-blur-sm border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('');
              setShowSuggestions(false);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10"
          >
            <Icon name="X" size={20} />
          </button>
        )}
        
        {showSuggestions && suggestions.length > 0 && (
          <div 
            ref={suggestionsRef}
            className="absolute top-full mt-2 w-full bg-card/95 backdrop-blur-sm border border-border rounded-xl shadow-xl z-50 overflow-hidden"
          >
            {suggestions.map((script, index) => (
              <button
                key={script.id}
                onClick={() => handleSelectSuggestion(script)}
                className={`w-full text-left px-4 py-3 hover:bg-primary/10 transition-colors flex items-start gap-3 ${
                  focusedIndex === index ? 'bg-primary/10' : ''
                }`}
              >
                <div className="mt-1">
                  <Icon name={script.icon as any} size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">
                    {highlightMatch(script.title, searchQuery)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {script.game} • {script.category}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                    {script.description}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Icon name="Download" size={12} />
                  {script.downloads}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;