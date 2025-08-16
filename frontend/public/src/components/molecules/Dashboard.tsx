import React, { useState } from 'react';
import { LogOut, FileText, Users, Settings, Bell, Home, Search, User, HelpCircle, Menu, X, AlertTriangle } from 'lucide-react';
import Logo1 from '../../assets/Logo.png';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface DashboardProps {
  onLogout: () => void;
}

// Warning Modal Component
interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
}

const WarningModal: React.FC<WarningModalProps> = ({ isOpen, onClose, searchQuery }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 p-8 max-w-md w-full mx-4 animate-pulse">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Service Not Available
        </h3>
        <p className="text-gray-600 text-center mb-2">
          Sorry, we couldn't find any service matching:
        </p>
        <p className="text-lg font-semibold text-amber-600 text-center mb-6 bg-amber-50 px-4 py-2 rounded-lg border border-amber-200">
          "{searchQuery}"
        </p>
        <p className="text-gray-500 text-center text-sm mb-6">
          Please try searching with different keywords or browse through our available departments and services.
        </p>
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 
                   text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 
                   hover:scale-105 hover:shadow-lg"
        >
          Continue Browsing
        </button>
      </div>
    </div>
  );
};

// DepartmentSection component to handle individual department display
interface DepartmentSectionProps {
  department: {
    department: string;
    services: string[];
    icon: React.ElementType;
    color: string;
    bgGradient: string;
    description: string;
    id: string;
  };
  isReversed: boolean;
  navigate: ReturnType<typeof useNavigate>; // Changed to proper navigate type
}

