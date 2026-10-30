export const ART_CATEGORIES = [
  'All',
  'Ethiopian Heritage',
  'Logos & Badges',
  'Typography & Quotes',
  'Illustrations & Pop',
  'Corporate & Stamps',
  'Coffee & Buna'
];

export const ART_PRESETS = [
  {
    id: 'art-buna',
    title: 'Ethiopian Jebena (Buna Ceremony)',
    category: 'Coffee & Buna',
    tags: ['coffee', 'buna', 'ethiopia', 'tradition', 'jebena', 'pot'],
    // High-contrast clean vector illustration as data URI / SVG
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 15 C45 22 43 32 47 38 C32 42 22 55 24 72 C26 84 38 90 50 90 C62 90 74 84 76 72 C78 55 68 42 53 38 C57 32 55 22 50 15 Z" fill="currentColor"/>
      <path d="M48 8 C47 12 53 12 52 16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M26 50 C12 55 12 75 25 78" stroke="currentColor" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M72 48 C85 45 88 35 78 28" stroke="currentColor" stroke-width="3" stroke-linecap="round" fill="none"/>
      <circle cx="50" cy="65" r="8" fill="#F59E0B"/>
    </svg>`,
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80',
    description: 'Traditional Ethiopian Jebena clay pot silhouette with coffee aroma'
  },
  {
    id: 'art-lion',
    title: 'Lion of Judah Crest',
    category: 'Ethiopian Heritage',
    tags: ['lion', 'judah', 'ethiopia', 'heritage', 'king', 'crest'],
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 12 L54 22 L65 24 L57 32 L59 42 L50 36 L41 42 L43 32 L35 24 L46 22 Z" fill="#F59E0B"/>
      <circle cx="50" cy="54" r="28" stroke="currentColor" stroke-width="3"/>
      <path d="M40 45 C42 40 46 38 50 38 C54 38 58 40 60 45" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="43" cy="50" r="3" fill="currentColor"/>
      <circle cx="57" cy="50" r="3" fill="currentColor"/>
      <path d="M50 56 L47 62 L53 62 Z" fill="currentColor"/>
      <path d="M44 68 C47 71 53 71 56 68" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M30 40 C24 48 24 64 32 74 M70 40 C76 48 76 64 68 74" stroke="currentColor" stroke-width="2" stroke-dasharray="2 3"/>
    </svg>`,
    url: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=500&q=80',
    description: 'Iconic Ethiopian Lion symbol with crown of strength'
  },
  {
    id: 'art-addis-skyline',
    title: 'Addis Ababa Modern Skyline',
    category: 'Ethiopian Heritage',
    tags: ['addis', 'ababa', 'city', 'skyline', 'buildings', 'urban'],
    svg: `<svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="25" width="12" height="30" fill="currentColor"/>
      <rect x="25" y="15" width="16" height="40" fill="currentColor"/>
      <polygon points="33,5 28,15 38,15" fill="currentColor"/>
      <rect x="44" y="20" width="14" height="35" fill="currentColor"/>
      <rect x="61" y="10" width="18" height="45" fill="currentColor"/>
      <rect x="82" y="28" width="10" height="27" fill="currentColor"/>
      <line x1="5" y1="56" x2="95" y2="56" stroke="currentColor" stroke-width="2.5"/>
    </svg>`,
    url: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=500&q=80',
    description: 'Contemporary skyline silhouette of Addis Ababa'
  },
  {
    id: 'art-stamp-seal',
    title: 'Official Approved Seal Ring',
    category: 'Corporate & Stamps',
    tags: ['seal', 'stamp', 'approved', 'official', 'verified', 'company'],
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="44" stroke="currentColor" stroke-width="3"/>
      <circle cx="50" cy="50" r="38" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/>
      <path d="M22 50 L78 50" stroke="currentColor" stroke-width="2"/>
      <text x="50" y="44" font-size="9" font-weight="900" text-anchor="middle" fill="currentColor" letter-spacing="2">APPROVED</text>
      <text x="50" y="62" font-size="7" font-weight="700" text-anchor="middle" fill="currentColor" letter-spacing="1">ETHIO-PRINT PLC</text>
      <circle cx="50" cy="24" r="3" fill="currentColor"/>
      <circle cx="50" cy="76" r="3" fill="currentColor"/>
    </svg>`,
    url: '',
    description: 'Professional notary and company corporate validation stamp seal'
  },
  {
    id: 'art-quote-hustle',
    title: 'Creative Minds Typography',
    category: 'Typography & Quotes',
    tags: ['quote', 'typography', 'creative', 'design', 'text', 'badge'],
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="8" width="84" height="84" rx="10" stroke="currentColor" stroke-width="3"/>
      <text x="50" y="36" font-size="12" font-weight="900" text-anchor="middle" fill="currentColor" letter-spacing="1">CREATE</text>
      <text x="50" y="52" font-size="8" font-style="italic" text-anchor="middle" fill="#F59E0B">WITHOUT</text>
      <text x="50" y="70" font-size="13" font-weight="900" text-anchor="middle" fill="currentColor" letter-spacing="2">LIMITS</text>
    </svg>`,
    url: '',
    description: 'Modern boxed typographic badge for t-shirts & stickers'
  },
  {
    id: 'art-amharic-selam',
    title: 'ሰላም (Selam / Peace)',
    category: 'Ethiopian Heritage',
    tags: ['selam', 'peace', 'amharic', 'geez', 'ethiopia'],
    svg: `<svg viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="50" y="36" font-size="28" font-family="'Noto Sans Ethiopic', sans-serif" font-weight="bold" text-anchor="middle" fill="currentColor">ሰላም</text>
      <line x1="20" y1="44" x2="80" y2="44" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
    url: '',
    description: 'Artistic Ge\'ez calligraphy of Peace (ሰላም)'
  },
  {
    id: 'art-vintage-camera',
    title: 'Vintage Retro Camera',
    category: 'Illustrations & Pop',
    tags: ['camera', 'photo', 'vintage', 'retro', 'hipster'],
    svg: `<svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="20" width="70" height="50" rx="8" stroke="currentColor" stroke-width="3"/>
      <rect x="35" y="10" width="30" height="10" rx="2" stroke="currentColor" stroke-width="2.5"/>
      <circle cx="50" cy="45" r="18" stroke="currentColor" stroke-width="3"/>
      <circle cx="50" cy="45" r="9" fill="currentColor"/>
      <circle cx="26" cy="30" r="3.5" fill="currentColor"/>
    </svg>`,
    url: '',
    description: 'Minimalist line-art vintage camera for stickers and apparel'
  },
  {
    id: 'art-coffee-heart',
    title: 'Buna First, Work Later',
    category: 'Coffee & Buna',
    tags: ['coffee', 'mug', 'cup', 'heart', 'morning', 'buna'],
    svg: `<svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 25 L75 25 C75 55 65 65 50 65 C35 65 25 55 25 25 Z" stroke="currentColor" stroke-width="3" fill="none"/>
      <path d="M75 32 C84 32 87 45 74 48" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M50 36 C47 32 42 32 42 37 C42 43 50 48 50 48 C50 48 58 43 58 37 C58 32 53 32 50 36 Z" fill="#EF4444"/>
      <path d="M40 16 C42 12 40 8 42 4 M50 18 C52 14 50 9 52 4 M60 17 C62 13 60 8 62 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
    url: '',
    description: 'Charming coffee cup with steam heart, ideal for custom mugs'
  }
];

