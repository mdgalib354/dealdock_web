import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Layout/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AboutPage from './pages/AboutPage';
import HelpCenterPage from './pages/HelpCenterPage';
import PricingPage from './pages/PricingPage';
import BusinessProfilePage from './pages/BusinessProfilePage';
import CustomerProfilePage from './pages/CustomerProfilePage';
import SavedOffersPage from './pages/SavedOffersPage';
import FollowedBrandsPage from './pages/FollowedBrandsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/help" element={<HelpCenterPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/business/:id" element={<BusinessProfilePage />} />
            <Route path="/profile/:id" element={<CustomerProfilePage />} />
            <Route path="/saved-offers" element={<SavedOffersPage />} />
            <Route path="/followed-brands" element={<FollowedBrandsPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;