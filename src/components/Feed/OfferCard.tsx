import React, { useState } from 'react';
import { MessageCircle, Bookmark, Share2, Clock, ExternalLink, Star } from 'lucide-react';
import { Offer } from '../../types';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import RatingSystem from './RatingSystem';

interface OfferCardProps {
  offer: Offer;
  onRate: (offerId: string, rating: number, review?: string) => void;
  onSave: (offerId: string) => void;
  onComment: (offerId: string, content: string) => void;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, onRate, onSave, onComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(offer.id, commentText.trim());
      setCommentText('');
    }
  };

  const handleRate = (rating: number, review?: string) => {
    onRate(offer.id, rating, review);
  };
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Business Header */}
      <div className="flex items-center justify-between p-4 pb-2">
        <Link
          to={`/business/${offer.businessId}`}
          className="flex items-center space-x-3 group"
        >
          <img
            src={offer.businessAvatar}
            alt={offer.businessName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {offer.businessName}
            </h3>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>{formatDistanceToNow(offer.createdAt)} ago</span>
            </div>
          </div>
        </Link>
        <div className="flex items-center space-x-1">
          <span className="text-xs text-gray-500">{offer.category}</span>
        </div>
      </div>

      {/* Product Image */}
      <div className="relative">
        <img
          src={offer.image}
          alt={offer.productName}
          className="w-full max-h-96 object-contain bg-gray-50"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {offer.discountPercentage}% OFF
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <Link
          to={`/offer/${offer.id}`}
          className="block group"
        >
          <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
            {offer.productName}
          </h2>
        </Link>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {offer.description}
        </p>

        {/* Pricing */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-2xl font-bold text-green-600">
            {formatPrice(offer.discountPrice)}
          </span>
          <span className="text-lg text-gray-500 line-through">
            {formatPrice(offer.originalPrice)}
          </span>
          <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
            Save {formatPrice(offer.originalPrice - offer.discountPrice)}
          </span>
        </div>

        {/* Rating System */}
        <div className="mb-4">
          <RatingSystem
            averageRating={offer.averageRating}
            totalRatings={offer.ratings.length}
            userRating={offer.userRating}
            onRate={handleRate}
            compact={true}
          />
        </div>
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {offer.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-4">

            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 px-3 py-2 rounded-full text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm font-medium">{offer.comments.length}</span>
            </button>

            <button
              onClick={() => onSave(offer.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-colors ${
                offer.isSaved
                  ? 'text-blue-600 bg-blue-50 border border-blue-200'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Bookmark
                className={`h-5 w-5 ${offer.isSaved ? 'fill-current' : ''}`}
              />
              <span className="text-sm font-medium">{offer.saves}</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
              <Share2 className="h-4 w-4" />
            </button>
            <Link
              to={`/offer/${offer.id}`}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
            {offer.comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <img
                  src={comment.userAvatar}
                  alt={comment.userName}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg px-3 py-2">
                    <p className="text-sm font-medium text-gray-900">{comment.userName}</p>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDistanceToNow(comment.createdAt)} ago
                  </p>
                </div>
              </div>
            ))}

            {/* Add Comment */}
            <form onSubmit={handleCommentSubmit} className="flex space-x-3">
              <img
                src="https://images.pexels.com/photos/1367269/pexels-photo-1367269.jpeg?auto=compress&cs=tinysrgb&w=100"
                alt="Your avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferCard;