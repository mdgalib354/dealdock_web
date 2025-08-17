import React from 'react';
import { Users, Target, Shield, Zap, Heart, Globe } from 'lucide-react';

const AboutPage: React.FC = () => {
  const features = [
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: 'Smart Discovery',
      description: 'Find the best deals tailored to your preferences with our intelligent recommendation system.'
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: 'Social Commerce',
      description: 'Connect with brands and other shoppers in a social environment designed for deal discovery.'
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: 'Verified Businesses',
      description: 'Shop with confidence knowing all our business partners are verified and trusted.'
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: 'Real-time Updates',
      description: 'Get instant notifications about new deals, price drops, and limited-time offers.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Users' },
    { number: '2K+', label: 'Verified Businesses' },
    { number: '$5M+', label: 'Total Savings' },
    { number: '15K+', label: 'Daily Deals' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">DD</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About DealDock
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              The social commerce platform that connects smart shoppers with amazing deals from trusted businesses worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We believe that finding great deals shouldn't be a chore. DealDock transforms deal discovery into a social, 
              engaging experience where businesses can showcase their best offers and customers can discover, share, and 
              save on products they love.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Choose DealDock?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We've built the ultimate platform for deal discovery with features designed to save you time and money.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2024, DealDock was born from a simple observation: deal hunting was fragmented, 
                  time-consuming, and often unreliable. Shoppers had to visit dozens of websites, compare prices 
                  manually, and hope they weren't missing better deals elsewhere.
                </p>
                <p>
                  We envisioned a world where discovering great deals was as easy and engaging as scrolling through 
                  your social media feed. A place where businesses could showcase their best offers directly to 
                  interested customers, and where shoppers could trust that they're getting authentic, verified deals.
                </p>
                <p>
                  Today, DealDock serves thousands of users and businesses, facilitating millions in savings while 
                  building a community of smart shoppers and innovative retailers.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Team collaboration"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Values</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <Heart className="h-12 w-12 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer First</h3>
              <p className="text-gray-600">
                Every decision we make is guided by what's best for our users. Your savings and satisfaction are our top priority.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <Shield className="h-12 w-12 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Trust & Transparency</h3>
              <p className="text-gray-600">
                We verify every business and deal on our platform. No fake discounts, no hidden fees, just honest savings.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <Globe className="h-12 w-12 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We're constantly evolving, using the latest technology to make deal discovery smarter and more enjoyable.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Saving?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of smart shoppers who are already discovering amazing deals on DealDock.
          </p>
          <div className="space-x-4">
            <a
              href="/signup"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started Free
            </a>
            <a
              href="/pricing"
              className="inline-block border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              View Pricing
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;