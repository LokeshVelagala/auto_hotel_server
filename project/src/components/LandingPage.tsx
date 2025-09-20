import React from 'react';
import { UserRole } from '../types';
import { Users, Shield, Utensils, ChefHat } from 'lucide-react';

interface LandingPageProps {
  onRoleSelect: (role: UserRole) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onRoleSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <ChefHat className="w-12 h-12 text-orange-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Hotel Deluxe</h1>
          </div>
          <p className="text-xl text-gray-600">Premium Dining Experience</p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* User Interface Card */}
          <div 
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 cursor-pointer transform hover:scale-105"
            onClick={() => onRoleSelect('user')}
          >
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Utensils className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Customer Portal</h2>
              <p className="text-gray-600 mb-6">Browse our delicious menu, check availability, and place your orders</p>
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Features:</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• View menu with prices</li>
                  <li>• Check food availability</li>
                  <li>• Real-time updates</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Admin Interface Card */}
          <div 
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 cursor-pointer transform hover:scale-105"
            onClick={() => onRoleSelect('admin')}
          >
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Admin Dashboard</h2>
              <p className="text-gray-600 mb-6">Manage tables, monitor orders, and oversee restaurant operations</p>
              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-orange-800 mb-2">Features:</h3>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Table occupancy status</li>
                  <li>• Order management</li>
                  <li>• Real-time monitoring</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">Choose your interface to get started</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;