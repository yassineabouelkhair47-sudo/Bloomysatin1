export interface Product {
  id: string;
  name: string;
  flowers: number;
  /** null = "Prix sur devis" (placeholder élégant) */
  price: number | null;
  description: string;
  image: string;
  badge?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  occasion: string;
  text: string;
  rating: number;
}

export interface FaqItem {
  id: string;
  q: string;
  a: string;
}

export interface Pixels {
  meta: string;
  instagram: string;
  tiktok: string;
}

export interface Settings {
  whatsapp: string;
  email: string;
  instagram: string;
  deliveryPrice: string;
  deliveryInfo: string;
  brandDescription: string;
  adminPassword: string;
  pixels: Pixels;
  sync: {
    /** Lien du canal de synchronisation (vide = utiliser DEFAULT_SYNC_URL) */
    url: string;
    /** Token de mise à jour du canal (jsonblob) */
    token: string;
    /** Enregistrement automatique à chaque modification */
    autoSave: boolean;
  };
}

/* ---- Éléments éditables (CMS) ---- */

export interface IconItem {
  id: string;
  icon: string;
  title: string;
  text: string;
}

export interface StatItem {
  id: string;
  n: string;
  l: string;
}

export interface StepItem {
  id: string;
  title: string;
  text: string;
}

export interface HeadingData {
  eyebrow: string;
  title: string;
  accent: string;
  sub: string;
}

export interface ContentData {
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    support: string;
    ctaPrimary: string;
    ctaSecondary: string;
    rating: string;
    ratingLabel: string;
    image: string;
  };
  marquee: string[];
  trust: IconItem[];
  satisfaction: string;
  collections: HeadingData;
  occasions: HeadingData & { items: IconItem[] };
  benefits: HeadingData & { intro: string; script: string; stats: StatItem[]; items: IconItem[] };
  custom: {
    eyebrow: string;
    title: string;
    accent: string;
    sub: string;
    steps: StepItem[];
    cta: string;
    note: string;
    image: string;
    badge: string;
    badgeNote: string;
  };
  testimonialsSec: HeadingData;
  bestsellers: HeadingData & { features: string[]; tagTrio: string; tagQuatuor: string };
  faqSec: HeadingData & { helpTitle: string; helpText: string };
  instagramSec: { sub: string };
  finalCta: {
    script: string;
    title: string;
    accent: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
}

export interface StoreData {
  products: Product[];
  testimonials: Testimonial[];
  faq: FaqItem[];
  settings: Settings;
  content: ContentData;
}

