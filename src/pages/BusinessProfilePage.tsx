import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useOffers } from '../hooks/useOffers';
import EditProfileModal from '../components/Profile/EditProfileModal';
import PostOfferModal from '../components/Business/PostOfferModal';
import { Business, Offer } from '../types';
import { 
  MapPin, 
  Globe, 
  Calendar, 
  Users, 
  Star, 
  Edit3, 
  Plus,
  Settings,
  BarChart3,
  Eye,
  MessageSquare,
  Bookmark
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import OfferCard from '../components/Feed/OfferCard';

const BusinessProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const { offers, addRating, toggleSave, addComment, addOffer } = useOffers();
  const [isEditing, setIsEditing] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'offers' | 'analytics' | 'settings'>('offers');

  // Filter offers by current business
  const businessOffers = offers.filter(offer => offer.businessId === currentUser?.id);

  const business = currentUser as Business;

  const handleOfferCreated = (offerData: any) => {
    addOffer(offerData);
  };

  if (!business || business.type !== 'business') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">This page is only accessible to business accounts.</p>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Total Offers', value: businessOffers.length, icon: <BarChart3 className="h-5 w-5" /> },
    { label: 'Followers', value: business.followers.toLocaleString(), icon: <Users className="h-5 w-5" /> },
    { label: 'Profile Views', value: '2.4K', icon: <Eye className="h-5 w-5" /> },
    { label: 'Avg. Rating', value: '4.8', icon: <Star className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Photo & Profile Header */}
      <div className="bg-white shadow-sm">
        <div className="relative">
          {/* Cover Photo */}
          <div className="h-48 md:h-64 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
          
          {/* Profile Info */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative -mt-16 pb-6">
              <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
                {/* Profile Picture */}
                <div className="relative">
                  <img
                    src={business.avatar}
                    alt={business.name}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                  {business.verified && (
                    <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-2">
                      <Star className="h-4 w-4 text-white fill-current" />
                    </div>
                  )}
                </div>

                {/* Business Info */}
                <div className="flex-1 mt-4 md:mt-0">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center space-x-2">
                        <span>{business.name}</span>
                        {business.verified && (
                          <Star className="h-6 w-6 text-blue-600 fill-current" />
                        )}
                      </h1>
                      <p className="text-gray-600 mt-1">{business.category}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Joined {formatDistanceToNow(business.joinedAt)} ago</span>
                        </div>
                        {business.website && (
                          <div className="flex items-center space-x-1">
                            <Globe className="h-4 w-4" />
                            <a 
                              href={business.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Website
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-3 mt-4 md:mt-0">
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Edit3 className="h-4 w-4" />
                        <span>Edit Profile</span>
                      </button>
                      <button 
                        onClick={() => setShowPostModal(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Post Offer</span>
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 mt-4 max-w-2xl">{business.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center space-x-2 text-gray-600 mb-1">
                    {stat.icon}
                    <span className="text-sm">{stat.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('offers')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'offers'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Offers ({businessOffers.length})
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'analytics'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Analytics
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'settings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Settings
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'offers' && (
          <div className="space-y-6">
            {businessOffers.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No offers yet</h3>
                <p className="text-gray-500 mb-4">Start posting offers to attract customers</p>
                <button 
                  onClick={() => setShowPostModal(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Post Your First Offer
                </button>
              </div>
            ) : (
              <div className="grid gap-6">
                {businessOffers.map((offer) => (
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
        )}

        {activeTab === 'analytics' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Offer Performance</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Views</span>
                  <span className="font-semibold">12,450</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saves</span>
                  <span className="font-semibold">1,234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Comments</span>
                  <span className="font-semibold">567</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Audience Insights</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">New Followers</span>
                  <span className="font-semibold text-green-600">+45</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Profile Views</span>
                  <span className="font-semibold">2,890</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Engagement Rate</span>
                  <span className="font-semibold">8.2%</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Impact</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Reach</span>
                  <span className="font-semibold">25,600</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Click-through Rate</span>
                  <span className="font-semibold">3.4%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Conversion Rate</span>
                  <span className="font-semibold">1.8%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                  <input
                    type="text"
                    value={business.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={business.description}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input
                    type="url"
                    value={business.website || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                  <span className="ml-2 text-sm text-gray-700">Email notifications for new followers</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                  <span className="ml-2 text-sm text-gray-700">Email notifications for comments</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-700">SMS notifications for urgent messages</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <EditProfileModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        user={business}
      />
      
      <PostOfferModal
        isOpen={showPostModal}
        onClose={() => setShowPostModal(false)}
        onOfferCreated={handleOfferCreated}
      />
    </div>
  );
};

export default BusinessProfilePage;