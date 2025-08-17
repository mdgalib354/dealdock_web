import React from 'react';
import { TrendingUp, Users, Star, ExternalLink, Info, HelpCircle, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const trendingOffers = [
  {
    id: 't1',
    productName: 'Wireless Headphones',
    businessName: 'AudioTech',
    discount: '45%',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 't2',
    productName: 'Smart Watch',
    businessName: 'WearTech',
    discount: '30%',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 't3',
    productName: 'Gaming Mouse',
    businessName: 'GameGear',
    discount: '25%',
    image: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=200'
  }
];

const suggestedCompanies = [
  {
    id: 's1',
    name: 'ElectroWorld',
    category: 'Electronics',
    followers: '15.2K',
    verified: true,
    avatar: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 's2',
    name: 'StyleHub',
    category: 'Fashion',
    followers: '8.7K',
    verified: true,
    avatar: 'https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 's3',
    name: 'FitnessPro',
    category: 'Sports',
    followers: '12.1K',
    verified: false,
    avatar: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
];

const RightSidebar: React.FC = () => {
  return (
    <div className="w-80 bg-white border-l border-gray-200 h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Trending Offers */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Trending Offers</h2>
          </div>
          <div className="space-y-3">
            {trendingOffers.map((offer) => (
              <Link
                key={offer.id}
                to={`/offer/${offer.id}`}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <img
                  src={offer.image}
                  alt={offer.productName}
                  className="w-12 h-12 rounded-md object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600">
                    {offer.productName}
                  </p>
                  <p className="text-xs text-gray-500">{offer.businessName}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded">
                      {offer.discount} OFF
                    </span>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
              </Link>
            ))}
          </div>
        </div>

        {/* Suggested Companies */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Users className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Suggested Companies</h2>
          </div>
          <div className="space-y-3">
            {suggestedCompanies.map((company) => (
              <div key={company.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <Link
                  to={`/business/${company.id}`}
                  className="flex items-center space-x-3 flex-1"
                >
                  <img
                    src={company.avatar}
                    alt={company.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {company.name}
                      </p>
                      {company.verified && (
                        <Star className="h-3 w-3 text-blue-500 fill-current" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{company.category}</p>
                    <p className="text-xs text-gray-400">{company.followers} followers</p>
                  </div>
                </Link>
                <button className="px-3 py-1 text-xs font-medium text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Platform Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Offers</span>
              <span className="text-sm font-semibold text-gray-900">2,847</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Businesses</span>
              <span className="text-sm font-semibold text-gray-900">1,234</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Savings</span>
              <span className="text-sm font-semibold text-green-600">$2.1M</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
          <div className="space-y-2">
            <Link
              to="/about"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <Info className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
              <span className="text-sm text-gray-700 group-hover:text-blue-600">About DealDock</span>
            </Link>
            <Link
              to="/help"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <HelpCircle className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
              <span className="text-sm text-gray-700 group-hover:text-blue-600">Help Center</span>
            </Link>
            <Link
              to="/pricing"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <CreditCard className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
              <span className="text-sm text-gray-700 group-hover:text-blue-600">Pricing</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;