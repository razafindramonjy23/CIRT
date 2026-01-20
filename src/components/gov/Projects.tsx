import { useState, useEffect, useRef, useMemo } from 'react';
import { ArrowUpRight, Filter, X, ExternalLink, Sparkles } from 'lucide-react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { projects } from '@/data/siteContent';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const Projects = () => {
  const { language, t } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const getLocalizedText = (obj: { fr: string; mg: string; en: string }) =>
    obj[language as Language] || obj.fr;

  // Get unique categories for filters
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    projects.forEach((project) => {
      uniqueCategories.add(getLocalizedText(project.category));
    });
    return Array.from(uniqueCategories);
  }, [language]);

  // Filter projects based on selected filter
  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'all') return projects;
    return projects.filter((project) => getLocalizedText(project.category) === selectedFilter);
  }, [selectedFilter, language]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="services"
        className="py-24 bg-gradient-to-b from-background via-secondary/30 to-background relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              {t('projects.badge')}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {t('projects.title')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('projects.subtitle')}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span className="font-medium">{t('projects.filter')}:</span>
            </div>
            <Button
              variant={selectedFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter('all')}
              className="rounded-full"
            >
              {t('projects.all')}
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedFilter === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProjects.map((project, index) => {
              const isProjectType = project.type === 'project';
              return (
                <div
                  key={project.id}
                  className={`group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 ${
                    isVisible
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-12 opacity-0'
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                    animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none',
                  }}
                  role="article"
                  aria-label={getLocalizedText(project.title)}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                    <img
                      src={project.image}
                      alt={getLocalizedText(project.title)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1.5 bg-card/95 backdrop-blur-md text-foreground text-xs font-semibold rounded-full shadow-lg border border-border/50">
                      {getLocalizedText(project.category)}
                    </span>
                  </div>

                  {/* Type indicator */}
                  {isProjectType && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="w-8 h-8 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/30">
                        <Sparkles className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                  )}

                  {/* Arrow button */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 z-10"
                    aria-label={t('projects.viewDetails')}
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </button>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {getLocalizedText(project.title)}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                      {getLocalizedText(project.description)}
                    </p>
                    
                    {/* Type badge */}
                    <div className="mt-4 pt-4 border-t border-border">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        {t(`projects.type.${project.type}`)}
                      </span>
                    </div>
                  </div>

                  {/* Hover border effect */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              );
            })}
          </div>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                {t('projects.noResults')}
              </p>
            </div>
          )}

          {/* Bottom decoration */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 text-muted-foreground text-sm">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-border"></div>
              <span className="font-medium">{t('projects.footer')}</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-border"></div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(3rem);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                        {getLocalizedText(selectedProject.category)}
                      </span>
                      <span className="px-3 py-1 bg-secondary text-muted-foreground text-xs font-medium rounded-full">
                        {t(`projects.type.${selectedProject.type}`)}
                      </span>
                    </div>
                    <DialogTitle className="text-2xl md:text-3xl mb-2">
                      {getLocalizedText(selectedProject.title)}
                    </DialogTitle>
                    <DialogDescription className="text-base">
                      {getLocalizedText(selectedProject.description)}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="mt-6">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary mb-6">
                  <img
                    src={selectedProject.image}
                    alt={getLocalizedText(selectedProject.title)}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      {t('projects.details.title')}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {getLocalizedText(selectedProject.description)}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                    <Button
                      variant="default"
                      onClick={() => setSelectedProject(null)}
                      className="flex-1 sm:flex-initial"
                    >
                      {t('projects.close')}
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 sm:flex-initial"
                      onClick={() => {
                        // Handle external link if available
                        window.open('#', '_blank');
                      }}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t('projects.learnMore')}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Projects;
