export interface Slide {
  id: number;
  image: string;
  titleKey: string;
  subtitleKey: string;
  link: string;
}

export interface Article {
  id: number;
  image: string;
  title: {
    fr: string;
    mg: string;
    en: string;
  };
  date: string;
  category: string;
  excerpt: {
    fr: string;
    mg: string;
    en: string;
  };
  type: 'news' | 'document' | 'service' | 'project';
}

export interface Stat {
  id: number;
  number: string;
  labelKey: string;
  icon: string;
}

export interface Project {
  id: number;
  image: string;
  title: {
    fr: string;
    mg: string;
    en: string;
  };
  category: {
    fr: string;
    mg: string;
    en: string;
  };
  description: {
    fr: string;
    mg: string;
    en: string;
  };
  type: 'project' | 'service' | 'document';
}

export const slides: Slide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
    titleKey: 'hero.slide1.title',
    subtitleKey: 'hero.slide1.subtitle',
    link: "#"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop",
    titleKey: 'hero.slide2.title',
    subtitleKey: 'hero.slide2.subtitle',
    link: "#"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=600&fit=crop",
    titleKey: 'hero.slide3.title',
    subtitleKey: 'hero.slide3.subtitle',
    link: "#"
  }
];

export const articles: Article[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
    title: {
      fr: "Cadre d'Interopérabilité",
      mg: "Rafitra Ifanakalozana",
      en: "Interoperability Framework"
    },
    date: "14 Nov, 2022",
    category: "Actualités",
    excerpt: {
      fr: "Actuellement, plusieurs enjeux, notamment sociaux, humains et économiques sont touchés par la transformation digitale dans le monde...",
      mg: "Ankehitriny, maro ny olana, indrindra ny ara-tsosialy, maha-olona ary ara-toekarena no voakasiky ny fiovana nomerika eto amin'izao tontolo izao...",
      en: "Currently, several issues, notably social, human and economic are affected by digital transformation worldwide..."
    },
    type: 'document'
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop",
    title: {
      fr: "Plateforme Vaksiny",
      mg: "Sehatra Vaksiny",
      en: "Vaksiny Platform"
    },
    date: "08 Sep, 2021",
    category: "Santé",
    excerpt: {
      fr: "Le MSANP avec la Présidence de la République procèdent à la réalisation des campagnes de vaccinations contre la COVID19...",
      mg: "Ny MSANP miaraka amin'ny Fiadidiana ny Repoblika dia manao fampielezan-kevitra momba ny vaksiny COVID19...",
      en: "The MSANP with the Presidency is conducting vaccination campaigns against COVID19..."
    },
    type: 'news'
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop",
    title: {
      fr: "X-ROAD : Interopérabilité sécurisée",
      mg: "X-ROAD: Ifanakalozana azo antoka",
      en: "X-ROAD: Secure Interoperability"
    },
    date: "31 Jul, 2021",
    category: "Technologie",
    excerpt: {
      fr: "XROAD est une plateforme open source qui offre un canal sécurisé aux institutions qui souhaitent partager des données...",
      mg: "XROAD dia sehatra open source izay manome fantsona azo antoka ho an'ny andrim-panjakana te hizara angona...",
      en: "XROAD is an open source platform that offers a secure channel for institutions wishing to share data..."
    },
    type: 'service'
  }
];

export const stats: Stat[] = [
  { id: 1, number: "3 084 411", labelKey: 'stats.beneficiaries', icon: 'users' },
  { id: 2, number: "5 750", labelKey: 'stats.certificates', icon: 'file' },
  { id: 3, number: "11", labelKey: 'stats.products', icon: 'package' },
  { id: 4, number: "13", labelKey: 'stats.services', icon: 'briefcase' }
];

export const projects: Project[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    title: {
      fr: "PROTOTYPEO",
      mg: "PROTOTYPEO",
      en: "PROTOTYPEO"
    },
    category: {
      fr: "Concours",
      mg: "Fifaninana",
      en: "Competition"
    },
    description: {
      fr: "Concours de prototypage UX/UI pour élaborer un prototype de service public",
      mg: "Fifaninana prototypage UX/UI hamoronana sary serivisy",
      en: "UX/UI prototyping competition to create a public service prototype"
    },
    type: 'project'
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=300&fit=crop",
    title: {
      fr: "ORINASA",
      mg: "ORINASA",
      en: "ORINASA"
    },
    category: {
      fr: "Services",
      mg: "Serivisy",
      en: "Services"
    },
    description: {
      fr: "Plateforme de création d'entreprise en ligne",
      mg: "Sehatra famoronana orinasa an-tserasera",
      en: "Online business creation platform"
    },
    type: 'service'
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop",
    title: {
      fr: "Documents de Référence",
      mg: "Antontan-taratasy Fanamarihana",
      en: "Reference Documents"
    },
    category: {
      fr: "Normes",
      mg: "Fenitra",
      en: "Standards"
    },
    description: {
      fr: "Stratégie pour améliorer la gestion des recettes et l'accès aux services",
      mg: "Paikady hanatsarana ny fitantanana vola miditra sy ny fidirana amin'ny serivisy",
      en: "Strategy to improve revenue management and access to services"
    },
    type: 'document'
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    title: {
      fr: "Torolalana",
      mg: "Torolalana",
      en: "Torolalana"
    },
    category: {
      fr: "Portail",
      mg: "Vavahady",
      en: "Portal"
    },
    description: {
      fr: "Le portail des services publics pour trouver les services gouvernementaux",
      mg: "Ny vavahadin'ny serivisy hitady ny serivisy governemanta",
      en: "The public services portal to find government services"
    },
    type: 'service'
  }
];

export const searchableContent = [
  ...articles.map(a => ({ ...a, searchType: 'article' as const })),
  ...projects.map(p => ({ ...p, searchType: 'project' as const })),
];
