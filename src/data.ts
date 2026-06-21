export interface Product {
  id: string;
  name: string;
  culture: 'Edo' | 'Hausa' | 'Igbo';
  fabricType: string;
  price: number;
  image: string;
  colorHex: string;
  description: string;
  details: string[];
}

export interface CultureShowcase {
  name: 'Edo' | 'Hausa' | 'Igbo';
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
  edoStyle: string;
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
    name: 'Edo',
    fabric: 'Igbulu & Premium Velvet',
    apparelInfo: 'Ewu-Ivie (beaded tunic) & plush traditional Igbulu royal wraps',
    headwear: 'Okuku (tall beaded hair crown) & red beaded caps',
    accentColor: '#9B111E', // Crimson Coral Red
    textColor: 'text-crimson-coral',
    borderColor: 'border-crimson-coral',
    image: '/src/assets/images/edo_culture_showcase_1782070613241.jpg',
    philosophy: 'Signifying ancient imperial majesty, dynasty status, and exquisite coral thread lock craftsmanship. Every bead represents ancestral blessing.',
    customs: ['Okuku crowns are hand-sewn directly into the hair', 'Ivie coral beads have high hereditary and spiritual value', 'Ewu-Ivie armor-style shirts are badges of high chieftaincy title']
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
    name: 'Oba Benin Royal Cape',
    culture: 'Edo',
    fabricType: 'Crimson Velvet & Hand-locked Coral Beads',
    price: 380000,
    image: '/src/assets/images/edo_royal_cape_1782070630839.jpg',
    colorHex: '#9B111E', // Crimson Coral Red
    description: 'A majestic royal cape tailored from high-pile crimson velvet, intricately adorned with hand-spooled real coral beads (Ivie) along the sleeves and borders.',
    details: ['Premium imperial set: Beaded cape, matching crimson velvet wrap, and beaded cap.', '90 hours of detailed artisan hand-beaded assembly.', 'Features ancestral Edo lineage floral or circular geometric border motifs.']
  },
  {
    id: 'prod-2',
    name: 'Arewa Embroidered Kaftan',
    culture: 'Hausa',
    fabricType: 'Egyptian Brocade Cotton',
    price: 185000,
    image: '/src/assets/images/hausa_kaftan_attire_1782071329758.jpg',
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
    image: '/src/assets/images/igbo_isiagu_suit_1782071344336.jpg',
    colorHex: '#2D5A27', // Forest Green Accent
    description: 'A modern double-breasted suit incorporating heritage gold-stilled lion-head Isiagu buttons and lapel trim.',
    details: ['Double-vented custom tailor fit.', 'Accented with traditional Igbo coral bead pin accessory.', 'Features full satin lining for maximum comfort in warm climates.']
  },
  {
    id: 'prod-4',
    name: 'Ivie Bridal Okuku Set',
    culture: 'Edo',
    fabricType: 'Polished Coral Bead & Silk Satin',
    price: 195000,
    image: '/src/assets/images/edo_bridal_okuku_1782070646439.jpg',
    colorHex: '#9B111E', // Crimson Coral Accent
    description: 'An iconic Edo bridal ensemble featuring the legendary Okuku hair crown constructed of premium coral bead arrays, plus tiered collars and wristbands.',
    details: ['Lightweight custom-fitted internal structure for the Okuku crown.', 'Includes layered tiered coral neck collars (Ivie-uru) and matching wrist bands.', 'Comes in a velvet-lined luxury preservation case for heritage keeping.']
  },
  {
    id: 'prod-5',
    name: 'Daura Gold Babariga',
    culture: 'Hausa',
    fabricType: 'Bespoke Silk Jacquard',
    price: 420000,
    image: '/src/assets/images/hausa_babariga_robe_1782071356379.jpg',
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
    image: '/src/assets/images/igbo_george_wrapper_1782071370805.jpg',
    colorHex: '#2D5A27', // Forest Green Accent
    description: 'Exquisite heavy George fabric wrapper paired with a masterfully styled forest-green velvet blouse with matching gold motifs.',
    details: ['2-piece wrapper length (5 yards) and pre-sliced blouse yardage.', 'Decorated with premium gold zardozi stitching and scalloped lace borders.', 'Hand-tied bead fringe detail along the wrapper hem.']
  }
];

