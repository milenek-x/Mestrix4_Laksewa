import React, { useState } from 'react';
import { User, Edit3, Save, X, Mail, Phone, MapPin, Calendar, Shield, Clock, FileText, CheckCircle, AlertCircle, Eye, Download, ArrowLeft, Bell, LogOut, Search, Camera } from 'lucide-react';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Kasun Perera',
    email: 'kasun.perera@email.com',
    phone: '+94 77 123 4567',
    nic: '199512345678',
    address: '123, Main Street, Colombo 07',
    dateOfBirth: '1995-03-15',
    occupation: 'Software Engineer',
    emergencyContact: '+94 71 987 6543'
  });

  const [tempData, setTempData] = useState({ ...profileData });

  // Mock service history data
  const serviceHistory = [
    {
      id: 1,
      service: 'Voter Registration',
      department: 'Election Commission',
      date: '2024-01-15',
      status: 'completed',
      applicationId: 'EC2024001'
    },
    {
      id: 2,
      service: 'Birth Certificate Copy',
      department: 'Registrar General',
      date: '2024-02-20',
      status: 'processing',
      applicationId: 'RG2024045'
    },
    {
      id: 3,
      service: 'Driving License Renewal',
      department: 'Department of Motor Traffic',
      date: '2024-03-10',
      status: 'completed',
      applicationId: 'DMT2024123'
    },
    {
      id: 4,
      service: 'Police Report',
      department: 'Sri Lanka Police',
      date: '2024-03-25',
      status: 'pending',
      applicationId: 'SLP2024078'
    }
  ];

  const notifications = [
    {
      id: 1,
      title: 'Application Approved',
      message: 'Your voter registration has been successfully processed.',
      date: '2024-01-16',
      type: 'success'
    },
    {
      id: 2,
      title: 'Document Required',
      message: 'Additional documents needed for your birth certificate application.',
      date: '2024-02-22',
      type: 'warning'
    },
    {
      id: 3,
      title: 'Service Update',
      message: 'New online services are now available.',
      date: '2024-03-01',
      type: 'info'
    }
  ];

  const handleEdit = () => {
    setTempData({ ...profileData });
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData({ ...tempData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData({ ...profileData });
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setTempData(prev => ({ ...prev, [field]: value }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200';
      case 'processing':
        return 'bg-gradient-to-r from-blue-100 to-sky-100 text-blue-700 border-blue-200';
      case 'pending':
        return 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'processing':
        return <Clock className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-2xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-sky-100 to-cyan-100 rounded-full blur-xl opacity-50"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/50">
                <User className="w-16 h-16 text-white" />
              </div>
              <button className="absolute bottom-2 right-2 w-10 h-10 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg">
                <Camera className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                {profileData.name}
              </h2>
              <p className="text-blue-600 font-medium mb-1">{profileData.occupation}</p>
              <p className="text-gray-600 mb-4">{profileData.email}</p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center bg-gradient-to-r from-sky-50 to-blue-50 px-4 py-2 rounded-full border border-sky-200">
                  <Shield className="w-4 h-4 text-sky-600 mr-2" />
                  <span className="text-sky-700 text-sm font-medium">Verified Account</span>
                </div>
                <div className="flex items-center bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-full border border-green-200">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-green-700 text-sm font-medium">Active Status</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={isEditing ? handleSave : handleEdit}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                isEditing
                  ? 'bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white'
                  : 'bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white'
              }`}
            >
              {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
            </button>
            
            {isEditing && (
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
          Personal Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(profileData).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <label className="block text-sm font-semibold text-blue-700 capitalize">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </label>
              {isEditing ? (
                <input
                  type={key === 'email' ? 'email' : key === 'dateOfBirth' ? 'date' : 'text'}
                  value={tempData[key as keyof typeof tempData]}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  className="w-full px-4 py-3 bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                />
              ) : (
                <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-xl text-gray-700">
                  {value}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderHistorySection = () => (
    <div className="space-y-6">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Service History
          </h3>
          <div className="flex items-center space-x-2 bg-gradient-to-r from-sky-50 to-blue-50 px-4 py-2 rounded-full border border-sky-200">
            <FileText className="w-4 h-4 text-sky-600" />
            <span className="text-sky-700 font-medium">{serviceHistory.length} Applications</span>
          </div>
        </div>
        
        <div className="space-y-4">
          {serviceHistory.map((item) => (
            <div key={item.id} className="bg-gradient-to-r from-white to-sky-50/50 rounded-2xl border border-sky-100 p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-bold text-blue-800">{item.service}</h4>
                    <div className={`flex items-center space-x-1 px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(item.status)}`}>
                      {getStatusIcon(item.status)}
                      <span className="capitalize">{item.status}</span>
                    </div>
                  </div>
                  <p className="text-blue-600 font-medium mb-1">{item.department}</p>
                  <div className="flex items-center text-gray-600 text-sm space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      {item.applicationId}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white rounded-full transition-all duration-300 hover:scale-105">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">View</span>
                  </button>
                  {item.status === 'completed' && (
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white rounded-full transition-all duration-300 hover:scale-105">
                      <Download className="w-4 h-4" />
                      <span className="text-sm">Download</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Notifications
          </h3>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white rounded-full transition-all duration-300 hover:scale-105">
            <Bell className="w-4 h-4" />
            <span className="text-sm">Mark All Read</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className={`rounded-2xl border p-6 hover:shadow-lg transition-all duration-300 ${
              notification.type === 'success' ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' :
              notification.type === 'warning' ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200' :
              'bg-gradient-to-r from-blue-50 to-sky-50 border-blue-200'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{notification.title}</h4>
                  <p className="text-gray-600 mb-2">{notification.message}</p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(notification.date).toLocaleDateString()}
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  notification.type === 'success' ? 'bg-green-500' :
                  notification.type === 'warning' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
          Security Settings
        </h3>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-6 border border-sky-200">
            <h4 className="text-lg font-bold text-blue-800 mb-4">Password & Authentication</h4>
            <div className="space-y-4">
              <button className="w-full text-left px-4 py-3 bg-white rounded-xl border border-sky-200 hover:bg-sky-50 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-blue-700">Change Password</span>
                  <ArrowLeft className="w-4 h-4 text-blue-500 rotate-180" />
                </div>
              </button>
              <button className="w-full text-left px-4 py-3 bg-white rounded-xl border border-sky-200 hover:bg-sky-50 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-blue-700">Two-Factor Authentication</span>
                  <ArrowLeft className="w-4 h-4 text-blue-500 rotate-180" />
                </div>
              </button>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
            <h4 className="text-lg font-bold text-green-800 mb-4">Account Security</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-green-700">Account Status</span>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 font-medium">Active & Verified</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-green-700">Last Login</span>
                <span className="text-green-600 font-medium">Today, 10:30 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-xl shadow-2xl border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  My Profile
                </h1>
                <p className="text-blue-600/80 text-sm">Manage your account settings</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-full focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                />
              </div>
              
              <button className="relative p-3 text-blue-500 hover:text-white hover:bg-gradient-to-br from-sky-400 to-blue-500 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg border border-blue-300 hover:border-transparent">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-400 to-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse">
                  3
                </span>
              </button>
              
              <button className="flex items-center bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                <LogOut className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'history', label: 'History', icon: Clock },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'security', label: 'Security', icon: Shield }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-sky-400 to-blue-500 text-white shadow-lg'
                    : 'bg-white/80 text-blue-600 border border-blue-200 hover:bg-blue-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && renderProfileSection()}
        {activeTab === 'history' && renderHistorySection()}
        {activeTab === 'notifications' && renderNotificationsSection()}
        {activeTab === 'security' && renderSecuritySection()}
      </div>
    </div>
  );
};

export default ProfilePage;