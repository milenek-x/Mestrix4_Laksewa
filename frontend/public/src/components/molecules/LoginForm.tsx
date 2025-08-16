import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Shield, ArrowLeft, CheckCircle, RefreshCw } from 'lucide-react';
import Logo from '../../assets/Logo.png';

interface LoginFormProps {
  onLogin: () => void;
  onSwitchToRegister: () => void;
}

type ForgotPasswordStep = 'login' | 'email' | 'otp' | 'reset' | 'success';

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onSwitchToRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<ForgotPasswordStep>('login');
  
  // Form states
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  
  const [forgotPasswordForm, setForgotPasswordForm] = useState({
    email: '',
    otp: ['', '', '', '', '', ''],
    newPassword: '',
    confirmPassword: ''
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

  // Handle login
  const handleLogin = async () => {
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
      setTimeout(() => {
        setIsLoading(false);
        onLogin();
      }, 1500);
    }
  };

  // Handle forgot password email submission
  const handleForgotPasswordEmail = async () => {
    const newErrors: {[key: string]: string} = {};

    if (!forgotPasswordForm.email) {
      newErrors.forgotEmail = 'Email is required';
    } else if (!validateEmail(forgotPasswordForm.email)) {
      newErrors.forgotEmail = 'Please enter a valid email';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setCurrentStep('otp');
      }, 1500);
    }
  };

  // Handle OTP input
  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...forgotPasswordForm.otp];
      newOtp[index] = value;
      setForgotPasswordForm({...forgotPasswordForm, otp: newOtp});

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  // Handle OTP verification
  const handleOtpVerification = async () => {
    const otpCode = forgotPasswordForm.otp.join('');
    
    if (otpCode.length !== 6) {
      setErrors({otp: 'Please enter all 6 digits'});
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep('reset');
      setErrors({});
    }, 1500);
  };

  // Handle password reset
  const handlePasswordReset = async () => {
    const newErrors: {[key: string]: string} = {};

    if (!forgotPasswordForm.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (!validatePassword(forgotPasswordForm.newPassword)) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }

    if (!forgotPasswordForm.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (forgotPasswordForm.newPassword !== forgotPasswordForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setCurrentStep('success');
      }, 1500);
    }
  };

  // Resend OTP
  const handleResendOtp = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setForgotPasswordForm({...forgotPasswordForm, otp: ['', '', '', '', '', '']});
    }, 1500);
  };

  // Back to login
  const backToLogin = () => {
    setCurrentStep('login');
    setErrors({});
    setForgotPasswordForm({
      email: '',
      otp: ['', '', '', '', '', ''],
      newPassword: '',
      confirmPassword: ''
    });
  };

  // Login Form
  const renderLoginForm = () => (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-blue-200 hover:shadow-3xl transition-all duration-500 hover:bg-white/95">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-blue-900 hover:text-blue-800 transition-colors duration-300">
          Welcome Back
        </h2>
        <p className="text-blue-600 mt-2">Sign in to access government services</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-blue-800 font-medium mb-2 text-left">Email Address</label>
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
          <label className="block text-blue-800 font-medium mb-2 text-left">Password</label>
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

        <div className="flex items-center justify-end">
          <button 
            onClick={() => setCurrentStep('email')}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition-all duration-300 hover:scale-105"
          >
            Forgot password?
          </button>
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
  );

  // Email Input Form
  const renderEmailForm = () => (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-blue-200 hover:shadow-3xl transition-all duration-500 hover:bg-white/95">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-blue-900 hover:text-blue-800 transition-colors duration-300">
          Forgot Password
        </h2>
        <p className="text-blue-600 mt-2">Enter your email to receive a reset code</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-blue-800 font-medium mb-2 text-left">Email Address</label>
          <div className="relative group">
            <Mail className="w-5 h-5 text-blue-400 absolute left-3 top-1/2 transform -translate-y-1/2 group-hover:text-blue-600 transition-colors duration-300" />
            <input
              type="email"
              value={forgotPasswordForm.email}
              onChange={(e) => setForgotPasswordForm({...forgotPasswordForm, email: e.target.value})}
              className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 hover:bg-white hover:border-blue-300 transition-all duration-300 hover:shadow-md"
              placeholder="your.email@example.com"
            />
          </div>
          {errors.forgotEmail && <p className="text-red-500 text-sm mt-1">{errors.forgotEmail}</p>}
        </div>

        <button
          onClick={handleForgotPasswordEmail}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl disabled:hover:scale-100 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative z-10">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Sending Code...
              </div>
            ) : (
              'Send Reset Code'
            )}
          </span>
        </button>

        <button
          onClick={backToLogin}
          className="w-full flex items-center justify-center text-blue-600 hover:text-blue-800 py-2 font-medium transition-all duration-300 hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Sign In
        </button>
      </div>
    </div>
  );

  // OTP Verification Form
  const renderOtpForm = () => (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-blue-200 hover:shadow-3xl transition-all duration-500 hover:bg-white/95">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-blue-900 hover:text-blue-800 transition-colors duration-300">
          Verify Code
        </h2>
        <p className="text-blue-600 mt-2">
          Enter the 6-digit code sent to<br />
          <span className="font-semibold">{forgotPasswordForm.email}</span>
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-blue-800 font-medium mb-4 text-center">Verification Code</label>
          <div className="flex justify-center space-x-2">
            {forgotPasswordForm.otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Backspace' && !digit && index > 0) {
                    const prevInput = document.getElementById(`otp-${index - 1}`);
                    prevInput?.focus();
                  }
                }}
                className="w-12 h-12 text-center text-lg font-bold border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 hover:bg-white hover:border-blue-300 transition-all duration-300 hover:shadow-md"
              />
            ))}
          </div>
          {errors.otp && <p className="text-red-500 text-sm mt-2 text-center">{errors.otp}</p>}
        </div>

        <button
          onClick={handleOtpVerification}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl disabled:hover:scale-100 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative z-10">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Verifying...
              </div>
            ) : (
              'Verify Code'
            )}
          </span>
        </button>

        <div className="flex justify-between items-center">
          <button
            onClick={backToLogin}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Sign In
          </button>

          <button
            onClick={handleResendOtp}
            disabled={isLoading}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50"
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );

  // Password Reset Form
  const renderPasswordResetForm = () => (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-blue-200 hover:shadow-3xl transition-all duration-500 hover:bg-white/95">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-blue-900 hover:text-blue-800 transition-colors duration-300">
          Reset Password
        </h2>
        <p className="text-blue-600 mt-2">Create a new password for your account</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-blue-800 font-medium mb-2 text-left">New Password</label>
          <div className="relative group">
            <Lock className="w-5 h-5 text-blue-400 absolute left-3 top-1/2 transform -translate-y-1/2 group-hover:text-blue-600 transition-colors duration-300" />
            <input
              type={showNewPassword ? "text" : "password"}
              value={forgotPasswordForm.newPassword}
              onChange={(e) => setForgotPasswordForm({...forgotPasswordForm, newPassword: e.target.value})}
              className="w-full pl-10 pr-12 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 hover:bg-white hover:border-blue-300 transition-all duration-300 hover:shadow-md"
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-600 hover:scale-110 transition-all duration-300"
            >
              {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
        </div>

        <div>
          <label className="block text-blue-800 font-medium mb-2 text-left">Confirm Password</label>
          <div className="relative group">
            <Lock className="w-5 h-5 text-blue-400 absolute left-3 top-1/2 transform -translate-y-1/2 group-hover:text-blue-600 transition-colors duration-300" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={forgotPasswordForm.confirmPassword}
              onChange={(e) => setForgotPasswordForm({...forgotPasswordForm, confirmPassword: e.target.value})}
              className="w-full pl-10 pr-12 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 hover:bg-white hover:border-blue-300 transition-all duration-300 hover:shadow-md"
              placeholder="Confirm new password"
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

        <button
          onClick={handlePasswordReset}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl disabled:hover:scale-100 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative z-10">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Resetting Password...
              </div>
            ) : (
              'Reset Password'
            )}
          </span>
        </button>

        <button
          onClick={backToLogin}
          className="w-full flex items-center justify-center text-blue-600 hover:text-blue-800 py-2 font-medium transition-all duration-300 hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Sign In
        </button>
      </div>
    </div>
  );

  // Success Form
  const renderSuccessForm = () => (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-blue-200 hover:shadow-3xl transition-all duration-500 hover:bg-white/95">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mb-6 shadow-lg">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
          Password Reset Successful!
        </h2>
        <p className="text-blue-600 mb-8">
          Your password has been successfully reset.<br />
          You can now sign in with your new password.
        </p>
        
        <button
          onClick={backToLogin}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg hover:shadow-xl group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative z-10">Continue to Sign In</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <img src={Logo} alt="Government Services Portal Logo" className="w-32 h-auto mx-auto mb-4" />
          <p className="text-blue-700">
            {currentStep === 'login' && 'Sign in to your government services account'}
            {currentStep === 'email' && 'Forgot your password? We\'ll help you reset it'}
            {currentStep === 'otp' && 'Check your email for the verification code'}
            {currentStep === 'reset' && 'Create a new secure password'}
            {currentStep === 'success' && 'Password successfully updated'}
          </p>
        </div>

        {/* Render appropriate form based on current step */}
        {currentStep === 'login' && renderLoginForm()}
        {currentStep === 'email' && renderEmailForm()}
        {currentStep === 'otp' && renderOtpForm()}
        {currentStep === 'reset' && renderPasswordResetForm()}
        {currentStep === 'success' && renderSuccessForm()}
      </div>
    </div>
  );
};

export default LoginForm;