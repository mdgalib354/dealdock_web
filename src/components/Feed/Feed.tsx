import React from 'react';
import { useOffers } from '../../hooks/useOffers';
import OfferCard from './OfferCard';
import StoriesSection from './StoriesSection';
import LoadingSpinner from '../Common/LoadingSpinner';

const Feed: React.FC = () => {
  const { offers, stories, loading, addRating, toggleSave, addComment, markStoryAsViewed, filters } = useOffers();

  if (loading) {
    return <LoadingSpinner />;
  }

  // Apply filters to offers
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

  // Sort offers based on sortBy filter
  const sortedOffers = [...filteredOffers].sort((a, b) => {
    switch (filters.sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'discount':
        return b.discountPercentage - a.discountPercentage;
      case 'popular':
        return b.saves - a.saves;
      default:
        return 0;
    }
  });
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Stories Section */}
      <StoriesSection stories={stories} onStoryView={markStoryAsViewed} />
      
      {/* Offers Feed */}
      {sortedOffers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No offers match your current filters.</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your search criteria.</p>
        </div>
      ) : (
        sortedOffers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            onRate={addRating}
            onSave={toggleSave}
            onComment={addComment}
          />
        ))
      )}
    </div>
  );
};

export default Feed;