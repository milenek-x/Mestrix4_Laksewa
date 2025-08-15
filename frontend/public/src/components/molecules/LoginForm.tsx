import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Shield } from 'lucide-react';
import Logo from '../../assets/Logo.png';

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
          <img src={Logo} alt="Government Services Portal Logo" className="w-32 h-auto mx-auto mb-4" />
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

            <div className="flex items-center justify-end"> {/* Changed from justify-between to justify-end */}
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
            {/* Removed Google Login Button */}
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