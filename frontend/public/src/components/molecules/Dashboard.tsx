import React from 'react';
import { Building2, LogOut, FileText, Users, Settings, Bell, Home } from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const services = [
    {
      icon: FileText,
      title: 'Document Services',
      description: 'Birth certificates, passports, and other official documents',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Users,
      title: 'Citizen Services',
      description: 'Registration, ID cards, and citizen information updates',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: Home,
      title: 'Property Services',
      description: 'Land registration, property transfers, and certificates',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      icon: Settings,
      title: 'Government Services',
      description: 'Tax filing, licenses, permits, and government applications',
      color: 'from-purple-500 to-purple-600'
    }
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md shadow-lg border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center group">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-blue-900 hover:text-blue-800 transition-colors duration-300">
                Lanka Sewa Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-300 hover:scale-105">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
              <button
                onClick={onLogout}
                className="flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group"
              >
                <LogOut className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-blue-200 mb-8 hover:shadow-2xl transition-all duration-500">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-900 mb-4 hover:text-blue-800 transition-colors duration-300">
              Welcome to Lanka Sewa
            </h2>
            <p className="text-blue-700 text-lg mb-6">
              Your gateway to Sri Lankan government services
            </p>
            <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg hover:bg-green-50 transition-colors duration-300">
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                🎉 Login successful! You have been successfully authenticated.
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Services Grid */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-blue-900 mb-6">Available Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-blue-200 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer group"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-blue-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                    {service.title}
                  </h4>
                  <p className="text-blue-700 group-hover:text-blue-600 transition-colors duration-300">
                    {service.description}
                  </p>
                  <div className="mt-4">
                    <button className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-all duration-300 group-hover:translate-x-1">
                      Learn More →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications Panel */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-blue-900 mb-6">Recent Notifications</h3>
            <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-blue-200 p-6 hover:shadow-2xl transition-all duration-500">
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="border-l-4 border-blue-500 pl-4 py-3 hover:border-blue-600 hover:bg-blue-50/50 transition-all duration-300 rounded-r-lg cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h5 className="font-semibold text-blue-900 group-hover:text-blue-700 transition-colors duration-300">
                          {notification.title}
                        </h5>
                        <p className="text-blue-700 text-sm mt-1 group-hover:text-blue-600 transition-colors duration-300">
                          {notification.message}
                        </p>
                        <span className="text-blue-500 text-xs mt-2 block">
                          {notification.time}
                        </span>
                      </div>
                      <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 ${
                        notification.type === 'success' ? 'bg-green-500' :
                        notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                      } group-hover:scale-125 transition-transform duration-300`}></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <button className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-all duration-300 hover:scale-105">
                  View All Notifications
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-blue-200 p-6 hover:shadow-2xl transition-all duration-500">
              <h4 className="text-xl font-semibold text-blue-900 mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md group">
                  <span className="text-blue-700 font-medium group-hover:text-blue-800">Apply for New Document</span>
                </button>
                <button className="w-full text-left p-3 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md group">
                  <span className="text-indigo-700 font-medium group-hover:text-indigo-800">Check Application Status</span>
                </button>
                <button className="w-full text-left p-3 bg-cyan-50 hover:bg-cyan-100 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md group">
                  <span className="text-cyan-700 font-medium group-hover:text-cyan-800">Pay Government Fees</span>
                </button>
                <button className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md group">
                  <span className="text-purple-700 font-medium group-hover:text-purple-800">Update Personal Info</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;