const DepartmentSection: React.FC<DepartmentSectionProps> = ({ department, isReversed, navigate }) => {
  const flexOrderClasses = isReversed ? 'md:flex-row-reverse' : 'md:flex-row';

  const navigateToDepartment = () => {
    navigate(`/${department.id}`);
  };

  const createServiceHash = (serviceName: string) => {
    return serviceName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  return (
    <div
      id={department.id}
      className={`flex flex-col ${flexOrderClasses} items-stretch w-full
                   bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 
                   hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 overflow-hidden
                   ${department.bgGradient}`}
    >
      {/* Department Info Tile */}
      <button
        onClick={navigateToDepartment}
        className="flex-shrink-0 w-full md:w-1/2 p-8 text-center cursor-pointer
                   hover:bg-white/10 transition-all duration-300 rounded-2xl backdrop-blur-sm
                   group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="flex flex-col items-center justify-center h-full relative z-10">
          <div className={`w-20 h-20 bg-gradient-to-br ${department.color} rounded-2xl flex items-center justify-center mb-6 shadow-2xl
                          group-hover:scale-110 group-hover:rotate-3 transition-all duration-500
                          border border-white/30 backdrop-blur-sm`}>
            <department.icon className="w-10 h-10 text-white drop-shadow-lg" />
          </div>
          <h4 className="text-2xl font-bold text-gray-800 mb-3 drop-shadow-lg group-hover:scale-105 transition-transform duration-300">
            {department.department}
          </h4>
          <p className="text-gray-700 text-sm leading-relaxed drop-shadow-md">
            {department.description}
          </p>
        </div>
      </button>

      {/* Services List Tile */}
      <div className="flex-grow w-full md:w-1/2 p-8">
        <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 border border-white/40 h-full flex flex-col justify-center
                        shadow-inner hover:bg-white/35 transition-all duration-300">
          <h5 className="text-xl font-bold text-gray-800 mb-4 drop-shadow-lg">Services</h5>
          <ul className="list-none pl-0 space-y-3">
            {department.services.map((service, idx) => (
              <li key={idx} className="flex items-start">
                <button
                  onClick={() => navigate(`/${department.id}#${createServiceHash(service)}`)}
                  className="text-gray-700 hover:text-gray-900 hover:bg-white/20 cursor-pointer text-left w-full 
                           transition-all duration-300 p-2 rounded-lg hover:scale-105 hover:shadow-lg
                           border border-transparent hover:border-white/30 backdrop-blur-sm font-medium service-item"
                  data-service-name={service}
                >
                  • {service}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [searchNotFound, setSearchNotFound] = useState('');
  
  const navigate = useNavigate(); // Use proper useNavigate hook

  // Enhanced profile navigation function with better error handling
  const handleProfileNavigation = () => {
    try {
      console.log('Navigating to profile page...'); // Debug log
      // Use the exact route path - adjust this based on your routing setup
      navigate('/profile'); // or try '/ProfilePage' if that's your route
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback navigation - adjust based on your actual route structure
      window.location.href = '/profile';
    }
  };

  const ourServicesByDepartment = [
    {
      department: "Election Commission of Sri Lanka",
      services: [
        "Voter Registration or Amendments",
        "Inquiring Election Results",
        "Obtaining Electoral Register Copies",
        "Application for Postal Voting"
      ],
      icon: Users,
      color: 'from-sky-300 to-blue-400',
      bgGradient: 'bg-gradient-to-br from-sky-200 via-blue-300 to-indigo-400',
      description: 'Register to vote, inquire results, and get electoral documents.',
      id: 'election-commission',
    },
    {
      department: "Department of Motor Traffic",
      services: [
        "New Driving License Application",
        "Driving License Renewal",
        "Vehicle Registration",
        "Vehicle Ownership Transfer",
        "Revenue License Renewal",
        "Vehicle Inspection or Fitness Certificates"
      ],
      icon: Home,
      color: 'from-blue-300 to-indigo-400',
      bgGradient: 'bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-400',
      description: 'Apply for licenses, register vehicles, and manage transfers.',
      id: 'motor-traffic',
    },
    {
      department: "Department of Immigration & Emigration",
      services: [
        "New Passport Application",
        "Passport Renewal",
        "Visa Applications",
        "Extension of Visa",
        "Citizenship Application",
        "Dual Citizenship Application"
      ],
      icon: FileText,
      color: 'from-cyan-300 to-teal-400',
      bgGradient: 'bg-gradient-to-br from-cyan-200 via-teal-300 to-sky-400',
      description: 'Apply for passports, visas, and citizenship services.',
      id: 'immigration-emigration',
    },
    {
      department: "Registrar General's Department",
      services: [
        "Obtaining Birth Certificates",
        "Obtaining Marriage Certificates",
        "Obtaining Death Certificates",
        "Correction of Errors in Certificates",
        "Registration of Certificates"
      ],
      icon: Settings,
      color: 'from-indigo-300 to-violet-400',
      bgGradient: 'bg-gradient-to-br from-indigo-200 via-purple-300 to-violet-400',
      description: 'Obtain and correct birth, marriage, and death certificates.',
      id: 'registrar-general',
    }
  ];

  // Search function implementation
  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    const searchTerm = searchQuery.toLowerCase();
    
    // Search in departments
    const matchedDepartment = ourServicesByDepartment.find(dept => 
      dept.department.toLowerCase().includes(searchTerm)
    );

    if (matchedDepartment) {
      // Scroll to department
      const element = document.getElementById(matchedDepartment.id);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'nearest'
        });
        // Add highlight effect
        element.classList.add('ring-4', 'ring-blue-400', 'ring-opacity-75');
        setTimeout(() => {
          element.classList.remove('ring-4', 'ring-blue-400', 'ring-opacity-75');
        }, 3000);
        return;
      }
    }

    // Search in services
    let foundService = false;
    for (const dept of ourServicesByDepartment) {
      const matchedService = dept.services.find(service => 
        service.toLowerCase().includes(searchTerm)
      );
      
      if (matchedService) {
        // Scroll to the department containing the service
        const element = document.getElementById(dept.id);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
          });
          
          // Add highlight effect to the whole department
          element.classList.add('ring-4', 'ring-green-400', 'ring-opacity-75');
          
          // Find and highlight the specific service
          const serviceElements = element.querySelectorAll('.service-item');
          serviceElements.forEach(serviceEl => {
            const serviceName = serviceEl.getAttribute('data-service-name');
            if (serviceName && serviceName.toLowerCase().includes(searchTerm)) {
              serviceEl.classList.add('bg-green-100', 'border-green-400', 'scale-110', 'shadow-lg');
              setTimeout(() => {
                serviceEl.classList.remove('bg-green-100', 'border-green-400', 'scale-110', 'shadow-lg');
              }, 3000);
            }
          });
          
          setTimeout(() => {
            element.classList.remove('ring-4', 'ring-green-400', 'ring-opacity-75');
          }, 3000);
          foundService = true;
          break;
        }
      }
    }

    // If no match found, show warning modal
    if (!foundService) {
      setSearchNotFound(searchQuery);
      setShowWarningModal(true);
    }
    
    // Clear search query after search
    setSearchQuery('');
  };

  // Handle Enter key press in search
  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const notifications = [
    {
      id: 1,
      title: 'Application Approved',
      message: 'Your passport application has been approved',
      time: '2 hours ago',
      type: 'success'
    },
    {
      id: 2,
      title: 'Document Ready',
      message: 'Your birth certificate is ready for collection',
      time: '1 day ago',
      type: 'info'
    },
    {
      id: 3,
      title: 'Payment Due',
      message: 'Property tax payment is due in 5 days',
      time: '3 days ago',
      type: 'warning'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
      {/* Warning Modal */}
      <WarningModal 
        isOpen={showWarningModal}
        onClose={() => setShowWarningModal(false)}
        searchQuery={searchNotFound}
      />

      {/* Enhanced Header */}
      <div className="bg-white/95 backdrop-blur-xl shadow-2xl border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo Section */}
            <div className="flex items-center group">
               <div className="bg-transparent backdrop-blur-md">
                 <img src={Logo1} alt="LakSewa Logo" className="w-auto h-20 mx-auto mr-4" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hidden sm:block">
                  Powered by Mestrix4
                </h1>
                <span className="text-blue-600/80 text-sm hidden sm:block text-left">
                  Centralized Government Services
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Enhanced Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  className="w-80 px-4 py-2 pl-10 pr-12 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all duration-300 shadow-lg hover:shadow-xl"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-500" />
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-sky-400 to-blue-500
                           hover:from-sky-500 hover:to-blue-600 text-white p-1.5 rounded-full transition-all duration-300
                           hover:scale-110 hover:shadow-lg"
                >
                  <Search className="w-3 h-3" />
                </button>
              </div>

              {/* Navigation Buttons */}
              <button 
                onClick={handleProfileNavigation}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-sky-400 to-blue-500 
                         hover:from-sky-500 hover:to-blue-600 text-white rounded-full transition-all duration-300 
                         hover:scale-105 hover:shadow-lg"
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>

              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-teal-500 
                               hover:from-cyan-500 hover:to-teal-600 text-white rounded-full transition-all duration-300 
                               hover:scale-105 hover:shadow-lg">
                <HelpCircle className="w-4 h-4" />
                <span>Help</span>
              </button>

              {/* Notifications */}
              <button className="relative p-3 text-blue-500 hover:text-white hover:bg-gradient-to-br from-sky-400 to-blue-500 
                               rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg border border-blue-300
                               hover:border-transparent">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-400 to-rose-500 text-white text-xs 
                               rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse">
                  3
                </span>
              </button>

              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="flex items-center bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 
                         text-white px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg group"
              >
                <LogOut className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <button className="relative p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded-lg transition-all duration-300">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-pink-400 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded-lg transition-all duration-300"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 mb-4 p-4 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  className="w-full px-4 py-2 pl-10 pr-12 bg-white/80 border border-blue-200 rounded-full
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-500" />
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-sky-400 to-blue-500
                           hover:from-sky-500 hover:to-blue-600 text-white p-1.5 rounded-full transition-all duration-300"
                >
                  <Search className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-2">
                <button 
                  onClick={() => {
                    handleProfileNavigation();
                    setIsMenuOpen(false); // Close mobile menu
                  }}
                  className="w-full flex items-center space-x-2 px-4 py-3 bg-sky-400 hover:bg-sky-500 text-white rounded-xl transition-all duration-300"
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </button>
                <button className="w-full flex items-center space-x-2 px-4 py-3 bg-cyan-400 hover:bg-cyan-500 text-white rounded-xl transition-all duration-300">
                  <HelpCircle className="w-4 h-4" />
                  <span>Help</span>
                </button>
                <button
                  onClick={onLogout}
                  className="w-full flex items-center space-x-2 px-4 py-3 bg-rose-400 hover:bg-rose-500 text-white rounded-xl transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Welcome Section */}
        <div className="bg-gradient-to-br from-white/95 via-sky-50/80 to-blue-100/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30 mb-8 hover:shadow-3xl transition-all duration-500 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-sky-300/20 to-blue-400/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-cyan-300/20 to-teal-400/20 rounded-full blur-xl"></div>
          
          <div className="text-center relative z-10">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 hover:scale-105 transition-transform duration-300">
              Welcome to LakSewa
            </h2>
            <p className="text-blue-600 text-lg mb-6 font-medium">
              Your gateway to Sri Lankan government services
            </p>
            <div className="bg-gradient-to-r from-green-100 via-emerald-50 to-teal-100 border border-green-300/50 text-green-700 px-8 py-5 rounded-2xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 shadow-lg backdrop-blur-sm">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg"></div>
                <span className="text-lg font-semibold">🎉 Login successful! You have been successfully authenticated.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Department Sections */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8">
              Government Departments & Services
            </h3>
            {ourServicesByDepartment.map((department, index) => (
              <DepartmentSection
                key={index}
                department={department}
                isReversed={index % 2 !== 0}
                navigate={navigate}
              />
            ))}
          </div>

          {/* Enhanced Notifications Panel */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Recent Notifications
            </h3>
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 p-6 hover:shadow-3xl transition-all duration-500">
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="border-l-4 border-gradient-to-b from-sky-400 to-blue-500 pl-4 py-4 hover:bg-gradient-to-r hover:from-sky-50/50 hover:to-blue-50/50 transition-all duration-300 rounded-r-xl cursor-pointer group relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h5 className="font-bold text-blue-700 group-hover:text-indigo-600 transition-colors duration-300">
                          {notification.title}
                        </h5>
                        <p className="text-blue-600 text-sm mt-1 group-hover:text-indigo-500 transition-colors duration-300">
                          {notification.message}
                        </p>
                        <span className="text-blue-500 text-xs mt-2 block font-medium">
                          {notification.time}
                        </span>
                      </div>
                      <div className={`w-4 h-4 rounded-full flex-shrink-0 mt-1 shadow-lg ${
                        notification.type === 'success' ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                        notification.type === 'warning' ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 
                        'bg-gradient-to-r from-sky-400 to-blue-500'
                      } group-hover:scale-125 transition-transform duration-300`}></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <button className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  View All Notifications
                </button>
              </div>
            </div>

            {/* Enhanced Quick Actions */}
            <div className="mt-8 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 p-6 hover:shadow-3xl transition-all duration-500">
              <h4 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                Quick Actions
              </h4>
              <div className="space-y-4">
                <button className="w-full text-left p-4 bg-gradient-to-r from-sky-50 to-blue-50 hover:from-sky-100 hover:to-blue-100 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group border border-sky-200/50">
                  <span className="text-sky-700 font-semibold group-hover:text-blue-700">Apply for New Document</span>
                </button>
                <button className="w-full text-left p-4 bg-gradient-to-r from-cyan-50 to-teal-50 hover:from-cyan-100 hover:to-teal-100 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group border border-cyan-200/50">
                  <span className="text-cyan-700 font-semibold group-hover:text-teal-700">Check Application Status</span>
                </button>
                <button className="w-full text-left p-4 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group border border-indigo-200/50">
                  <span className="text-indigo-700 font-semibold group-hover:text-purple-700">Pay Government Fees</span>
                </button>
                <button className="w-full text-left p-4 bg-gradient-to-r from-violet-50 to-purple-50 hover:from-violet-100 hover:to-purple-100 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group border border-violet-200/50">
                  <span className="text-violet-700 font-semibold group-hover:text-purple-700">Update Personal Info</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-white/95 via-sky-50/80 to-blue-100/60 backdrop-blur-xl border-t border-white/30 py-6 mt-12 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
          © {new Date().getFullYear()} Government of Sri Lanka. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;