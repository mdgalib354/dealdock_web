import React, { useState } from 'react';
import { Check, X, Star, Zap, Crown } from 'lucide-react';

const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Starter',
      icon: <Star className="h-8 w-8 text-blue-600" />,
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for small businesses getting started',
      features: [
        'Post up to 5 offers per month',
        'Basic business profile',
        'Customer messaging',
        'Basic analytics',
        'Mobile app access',
        'Email support'
      ],
      limitations: [
        'Limited to 5 offers per month',
        'Basic analytics only',
        'No promoted posts'
      ],
      buttonText: 'Get Started Free',
      buttonStyle: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
      popular: false
    },
    {
      name: 'Professional',
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      price: { monthly: 29.99, yearly: 299.99 },
      description: 'For growing businesses',
      features: [
        'Everything in Starter',
        'Unlimited offers',
        'Advanced analytics dashboard',
        'Promoted posts (5 per month)',
        'Story posting',
        'Priority customer support',
        'Custom branding options',
        'Export customer data'
      ],
      limitations: [],
      buttonText: 'Start Professional Trial',
      buttonStyle: 'bg-blue-600 text-white hover:bg-blue-700',
      popular: true
    },
    {
      name: 'Enterprise',
      icon: <Crown className="h-8 w-8 text-purple-600" />,
      price: { monthly: 99.99, yearly: 999.99 },
      description: 'For large businesses and chains',
      features: [
        'Everything in Professional',
        'Unlimited promoted posts',
        'Advanced custom branding',
        'Multi-location management',
        'Dedicated account manager',
        'Advanced analytics & reporting',
        'Verification badge',
        '24/7 phone support',
        'API access',
        'White-label options'
      ],
      limitations: [],
      buttonText: 'Start Enterprise Trial',
      buttonStyle: 'bg-purple-600 text-white hover:bg-purple-700',
      popular: false
    }
  ];

  const faqs = [
    {
      question: 'Can I upgrade or downgrade my business plan at any time?',
      answer: 'Yes, you can upgrade or downgrade your business plan at any time. Changes will be reflected in your next billing cycle, and you\'ll only pay the prorated difference.'
    },
    {
      question: 'Do you offer free trials for paid business plans?',
      answer: 'Yes, we offer a 14-day free trial for both Professional and Enterprise plans. No credit card required to start your trial.'
    },
    {
      question: 'What payment methods do you accept for business accounts?',
      answer: 'We accept all major credit cards, PayPal, bank transfers, and can arrange invoicing for Enterprise customers.'
    },
    {
      question: 'What happens if I cancel my business subscription?',
      answer: 'You can cancel anytime from your business account settings. You\'ll continue to have access until the end of your billing period, and your offers will remain visible during that time.'
    },
    {
      question: 'Do you offer discounts for multiple locations?',
      answer: 'Yes! Enterprise plans include multi-location management, and we offer volume discounts for businesses with multiple locations. Contact our sales team for custom pricing.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Business Pricing Plans
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Find the perfect plan to grow your business on DealDock
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className={`text-sm ${billingCycle === 'monthly' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  billingCycle === 'yearly' ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm ${billingCycle === 'yearly' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                Yearly
              </span>
              {billingCycle === 'yearly' && (
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Save 17%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-sm border-2 transition-all hover:shadow-lg ${
                plan.popular ? 'border-blue-500 scale-105' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">{plan.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      ${plan.price[billingCycle]}
                    </span>
                    {plan.price[billingCycle] > 0 && (
                      <span className="text-gray-500">
                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                    )}
                  </div>
                  <button className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${plan.buttonStyle}`}>
                    {plan.buttonText}
                  </button>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">What's included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.limitations.length > 0 && (
                    <>
                      <h4 className="font-semibold text-gray-900 mt-6">Limitations:</h4>
                      <ul className="space-y-3">
                        {plan.limitations.map((limitation, limitationIndex) => (
                          <li key={limitationIndex} className="flex items-start space-x-3">
                            <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600 text-sm">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-900 to-indigo-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Custom Enterprise Solutions</h3>
            <p className="text-gray-300 mb-6">
              Tailored solutions for enterprise businesses with unique requirements
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">Custom</div>
                <div className="text-gray-300">Solutions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">Dedicated</div>
                <div className="text-gray-300">Support Team</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">White-label</div>
                <div className="text-gray-300">Options</div>
              </div>
            </div>
            <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Business FAQ
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to grow your business?
          </h2>
          <p className="text-gray-600 mb-6">
            Join thousands of businesses already using DealDock to reach more customers.
          </p>
          <div className="space-x-4">
            <a
              href="/signup"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Start Free Trial
            </a>
            <a
              href="/help"
              className="inline-block border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;