import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Building2, Shield } from 'lucide-react';

interface LoginFormProps {
  onLogin: () => void;
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onSwitchToRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {[key: string]: string} = {};

    if (!loginForm.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(loginForm.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!loginForm.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        onLogin();
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-blue-900 mb-2 hover:text-blue-800 transition-colors duration-300">
            Lanka Sewa
          </h1>
          <p className="text-blue-700">Government Services Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-blue-200 hover:shadow-3xl transition-all duration-500 hover:bg-white/95">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-blue-900 hover:text-blue-800 transition-colors duration-300">
              Welcome Back
            </h2>
            <p className="text-blue-600 mt-2">Sign in to access government services</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-blue-800 font-medium mb-2">Email Address</label>
              <div className="relative group">
                <Mail className="w-5 h-5 text-blue-400 absolute left-3 top-1/2 transform -translate-y-1/2 group-hover:text-blue-600 transition-colors duration-300" />
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 hover:bg-white hover:border-blue-300 transition-all duration-300 hover:shadow-md"
                  placeholder="your.email@example.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-blue-800 font-medium mb-2">Password</label>
              <div className="relative group">
                <Lock className="w-5 h-5 text-blue-400 absolute left-3 top-1/2 transform -translate-y-1/2 group-hover:text-blue-600 transition-colors duration-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  className="w-full pl-10 pr-12 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 hover:bg-white hover:border-blue-300 transition-all duration-300 hover:shadow-md"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-600 hover:scale-110 transition-all duration-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center group cursor-pointer">
                <input 
                  type="checkbox" 
                  className="text-blue-600 border-blue-300 rounded focus:ring-blue-500 hover:border-blue-400 transition-colors duration-300" 
                />
                <span className="ml-2 text-blue-700 text-sm group-hover:text-blue-800 transition-colors duration-300">
                  Remember me
                </span>
              </label>
              <a 
                href="#" 
                className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition-all duration-300 hover:scale-105"
              >
                Forgot password?
              </a>
            </div>

            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl disabled:hover:scale-100 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
              </span>
            </button>

            {/* Google Login Button */}
            <button className="w-full border-2 border-blue-200 bg-white text-blue-700 py-3 rounded-lg font-semibold hover:bg-blue-50 hover:border-blue-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md hover:shadow-lg group relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </span>
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-blue-700">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToRegister}
                className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-all duration-300 hover:scale-105"
              >
                Sign up here
              </button>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-blue-200">
            <div className="flex items-center justify-center text-sm text-blue-600 group">
              <Shield className="w-4 h-4 mr-2 group-hover:text-blue-700 transition-colors duration-300" />
              <span className="group-hover:text-blue-700 transition-colors duration-300">
                Secure Government Portal
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;