export const OCCASION_GUIDE: OccasionGuide[] = [
  {
    id: 'weddings',
    name: 'Weddings',
    description: 'The ultimate showcase of heritage. Nigerian traditional weddings (e.g. Edo Engagement, Hausa Fatihah, Igbo Igba Nkwu) are high-fashion celebrations demanding top-tier custom textile grandeur.',
    edoStyle: 'Brides wear the magnificent Okuku beaded hair crown and rows of heavy Ivie neck coral beads. Grooms wear spectacular velvet wrappers with beaded shirts and caps.',
    hausaStyle: 'Grooms wear the immaculate white Babbar Riga with gold hula cap. Brides wear sophisticated silk kaftans, rich lace wrappers, and matching colored silk veils ("Lafiaya").',
    igboStyle: 'Brides wear the vibrant George wrapper and high gold blouses wrapped with royal coral beads ("Ighalo"). Grooms wear tailored Isiagu jackets with pristine white trousers and red caps.',
    culturalEtiquette: 'Your attire should match the family color theme (Ivie beads and velvet wrappers) to show respect. Brighter, richer colors symbolize prayers for the happy couple\'s fertility and prosperity.'
  },
  {
    id: 'naming',
    name: 'Naming Ceremonies',
    description: 'A sacred event of naming the newborn child, usually held exactly eight days after birth. Focus is placed on purity, joy, and transition.',
    edoStyle: 'Pristine white lace wrappers accented with a single strand of polished red coral beads, representing peace and longevity.',
    hausaStyle: 'Comfortable hand-loomed light blue or white kaftans with minimal geometric embroidery around the neck.',
    igboStyle: 'Soft cotton wrappers or structured white Isiagu tunics with lighter lion prints and lightweight matching jewelry.',
    culturalEtiquette: 'Avoid wearing pitch black or gloomy dark clothing, as it is viewed as culturally inappropriate for welcoming a fresh soul.'
  },
  {
    id: 'chieftaincy',
    name: 'Chieftaincy induction',
    description: 'Conferring a structural community leadership title. High prestige, strictly governed by severe ancestral dress codes, velvet texture, and royal emblems.',
    edoStyle: 'The majestic Ewu-Ivie (armor-style beaded tunic) worn over a premium cream or red Igbulu wrapper, finished with a heavy coral beaded staff.',
    hausaStyle: 'Thick layered robes consisting of triple babariga garments, finished with an Alasho blue/white face-wrapping turban and staff.',
    igboStyle: 'The high-consecrated Isiagu velvet tunic paired with real red chieftain feathers, heavy double-layered coral beads, and hand-held chieftain fan ("Agu").',
    culturalEtiquette: 'Certain beads and feathers are strictly forbidden unless the title has been officially conferred by a sovereign King (Oba, Emir, or Obi).'
  },
  {
    id: 'casual',
    name: 'Casual Occasions',
    description: 'Sleek, lightweight attire for luxury Sunday brunches, art gallery openings, or family reunions where you want to wear your heritage casually.',
    edoStyle: 'Light red linen shirts with hand-painted coral motif pocket details or lightweight bead bracelets.',
    hausaStyle: 'Fitted smart kaftans with simple, clean thin-line monochrome embroidery on linen.',
    igboStyle: 'Modern collarless linen shirts with single discrete lion-head brass button motifs or patterned wrapper scarves.',
    culturalEtiquette: 'Blend cotton and breathable linen with cultural details like handcrafted coral bead buttons to showcase lineage heritage on a daily basis.'
  },
  {
    id: 'festivals',
    name: 'Cultural Festivals',
    description: 'Grand communal festivals (such as Edo Igue Festival, Hausa Durbar, or Igbo New Yam Festival - Iri Ji) celebrating deities, harvest, and historical wars.',
    edoStyle: 'Vibrant Igue festival dress, featuring rich crimson velour wraps, extensive beaded chest armor overlays, and ceremonial bronze wristlets.',
    hausaStyle: 'Richly patterned riding robes, custom heavy geometric hula caps, and layered riding robes reminiscent of ancient Emirs.',
    igboStyle: 'Rich forest-green traditional wrappers, elaborate okpu agu caps of tiger stripes, and raw leopard prints celebrating ancestral hunters.',
    culturalEtiquette: 'Loud, rhythm-making brass accents, moving beads, and structured garments that participate beautifully in visual dance rituals.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    quote: "The weight of the Oba Benin Royal Cape is truly majestic. When I wore it to our daughter's wedding in London, the deep crimson velvet and dense coral bead embroidery drew gasps of admiration from everyone. It felt like walking with the regal elegance of the entire Benin kingdom.",
    author: "Chief Osaze Eghosa",
    city: "Benin City, Nigeria",
    rating: 5,
    avatarSeed: "osaze"
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
