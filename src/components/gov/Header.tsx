import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Menu, X, Search, Globe, Phone, ChevronDown } from 'lucide-react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SearchModal from './SearchModal';

const languageLabels: Record<Language, string> = {
  fr: 'Français',
  mg: 'Malagasy',
  en: 'English',
};

const SCROLL_THRESHOLD = 20;

interface NavItem {
  key: string;
  href: string;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Throttled scroll handler for better performance
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        mobileMenuRef.current &&
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  // Smooth scroll handler for anchor links
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.slice(1);
      const targetElement = targetId ? document.getElementById(targetId) : null;
      
      if (targetElement) {
        const headerHeight = navRef.current?.offsetHeight || 0;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      
      setIsMenuOpen(false);
    }
  }, []);

  // Get current active section based on scroll position
  const [activeSection, setActiveSection] = useState<string>('');
  
  useEffect(() => {
    const handleScrollActive = () => {
      const sections = ['services', 'about', 'stats', 'contact'];
      const headerHeight = navRef.current?.offsetHeight || 0;
      const scrollPosition = window.scrollY + headerHeight + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(`#${sections[i]}`);
          return;
        }
      }
      setActiveSection('#');
    };

    window.addEventListener('scroll', handleScrollActive, { passive: true });
    handleScrollActive(); // Check on mount
    return () => window.removeEventListener('scroll', handleScrollActive);
  }, []);

  const navItems: NavItem[] = useMemo(
    () => [
      { key: 'nav.home', href: '#' },
      { key: 'nav.services', href: '#services' },
      { key: 'nav.about', href: '#about' },
      { key: 'nav.performance', href: '#stats' },
      { key: 'nav.contact', href: '#contact' },
    ],
    []
  );

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg"
      >
        {t('nav.skipToContent')}
      </a>

      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3 text-sm">
          <div className="hidden md:flex gap-4 lg:gap-6 flex-wrap">
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, '#services')}
              className="hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-foreground/50 focus:ring-offset-2 focus:ring-offset-primary rounded"
            >
              {t('nav.services')}
            </a>
            <a
              href="#documents"
              onClick={(e) => handleNavClick(e, '#documents')}
              className="hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-foreground/50 focus:ring-offset-2 focus:ring-offset-primary rounded"
            >
              {t('nav.documents')}
            </a>
            <a
              href="#recruitment"
              onClick={(e) => handleNavClick(e, '#recruitment')}
              className="hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-foreground/50 focus:ring-offset-2 focus:ring-offset-primary rounded"
            >
              {t('nav.recruitment')}
            </a>
          </div>
          <div className="flex gap-4 items-center ml-auto">
            <a
              href="tel:+261320384640"
              className="hidden sm:flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-foreground/50 focus:ring-offset-2 focus:ring-offset-primary rounded"
              aria-label="Appeler le numéro de téléphone"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>+261 32 03 846 40</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        ref={navRef}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-card/95 backdrop-blur-lg shadow-md py-2'
            : 'bg-card py-4'
        }`}
        role="navigation"
        aria-label={t('nav.mainNavigation')}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => handleNavClick(e, '#')}
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
              aria-label={t('header.home')}
            >
              <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-lg transition-transform group-hover:scale-105 group-focus:scale-105">
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-foreground">{t('header.tagline')}</p>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1" role="menubar">
              {navItems.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <a
                    key={item.key}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    role="menuitem"
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      isActive
                        ? 'text-foreground bg-secondary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    } focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {t(item.key)}
                  </a>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="text-muted-foreground hover:text-foreground focus:ring-2 focus:ring-ring"
                aria-label={t('search.open')}
                aria-expanded={isSearchOpen}
              >
                <Search className="w-5 h-5" aria-hidden="true" />
              </Button>

              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-muted-foreground focus:ring-2 focus:ring-ring"
                    aria-label={t('nav.changeLanguage')}
                    aria-expanded={false}
                  >
                    <Globe className="w-4 h-4" aria-hidden="true" />
                    <span className="hidden sm:inline">{languageLabels[language]}</span>
                    <ChevronDown className="w-3 h-3" aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-popover">
                  {(Object.keys(languageLabels) as Language[]).map((lang) => (
                    <DropdownMenuItem
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={language === lang ? 'bg-secondary' : ''}
                      aria-selected={language === lang}
                    >
                      {languageLabels[lang]}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-muted-foreground focus:ring-2 focus:ring-ring"
                aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Menu className="w-5 h-5" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            ref={mobileMenuRef}
            id="mobile-menu"
            className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen
                ? 'max-h-96 opacity-100 py-4 border-t mt-4'
                : 'max-h-0 opacity-0'
            }`}
            role="menu"
            aria-label={t('nav.mobileMenu')}
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <a
                    key={item.key}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    role="menuitem"
                    className={`px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                      isActive
                        ? 'text-foreground bg-secondary font-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {t(item.key)}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;
