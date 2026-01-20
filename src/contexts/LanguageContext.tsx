import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'fr' | 'mg' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.procurement': 'Passation de marché',
    'nav.beneficiaries': 'Nos bénéficiaires',
    'nav.performance': 'Nos performances',
    'nav.prodigy': 'PRODIGY',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.services': 'Services Publics',
    'nav.documents': 'Documents',
    'nav.recruitment': 'Recrutement',
    'nav.skipToContent': 'Aller au contenu principal',
    'nav.mainNavigation': 'Navigation principale',
    'nav.changeLanguage': 'Changer la langue',
    'nav.openMenu': 'Ouvrir le menu',
    'nav.closeMenu': 'Fermer le menu',
    'nav.mobileMenu': 'Menu mobile',
    
    // Header
    'header.tagline': 'Solutions centrées sur les besoins essentiels',
    'header.ugd': 'Unité de Gouvernance Digitale',
    'header.home': 'Retour à l\'accueil',
    
    // Search
    'search.placeholder': 'Rechercher des services, documents, actualités...',
    'search.button': 'Rechercher',
    'search.open': 'Ouvrir la recherche',
    'search.filters': 'Filtres',
    'search.all': 'Tous',
    'search.services': 'Services',
    'search.news': 'Actualités',
    'search.documents': 'Documents',
    'search.projects': 'Projets',
    'search.noResults': 'Aucun résultat trouvé',
    'search.results': 'résultats',
    
    // Hero
    'hero.slide1.title': 'Normes et Standards d\'Interopérabilité',
    'hero.slide1.subtitle': 'Basé sur les normes et des meilleures pratiques utilisées à l\'échelle internationale',
    'hero.slide2.title': 'TOROLALANA le Portail Unique',
    'hero.slide2.subtitle': 'Directive sur les démarches et procédures administratives à Madagascar',
    'hero.slide3.title': 'Transformation Numérique',
    'hero.slide3.subtitle': 'Une vision moderne et agile pour les services publics',
    'hero.learnMore': 'En savoir plus',
    
    // Welcome
    'welcome.badge': 'Présidence de la République',
    'welcome.title': 'Bienvenue sur le portail',
    'welcome.description': 'La Présidence s\'est engagée à créer une administration de proximité, à l\'écoute de la population et de ses besoins, pour améliorer la qualité de vie des citoyens et faciliter le travail des entreprises.',
    'welcome.secretary': 'Secrétaire Général de la Présidence',
    
    // Articles
    'articles.title': 'Actualités',
    'articles.subtitle': 'Restez informé des dernières nouvelles',
    'articles.readMore': 'Lire la suite',
    'articles.viewAll': 'Voir toutes les actualités',
    
    // Stats
    'stats.title': 'Indicateurs et Performances',
    'stats.beneficiaries': 'Bénéficiaires',
    'stats.certificates': 'Copies d\'acte avec NUI',
    'stats.products': 'Produits',
    'stats.services': 'Services fournis',
    'stats.date': 'Mise à jour : Décembre 2023',
    
    // Projects
    'projects.badge': 'Nos Projets',
    'projects.title': 'Projets en Action',
    'projects.subtitle': 'Nos réalisations et contributions',
    'projects.filter': 'Filtrer',
    'projects.all': 'Tous',
    'projects.viewDetails': 'Voir les détails',
    'projects.close': 'Fermer',
    'projects.learnMore': 'En savoir plus',
    'projects.noResults': 'Aucun projet trouvé pour cette catégorie',
    'projects.footer': 'Découvrez nos réalisations et innovations',
    'projects.details.title': 'Description',
    'projects.type.project': 'Projet',
    'projects.type.service': 'Service',
    'projects.type.document': 'Document',
    
    // Contact
    'contact.badge': 'Contactez-nous',
    'contact.title': 'Nous contacter',
    'contact.subtitle': 'Une question ? Une suggestion ? N\'hésitez pas à nous écrire, nous vous répondrons dans les plus brefs délais.',
    'contact.infoTitle': 'Informations de contact',
    'contact.infoDescription': 'L\'Unité de Gouvernance Digitale est à votre disposition pour répondre à toutes vos questions et vous accompagner dans vos démarches.',
    'contact.address': 'Adresse',
    'contact.phone': 'Téléphone',
    'contact.email': 'Email',
    'contact.hours': 'Heures d\'ouverture',
    'contact.weekdays': 'Lundi - Vendredi',
    'contact.weekend': 'Samedi - Dimanche',
    'contact.closed': 'Fermé',
    'contact.formTitle': 'Envoyez-nous un message',
    'contact.name': 'Nom complet',
    'contact.namePlaceholder': 'Votre nom',
    'contact.emailPlaceholder': 'votre.email@exemple.com',
    'contact.subject': 'Sujet',
    'contact.subjectPlaceholder': 'Objet de votre message',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Votre message...',
    'contact.send': 'Envoyer le message',
    'contact.sending': 'Envoi en cours...',
    'contact.success': 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.',
    
    // Footer
    'footer.ministries': 'Les Ministères',
    'footer.services': 'Services',
    'footer.links': 'Liens utiles',
    'footer.rights': 'Tous droits réservés',
    'footer.presidency': 'Présidence de la République',
    'footer.interior': 'Intérieur et Décentralisation',
    'footer.economy': 'Économie et Finances',
    'footer.education': 'Éducation Nationale',
    'footer.health': 'Santé Publique',
    'footer.telecom': 'Postes et Télécommunications',
    'footer.digital': 'Développement Numérique',
    'footer.bank': 'Banque Centrale',
    'footer.edbm': 'EDBM',
    'footer.evisa': 'e-VISA',
    'footer.tourism': 'Tourisme & Transport',
  },
  mg: {
    // Navigation
    'nav.home': 'Fandraisana',
    'nav.procurement': 'Fividianana',
    'nav.beneficiaries': 'Mpisitraka',
    'nav.performance': 'Fahombiazana',
    'nav.prodigy': 'PRODIGY',
    'nav.about': 'Mombamomba',
    'nav.contact': 'Fifandraisana',
    'nav.services': 'Serivisy',
    'nav.documents': 'Antontan-taratasy',
    'nav.recruitment': 'Fampidirana',
    'nav.skipToContent': 'Mandeha amin\'ny votoaty fototra',
    'nav.mainNavigation': 'Fikarohana fototra',
    'nav.changeLanguage': 'Hanova ny fiteny',
    'nav.openMenu': 'Hanokatra ny menio',
    'nav.closeMenu': 'Hanidy ny menio',
    'nav.mobileMenu': 'Menio finday',
    
    // Header
    'header.tagline': 'Vahaolana mifantoka amin\'ny filàna fototra',
    'header.ugd': 'Sampana Fitantanana Nomerika',
    'header.home': 'Miverina amin\'ny fandraisana',
    
    // Search
    'search.placeholder': 'Mitady serivisy, antontan-taratasy, vaovao...',
    'search.button': 'Mitady',
    'search.open': 'Hanokatra ny fikarohana',
    'search.filters': 'Sivana',
    'search.all': 'Rehetra',
    'search.services': 'Serivisy',
    'search.news': 'Vaovao',
    'search.documents': 'Antontan-taratasy',
    'search.projects': 'Tetikasa',
    'search.noResults': 'Tsy misy valiny hita',
    'search.results': 'valiny',
    
    // Hero
    'hero.slide1.title': 'Fenitra sy Fenitra Ifanakalozana',
    'hero.slide1.subtitle': 'Mifototra amin\'ny fenitra sy ny fomba tsara indrindra ampiasaina eran-tany',
    'hero.slide2.title': 'TOROLALANA Vavahady Tokana',
    'hero.slide2.subtitle': 'Torolalana momba ny dingana sy paik\'ady ara-pitantanana eto Madagasikara',
    'hero.slide3.title': 'Fiovana Nomerika',
    'hero.slide3.subtitle': 'Vina maoderina sy mailaka ho an\'ny serivisy',
    'hero.learnMore': 'Fantaro bebe kokoa',
    
    // Welcome
    'welcome.badge': 'Fiadidiana ny Repoblika',
    'welcome.title': 'Tongasoa eto amin\'ny tranonkala',
    'welcome.description': 'Ny Fiadidiana dia nandray andraikitra amin\'ny famoronana fitantanana akaiky, mihaino ny vahoaka sy ny filàny, mba hanatsarana ny fiainan\'ny olom-pirenena sy hanamora ny asan\'ny orinasa.',
    'welcome.secretary': 'Sekretera Jeneralin\'ny Fiadidiana',
    
    // Articles
    'articles.title': 'Vaovao',
    'articles.subtitle': 'Mijanona ho voavonjy amin\'ny vaovao farany',
    'articles.readMore': 'Hamaky bebe kokoa',
    'articles.viewAll': 'Hijery ny vaovao rehetra',
    
    // Stats
    'stats.title': 'Famantarana sy Fahombiazana',
    'stats.beneficiaries': 'Mpisitraka',
    'stats.certificates': 'Kopia sora-pahaterahana miaraka amin\'ny NUI',
    'stats.products': 'Vokatra',
    'stats.services': 'Serivisy omena',
    'stats.date': 'Fanavaozana: Desambra 2023',
    
    // Projects
    'projects.badge': 'Ny Tetikasantsika',
    'projects.title': 'Tetikasa amin\'ny Asa',
    'projects.subtitle': 'Ny fandraisana anjaran\'ny serivisy nomerika',
    'projects.filter': 'Sivana',
    'projects.all': 'Rehetra',
    'projects.viewDetails': 'Hijery antsipirihany',
    'projects.close': 'Hidiana',
    'projects.learnMore': 'Fantaro bebe kokoa',
    'projects.noResults': 'Tsy misy tetikasa hita ho an\'io sokajy io',
    'projects.footer': 'Fantaro ny zava-bitanay sy ny vaovao',
    'projects.details.title': 'Famariparitana',
    'projects.type.project': 'Tetikasa',
    'projects.type.service': 'Serivisy',
    'projects.type.document': 'Antontan-taratasy',
    
    // Contact
    'contact.badge': 'Mifandraisa aminay',
    'contact.title': 'Mifandraisa aminay',
    'contact.subtitle': 'Fanontaniana? Soso-kevitra? Aza miady saina manoratra aminay, hamerina aminay ao no ho azy.',
    'contact.infoTitle': 'Fampahalalana momba ny fifandraisana',
    'contact.infoDescription': 'Ny serivisy dia eo an-tananay mba hamaly ny fanontanianao rehetra sy hanampy anao amin\'ny fomba fiasanao.',
    'contact.address': 'Adiresy',
    'contact.phone': 'Telefaona',
    'contact.email': 'Mailaka',
    'contact.hours': 'Fotoana misokatra',
    'contact.weekdays': 'Alatsinainy - Zoma',
    'contact.weekend': 'Sabotsy - Alahady',
    'contact.closed': 'Mikatona',
    'contact.formTitle': 'Alefaso hafatra aminay',
    'contact.name': 'Anarana feno',
    'contact.namePlaceholder': 'Ny anaranao',
    'contact.emailPlaceholder': 'ny.mailakao@ohatra.com',
    'contact.subject': 'Lohahevitra',
    'contact.subjectPlaceholder': 'Ny lohahevitry ny hafatrao',
    'contact.message': 'Hafatra',
    'contact.messagePlaceholder': 'Ny hafatrao...',
    'contact.send': 'Alefaso ny hafatra',
    'contact.sending': 'Efa alefa...',
    'contact.success': 'Voaray soa aman-tsara ny hafatrao! Hamerina aminay ao no ho azy.',
    
    // Footer
    'footer.ministries': 'Ireo Minisitera',
    'footer.services': 'Serivisy',
    'footer.links': 'Rohy mahasoa',
    'footer.rights': 'Zo rehetra voatahiry',
    'footer.presidency': 'Fiadidiana ny Repoblika',
    'footer.interior': 'Anatiny sy Fitsinjaram-pahefana',
    'footer.economy': 'Toe-karena sy Fitantanam-bola',
    'footer.education': 'Fampianarana',
    'footer.health': 'Fahasalamam-bahoaka',
    'footer.telecom': 'Paositra sy Fifandraisan-davitra',
    'footer.digital': 'Fampandrosoana Nomerika',
    'footer.bank': 'Banky Foibe',
    'footer.edbm': 'EDBM',
    'footer.evisa': 'e-VISA',
    'footer.tourism': 'Fizahan-tany sy Fitaterana',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.procurement': 'Procurement',
    'nav.beneficiaries': 'Beneficiaries',
    'nav.performance': 'Performance',
    'nav.prodigy': 'PRODIGY',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.services': 'Public Services',
    'nav.documents': 'Documents',
    'nav.recruitment': 'Recruitment',
    'nav.skipToContent': 'Skip to main content',
    'nav.mainNavigation': 'Main navigation',
    'nav.changeLanguage': 'Change language',
    'nav.openMenu': 'Open menu',
    'nav.closeMenu': 'Close menu',
    'nav.mobileMenu': 'Mobile menu',
    
    // Header
    'header.tagline': 'Solutions focused on essential needs',
    'header.ugd': 'Digital Governance Unit',
    'header.home': 'Return to home',
    
    // Search
    'search.placeholder': 'Search services, documents, news...',
    'search.button': 'Search',
    'search.open': 'Open search',
    'search.filters': 'Filters',
    'search.all': 'All',
    'search.services': 'Services',
    'search.news': 'News',
    'search.documents': 'Documents',
    'search.projects': 'Projects',
    'search.noResults': 'No results found',
    'search.results': 'results',
    
    // Hero
    'hero.slide1.title': 'Interoperability Standards',
    'hero.slide1.subtitle': 'Based on international best practices and standards',
    'hero.slide2.title': 'TOROLALANA Single Portal',
    'hero.slide2.subtitle': 'Guidelines for administrative procedures in Madagascar',
    'hero.slide3.title': 'Digital Transformation',
    'hero.slide3.subtitle': 'A modern and agile vision for public services',
    'hero.learnMore': 'Learn more',
    
    // Welcome
    'welcome.badge': 'Presidency of the Republic',
    'welcome.title': 'Welcome to the portal',
    'welcome.description': 'The Presidency is committed to creating a responsive administration that listens to the population and their needs, to improve citizens\' quality of life and facilitate business operations.',
    'welcome.secretary': 'Secretary General of the Presidency',
    
    // Articles
    'articles.title': 'Latest News',
    'articles.subtitle': 'Stay informed with the latest updates',
    'articles.readMore': 'Read more',
    'articles.viewAll': 'View all news',
    
    // Stats
    'stats.title': 'Indicators & Performance',
    'stats.beneficiaries': 'Beneficiaries',
    'stats.certificates': 'Birth certificates with NUI',
    'stats.products': 'Products',
    'stats.services': 'Services provided',
    'stats.date': 'Updated: December 2023',
    
    // Projects
    'projects.badge': 'Our Projects',
    'projects.title': 'Projects in Action',
    'projects.subtitle': 'Our contributions',
    'projects.filter': 'Filter',
    'projects.all': 'All',
    'projects.viewDetails': 'View details',
    'projects.close': 'Close',
    'projects.learnMore': 'Learn more',
    'projects.noResults': 'No projects found for this category',
    'projects.footer': 'Discover our achievements and innovations',
    'projects.details.title': 'Description',
    'projects.type.project': 'Project',
    'projects.type.service': 'Service',
    'projects.type.document': 'Document',
    
    // Contact
    'contact.badge': 'Contact Us',
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Have a question? A suggestion? Don\'t hesitate to write to us, we will respond as soon as possible.',
    'contact.infoTitle': 'Contact Information',
    'contact.infoDescription': 'Our team is at your disposal to answer all your questions and assist you with your procedures.',
    'contact.address': 'Address',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.hours': 'Office Hours',
    'contact.weekdays': 'Monday - Friday',
    'contact.weekend': 'Saturday - Sunday',
    'contact.closed': 'Closed',
    'contact.formTitle': 'Send us a message',
    'contact.name': 'Full Name',
    'contact.namePlaceholder': 'Your name',
    'contact.emailPlaceholder': 'your.email@example.com',
    'contact.subject': 'Subject',
    'contact.subjectPlaceholder': 'Subject of your message',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Your message...',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.success': 'Your message has been sent successfully! We will respond as soon as possible.',
    
    // Footer
    'footer.ministries': 'Ministries',
    'footer.services': 'Services',
    'footer.links': 'Useful Links',
    'footer.rights': 'All rights reserved',
    'footer.presidency': 'Presidency of the Republic',
    'footer.interior': 'Interior and Decentralization',
    'footer.economy': 'Economy and Finance',
    'footer.education': 'National Education',
    'footer.health': 'Public Health',
    'footer.telecom': 'Posts and Telecommunications',
    'footer.digital': 'Digital Development',
    'footer.bank': 'Central Bank',
    'footer.edbm': 'EDBM',
    'footer.evisa': 'e-VISA',
    'footer.tourism': 'Tourism & Transport',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('site-language');
    return (saved as Language) || 'fr';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('site-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
