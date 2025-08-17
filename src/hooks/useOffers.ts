import { useState, useEffect } from 'react';
import { Offer, FilterState, Story } from '../types';

// Mock data for offers
const mockOffers: Offer[] = [
  {
    id: '1',
    businessId: 'tech-store',
    businessName: 'TechStore Inc.',
    businessAvatar: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100',
    productName: 'iPhone 15 Pro Max',
    description: 'Latest iPhone with advanced camera system and titanium design. Perfect for professionals and tech enthusiasts.',
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800',
    originalPrice: 1199,
    discountPrice: 999,
    discountPercentage: 17,
    category: 'Electronics',
    tags: ['smartphone', 'apple', 'premium'],
    ratings: [
      {
        id: '1',
        userId: 'user1',
        userName: 'John Doe',
        userAvatar: 'https://images.pexels.com/photos/1367269/pexels-photo-1367269.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 5,
        review: 'Amazing deal! Great product quality.',
        createdAt: new Date('2024-01-15')
      },
      {
        id: '2',
        userId: 'user2',
        userName: 'Jane Smith',
        userAvatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 4,
        createdAt: new Date('2024-01-14')
      }
    ],
    averageRating: 4.5,
    comments: [],
    saves: 89,
    createdAt: new Date('2024-01-15'),
    userRating: undefined,
    isSaved: false
  },
  {
    id: '2',
    businessId: 'fashion-hub',
    businessName: 'Fashion Hub',
    businessAvatar: 'https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=100',
    productName: 'Designer Leather Jacket',
    description: 'Premium genuine leather jacket with modern cut. Perfect for fall and winter seasons.',
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
    originalPrice: 299,
    discountPrice: 199,
    discountPercentage: 33,
    category: 'Fashion',
    tags: ['jacket', 'leather', 'winter'],
    ratings: [
      {
        id: '3',
        userId: 'user3',
        userName: 'Mike Johnson',
        userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 4,
        review: 'Good quality leather, fits perfectly.',
        createdAt: new Date('2024-01-14')
      }
    ],
    averageRating: 4.0,
    comments: [],
    saves: 67,
    createdAt: new Date('2024-01-14'),
    userRating: 5,
    isSaved: false
  },
  {
    id: '3',
    businessId: 'home-decor',
    businessName: 'Home & Living',
    businessAvatar: 'https://images.pexels.com/photos/1599791/pexels-photo-1599791.jpeg?auto=compress&cs=tinysrgb&w=100',
    productName: 'Modern Coffee Table Set',
    description: 'Elegant glass-top coffee table with matching side tables. Perfect for modern living rooms.',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    originalPrice: 599,
    discountPrice: 399,
    discountPercentage: 33,
    category: 'Home & Garden',
    tags: ['furniture', 'coffee table', 'modern'],
    ratings: [],
    averageRating: 0,
    comments: [],
    saves: 45,
    createdAt: new Date('2024-01-13'),
    userRating: undefined,
    isSaved: true
  },
  {
    id: '4',
    businessId: 'sports-gear',
    businessName: 'Sports Central',
    businessAvatar: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=100',
    productName: 'Professional Running Shoes',
    description: 'High-performance running shoes with advanced cushioning technology. Perfect for marathons and daily training.',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
    originalPrice: 159,
    discountPrice: 99,
    discountPercentage: 38,
    category: 'Sports',
    tags: ['shoes', 'running', 'fitness'],
    ratings: [
      {
        id: '4',
        userId: 'user4',
        userName: 'Sarah Wilson',
        userAvatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 5,
        review: 'Best running shoes I\'ve ever owned!',
        createdAt: new Date('2024-01-12')
      }
    ],
    averageRating: 5.0,
    comments: [],
    saves: 78,
    createdAt: new Date('2024-01-12'),
    userRating: undefined,
    isSaved: false
  }
];

