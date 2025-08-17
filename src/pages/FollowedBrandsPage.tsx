import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, Search, Star, ExternalLink, MessageCircle, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock followed brands data
const mockFollowedBrands = [
  {
    id: 'tech-store',
    name: 'TechStore Inc.',
    avatar: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=200',
    category: 'Electronics',
    description: 'Leading technology retailer offering the latest gadgets and electronics.',
    followers: 15200,
    totalOffers: 24,
    verified: true,
    joinedDate: new Date('2023-01-15'),
    website: 'https://techstore.com',
    location: 'San Francisco, CA'
  },
  {
    id: 'fashion-hub',
    name: 'Fashion Hub',
    avatar: 'https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=200',
    category: 'Fashion',
    description: 'Trendy fashion and accessories for the modern lifestyle.',
    followers: 8700,
    totalOffers: 18,
    verified: true,
    joinedDate: new Date('2023-03-20'),
    website: 'https://fashionhub.com',
    location: 'New York, NY'
  },
  {
    id: 'home-living',
    name: 'Home & Living',
    avatar: 'https://images.pexels.com/photos/1599791/pexels-photo-1599791.jpeg?auto=compress&cs=tinysrgb&w=200',
    category: 'Home & Garden',
    description: 'Beautiful home decor and furniture for every space.',
    followers: 12100,
    totalOffers: 31,
    verified: false,
    joinedDate: new Date('2023-02-10'),
    website: 'https://homeliving.com',
    location: 'Los Angeles, CA'
  },
  {
    id: 'sports-central',
    name: 'Sports Central',
    avatar: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=200',
    category: 'Sports',
    description: 'Premium sports equipment and fitness gear for athletes.',
    followers: 9800,
    totalOffers: 15,
    verified: true,
    joinedDate: new Date('2023-04-05'),
    website: 'https://sportscentral.com',
    location: 'Chicago, IL'
  }
];

const FollowedBrandsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [followedBrands] = useState(mockFollowedBrands);

  // Filter brands based on search
  const filteredBrands = followedBrands.filter(brand =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    brand.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUnfollow = (brandId: string) => {
    // In a real app, this would update the user's followed brands
    console.log('Unfollowing brand:', brandId);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Log In</h1>
          <p className="text-gray-600">You need to be logged in to view your followed brands.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Followed Brands</h1>
              <p className="text-gray-600">Businesses you're following for updates and offers</p>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{followedBrands.length}</div>
                <div className="text-sm text-gray-500">Brands Following</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {followedBrands.reduce((total, brand) => total + brand.totalOffers, 0)}
                </div>
                <div className="text-sm text-gray-500">Total Offers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {followedBrands.filter(brand => brand.verified).length}
                </div>
                <div className="text-sm text-gray-500">Verified Brands</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {new Set(followedBrands.map(brand => brand.category)).size}
                </div>
                <div className="text-sm text-gray-500">Categories</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search followed brands..."
            />
          </div>
        </div>

        {/* Brands Grid */}
        {filteredBrands.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {searchQuery ? 'No brands found' : 'No followed brands yet'}
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {searchQuery 
                ? 'Try adjusting your search terms'
                : 'Start following brands to get updates on their latest offers and deals.'
              }
            </p>
            {!searchQuery && (
              <a
                href="/"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Discover Brands
              </a>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBrands.map((brand) => (
              <div key={brand.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Brand Header */}
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={brand.avatar}
                      alt={brand.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-900">{brand.name}</h3>
                        {brand.verified && (
                          <Star className="h-4 w-4 text-blue-500 fill-current" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{brand.category}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{brand.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">{brand.followers.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">{brand.totalOffers}</div>
                      <div className="text-xs text-gray-500">Active Offers</div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>Joined {brand.joinedDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span>{brand.location}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/business/${brand.id}`}
                      className="flex-1 bg-blue-600 text-white text-center py-2 px-3 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={() => handleUnfollow(brand.id)}
                      className="px-3 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      Following
                    </button>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <a
                      href={brand.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>Website</span>
                    </a>
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 text-sm">
                      <MessageCircle className="h-3 w-3" />
                      <span>Message</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowedBrandsPage;