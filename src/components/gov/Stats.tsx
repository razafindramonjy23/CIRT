import { useEffect, useState, useRef } from 'react';
import { Users, FileText, Package, Briefcase, TrendingUp } from 'lucide-react';

const iconMap = {
  users: Users,
  file: FileText,
  package: Package,
  briefcase: Briefcase,
};

const stats = [
  {
    id: 1,
    icon: 'users',
    number: '3,084,411',
    labelKey: 'stats.beneficiaries',
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: 2,
    icon: 'file',
    number: '5,750',
    labelKey: 'stats.certificates',
    color: 'from-cyan-400 to-cyan-600'
  },
  {
    id: 3,
    icon: 'package',
    number: '11',
    labelKey: 'stats.products',
    color: 'from-sky-400 to-sky-600'
  },
  {
    id: 4,
    icon: 'briefcase',
    number: '13',
    labelKey: 'stats.services',
    color: 'from-indigo-400 to-indigo-600'
  },
];

const translations = {
  fr: {
    'stats.title': 'Indicateurs et Performances',
    'stats.subtitle': 'Des chiffres qui témoignent de notre engagement',
    'stats.date': 'Edition de Décembre 2023',
    'stats.beneficiaries': 'Bénéficiaires',
    'stats.certificates': 'Copies d\'acte avec NUI',
    'stats.products': 'Produits',
    'stats.services': 'Services Fournis'
  }
};

const Stats = () => {
  const [language] = useState('fr');
  const [isVisible, setIsVisible] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState(stats.map(() => 0));
  const sectionRef = useRef(null);

  const t = (key) => translations[language][key] || key;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          animateNumbers();
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateNumbers = () => {
    stats.forEach((stat, index) => {
      const targetNumber = parseInt(stat.number.replace(/,/g, ''));
      const duration = 2000;
      const steps = 60;
      const increment = targetNumber / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const value = Math.min(Math.floor(increment * currentStep), targetNumber);
        
        setAnimatedNumbers(prev => {
          const newNumbers = [...prev];
          newNumbers[index] = value;
          return newNumbers;
        });

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, duration / steps);
    });
  };

  const formatNumber = (num) => {
    return num.toLocaleString('fr-FR');
  };

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#2563eb] relative overflow-hidden"
    >
      {/* Enhanced background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 2px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Animated circles */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-400/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
            <TrendingUp className="w-4 h-4 text-blue-200" />
            <span className="text-sm font-semibold text-blue-100">{t('stats.date')}</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t('stats.title')}
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            {t('stats.subtitle')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = iconMap[stat.icon] || Users;
            return (
              <div
                key={stat.id}
                className={`group relative transition-all duration-700 ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Card */}
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                  
                  {/* Icon */}
                  <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-20 rounded-2xl blur-xl group-hover:opacity-40 transition-opacity`}></div>
                    <Icon className="relative w-10 h-10 text-white" />
                  </div>

                  {/* Number with animation */}
                  <div className="relative text-5xl md:text-6xl font-bold text-white mb-3 tabular-nums">
                    {isVisible ? formatNumber(animatedNumbers[index]) : '0'}
                    <div className={`absolute -inset-2 bg-gradient-to-r ${stat.color} opacity-20 blur-2xl -z-10 group-hover:opacity-30 transition-opacity`}></div>
                  </div>

                  {/* Label */}
                  <div className="relative text-blue-100 text-sm font-medium uppercase tracking-wider">
                    {t(stat.labelKey)}
                  </div>

                  {/* Decorative line */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent group-hover:w-3/4 transition-all duration-500 rounded-full"></div>
                </div>

                {/* Floating particles effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className={`absolute top-4 right-4 w-2 h-2 bg-gradient-to-br ${stat.color} rounded-full opacity-0 group-hover:opacity-60 group-hover:-translate-y-4 transition-all duration-500`}></div>
                  <div className={`absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-br ${stat.color} rounded-full opacity-0 group-hover:opacity-60 group-hover:translate-y-4 transition-all duration-500 delay-100`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom decoration */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 text-blue-200 text-sm">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-300"></div>
            <span className="font-medium">Données mises à jour régulièrement</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;