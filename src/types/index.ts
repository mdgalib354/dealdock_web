export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  type: 'user' | 'business';
  savedOffers: string[];
  followedBrands: string[];
  joinedAt: Date;
}

export interface Business extends User {
  type: 'business';
  description: string;
  website?: string;
  category: string;
  verified: boolean;
  totalOffers: number;
  followers: number;
}

export interface Offer {
  id: string;
  businessId: string;
  businessName: string;
  businessAvatar: string;
  productName: string;
  description: string;
  image: string;
  originalPrice: number;
  discountPrice: number;
  discountPercentage: number;
  category: string;
  tags: string[];
  ratings: Rating[];
  averageRating: number;
  comments: Comment[];
  saves: number;
  createdAt: Date;
  expiresAt?: Date;
  userRating?: number;
  isSaved: boolean;
}

export interface Rating {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  review?: string;
  createdAt: Date;
}

export interface Story {
  id: string;
  businessId: string;
  businessName: string;
  businessAvatar: string;
  image: string;
  title: string;
  createdAt: Date;
  viewed: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'audio' | 'video';
  fileName?: string;
  fileSize?: number;
  fileUrl?: string;
  createdAt: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'new_offer' | 'rating' | 'comment' | 'follow' | 'message';
  title: string;
  message: string;
  data?: any;
  read: boolean;
  createdAt: Date;
}

export interface FilterState {
  category: string;
  priceRange: [number, number];
  brands: string[];
  sortBy: 'newest' | 'discount' | 'popular';
}