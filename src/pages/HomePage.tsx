import React from 'react';
import Sidebar from '../components/Layout/Sidebar';
import RightSidebar from '../components/Layout/RightSidebar';
import Feed from '../components/Feed/Feed';
import { useOffers } from '../hooks/useOffers';

const HomePage: React.FC = () => {
  const { filters, setFilters } = useOffers();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="hidden lg:block flex-shrink-0">
        <Sidebar filters={filters} setFilters={setFilters} />
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:max-w-4xl mx-auto px-4 py-6">
        <Feed />
      </div>

      {/* Right Sidebar */}
      <div className="hidden xl:block flex-shrink-0">
        <RightSidebar />
      </div>
    </div>
  );
};

export default HomePage;