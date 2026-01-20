import { useEffect, useRef } from 'react';
import { Search, X, Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSearch, SearchFilter } from '@/hooks/useSearch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const filterKeys: SearchFilter[] = ['all', 'services', 'news', 'documents', 'projects'];

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const { t } = useLanguage();
  const { query, setQuery, filter, setFilter, results, hasResults } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 bg-card rounded-2xl shadow-2xl animate-slide-down overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <Input
            ref={inputRef}
            type="text"
            placeholder={t('search.placeholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-lg placeholder:text-muted-foreground"
          />
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 p-4 border-b border-border overflow-x-auto">
          {filterKeys.map((f) => (
            <Button
              key={f}
              variant={filter === f ? 'default' : 'secondary'}
              size="sm"
              onClick={() => setFilter(f)}
              className="whitespace-nowrap"
            >
              {t(`search.${f}`)}
            </Button>
          ))}
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto">
          {query.trim() && !hasResults && (
            <div className="p-8 text-center text-muted-foreground">
              {t('search.noResults')}
            </div>
          )}

          {hasResults && (
            <div className="p-2">
              <p className="px-3 py-2 text-sm text-muted-foreground">
                {results.length} {t('search.results')}
              </p>
              <div className="space-y-1">
                {results.map((result) => (
                  <a
                    key={`${result.type}-${result.id}`}
                    href="#"
                    className="flex items-start gap-4 p-3 rounded-xl hover:bg-secondary transition-colors group"
                    onClick={onClose}
                  >
                    <img
                      src={result.image}
                      alt={result.title}
                      className="w-16 h-12 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {result.title}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                        {result.excerpt}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-xs bg-secondary px-2 py-0.5 rounded-full text-muted-foreground">
                          {result.category}
                        </span>
                        {result.date && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {result.date}
                          </span>
                        )}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {!query.trim() && (
            <div className="p-8 text-center text-muted-foreground">
              <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>{t('search.placeholder')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
