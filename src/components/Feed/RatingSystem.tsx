import React, { useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';

interface RatingSystemProps {
  averageRating: number;
  totalRatings: number;
  userRating?: number;
  onRate: (rating: number, review?: string) => void;
  compact?: boolean;
}

const RatingSystem: React.FC<RatingSystemProps> = ({
  averageRating,
  totalRatings,
  userRating,
  onRate,
  compact = false
}) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [showReviewInput, setShowReviewInput] = useState(false);
  const [reviewText, setReviewText] = useState('');

  const handleStarClick = (rating: number) => {
    if (compact) {
      onRate(rating);
    } else {
      setShowReviewInput(true);
    }
  };

  const handleSubmitReview = () => {
    if (hoveredRating > 0) {
      onRate(hoveredRating, reviewText.trim() || undefined);
      setShowReviewInput(false);
      setReviewText('');
      setHoveredRating(0);
    }
  };

  const renderStars = (rating: number, interactive: boolean = false) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      const isFilled = starValue <= rating;
      
      return (
        <Star
          key={index}
          className={`h-4 w-4 cursor-pointer transition-colors ${
            isFilled 
              ? 'text-yellow-400 fill-current' 
              : 'text-gray-300 hover:text-yellow-400'
          }`}
          onClick={() => interactive && handleStarClick(starValue)}
          onMouseEnter={() => interactive && setHoveredRating(starValue)}
          onMouseLeave={() => interactive && setHoveredRating(userRating || 0)}
        />
      );
    });
  };

  if (compact) {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1">
          {renderStars(hoveredRating || userRating || 0, true)}
        </div>
        {averageRating > 0 && (
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <span>{averageRating.toFixed(1)}</span>
            <span>({totalRatings})</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Average Rating Display */}
      {averageRating > 0 && (
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {renderStars(averageRating)}
          </div>
          <span className="text-sm font-medium text-gray-700">
            {averageRating.toFixed(1)} ({totalRatings} rating{totalRatings !== 1 ? 's' : ''})
          </span>
        </div>
      )}

      {/* User Rating Interface */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Your rating:</span>
          <div className="flex items-center space-x-1">
            {renderStars(hoveredRating || userRating || 0, true)}
          </div>
          {userRating && (
            <span className="text-sm text-gray-500">({userRating}/5)</span>
          )}
        </div>

        {/* Review Input */}
        {showReviewInput && (
          <div className="space-y-2">
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write a review (optional)..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
            />
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSubmitReview}
                disabled={hoveredRating === 0}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Submit Rating
              </button>
              <button
                onClick={() => {
                  setShowReviewInput(false);
                  setReviewText('');
                  setHoveredRating(userRating || 0);
                }}
                className="px-4 py-2 text-gray-600 text-sm hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingSystem;