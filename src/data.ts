export interface Product {
  id: string;
  name: string;
  culture: 'Yoruba' | 'Hausa' | 'Igbo';
  fabricType: string;
  price: number;
  image: string;
  colorHex: string;
  description: string;
  details: string[];
}

export interface CultureShowcase {
  name: 'Yoruba' | 'Hausa' | 'Igbo';
  fabric: string;
  apparelInfo: string;
  headwear: string;
  accentColor: string;
  textColor: string;
  borderColor: string;
  image: string;
  philosophy: string;
  customs: string[];
}

export interface OccasionGuide {
  id: string;
  name: string;
  description: string;
  yorubaStyle: string;
  hausaStyle: string;
  igboStyle: string;
  culturalEtiquette: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  city: string;
  rating: number;
  avatarSeed: string;
}

export const CULTURE_SHOWCASE: CultureShowcase[] = [
  {
    name: 'Yoruba',
    fabric: 'Aso-Oke & Adire',
    apparelInfo: 'Agbada (grand flowing robe), Buba (blouse) & Iro (wrapper)',
    headwear: 'Gele (ornate headtie) & Fila (cap)',
    accentColor: '#C4581F', // Burnt Terracotta
    textColor: 'text-terracotta',
    borderColor: 'border-terracotta',
    image: '/src/assets/images/yoruba_culture_1781348638259.jpg',
    philosophy: 'Demonstrating status, balance, and visual royalty. "Àṣà" translates directly to culture, style, and deliberate elegance.',
    customs: ['Gele tilting conveys marital status', 'Agbada folds require hand gestures of respect', 'Adire uses natural indigo mud-resist dyeing']
  },
  {
    name: 'Hausa',
    fabric: 'Premium Brocade & Cotton',
    apparelInfo: 'Babbar Riga (grand robe with massive sleeves) & Kaftans',
    headwear: 'Hula (embroidered cap) & Alasho (turban)',
    accentColor: '#D4A843', // Woven Gold
    textColor: 'text-woven-gold',
    borderColor: 'border-woven-gold',
    image: '/src/assets/images/hausa_culture_1781348652777.jpg',
    philosophy: 'Understated mathematical geometry, grand volume, and fine thread craftsmanship. Symbolizes strength, modesty, and Northern dignity.',
    customs: ['Intricate geometric chest embroidery protects against spirits', 'Turban wraps vary by title and lineage', 'Babariga grand drape represents authority']
  },
  {
    name: 'Igbo',
    fabric: 'Isiagu Velvet & George',
    apparelInfo: 'Isiagu Tunic (lion head patterns) & custom George wrappers',
    headwear: 'Okpu Agu (stripy lion cap) & Eze Red Chieftain Cap',
    accentColor: '#2D5A27', // Forest Green
    textColor: 'text-forest-green',
    borderColor: 'border-forest-green',
    image: '/src/assets/images/igbo_culture_1781348670224.jpg',
    philosophy: 'Strength, independent accomplishment, and robust color. Commemorates community titles, ancestors, and lineage success ("Omenala").',
    customs: ['Isiagu is traditionally conferred with title deeds', 'Coral beads are heirloom markers of noble family ancestry', 'Eagle feathers denote high integrity and leadership status']
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Eko Royale Agbada',
    culture: 'Yoruba',
    fabricType: 'Hand-loomed Silk Aso-Oke',
    price: 350000,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
    colorHex: '#1A1040', // Deep Indigo custom styling
    description: 'A majestic grand agbada tailored from custom double-weave Aso-Oke. Deep royal indigo base with burnt terracotta embroidery.',
    details: ['Premium 4-piece set: Agbada, Buba shirt, Sokoto trousers, and embroidered Fila cap.', '120 hours of high-precision manual loomed weaving.', 'Intricate classic Yoruba geometric embroidery motifs.']
  },
  {
    id: 'prod-2',
    name: 'Arewa Embroidered Kaftan',
    culture: 'Hausa',
    fabricType: 'Egyptian Brocade Cotton',
    price: 185000,
    image: 'https://images.unsplash.com/photo-1607823014134-82ab870c29b6?auto=format&fit=crop&w=600&q=80',
    colorHex: '#D4A843', // Gold Accent
    description: 'Finely-tailored minimalist kaftan with bespoke Northern geometric embroidery along the placard and cuffs.',
    details: ['Includes matching fitted trousers.', '100% long-staple cotton with a natural satin sheen.', 'Resistant to creasing, perfect for high-society events.']
  },
  {
    id: 'prod-3',
    name: 'Igwe Isiagu Suit',
    culture: 'Igbo',
    fabricType: 'Plush Royal Velvet',
    price: 240000,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    colorHex: '#2D5A27', // Forest Green Accent
    description: 'A modern double-breasted suit incorporating heritage gold-stilled lion-head Isiagu buttons and lapel trim.',
    details: ['Double-vented custom tailor fit.', 'Accented with traditional Igbo coral bead pin accessory.', 'Features full satin lining for maximum comfort in warm climates.']
  },
  {
    id: 'prod-4',
    name: 'Iyawo Bridal Gele Set',
    culture: 'Yoruba',
    fabricType: 'Metallic Thread Aso-Oke',
    price: 150000,
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=600&q=80',
    colorHex: '#C4581F', // Terracotta Accent
    description: 'An ethereal terracotta and woven gold bridal bundle including customized pre-folded or raw-cloth Gele and matching double-width wrap.',
    details: ['Easy-to-wrap structure with rigid support material.', 'Features hand-beaded borders and Yoruba royal metallic shimmer.', 'Comes in a signature protective Àṣà Couture keepsake box.']
  },
  {
    id: 'prod-5',
    name: 'Daura Gold Babariga',
    culture: 'Hausa',
    fabricType: 'Bespoke Silk Jacquard',
    price: 420000,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    colorHex: '#D4A843', // Woven Gold Accent
    description: 'The epitome of Northern opulence. A brilliant ivory white Babbar Riga flowing robe decorated with dense woven gold threads.',
    details: ['Heavy drapes with wide sleeves that catch the wind elegantly.', 'Made from silk-blend Jacquard that maintains structured shoulders.', 'Historically styled motif celebrating the ancient Daura horse-riding cavalries.']
  },
  {
    id: 'prod-6',
    name: 'Obi George Wrapper Set',
    culture: 'Igbo',
    fabricType: 'Embroidered George Silk',
    price: 290000,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
    colorHex: '#2D5A27', // Forest Green Accent
    description: 'Exquisite heavy George fabric wrapper paired with a masterfully styled forest-green velvet blouse with matching gold motifs.',
    details: ['2-piece wrapper length (5 yards) and pre-sliced blouse yardage.', 'Decorated with premium gold zardozi stitching and scalloped lace borders.', 'Hand-tied bead fringe detail along the wrapper hem.']
  }
];

