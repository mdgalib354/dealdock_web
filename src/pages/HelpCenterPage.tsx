import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, MessageCircle, Mail, Phone } from 'lucide-react';

const HelpCenterPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const categories = [
    {
      title: 'Getting Started',
      icon: '🚀',
      articles: [
        'How to create an account',
        'Setting up your profile',
        'Understanding the feed',
        'Following businesses'
      ]
    },
    {
      title: 'For Shoppers',
      icon: '🛍️',
      articles: [
        'Finding deals',
        'Saving offers',
        'Rating and reviewing',
        'Using filters'
      ]
    },
    {
      title: 'For Businesses',
      icon: '🏢',
      articles: [
        'Creating business account',
        'Posting offers',
        'Managing your profile',
        'Analytics dashboard'
      ]
    },
    {
      title: 'Account & Billing',
      icon: '💳',
      articles: [
        'Subscription plans',
        'Payment methods',
        'Billing issues',
        'Canceling subscription'
      ]
    }
  ];

  const faqs = [
    {
      question: 'How do I create an account on DealDock?',
      answer: 'You can create an account by clicking the "Sign up" button in the top right corner. Choose whether you\'re a customer or business, fill in your details, and you\'ll be ready to start discovering deals!'
    },
    {
      question: 'Is DealDock free to use?',
      answer: 'Yes! DealDock is free for customers. Businesses have access to basic features for free, with premium plans available for advanced features like analytics and promoted posts.'
    },
    {
      question: 'How do I save offers for later?',
      answer: 'Simply click the bookmark icon on any offer card. You can view all your saved offers in your profile under the "Saved Offers" section.'
    },
    {
      question: 'Can I message businesses directly?',
      answer: 'Yes! You can send messages to businesses through their profile pages. This is great for asking questions about products or deals.'
    },
    {
      question: 'How do I know if a business is verified?',
      answer: 'Verified businesses have a blue checkmark next to their name. We verify businesses to ensure they\'re legitimate and trustworthy.'
    },
    {
      question: 'What should I do if I encounter a problem with an offer?',
      answer: 'If you have issues with an offer, first try contacting the business directly. If that doesn\'t resolve the issue, you can report it to our support team using the contact options below.'
    }
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
            <p className="text-lg text-gray-600 mb-8">Find answers to your questions and get the help you need</p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search for help articles..."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Categories */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Browse by Category</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {categories.map((category, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-2xl">{category.icon}</span>
                      <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {category.articles.map((article, articleIndex) => (
                        <li key={articleIndex}>
                          <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">
                            {article}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      {expandedFaq === index ? (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact Support */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need More Help?</h3>
              <p className="text-gray-600 mb-6">Can't find what you're looking for? Our support team is here to help.</p>
              
              <div className="space-y-4">
                <a
                  href="#"
                  className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-gray-900">Live Chat</div>
                    <div className="text-sm text-gray-500">Available 24/7</div>
                  </div>
                </a>
                
                <a
                  href="mailto:support@dealdock.com"
                  className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-gray-900">Email Support</div>
                    <div className="text-sm text-gray-500">support@dealdock.com</div>
                  </div>
                </a>
                
                <a
                  href="tel:+1-555-0123"
                  className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <Phone className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-gray-900">Phone Support</div>
                    <div className="text-sm text-gray-500">+1 (555) 012-3456</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Popular Articles */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Articles</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">
                    How to get the best deals on DealDock
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">
                    Setting up notifications for new offers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">
                    Business verification process
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">
                    Understanding our rating system
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">
                    Privacy and security on DealDock
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;