import React from 'react';
import { Filter, Tag, DollarSign, TrendingUp, Store, Bookmark, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { FilterState } from '../../types';

interface SidebarProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

const categories = [
  'All',
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Sports',
  'Books',
  'Beauty',
  'Automotive'
];

const popularBrands = [
  'TechStore Inc.',
  'Fashion Hub',
  'Home & Living',
  'Sports Central',
  'Book Haven',
  'Beauty World'
];

const Sidebar: React.FC<SidebarProps> = ({ filters, setFilters }) => {
  const location = useLocation();

  const handleCategoryChange = (category: string) => {
    setFilters({
      ...filters,
      category: category === 'All' ? 'all' : category
    });
  };

  const handleBrandToggle = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    
    setFilters({
      ...filters,
      brands: newBrands
    });
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    setFilters({
      ...filters,
      priceRange: range
    });
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Quick Navigation */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h2>
          <div className="space-y-2">
            <Link
              to="/saved-offers"
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                location.pathname === '/saved-offers'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Bookmark className="h-5 w-5" />
              <span className="font-medium">Saved Offers</span>
            </Link>
            <Link
              to="/followed-brands"
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                location.pathname === '/followed-brands'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Users className="h-5 w-5" />
              <span className="font-medium">Followed Brands</span>
            </Link>
          </div>
        </div>

        {/* Filters Header */}
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        </div>

        {/* Categories */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Tag className="h-4 w-4 text-gray-500" />
            <h3 className="font-medium text-gray-900">Categories</h3>
          </div>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === (category === 'All' ? 'all' : category)}
                  onChange={() => handleCategoryChange(category)}
                  className="text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <DollarSign className="h-4 w-4 text-gray-500" />
            <h3 className="font-medium text-gray-900">Price Range</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">$</span>
              <input
                type="number"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceRangeChange([parseInt(e.target.value) || 0, filters.priceRange[1]])}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Min"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceRangeChange([filters.priceRange[0], parseInt(e.target.value) || 2000])}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Max"
              />
            </div>
            <div className="flex space-x-2">
              {[
                { label: 'Under $50', range: [0, 50] as [number, number] },
                { label: '$50-$200', range: [50, 200] as [number, number] },
                { label: '$200+', range: [200, 2000] as [number, number] }
              ].map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => handlePriceRangeChange(preset.range)}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Brands */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Store className="h-4 w-4 text-gray-500" />
            <h3 className="font-medium text-gray-900">Brands</h3>
          </div>
          <div className="space-y-2">
            {popularBrands.map((brand) => (
              <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => handleBrandToggle(brand)}
                  className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <TrendingUp className="h-4 w-4 text-gray-500" />
            <h3 className="font-medium text-gray-900">Sort By</h3>
          </div>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="newest">Newest First</option>
            <option value="discount">Highest Discount</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;