export const OCCASION_GUIDE: OccasionGuide[] = [
  {
    id: 'weddings',
    name: 'Weddings',
    description: 'The ultimate showcase of heritage. Nigerian traditional weddings (e.g. Yoruba Engagement, Hausa Fatihah, Igbo Igba Nkwu) are high-fashion celebrations demanding top-tier custom textile grandeur.',
    yorubaStyle: 'Agbada for grooms and matching family "Aṣọ-Ẹbí" fabric sets in rich terracotta. Brides wear heavy hand-beaded Gele ties which frame the face like a golden halo.',
    hausaStyle: 'Grooms wear the immaculate white Babbar Riga with gold hula cap. Brides wear sophisticated silk kaftans, rich lace wrappers, and matching colored silk veils ("Lafiaya").',
    igboStyle: 'Brides wear the vibrant George wrapper and high gold blouses wrapped with royal coral beads ("Ighalo"). Grooms wear tailored Isiagu jackets with pristine white trousers and red caps.',
    culturalEtiquette: 'Your attire should match the family color theme (Aṣọ-Ẹbí) to show respect. Brighter, richer colors symbolize prayers for the happy couple\'s fertility and prosperity.'
  },
  {
    id: 'naming',
    name: 'Naming Ceremonies',
    description: 'A sacred event of naming the newborn child, usually held exactly eight days after birth. Focus is placed on purity, joy, and transition.',
    yorubaStyle: 'White or cream adire and soft buba/iro sets representing premium purity and clean new beginnings (Awọ funfun). Light brown fila hats.',
    hausaStyle: 'Comfortable hand-loomed light blue or white kaftans with minimal geometric embroidery around the neck.',
    igboStyle: 'Soft cotton wrappers or structured white Isiagu tunics with lighter lion prints and lightweight matching jewelry.',
    culturalEtiquette: 'Avoid wearing pitch black or gloomy dark clothing, as it is viewed as culturally inappropriate for welcoming a fresh soul.'
  },
  {
    id: 'chieftaincy',
    name: 'Chieftaincy induction',
    description: 'Conferring a structural community leadership title. High prestige, strictly governed by severe ancestral dress codes, velvet texture, and royal emblems.',
    yorubaStyle: 'Traditional indigo-dyed hand-spooled "Alari" or "Sanyan" Aso-Oke agbada draped majestically over the shoulder.',
    hausaStyle: 'Thick layered robes consisting of triple babariga garments, finished with an Alasho blue/white face-wrapping turban and staff.',
    igboStyle: 'The high-consecrated Isiagu velvet tunic paired with real red chieftain feathers, heavy double-layered coral beads, and hand-held chieftain fan ("Agu").',
    culturalEtiquette: 'Certain beads and feathers are strictly forbidden unless the title has been officially conferred by a sovereign King (Oba, Emir, or Obi).'
  },
  {
    id: 'casual',
    name: 'Casual Occasions',
    description: 'Sleek, lightweight attire for luxury Sunday brunches, art gallery openings, or family reunions where you want to wear your heritage casually.',
    yorubaStyle: 'Adire cotton lightweight tailored short-sleeve shirts or modern structured shifts with slip-on leather footwear.',
    hausaStyle: 'Fitted smart kaftans with simple, clean thin-line monochrome embroidery on linen.',
    igboStyle: 'Modern collarless linen shirts with single discrete lion-head brass button motifs or patterned wrapper scarves.',
    culturalEtiquette: 'Blend cotton and breathable linen with cultural details like hand-dyed adire collars to showcase lineage heritage on a daily basis.'
  },
  {
    id: 'festivals',
    name: 'Cultural Festivals',
    description: 'Grand communal festivals (such as Yoruba Osun-Osogbo, Hausa Durbar, or Igbo New Yam Festival - Iri Ji) celebrating deities, harvest, and historical wars.',
    yorubaStyle: 'Vibrant custom indigo and terracota "Ereko" adire robes accompanied by shell necklaces and traditional hand-woven fans.',
    hausaStyle: 'Richly patterned riding robes, custom heavy geometric hula caps, and layered riding robes reminiscent of ancient Emirs.',
    igboStyle: 'Rich forest-green traditional wrappers, elaborate okpu agu caps of tiger stripes, and raw leopard prints celebrating ancestral hunters.',
    culturalEtiquette: 'Loud, rhythm-making brass accents, moving beads, and structured garments that participate beautifully in visual dance rituals.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    quote: "The weight of the Eko Royale Agbada is unmatched. When I wore it to our daughter's wedding in London, the deep indigo and terracota weave drew gasps of admiration from everyone. It felt like carrying generations of Yoruba royal history on my shoulders.",
    author: "Chief Olumide Awosika",
    city: "Lagos, Nigeria",
    rating: 5,
    avatarSeed: "olumide"
  },
  {
    id: 't-2',
    quote: "Àṣà Couture's attention to Northern embroidery is stunning. The gold patterns are mathematically precise, just like my father's old hand-woven garments. The fit is superb, retaining its architectural silhouette while remaining incredibly cool.",
    author: "Aminu Katsina",
    city: "Abuja, Nigeria",
    rating: 5,
    avatarSeed: "aminu"
  },
  {
    id: 't-3',
    quote: "I ordered the Obi George set for my chieftaincy induction in Enugu. The green George silk and zardozi scalloped border are of museum quality. They truly understand Omenala—customary heritage translated into functional high fashion.",
    author: "Lolo Beatrice Nwachukwu",
    city: "Enugu, Nigeria",
    rating: 5,
    avatarSeed: "beatrice"
  }
];
