import React, { useState } from 'react';
import { User } from '../types';
import { ChefHat, Lock, User as UserIcon, Eye, EyeOff } from 'lucide-react';

interface LoginPageProps {
  users: User[];
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ users, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showCredentials, setShowCredentials] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      onLogin(user);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <ChefHat className="w-12 h-12 text-orange-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Spice Palace</h1>
          </div>
          <p className="text-xl text-gray-600">Authentic Indian Cuisine</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              Login
            </button>
          </form>

          {/* Show Credentials Button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowCredentials(!showCredentials)}
              className="text-orange-600 hover:text-orange-700 text-sm font-medium"
            >
              {showCredentials ? 'Hide' : 'Show'} Login Credentials
            </button>
          </div>

          {/* Credentials Table */}
          {showCredentials && (
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Available Accounts:</h3>
              <div className="space-y-2">
                <div className="bg-white rounded p-3 border">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-orange-600">Admin Account</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Username: <span className="font-mono bg-gray-100 px-1 rounded">admin</span> | 
                    Password: <span className="font-mono bg-gray-100 px-1 rounded">admin123</span>
                  </div>
                </div>
                
                <div className="bg-white rounded p-3 border">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-blue-600">User Accounts</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1 space-y-1">
                    <div>Table 1: <span className="font-mono bg-gray-100 px-1 rounded">table1</span> / <span className="font-mono bg-gray-100 px-1 rounded">user123</span></div>
                    <div>Table 2: <span className="font-mono bg-gray-100 px-1 rounded">table2</span> / <span className="font-mono bg-gray-100 px-1 rounded">user123</span></div>
                    <div>Table 3: <span className="font-mono bg-gray-100 px-1 rounded">table3</span> / <span className="font-mono bg-gray-100 px-1 rounded">user123</span></div>
                    <div>Table 4: <span className="font-mono bg-gray-100 px-1 rounded">table4</span> / <span className="font-mono bg-gray-100 px-1 rounded">user123</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;