export const defaultData: StoreData = {
  products: [
    {
      id: "p1",
      name: "Petit Pétale",
      flowers: 1,
      price: 10,
      description: "Une rose en satin, parfaite pour un petit geste délicat qui dit tout.",
      image: "/images/product-1.jpg",
    },
    {
      id: "p3",
      name: "Trio Satin",
      flowers: 3,
      price: 25,
      description: "Le bouquet intime, idéal pour surprendre au quotidien.",
      image: "/images/product-3.jpg",
      badge: "Le plus demandé",
    },
    {
      id: "p4",
      name: "Nuage",
      flowers: 4,
      price: 35,
      description: "Un nuage de satin, notre best-seller tendresse.",
      image: "/images/product-4.jpg",
      badge: "Coup de cœur",
    },
    {
      id: "p7",
      name: "Signature",
      flowers: 7,
      price: null,
      description: "Le bouquet signature : élégant, généreux, inoubliable.",
      image: "/images/product-7.jpg",
    },
    {
      id: "p12",
      name: "Jardin",
      flowers: 12,
      price: null,
      description: "Un bouquet plein de satin, pour marquer les esprits.",
      image: "/images/product-12.jpg",
    },
    {
      id: "p20",
      name: "Cérémonie",
      flowers: 20,
      price: null,
      description: "Le bouquet de cérémonie, majestueux et raffiné.",
      image: "/images/product-20.jpg",
    },
    {
      id: "p30",
      name: "Royale",
      flowers: 30,
      price: null,
      description: "L'exception, pensée pour les plus grands jours.",
      image: "/images/product-30.jpg",
    },
    {
      id: "p40",
      name: "Majesté",
      flowers: 40,
      price: null,
      description: "La déclaration XXL : un nuage de pétales éternels.",
      image: "/images/product-40.jpg",
    },
  ],
  testimonials: [
    {
      id: "t1",
      name: "Salma",
      city: "Marrakech",
      occasion: "Bouquet de mariée",
      text: "J'avais peur de la déception, mais mon bouquet de mariée était encore plus beau qu'en photo. Trois ans plus tard, il est toujours posé sur mon étagère, intact.",
      rating: 5,
    },
    {
      id: "t2",
      name: "Yasmine",
      city: "Casablanca",
      occasion: "Fiançailles",
      text: "Livraison à l'heure, emballage magnifique, et la couleur était exactement celle que j'avais demandée. Merci pour ces détails qui font toute la différence !",
      rating: 5,
    },
    {
      id: "t3",
      name: "Imane",
      city: "Rabat",
      occasion: "Anniversaire",
      text: "Je voulais un cadeau original pour ma sœur : les douze roses en satin l'ont rendue folle. Qualité irréprochable, on dirait de vraies fleurs.",
      rating: 5,
    },
    {
      id: "t4",
      name: "Ghita",
      city: "Tanger",
      occasion: "Diplôme",
      text: "Commande via WhatsApp super simple, réponse en cinq minutes, et un bouquet splendide livré le jour du repas de fin d'année. Je recommande les yeux fermés.",
      rating: 5,
    },
    {
      id: "t5",
      name: "Kenza",
      city: "Agadir",
      occasion: "Saint-Valentin",
      text: "Doux, romantique, et surtout rien à entretenir. Je repasserai certainement commander pour notre prochain anniversaire de rencontre.",
      rating: 5,
    },
    {
      id: "t6",
      name: "Nadia",
      city: "Fès",
      occasion: "Mariage",
      text: "Elles ont habillé tout notre mariage en satin : bouquets, boutonnières, centres de table. Zéro détail raté — tout le monde a demandé le nom de l'atelier.",
      rating: 5,
    },
  ],
  faq: [
    {
      id: "f1",
      q: "Comment commander ?",
      a: "Très simplement : cliquez sur « Commander » sur un bouquet (ou sur le bouton WhatsApp) et envoyez-nous votre demande. Nous confirmons votre commande et la livraison directement sur WhatsApp, ou vous pouvez nous écrire en message privé sur Instagram @bloomy_satin12.",
    },
    {
      id: "f2",
      q: "Où livrez-vous ?",
      a: "Partout au Maroc ! De Tanger à Dakhla, nous livrons vos bouquets dans toutes les villes via nos partenaires coursiers, avec un emballage soigné qui protège chaque pétale.",
    },
    {
      id: "f3",
      q: "Combien coûte la livraison ?",
      a: "La livraison varie selon votre ville et est confirmée avant tout paiement, directement sur WhatsApp. Une livraison express 24/48h est disponible dans la plupart des grandes villes.",
    },
    {
      id: "f4",
      q: "Peut-on personnaliser les couleurs ?",
      a: "Absolument. Vous pouvez choisir vos couleurs de satin (blush, ivoire, burgundy, bordeaux, crème, lavande…), la forme du bouquet et même ajouter une carte manuscrite. Dites-nous votre idée, nous la créons.",
    },
    {
      id: "f5",
      q: "Peut-on commander pour un mariage ou une cérémonie ?",
      a: "C'est notre spécialité ! Bouquets de mariée, boutonnières, centres de table, décorations… Pour les grandes dates, nous vous recommandons de commander 10 à 15 jours à l'avance afin de réserver votre créneau et personnaliser chaque détail.",
    },
    {
      id: "f6",
      q: "Combien de temps faut-il pour préparer une commande ?",
      a: "Chaque fleur est façonnée à la main : comptez 3 à 5 jours ouvrés pour un bouquet classique, et 7 à 10 jours pour les commandes personnalisées ou les mariages. Un besoin urgent ? Écrivez-nous, nous faisons notre maximum.",
    },
    {
      id: "f7",
      q: "Comment contacter Bloomy Satin ?",
      a: "Le plus rapide est WhatsApp : cliquez sur n'importe quel bouton « Commander » du site. Vous pouvez aussi nous écrire sur Instagram @bloomy_satin12 — nous répondons en général en quelques minutes.",
    },
  ],
  settings: {
    whatsapp: "212661234567",
    email: "hello@bloomysatin.ma",
    instagram: "bloomy_satin12",
    deliveryPrice: "20 – 40 DH selon votre ville",
    deliveryInfo: "Livraison partout au Maroc sous 24/48h via coursier partenaire, avec emballage cadeau soigné.",
    brandDescription:
      "Bloomy Satin est un atelier marocain de fleurs en satin façonnées à la main. Chaque bouquet est pensé, coupé et assemblé avec amour pour transformer vos moments en souvenirs éternels.",
    adminPassword: "bloomy2025",
    pixels: {
      meta: "",
      instagram: "",
      tiktok: "",
    },
    sync: {
      url: "",
      token: "",
      autoSave: false,
    },
  },
  content: {
    hero: {
      eyebrow: "Atelier de fleurs en satin · Maroc",
      title: "Des fleurs qui",
      accent: "ne fanent jamais.",
      support:
        "Des fleurs en satin faites à la main avec amour, pour transformer chaque moment spécial en un souvenir éternel.",
      ctaPrimary: "Commander maintenant",
      ctaSecondary: "Découvrir nos créations",
      rating: "4,9/5",
      ratingLabel: "plus de 500 clientes comblées partout au Maroc",
      image: "/images/hero.jpg",
    },
    marquee: [
      "Fait main avec amour",
      "Livraison partout au Maroc",
      "Commandes personnalisées",
      "Parfait pour vos grands jours",
      "Des fleurs éternelles",
      "4,9/5 — clientes comblées",
    ],
    trust: [
      { id: "tr1", icon: "scissors", title: "Fait main avec amour", text: "Chaque pétale est coupé et façonné à la main dans notre atelier." },
      { id: "tr2", icon: "truck", title: "Livraison partout au Maroc", text: "Toutes les villes, avec un emballage cadeau soigné." },
      { id: "tr3", icon: "palette", title: "Commandes personnalisées", text: "Couleurs, formats et compositions sur mesure." },
      { id: "tr4", icon: "calendarHeart", title: "Parfait pour vos grands jours", text: "Mariages, fiançailles, diplômes, surprises…" },
    ],
    satisfaction: "98% de clientes satisfaites — et 7 sur 10 recommandent déjà Bloomy Satin à leur entourage.",
    collections: {
      eyebrow: "Nos collections",
      title: "Choisissez",
      accent: "votre bouquet",
      sub: "Huit formats, un même soin : chaque fleur est coupée et façonnée à la main dans notre atelier. Les formats plus grands sont proposés sur devis.",
    },
    occasions: {
      eyebrow: "Tous vos grands jours",
      title: "Une occasion ?",
      accent: "la fleur qu'il faut.",
      sub: "Nos bouquets en satin se glissent dans les plus beaux moments de votre vie — et y restent, bien plus longtemps que de vraies fleurs.",
      items: [
        { id: "oc1", icon: "ring", title: "Mariages", text: "Bouquet de mariée, boutonnières et centres de table en satin." },
        { id: "oc2", icon: "sparkle", title: "Fiançailles", text: "Un bouquet intime pour dire oui avec élégance." },
        { id: "oc3", icon: "cake", title: "Anniversaires", text: "Un cadeau qui se garde des années entières." },
        { id: "oc4", icon: "cap", title: "Diplômes", text: "Félicitez-les avec une fleur qui dure." },
        { id: "oc5", icon: "heart", title: "Occasions romantiques", text: "Saint-Valentin, anniversaire de rencontre…" },
        { id: "oc6", icon: "gift", title: "Cadeaux", text: "Emballé avec une carte manuscrite, prêt à offrir." },
        { id: "oc7", icon: "sparkles", title: "Occasions spéciales", text: "Baptêmes, galas, surprises… tout est possible." },
      ],
    },
    benefits: {
      eyebrow: "Notre atelier",
      title: "Pourquoi choisir",
      accent: "Bloomy Satin ?",
      sub: "",
      intro:
        "Bloomy Satin est né d'une idée simple : offrir de la beauté qui ne se fanne pas. Dans notre atelier marocain, chaque rose en satin naît entre les doigts de nos artisanes — un pétale à la fois — pour habiller vos plus belles dates d'un éclat permanent.",
      script: "fait main, avec amour",
      stats: [
        { id: "st1", n: "500+", l: "bouquets offerts" },
        { id: "st2", n: "24/48h", l: "livraison express" },
        { id: "st3", n: "100%", l: "fait main au Maroc" },
      ],
      items: [
        { id: "b1", icon: "scissors", title: "Des fleurs 100% faites main", text: "Chaque pétale est coupé, plié et façonné à la main dans notre atelier — aucune deux roses ne se ressemblent." },
        { id: "b2", icon: "flower", title: "Des fleurs qui durent", text: "Pas d'eau, pas d'entretien : votre bouquet reste identique, année après année, saison après saison." },
        { id: "b3", icon: "gift", title: "Un cadeau élégant et original", text: "Le présent raffiné qui sort des sentiers battus — et qui surprend, toujours." },
        { id: "b4", icon: "palette", title: "Des bouquets personnalisables", text: "Couleurs, formes et compositions au plus près de votre idée et de vos couleurs de cœur." },
        { id: "b5", icon: "bow", title: "Des détails soignés", text: "Rubans de satin noués à la main, carte manuscrite et emballage cadeau travaillé dans les moindres détails." },
        { id: "b6", icon: "truck", title: "Livraison partout au Maroc", text: "De Tanger à Dakhla, votre bouquet est protégé et livré avec soin, en 24/48h dans les grandes villes." },
        { id: "b7", icon: "calendarHeart", title: "Pensé pour des moments inoubliables", text: "Mariage, fiançailles, diplôme, surprise : chaque instant devient un souvenir éternel." },
      ],
    },
    custom: {
      eyebrow: "Sur mesure",
      title: "Votre idée,",
      accent: "notre création.",
      sub: "Une couleur précise, une forme particulière, un bouquet de mariée assorti à votre tenue ? Décrivez-nous votre rêve — nous personnalisons couleurs, quantités, compositions et designs spéciaux pour votre occasion.",
      steps: [
        { id: "s1", title: "Dites-nous votre idée", text: "Couleurs, nombre de fleurs, forme, occasion… quelques mots suffisent pour nous inspirer." },
        { id: "s2", title: "Nous façonnons votre fleur", text: "Notre atelier crée votre bouquet à la main et vous envoie une photo avant expédition." },
        { id: "s3", title: "Nous livrons avec soin", text: "Emballé comme un cadeau et livré partout au Maroc, en temps et en heure." },
      ],
      cta: "Créer mon bouquet",
      note: "Réponse en général sous 24h · photo envoyée avant expédition",
      image: "/images/atelier.jpg",
      badge: "Sur mesure",
      badgeNote: "délai 7–10 jours",
    },
    testimonialsSec: {
      eyebrow: "Témoignages",
      title: "Elles nous font",
      accent: "confiance.",
      sub: "Des mots doux reçus de nos clientes, de Tanger à Dakhla.",
    },
    bestsellers: {
      eyebrow: "Les favoris",
      title: "Nos",
      accent: "best-sellers",
      sub: "Deux petits bouquets, deux grandes émotions : la porte d'entrée idéale vers les fleurs qui durent.",
      features: [
        "Roses façonnées à la main",
        "Ruban de satin noué à la main",
        "Carte manuscrite offerte",
        "Emballage cadeau soigné",
      ],
      tagTrio: "Le petit bonheur",
      tagQuatuor: "Le coup de foudre",
    },
    faqSec: {
      eyebrow: "On répond tout",
      title: "Questions",
      accent: "fréquentes",
      sub: "Commande, livraison, personnalisation… Tout ce qu'il faut savoir avant de craquer pour votre bouquet.",
      helpTitle: "Une autre question ?",
      helpText: "On répond en général en quelques minutes.",
    },
    instagramSec: {
      sub: "Derrière l'écran : nos ateliers, nos nouvelles couleurs et nos bouquets le jour J. Retrouvez-nous chaque semaine sur Instagram.",
    },
    finalCta: {
      script: "pour toujours",
      title: "Offrez des fleurs qui restent",
      accent: "pour toujours.",
      sub: "Découvrez nos créations en satin et choisissez le bouquet parfait pour votre prochaine occasion.",
      ctaPrimary: "Commander maintenant",
      ctaSecondary: "Nous contacter",
    },
  },
};
