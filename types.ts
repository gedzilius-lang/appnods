
export enum Tab {
  Home = 'Home',
  Radio = 'Radio',
  Network = 'Network',
  Profile = 'Profile',
}

export enum UserRole {
  Guest = 'Guest',
  DoorOps = 'Door Ops',
  BarTerminal = 'Bar Terminal',
  VenueAdmin = 'Venue Admin',
  NiteAdmin = 'NiteAdmin',
}

export interface User {
  id: number;
  role: UserRole;
  nickname: string;
  globalLevel: string;
  xp: number;
  ncBalance: number;
  avatarUrl: string;
  friends: Friend[];
  currentVenueId?: number;
}

export interface Friend {
  id: number;
  nickname: string;
  avatarUrl: string;
  status: 'Online' | 'Offline' | 'In Node';
  location?: string;
}

export interface Venue {
  id: number;
  name: string;
  brandColor: string;
  location: string;
  activeGuests: number;
  capacity: number;
  secretItems: Product[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  vendorName: string;
  description: string;
  isSecret?: boolean;
  requiredLevel?: number;
  limitedEdition?: boolean;
}

export interface SystemLog {
  id: string;
  type: 'NC_MINT' | 'NODE_SYNC' | 'USER_CHECKIN' | 'XP_AWARD';
  message: string;
  timestamp: Date;
}

export enum NetworkSubTab {
  Chat = 'Chat',
  Magazine = 'Magazine',
  News = 'News',
}

export interface ChatMessage {
  id: number;
  author: {
    nickname: string;
    avatarUrl: string;
  };
  content: string;
  timestamp: string;
}

export interface Article {
  id: number;
  title: string;
  source: string;
  excerpt: string;
  link: string;
}

export interface NewsItem {
  id: number;
  title: string;
  source: string;
  timestamp: string;
  link: string;
}

/** Fix: Added missing ChartDataPoint interface for dashboard visualizations */
export interface ChartDataPoint {
  name: string;
  value: number;
}

/** Fix: Added missing Event interface for club events */
export interface Event {
  id: number;
  clubId: number;
  title: string;
  venue: string;
  date: string;
}

/** Fix: Added missing ForumPost interface for community discussions */
export interface ForumPost {
  id: number;
  author: {
    nickname: string;
    avatarUrl: string;
  };
  topic: string;
  content: string;
  timestamp: string;
}

/** Fix: Added missing Guest enums and interfaces for guestlist management */
export enum GuestStatus {
  Pending = 'Pending',
  CheckedIn = 'Checked In',
  VIP = 'VIP',
}

export interface Guest {
  id: number;
  name: string;
  plusOnes: number;
  checkInTime?: string;
  status: GuestStatus;
}

/** Fix: Added missing Transaction interface for financial logs */
export interface Transaction {
  id: number;
  timestamp: string;
  cardHolder: string;
  location: string;
  description: string;
  value?: number;
}