export const ONLINE_SEARCH_SUGGESTIONS = [
  {
    query: 'Coffee',
    results: [
      { id: 'uns-1', title: 'Fresh Roasted Beans', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80' },
      { id: 'uns-2', title: 'Steaming Cappuccino Latte Art', url: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80' },
      { id: 'uns-3', title: 'Minimalist Coffee Bean Pattern', url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=600&q=80' },
    ]
  },
  {
    query: 'Ethiopia',
    results: [
      { id: 'uns-4', title: 'Traditional Ethiopian Colors', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80' },
      { id: 'uns-5', title: 'Simien Mountains Nature', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
      { id: 'uns-6', title: 'Addis Evening Skyline Lights', url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=600&q=80' }
    ]
  },
  {
    query: 'Logo & Typography',
    results: [
      { id: 'uns-7', title: 'Geometric Minimalist Icon', url: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=600&q=80' },
      { id: 'uns-8', title: 'Neon Abstract Wave', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80' },
      { id: 'uns-9', title: 'Monochrome Badge Texture', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80' }
    ]
  }
];

export const FONT_OPTIONS = [
  { id: 'sans', name: 'Clean Sans (Inter)', css: 'font-sans', fallback: 'sans-serif' },
  { id: 'display', name: 'Bold Athletic (Bebas)', css: 'font-display', fallback: "'Bebas Neue', sans-serif" },
  { id: 'stamp', name: 'Official Notary (Cinzel)', css: 'font-stamp', fallback: "'Cinzel', serif" },
  { id: 'script', name: 'Casual Script (Pacifico)', css: 'font-script', fallback: "'Pacifico', cursive" },
  { id: 'ethiopic', name: 'Ge\'ez / Amharic (Noto)', css: 'font-ethiopic', fallback: "'Noto Sans Ethiopic', sans-serif" },
];
