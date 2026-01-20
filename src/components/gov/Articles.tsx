import { useState } from 'react';
import { Calendar, ArrowRight, Tag, Clock } from 'lucide-react';

const articles = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    category: 'Actualités',
    date: '14 Nov, 2023',
    readTime: '5 min',
    title: {
      fr: 'Cadre d\'Interopérabilité',
      en: 'Interoperability Framework',
      mg: 'Firafitry ny fifanarahana'
    },
    excerpt: {
      fr: 'La transformation digitale est devenue un levier de développement pour tous les types d\'organisations. Le gouvernement malagasy a élaboré une stratégie pour améliorer la gestion des recettes et l\'accès aux services publics.',
      en: 'Digital transformation has become a development lever for all types of organizations. The Malagasy government has developed a strategy to improve revenue management and access to public services.',
      mg: 'Ny fiovan\'ny nomerika dia lasa fitsopana ny fandrosoana ho an\'ny karazana fikambanana rehetra. Namolavola paikady ny governemanta malagasy hanatsarana ny fitantanana ny vola miditra sy ny fidirana amin\'ny sampan-draharaham-panjakana.'
    },
    author: 'Équipe',
    tags: ['AMOA', 'PO', 'Architectes SI']
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    category: 'Services',
    date: '08 Sep, 2023',
    readTime: '4 min',
    title: {
      fr: 'Plateforme Vaksiny pour la gestion des vaccins',
      en: 'Vaksiny Platform for vaccine management',
      mg: 'Sehatra Vaksiny ho an\'ny fitantanana vaksiny'
    },
    excerpt: {
      fr: 'Le MSANP avec la Présidence procèdent à la réalisation des campagnes de vaccinations contre la COVID19. Une plateforme de recensement numérique permet d\'éviter les imports de données plusieurs fois.',
      en: 'The MSANP with the Presidency are implementing COVID19 vaccination campaigns. A digital census platform helps avoid importing data multiple times.',
      mg: 'Ny MSANP miaraka amin\'ny Filoham-pirenena dia manatanteraka ny fanentanana vaksiny COVID19. Mampiasa sehatra fanisam-bahoaka nomerika izay manampy hisoroka ny fampidirana angona imbetsaka.'
    },
    author: 'Equipe de communication',
    tags: ['Santé', 'Digital']
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
    category: 'Infrastructure',
    date: '31 Jul, 2023',
    readTime: '6 min',
    title: {
      fr: 'Couche sécurisée d\'interopérabilité – XROAD',
      en: 'Secure interoperability layer – XROAD',
      mg: 'Sosona azo antoka amin\'ny fifanarahana – XROAD'
    },
    excerpt: {
      fr: 'XROAD est une plateforme open source qui offre un canal sécurisé aux institutions qui souhaitent partager des données. Il s\'agit d\'un projet e-Gouvernance pour la transformation digitale d\'un pays.',
      en: 'XROAD is an open source platform that provides a secure channel for institutions wishing to share data. It is an e-Governance project for the digital transformation of a country.',
      mg: 'XROAD dia sehatra loharano misokatra izay manome fantsona azo antoka ho an\'ny andrim-panjakana te hizara angona. Tetikasa e-Governemanta io ho an\'ny fiovan\'ny nomerika amin\'ny firenena iray.'
    },
    author: 'Équipe',
    tags: ['X-Road', 'Sécurité']
  }
];

const translations = {
  fr: {
    'articles.title': 'Les Actualités',
    'articles.subtitle': 'Ne ratez rien. Restez à l\'écoute de toutes les nouvelles',
    'articles.viewAll': 'Voir toutes les actualités',
    'articles.readMore': 'Lire l\'article',
    'articles.by': 'Par'
  },
  en: {
    'articles.title': 'Latest News',
    'articles.subtitle': 'Don\'t miss anything. Stay tuned for all the news',
    'articles.viewAll': 'View all news',
    'articles.readMore': 'Read article',
    'articles.by': 'By'
  },
  mg: {
    'articles.title': 'Vaovao',
    'articles.subtitle': 'Aza mandalo na inona na inona. Mijanona amin\'ny vaovao rehetra',
    'articles.viewAll': 'Hijery ny vaovao rehetra',
    'articles.readMore': 'Hamaky ny lahatsoratra',
    'articles.by': 'Nataon\'i'
  }
};

const Articles = () => {
  const [language] = useState('fr');
  const [hoveredCard, setHoveredCard] = useState(null);

  const t = (key) => translations[language][key] || key;
  const getLocalizedText = (obj) => obj[language] || obj.fr;

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
              <Tag className="w-4 h-4" />
              <span>Blog</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              {t('articles.title')}
            </h2>
            <p className="text-gray-600 text-lg">
              {t('articles.subtitle')}
            </p>
          </div>
          <a
            href="#"
            className="group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 self-start md:self-auto hover:scale-105"
          >
            <span>{t('articles.viewAll')}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <article
              key={article.id}
              onMouseEnter={() => setHoveredCard(article.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2"
              style={{ 
                animationDelay: `${index * 100}ms`,
                transform: hoveredCard === article.id ? 'translateY(-8px)' : 'translateY(0)'
              }}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src={article.image}
                  alt={getLocalizedText(article.title)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category badge on image */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-white/95 backdrop-blur-sm text-blue-700 rounded-full shadow-lg">
                    <Tag className="w-3 h-3" />
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta info */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                  {getLocalizedText(article.title)}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                  {getLocalizedText(article.excerpt)}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.slice(0, 2).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer with author and CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    {t('articles.by')} <span className="font-semibold text-gray-700">{article.author}</span>
                  </span>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:gap-3 transition-all group"
                  >
                    <span>{t('articles.readMore')}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Hover effect border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 text-gray-500 text-sm">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gray-300"></div>
            <span className="font-medium">Plus d'articles disponibles sur notre blog</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gray-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Articles;