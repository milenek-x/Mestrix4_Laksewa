import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Phone, CreditCard, X, Shield, FileText, Sparkles } from 'lucide-react';
import Logo1 from '../../assets/Logo.png';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

// Enhanced Terms of Service Dialog Component
const TermsOfServiceDialog: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black/60 via-blue-900/30 to-indigo-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-white via-blue-50/95 to-indigo-50/90 backdrop-blur-xl rounded-3xl shadow-2xl max-w-5xl max-h-[85vh] overflow-hidden border-2 border-blue-200/50 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-xl"></div>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-indigo-600/80"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/5 to-white/10"></div>
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-1">Terms of Service</h2>
                <p className="text-blue-100 text-sm">LakSewa Government Services Portal</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-90"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[60vh] space-y-8">
          <div className="prose max-w-none">
            {/* Section 1 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200 mb-6">
              <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">1</span>
                Acceptance of Terms
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify">
                By accessing and using LakSewa (Government Services Portal), you accept and agree to be bound by the terms and provision of this agreement. These Terms of Service govern your use of our platform and services.
              </p>
            </div>

            {/* Section 2 */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-200 mb-6">
              <h3 className="text-2xl font-bold text-indigo-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">2</span>
                Service Description
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed text-justify">
                LakSewa provides a digital platform for accessing Sri Lankan government services including but not limited to:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center p-3 bg-white/70 rounded-lg border border-indigo-100">
                  <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Voter registration and electoral services</span>
                </div>
                <div className="flex items-center p-3 bg-white/70 rounded-lg border border-indigo-100">
                  <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Motor traffic and licensing services</span>
                </div>
                <div className="flex items-center p-3 bg-white/70 rounded-lg border border-indigo-100">
                  <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Immigration and emigration services</span>
                </div>
                <div className="flex items-center p-3 bg-white/70 rounded-lg border border-indigo-100">
                  <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Civil registration services</span>
                </div>
                <div className="flex items-center p-3 bg-white/70 rounded-lg border border-indigo-100 md:col-span-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Document applications and renewals</span>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200 mb-6">
              <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">3</span>
                User Responsibilities
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed text-justify font-medium">You agree to:</p>
              <div className="space-y-3">
                {[
                  "Provide accurate and complete information during registration",
                  "Maintain the confidentiality of your account credentials",
                  "Use the platform only for lawful purposes", 
                  "Not attempt to gain unauthorized access to any part of the system",
                  "Comply with all applicable laws and regulations"
                ].map((item, index) => (
                  <div key={index} className="flex items-start p-3 bg-white/70 rounded-lg border border-blue-100">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3 mt-0.5 flex-shrink-0">
                      ✓
                    </div>
                    <span className="text-gray-700 text-justify">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Remaining sections with similar styling */}
            <div className="space-y-6">
              {[
                {
                  title: "Data Security",
                  content: "We implement industry-standard security measures to protect your personal information. However, you acknowledge that no method of transmission over the internet is 100% secure, and you use the service at your own risk.",
                  color: "from-indigo-500 to-blue-500",
                  bg: "from-indigo-50 to-blue-50",
                  border: "border-indigo-200"
                },
                {
                  title: "Service Availability", 
                  content: "While we strive to maintain continuous service availability, we do not guarantee uninterrupted access. The platform may be temporarily unavailable due to maintenance, updates, or circumstances beyond our control.",
                  color: "from-blue-500 to-purple-500",
                  bg: "from-blue-50 to-purple-50",
                  border: "border-blue-200"
                },
                {
                  title: "Limitation of Liability",
                  content: "The Government of Sri Lanka and LakSewa platform operators shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of the platform.",
                  color: "from-purple-500 to-indigo-500", 
                  bg: "from-purple-50 to-indigo-50",
                  border: "border-purple-200"
                },
                {
                  title: "Modifications to Terms",
                  content: "We reserve the right to modify these terms at any time. Users will be notified of significant changes, and continued use of the platform constitutes acceptance of modified terms.",
                  color: "from-indigo-500 to-cyan-500",
                  bg: "from-indigo-50 to-cyan-50", 
                  border: "border-indigo-200"
                },
                {
                  title: "Contact Information",
                  content: "For questions regarding these Terms of Service, please contact us through the official government channels or the help section of the platform.",
                  color: "from-cyan-500 to-blue-500",
                  bg: "from-cyan-50 to-blue-50",
                  border: "border-cyan-200"
                }
              ].map((section, index) => (
                <div key={index} className={`bg-gradient-to-r ${section.bg} p-6 rounded-2xl border ${section.border}`}>
                  <h3 className={`text-2xl font-bold text-blue-800 mb-4 flex items-center`}>
                    <span className={`w-8 h-8 bg-gradient-to-r ${section.color} rounded-full flex items-center justify-center text-white font-bold text-sm mr-3`}>
                      {index + 4}
                    </span>
                    {section.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-justify">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-6 border-t-2 border-blue-200/50">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-blue-600">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">LakSewa Government Services</span>
            </div>
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center space-x-2"
            >
              <span>Close</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Privacy Policy Dialog Component
const PrivacyPolicyDialog: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black/60 via-green-900/20 to-emerald-900/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-white via-emerald-50/95 to-green-50/90 backdrop-blur-xl rounded-3xl shadow-2xl max-w-5xl max-h-[85vh] overflow-hidden border-2 border-emerald-200/50 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></div>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-xl"></div>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/80 to-emerald-600/80"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/5 to-white/10"></div>
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-1">Privacy Policy</h2>
                <p className="text-green-100 text-sm">Data Protection & Security</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-90"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[60vh] space-y-8">
          <div className="prose max-w-none">
            {/* Information We Collect */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200 mb-6">
              <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">1</span>
                Information We Collect
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed text-justify font-medium">We collect the following types of information:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Personal Information", desc: "Name, email address, phone number, NIC number" },
                  { title: "Account Information", desc: "Username, password (encrypted), account preferences" },
                  { title: "Service Data", desc: "Applications submitted, documents uploaded, transaction history" },
                  { title: "Technical Data", desc: "IP address, browser type, device information, usage analytics" }
                ].map((item, index) => (
                  <div key={index} className="p-4 bg-white/70 rounded-xl border border-green-100">
                    <h4 className="font-bold text-green-700 mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm text-justify">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-200 mb-6">
              <h3 className="text-2xl font-bold text-emerald-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">2</span>
                How We Use Your Information
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed text-justify font-medium">Your information is used to:</p>
              <div className="space-y-3">
                {[
                  "Process government service applications and requests",
                  "Verify your identity and eligibility for services", 
                  "Communicate updates about your applications",
                  "Improve platform functionality and user experience",
                  "Comply with legal and regulatory requirements",
                  "Prevent fraud and ensure platform security"
                ].map((item, index) => (
                  <div key={index} className="flex items-start p-3 bg-white/70 rounded-lg border border-emerald-100">
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3 mt-0.5 flex-shrink-0">
                      ✓
                    </div>
                    <span className="text-gray-700 text-justify">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Information Sharing */}
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-2xl border border-teal-200 mb-6">
              <h3 className="text-2xl font-bold text-teal-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">3</span>
                Information Sharing
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify">
                Your information may be shared with relevant government departments and agencies as necessary to process your service requests. We do not sell, trade, or transfer your personal information to third parties for commercial purposes.
              </p>
            </div>

            {/* Data Security */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl border border-green-200 mb-6">
              <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">4</span>
                Data Security
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed text-justify">We implement robust security measures including:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "End-to-end encryption for sensitive data transmission",
                  "Secure servers with regular security updates",
                  "Multi-factor authentication options", 
                  "Regular security audits and monitoring",
                  "Access controls and user permission management"
                ].map((item, index) => (
                  <div key={index} className="flex items-center p-3 bg-white/70 rounded-lg border border-green-100">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mr-3"></div>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Remaining sections */}
            <div className="space-y-6">
              {[
                {
                  title: "Data Retention",
                  content: "We retain your personal information for as long as necessary to provide services and comply with legal obligations. Some information may be retained for longer periods as required by law or for archival purposes.",
                  color: "from-emerald-500 to-green-500",
                  bg: "from-emerald-50 to-green-50",
                  border: "border-emerald-200"
                },
                {
                  title: "Your Rights",
                  content: "You have rights to access and review your personal information, request corrections to inaccurate data, request deletion of certain personal information (subject to legal requirements), opt-out of non-essential communications, and file complaints about data handling practices.",
                  color: "from-teal-500 to-emerald-500",
                  bg: "from-teal-50 to-emerald-50", 
                  border: "border-teal-200"
                },
                {
                  title: "Cookies and Tracking",
                  content: "We use cookies and similar technologies to enhance your experience, remember your preferences, and analyze platform usage. You can control cookie settings through your browser.",
                  color: "from-green-500 to-teal-500",
                  bg: "from-green-50 to-teal-50",
                  border: "border-green-200"
                },
                {
                  title: "Updates to Privacy Policy", 
                  content: "We may update this Privacy Policy periodically. Users will be notified of significant changes, and the updated policy will be posted on the platform with the effective date.",
                  color: "from-cyan-500 to-emerald-500",
                  bg: "from-cyan-50 to-emerald-50",
                  border: "border-cyan-200"
                },
                {
                  title: "Contact Us",
                  content: "For privacy-related inquiries or to exercise your rights, please contact our Data Protection Officer through the official government channels or the platform's support system.",
                  color: "from-emerald-500 to-blue-500", 
                  bg: "from-emerald-50 to-blue-50",
                  border: "border-emerald-200"
                }
              ].map((section, index) => (
                <div key={index} className={`bg-gradient-to-r ${section.bg} p-6 rounded-2xl border ${section.border}`}>
                  <h3 className={`text-2xl font-bold text-green-800 mb-4 flex items-center`}>
                    <span className={`w-8 h-8 bg-gradient-to-r ${section.color} rounded-full flex items-center justify-center text-white font-bold text-sm mr-3`}>
                      {index + 5}
                    </span>
                    {section.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-justify">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 p-6 border-t-2 border-green-200/50">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-green-600">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">Secure & Protected</span>
            </div>
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center space-x-2"
            >
              <span>Close</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Dialog states
  const [showTermsDialog, setShowTermsDialog] = useState(false);
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);

  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
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
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-200 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-6">
  <div className="bg-transparent backdrop-blur-md flex justify-center items-center h-32">
    <img src={Logo1} alt="LakSewa Logo" className="w-auto h-35 pb-2" />
  </div>

  <p className="text-blue-700">Create your government services account</p>
</div>

          {/* Registration Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-blue-200 hover:shadow-3xl transition-all duration-500 hover:bg-white/95">
            <div className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-blue-800 font-medium mb-2 ">First Name</label>
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
                <label className="block text-blue-800 font-medium mb-2 text-left">Username</label>
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
                <label className="block text-blue-800 font-medium mb-2 text-left">Email Address</label>
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
                <label className="block text-blue-800 font-medium mb-2 text-left">NIC Number</label>
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
                <label className="block text-blue-800 font-medium mb-2 text-left">Phone Number</label>
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
                <label className="block text-blue-800 font-medium mb-2 text-left">Password</label>
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
                <label className="block text-blue-800 font-medium mb-2 text-left">Confirm Password</label>
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
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowTermsDialog(true);
                    }}
                    className="underline hover:text-blue-900 font-semibold transition-all duration-300 hover:scale-105"
                  >
                    Terms of Service
                  </button>
                  {' '}and{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPrivacyDialog(true);
                    }}
                    className="underline hover:text-blue-900 font-semibold transition-all duration-300 hover:scale-105"
                  >
                    Privacy Policy
                  </button>
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

      {/* Dialog Components */}
      <TermsOfServiceDialog
        isOpen={showTermsDialog}
        onClose={() => setShowTermsDialog(false)}
      />
      <PrivacyPolicyDialog
        isOpen={showPrivacyDialog}
        onClose={() => setShowPrivacyDialog(false)}
      />
    </>
  );
};

export default RegisterForm;