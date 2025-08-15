import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Phone, CreditCard } from 'lucide-react';
import Logo from '../../assets/Logo.png';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    username: '', // Added username field
    email: '',
    password: '',
    confirmPassword: '',
    nic: '',
    phone: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const validateNIC = (nic: string) => {
    const nicRegex = /^(?:\d{9}[xXvV]|\d{12})$/;
    return nicRegex.test(nic);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^(?:\+94|0)?[1-9]\d{8}$/;
    return phoneRegex.test(phone);
  };

  const validateUsername = (username: string) => {
    // Basic username validation: at least 3 characters, alphanumeric only
    const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
    return usernameRegex.test(username);
  };

  // Handle registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {[key: string]: string} = {};

    if (!registerForm.firstName) newErrors.firstName = 'First name is required';
    if (!registerForm.lastName) newErrors.lastName = 'Last name is required';

    if (!registerForm.username) {
      newErrors.username = 'Username is required';
    } else if (!validateUsername(registerForm.username)) {
      newErrors.username = 'Username must be at least 3 alphanumeric characters';
    }

    if (!registerForm.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(registerForm.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!registerForm.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(registerForm.password)) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!registerForm.nic) {
      newErrors.nic = 'NIC is required';
    } else if (!validateNIC(registerForm.nic)) {
      newErrors.nic = 'Please enter a valid NIC';
    }

    if (!registerForm.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(registerForm.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onSwitchToLogin();
        alert('Registration successful! Please login with your credentials.');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-200 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-6">
          <img src={Logo} alt="Government Services Portal Logo" className="w-32 h-auto mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-blue-900 mb-2 hover:text-blue-800 transition-colors duration-300">
            Join Lanka Sewa
          </h1>
          <p className="text-blue-700">Create your government services account</p>
        </div>

        {/* Registration Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-blue-200 hover:shadow-3xl transition-all duration-500 hover:bg-white/95">
          <div className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-blue-800 font-medium mb-2">First Name</label>
                <div className="relative group">
                  <User className="w-5 h-5 text-blue-400 absolute left-3 top-1/2 transform -translate-y-1/2 group-hover:text-blue-600 transition-colors duration-300" />
                  <input
                    type="text"
                    value={registerForm.firstName}
                    onChange={(e) => setRegisterForm({...registerForm, firstName: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 hover:bg-white hover:border-blue-300 transition-all duration-300 hover:shadow-md"
                    placeholder="John"
                  />
                </div>
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-blue-800 font-medium mb-2">Last Name</label>
                <div className="relative group">
                  <User className="w-5 h-5 text-blue-400 absolute left-3 top-1/2 transform -translate-y-1/2 group-hover:text-blue-600 transition-colors duration-300" />
                  <input
                    type="text"
                    value={registerForm.lastName}
                    onChange={(e) => setRegisterForm({...registerForm, lastName: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 hover:bg-white hover:border-blue-300 transition-all duration-300 hover:shadow-md"
                    placeholder="Doe"
                  />
                </div>
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* Username Field */}
            <div>
              <label className="block text-blue-800 font-medium mb-2">Username</label>
              <div className="relative group">
                <User className="w-5 h-5 text-blue-400 absolute left-3 top-1/2 transform -translate-y-1/2 group-hover:text-blue-600 transition-colors duration-300" />
                <input
                  type="text"
                  value={registerForm.username}
                  onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 hover:bg-white hover:border-blue-300 transition-all duration-300 hover:shadow-md"
                  placeholder="johndoe123"
                />
              </div>
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-blue-800 font-medium mb-2">Email Address</label>
              <div className="relative group">
                <Mail className="w-5 h-5 text-blue-400 absolute left-3 top-1/2 transform -translate-y-1/2 group-hover:text-blue-600 transition-colors duration-300" />
                <input
                  type="email"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 hover:bg-white hover:border-blue-300 transition-all duration-300 hover:shadow-md"
                  placeholder="your.email@example.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* NIC Field */}
            <div>
              <label className="block text-blue-800 font-medium mb-2">NIC Number</label>
              <div className="relative group">
                <CreditCard className="w-5 h-5 text-blue-400 absolute left-3 top-1/2 transform -translate-y-1/2 group-hover:text-blue-600 transition-colors duration-300" />
                <input
                  type="text"
                  value={registerForm.nic}
                  onChange={(e) => setRegisterForm({...registerForm, nic: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 hover:bg-white hover:border-blue-300 transition-all duration-300 hover:shadow-md"
                  placeholder="123456789V or 123456789012"
                />
              </div>
              {errors.nic && <p className="text-red-500 text-sm mt-1">{errors.nic}</p>}
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-blue-800 font-medium mb-2">Phone Number</label>
              <div className="relative group">
                <Phone className="w-5 h-5 text-blue-400 absolute left-3 top-1/2 transform -translate-y-1/2 group-hover:text-blue-600 transition-colors duration-300" />
                <input
                  type="tel"
                  value={registerForm.phone}
                  onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 hover:bg-white hover:border-blue-300 transition-all duration-300 hover:shadow-md"
                  placeholder="+94 77 123 4567"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-blue-800 font-medium mb-2">Password</label>
              <div className="relative group">
                <Lock className="w-5 h-5 text-blue-400 absolute left-3 top-1/2 transform -translate-y-1/2 group-hover:text-blue-600 transition-colors duration-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                  className="w-full pl-10 pr-12 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 hover:bg-white hover:border-blue-300 transition-all duration-300 hover:shadow-md"
                  placeholder="Minimum 8 characters"
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

            {/* Confirm Password Field */}
            <div>
              <label className="block text-blue-800 font-medium mb-2">Confirm Password</label>
              <div className="relative group">
                <Lock className="w-5 h-5 text-blue-400 absolute left-3 top-1/2 transform -translate-y-1/2 group-hover:text-blue-600 transition-colors duration-300" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={registerForm.confirmPassword}
                  onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                  className="w-full pl-10 pr-12 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 hover:bg-white hover:border-blue-300 transition-all duration-300 hover:shadow-md"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-600 hover:scale-110 transition-all duration-300"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 text-blue-600 border-blue-300 rounded focus:ring-blue-500 hover:border-blue-400 transition-colors duration-300"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-blue-700 hover:text-blue-800 transition-colors duration-300">
                I agree to the{' '}
                <a href="#" className="underline hover:text-blue-900">Terms of Service</a> and{' '}
                <a href="#" className="underline hover:text-blue-900">Privacy Policy</a>
              </label>
            </div>

            {/* Register Button */}
            <button
              onClick={handleRegister}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl disabled:hover:scale-100 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </span>
            </button>

            {/* Social Registration - Removed for brevity, as per previous instructions */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-blue-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-blue-600">Or register with</span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-blue-700">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-all duration-300 hover:scale-105"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;