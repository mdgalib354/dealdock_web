import React from 'react';
import { useOffers } from '../hooks/useOffers';
import { useAuth } from '../context/AuthContext';
import OfferCard from '../components/Feed/OfferCard';
import { Bookmark, Search } from 'lucide-react';

const SavedOffersPage: React.FC = () => {
  const { offers, addRating, toggleSave, addComment } = useOffers();
  const { currentUser } = useAuth();

  // Filter saved offers
  const savedOffers = offers.filter(offer => offer.isSaved);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Log In</h1>
          <p className="text-gray-600">You need to be logged in to view your saved offers.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Bookmark className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Saved Offers</h1>
              <p className="text-gray-600">Your bookmarked deals and offers</p>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{savedOffers.length}</div>
                <div className="text-sm text-gray-500">Saved Offers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  ${savedOffers.reduce((total, offer) => total + (offer.originalPrice - offer.discountPrice), 0).toFixed(0)}
                </div>
                <div className="text-sm text-gray-500">Potential Savings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(savedOffers.reduce((total, offer) => total + offer.discountPercentage, 0) / (savedOffers.length || 1))}%
                </div>
                <div className="text-sm text-gray-500">Avg. Discount</div>
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
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search your saved offers..."
            />
          </div>
        </div>

        {/* Offers Grid */}
        {savedOffers.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bookmark className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No saved offers yet</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Start saving offers you're interested in by clicking the bookmark icon on any deal.
            </p>
            <a
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Offers
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {savedOffers.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                onRate={addRating}
                onSave={toggleSave}
                onComment={addComment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedOffersPage;