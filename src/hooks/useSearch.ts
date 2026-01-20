import { useState, useMemo } from 'react';
import { articles, projects, Article, Project } from '@/data/siteContent';
import { useLanguage, Language } from '@/contexts/LanguageContext';

export type SearchFilter = 'all' | 'services' | 'news' | 'documents' | 'projects';

export interface SearchResult {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  type: SearchFilter;
  date?: string;
}

const getLocalizedText = (
  obj: { fr: string; mg: string; en: string },
  lang: Language
): string => obj[lang] || obj.fr;

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<SearchFilter>('all');
  const { language } = useLanguage();

  const results = useMemo((): SearchResult[] => {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase();
    const allResults: SearchResult[] = [];

    // Search articles
    articles.forEach((article: Article) => {
      const title = getLocalizedText(article.title, language);
      const excerpt = getLocalizedText(article.excerpt, language);
      
      if (
        title.toLowerCase().includes(searchTerm) ||
        excerpt.toLowerCase().includes(searchTerm) ||
        article.category.toLowerCase().includes(searchTerm)
      ) {
        const resultType = article.type === 'news' ? 'news' : 
                          article.type === 'document' ? 'documents' : 
                          article.type === 'service' ? 'services' : 'projects';
        
        if (filter === 'all' || filter === resultType) {
          allResults.push({
            id: article.id,
            title,
            excerpt,
            image: article.image,
            category: article.category,
            type: resultType,
            date: article.date,
          });
        }
      }
    });

    // Search projects
    projects.forEach((project: Project) => {
      const title = getLocalizedText(project.title, language);
      const description = getLocalizedText(project.description, language);
      const category = getLocalizedText(project.category, language);
      
      if (
        title.toLowerCase().includes(searchTerm) ||
        description.toLowerCase().includes(searchTerm) ||
        category.toLowerCase().includes(searchTerm)
      ) {
        const resultType = project.type === 'service' ? 'services' : 
                          project.type === 'document' ? 'documents' : 'projects';
        
        if (filter === 'all' || filter === resultType) {
          allResults.push({
            id: project.id + 100, // Offset to avoid ID conflicts
            title,
            excerpt: description,
            image: project.image,
            category,
            type: resultType,
          });
        }
      }
    });

    return allResults;
  }, [query, filter, language]);

  return {
    query,
    setQuery,
    filter,
    setFilter,
    results,
    hasResults: results.length > 0,
  };
};
