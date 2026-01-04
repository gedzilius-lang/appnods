
import { User, UserRole, Venue, Product, SystemLog, Article, NewsItem, ChatMessage, Transaction, Guest, GuestStatus } from '../types';

export const mockUser: User = {
  id: 1,
  role: UserRole.Guest,
  nickname: 'SynthRider',
  globalLevel: 'A3 Scout',
  xp: 1250,
  ncBalance: 2450,
  avatarUrl: 'https://i.pravatar.cc/150?u=synth',
  friends: [
    { id: 2, nickname: 'GlitchGoddess', avatarUrl: 'https://i.pravatar.cc/150?u=glitch', status: 'In Node', location: 'Plaza Klub' },
    { id: 3, nickname: 'BassJunkie', avatarUrl: 'https://i.pravatar.cc/150?u=bass', status: 'Online' }
  ]
};

export const venues: Venue[] = [
  {
    id: 1,
    name: 'Plaza Klub',
    brandColor: '#ef4444',
    location: 'Zurich',
    activeGuests: 482,
    capacity: 600,
    secretItems: [
      { id: 101, name: 'Backstage Pass', price: 5000, vendorName: 'Plaza Exclusive', description: 'Access to the green room.', isSecret: true, requiredLevel: 5 },
      { id: 102, name: 'Vortex Cocktail', price: 25, vendorName: 'Mixology Lab', description: 'Served in a glowing vessel.', isSecret: true }
    ]
  },
  {
    id: 2,
    name: 'Hive',
    brandColor: '#fbbf24',
    location: 'Zurich',
    activeGuests: 312,
    capacity: 450,
    secretItems: []
  },
  {
    id: 3,
    name: 'Supermarket',
    brandColor: '#10b981',
    location: 'Zurich',
    activeGuests: 156,
    capacity: 300,
    secretItems: []
  }
];

export const niteMarketProducts: Product[] = [
  { id: 1, name: 'Mystery Rave Box', price: 450, vendorName: 'NiteOS Labs', description: 'Limited edition streetwear drops.', limitedEdition: true, requiredLevel: 1 },
  { id: 2, name: 'Skip-Line Passport', price: 1200, vendorName: 'NiteOS Global', description: 'Priority entry to all partner nodes.', requiredLevel: 3 },
  { id: 3, name: 'A9 Elite Tag', price: 300, vendorName: 'NiteOS Gear', description: 'Physical NFC tag with engraved Global ID.', requiredLevel: 5 }
];

export const initialLogs: SystemLog[] = [
  { id: '1', type: 'NODE_SYNC', message: 'NiteBox Zurich Central handshake successful.', timestamp: new Date() },
  { id: '2', type: 'NC_MINT', message: 'Minted 5000 NC for Venue: Plaza Klub.', timestamp: new Date() },
  { id: '3', type: 'USER_CHECKIN', message: 'A9 Elite User GlitchGoddess entered Plaza Node.', timestamp: new Date() }
];

export const staffIdentities: Record<UserRole, Partial<User>> = {
  [UserRole.Guest]: mockUser,
  [UserRole.BarTerminal]: { id: 400, role: UserRole.BarTerminal, nickname: 'Staff_Mixer_01' },
  [UserRole.DoorOps]: { id: 300, role: UserRole.DoorOps, nickname: 'Security_Z' },
  [UserRole.VenueAdmin]: { id: 500, role: UserRole.VenueAdmin, nickname: 'Plaza_Manager' },
  [UserRole.NiteAdmin]: { id: 600, role: UserRole.NiteAdmin, nickname: 'Architect' },
};

export const articles: Article[] = [
  { id: 1, title: 'The Future of Swiss Techno', source: 'Nite Magazine', excerpt: 'How the Zurich underground is evolving in 2027.', link: '#' },
  { id: 2, title: 'Top 5 Secret Nodes', source: 'Digital Nomad', excerpt: 'The best hidden venues for NiteOS elite members.', link: '#' }
];

export const newsItems: NewsItem[] = [
  { id: 1, title: 'Plaza Klub announces weekend lineup', source: 'Club Scene', timestamp: '2h ago', link: '#' },
  { id: 2, title: 'NiteCoin value spikes in digital markets', source: 'OS Financial', timestamp: '5h ago', link: '#' }
];

export const chatMessages: Record<string, ChatMessage[]> = {
  "What’s Tonight?": [
    { id: 1, author: { nickname: 'NeonPixie', avatarUrl: 'https://i.pravatar.cc/150?u=neon' }, content: 'Anyone going to Plaza tonight?', timestamp: '22:05' },
    { id: 2, author: { nickname: 'GlitchGoddess', avatarUrl: 'https://i.pravatar.cc/150?u=glitch' }, content: 'I will be there around midnight!', timestamp: '22:10' }
  ],
  "Lost & Found": [],
  "Saw You, But I Was Shy…": []
};

/** Fix: Added missing mock transactions data for the admin dashboard */
export const mockTransactions: Transaction[] = [
  { id: 1, timestamp: '23:45', cardHolder: 'SynthRider', location: 'Main Bar', description: '2x Club Mate', value: 12 },
  { id: 2, timestamp: '23:48', cardHolder: 'GlitchGoddess', location: 'VIP Lounge', description: 'Vortex Cocktail', value: 25 },
  { id: 3, timestamp: '23:52', cardHolder: 'BassJunkie', location: 'Main Bar', description: 'Entry Fee', value: 20 },
  { id: 4, timestamp: '23:55', cardHolder: 'NeonPixie', location: 'Side Bar', description: 'Water', value: 5 },
  { id: 5, timestamp: '00:02', cardHolder: 'TechnoTom', location: 'Main Bar', description: 'Vodka Soda', value: 18 },
];

/** Fix: Added missing mock guest list data for venue management */
export const mockGuestList: Guest[] = [
  { id: 1, name: 'Aline Müller', plusOnes: 1, status: GuestStatus.VIP, checkInTime: '22:30' },
  { id: 2, name: 'Kevin Schmidt', plusOnes: 0, status: GuestStatus.CheckedIn, checkInTime: '23:15' },
  { id: 3, name: 'Sarah Meyer', plusOnes: 2, status: GuestStatus.Pending },
  { id: 4, name: 'Marc Dubois', plusOnes: 0, status: GuestStatus.Pending },
  { id: 5, name: 'Elena Rossi', plusOnes: 1, status: GuestStatus.VIP },
];