// Mock data for stories
const mockStories: Story[] = [
  {
    id: 's1',
    businessId: 'tech-store',
    businessName: 'TechStore Inc.',
    businessAvatar: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100',
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Flash Sale Today!',
    createdAt: new Date(),
    viewed: false
  },
  {
    id: 's2',
    businessId: 'fashion-hub',
    businessName: 'Fashion Hub',
    businessAvatar: 'https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=100',
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'New Collection',
    createdAt: new Date(),
    viewed: true
  },
  {
    id: 's3',
    businessId: 'home-decor',
    businessName: 'Home & Living',
    businessAvatar: 'https://images.pexels.com/photos/1599791/pexels-photo-1599791.jpeg?auto=compress&cs=tinysrgb&w=100',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Home Makeover',
    createdAt: new Date(),
    viewed: false
  },
  {
    id: 's4',
    businessId: 'sports-gear',
    businessName: 'Sports Central',
    businessAvatar: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=100',
    image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Fitness Tips',
    createdAt: new Date(),
    viewed: false
  }
];
export const useOffers = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    priceRange: [0, 2000],
    brands: [],
    sortBy: 'newest'
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOffers(mockOffers);
      setStories(mockStories);
      setLoading(false);
    }, 1000);
  }, []);

  const addRating = (offerId: string, rating: number, review?: string) => {
    const newRating = {
      id: Date.now().toString(),
      userId: 'current-user',
      userName: 'John Doe',
      userAvatar: 'https://images.pexels.com/photos/1367269/pexels-photo-1367269.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating,
      review,
      createdAt: new Date()
    };

    setOffers(prevOffers =>
      prevOffers.map(offer =>
        offer.id === offerId
          ? {
              ...offer,
              ratings: offer.userRating 
                ? offer.ratings.map(r => r.userId === 'current-user' ? { ...r, rating, review } : r)
                : [...offer.ratings, newRating],
              userRating: rating,
              averageRating: offer.userRating
                ? (offer.ratings.reduce((sum, r) => sum + (r.userId === 'current-user' ? rating : r.rating), 0)) / offer.ratings.length
                : (offer.ratings.reduce((sum, r) => sum + r.rating, 0) + rating) / (offer.ratings.length + 1)
            }
          : offer
      )
    );
  };

  const toggleSave = (offerId: string) => {
    setOffers(prevOffers =>
      prevOffers.map(offer =>
        offer.id === offerId
          ? {
              ...offer,
              isSaved: !offer.isSaved,
              saves: offer.isSaved ? offer.saves - 1 : offer.saves + 1
            }
          : offer
      )
    );
  };

  const addComment = (offerId: string, content: string) => {
    const newComment = {
      id: Date.now().toString(),
      userId: 'current-user',
      userName: 'John Doe',
      userAvatar: 'https://images.pexels.com/photos/1367269/pexels-photo-1367269.jpeg?auto=compress&cs=tinysrgb&w=100',
      content,
      createdAt: new Date()
    };

    setOffers(prevOffers =>
      prevOffers.map(offer =>
        offer.id === offerId
          ? {
              ...offer,
              comments: [...offer.comments, newComment]
            }
          : offer
      )
    );
  };

  const markStoryAsViewed = (storyId: string) => {
    setStories(prevStories =>
      prevStories.map(story =>
        story.id === storyId ? { ...story, viewed: true } : story
      )
    );
  };

  const addOffer = (newOffer: Omit<Offer, 'id' | 'createdAt' | 'ratings' | 'averageRating' | 'comments' | 'saves' | 'userRating' | 'isSaved'>) => {
    const offer: Offer = {
      ...newOffer,
      id: Date.now().toString(),
      createdAt: new Date(),
      ratings: [],
      averageRating: 0,
      comments: [],
      saves: 0,
      userRating: undefined,
      isSaved: false
    };

    setOffers(prevOffers => [offer, ...prevOffers]);
    return offer;
  };

  const filteredOffers = offers.filter(offer => {
    if (filters.category !== 'all' && offer.category !== filters.category) {
      return false;
    }
    if (offer.discountPrice < filters.priceRange[0] || offer.discountPrice > filters.priceRange[1]) {
      return false;
    }
    if (filters.brands.length > 0 && !filters.brands.includes(offer.businessName)) {
      return false;
    }
    return true;
  });

  return {
    offers,
    filteredOffers,
    stories,
    loading,
    filters,
    setFilters,
    addRating,
    toggleSave,
    addComment,
    markStoryAsViewed,
    addOffer
  };
};