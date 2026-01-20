import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ArrowRight, Play } from 'lucide-react';

// Mock data et traductions
const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1451187580460-44fb944ffc4b?w=1920&q=80',
    titleKey: 'hero.slide1.title',
    subtitleKey: 'hero.slide1.subtitle',
    link: '#normes'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80',
    titleKey: 'hero.slide2.title',
    subtitleKey: 'hero.slide2.subtitle',
    link: 'https://torolalana.gov.mg/'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1920&q=80',
    titleKey: 'hero.slide3.title',
    subtitleKey: 'hero.slide3.subtitle',
    link: '#transformation'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80',
    titleKey: 'hero.slide4.title',
    subtitleKey: 'hero.slide4.subtitle',
    link: '#recrutements'
  }
];

const translations = {
  fr: {
    'hero.slide1.title': 'Normes et Standards d\'Intéropérabilité',
    'hero.slide1.subtitle': 'Basé sur les normes et des meilleures pratiques utilisées à l\'échelle internationale',
    'hero.slide2.title': 'TOROLALANA le Portail Unique de Madagascar',
    'hero.slide2.subtitle': 'Directive sur les démarches et procédures administratives à Madagascar',
    'hero.slide3.title': 'Vision pour la transformation des services numériques',
    'hero.slide3.subtitle': 'Soyons « agile »',
    'hero.slide4.title': 'Unité de Gouvernance Digitale forme une équipe',
    'hero.slide4.subtitle': 'Venez nous rejoindre',
    'hero.learnMore': 'Lire l\'article',
    'hero.visitSite': 'Visiter le site web',
    'hero.viewDetails': 'Détails',
    'hero.viewPositions': 'Voir les postes disponibles'
  },
  mg: {
    'hero.slide1.title': 'Fitsipika sy Fenitra momba ny Fifandraisana',
    'hero.slide1.subtitle': 'Mifototra amin\'ny fenitra sy fomba tsara indrindra ampiasaina eran-tany',
    'hero.slide2.title': 'TOROLALANA Vavahadin\'i Madagasikara',
    'hero.slide2.subtitle': 'Torolalana momba ny fomba sy ny fombafomba ara-pitantanana ao Madagasikara',
    'hero.slide3.title': 'Fomba fijery momba ny fanovana ny serivisy nomerika',
    'hero.slide3.subtitle': 'Aoka ho "agile" isika',
    'hero.slide4.title': 'Unité de Gouvernance Digitale miforona ekipa',
    'hero.slide4.subtitle': 'Mankanesa aminay',
    'hero.learnMore': 'Hamaky ny lahatsoratra',
    'hero.visitSite': 'Tsidiho ny tranonkala',
    'hero.viewDetails': 'Antsipirihany',
    'hero.viewPositions': 'Hijery ny toerana misy'
  },
  en: {
    'hero.slide1.title': 'Interoperability Norms and Standards',
    'hero.slide1.subtitle': 'Based on internationally used norms and best practices',
    'hero.slide2.title': 'TOROLALANA Madagascar\'s Single Portal',
    'hero.slide2.subtitle': 'Guidelines on administrative procedures in Madagascar',
    'hero.slide3.title': 'Vision for digital services transformation',
    'hero.slide3.subtitle': 'Let\'s be "agile"',
    'hero.slide4.title': 'Digital Governance Unit is forming a team',
    'hero.slide4.subtitle': 'Come join us',
    'hero.learnMore': 'Read article',
    'hero.visitSite': 'Visit website',
    'hero.viewDetails': 'Details',
    'hero.viewPositions': 'View available positions'
  }
};

const slideButtons = {
  0: 'hero.learnMore',
  1: 'hero.visitSite',
  2: 'hero.viewDetails',
  3: 'hero.viewPositions'
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [language] = useState('fr');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const t = (key) => translations[language][key] || key;

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 12000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 12000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 12000);
  };

  return (
    <section className="relative h-[70vh] min-h-[550px] max-h-[700px] overflow-hidden bg-slate-900">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-out ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          {/* Image with professional overlay */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt=""
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay with professional blue/slate tones */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-blue-900/80 to-slate-800/60" />
            {/* Additional depth gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
            <div className="max-w-3xl">
              {/* Professional badge */}
              <div
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600/20 backdrop-blur-md border border-blue-400/30 mb-6 transition-all duration-700 delay-100 ${
                  index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-sm font-semibold text-white tracking-wide">Unité de Gouvernance Digitale</span>
              </div>

              {/* Title with professional typography */}
              <h2
                className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight transition-all duration-700 delay-200 ${
                  index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                {t(slide.titleKey)}
              </h2>

              {/* Subtitle */}
              <p
                className={`text-base md:text-lg text-blue-100/90 mb-8 leading-relaxed max-w-2xl transition-all duration-700 delay-300 ${
                  index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                {t(slide.subtitleKey)}
              </p>

              {/* CTA Button - Professional design */}
              <div
                className={`flex gap-4 transition-all duration-700 delay-400 ${
                  index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                <a
                  href={slide.link}
                  target={index === 1 ? '_blank' : undefined}
                  rel={index === 1 ? 'noopener noreferrer' : undefined}
                  className="group inline-flex items-center gap-3 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <span>{t(slideButtons[index])}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Progress indicator */}
              <div className={`mt-10 transition-all duration-700 delay-500 ${
                index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="h-1 w-32 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                      style={{
                        animation: index === currentSlide && isAutoPlaying ? 'progress 7s linear' : 'none',
                        width: index === currentSlide && isAutoPlaying ? '100%' : '0%'
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-blue-200/70 font-medium">
                    {index + 1} / {slides.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows - Minimalist design */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 z-10 group"
        aria-label="Slide précédent"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 z-10 group"
        aria-label="Slide suivant"
      >
        <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Professional Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative"
            aria-label={`Aller au slide ${index + 1}`}
          >
            <div
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-10 bg-blue-500'
                  : 'w-1.5 bg-white/40 hover:bg-white/60 hover:w-6'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Pause/Play button */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute bottom-8 right-6 w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-10"
        aria-label={isAutoPlaying ? 'Pause' : 'Play'}
      >
        {isAutoPlaying ? (
          <div className="flex gap-0.5">
            <div className="w-0.5 h-3 bg-white rounded-full"></div>
            <div className="w-0.5 h-3 bg-white rounded-full"></div>
          </div>
        ) : (
          <Play className="w-4 h-4 ml-0.5" />
        )}
      </button>

      {/* Subtle decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <style>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;