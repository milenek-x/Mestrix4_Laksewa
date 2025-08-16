import React, { useEffect, useState } from 'react';
import { Users, LogOut, Bell, ArrowLeft, FileText, CheckCircle, X, Upload, Calendar, User, MapPin, Phone, Mail, FileImage, Download, Send } from 'lucide-react';

interface ElectionCommissionPageProps {
  onLogout?: () => void;
}

interface FormData {
  [key: string]: string | File | null;
}

const ElectionCommissionPage: React.FC<ElectionCommissionPageProps> = ({ onLogout }) => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);
  const [formData, setFormData] = useState<FormData>({});
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File }>({});
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  const departmentData = {
    department: "Election Commission of Sri Lanka",
    services: [
      "Voter Registration and Amendments",
      "Inquiring Election Results", 
      "Obtaining Electoral Register Copies",
      "Application for Postal Voting"
    ],
    icon: Users,
    color: 'from-sky-300 to-blue-400',
    bgGradient: 'bg-gradient-to-br from-sky-200 via-blue-300 to-indigo-400',
    description: 'Register to vote, inquire results, and get electoral documents.',
    id: 'election-commission',
  };

  // Function to create a URL-friendly hash from a service name
  const createServiceHash = (serviceName: string) => {
    return serviceName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  // Function to get service from hash
  const getServiceFromHash = (hash: string) => {
    if (!hash) return null;
    const serviceHash = hash.substring(1);
    return departmentData.services.find(service => 
      createServiceHash(service) === serviceHash
    ) || null;
  };

  // Handle service selection and URL updates
  useEffect(() => {
    const service = getServiceFromHash(currentHash);
    setSelectedService(service);
  }, [currentHash]);

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Updated service content data with online process
  const getServiceContent = (serviceName: string) => {
    const serviceContent: { [key: string]: { description: string; requirements: string[]; process: string[] } } = {
      "Voter Registration and Amendments": {
        description: "Register as a new voter or make amendments to your existing voter registration details through our online portal.",
        requirements: [
          "National Identity Card (NIC) or Birth Certificate (Digital Copy)",
          "Proof of current residential address (Digital Copy)",
          "Recent passport-sized photograph (Digital Upload)",
          "Completed online application form"
        ],
        process: [
          "Complete the online application form through Start Application button",
          "Upload required documents through our secure digital portal",
          "Submit the completed form via our online system",
          "Receive digital confirmation and track application status online",
          "Receive final confirmation within 14 days via email/SMS"
        ]
      },
      "Inquiring Election Results": {
        description: "Access official election results and electoral statistics from past elections through our online database.",
        requirements: [
          "Valid identification for verification (Digital Copy)",
          "Specific election details (year, constituency)",
          "Purpose of inquiry (academic, research, legal)"
        ],
        process: [
          "Complete online inquiry form using Start Application button",
          "Upload identification documents through secure digital portal",
          "Complete online payment if fees are applicable via our payment gateway",
          "Download certified digital copies instantly or access online database",
          "Receive email confirmation with access credentials within 24 hours"
        ]
      },
      "Obtaining Electoral Register Copies": {
        description: "Request certified copies of electoral registers for legal or official purposes through our digital platform.",
        requirements: [
          "Online application with purpose clearly stated",
          "Valid identification documents (Digital Upload)", 
          "Online payment of prescribed fees",
          "Authorization letter if applying on behalf of others (Digital Upload)"
        ],
        process: [
          "Complete online application through Start Application button",
          "Upload required documentation and complete secure online payment",
          "Online processing and verification (5-7 working days)",
          "Download certified digital copies instantly or receive via secure email",
          "Track application status in real-time through our online system"
        ]
      },
      "Application for Postal Voting": {
        description: "Apply for postal voting facility online if you meet eligibility criteria and cannot vote in person.",
        requirements: [
          "Completed online postal voting application form",
          "Valid voter registration (verified through system)",
          "Supporting documents proving eligibility (Digital Upload)",
          "Digital declaration of inability to vote in person"
        ],
        process: [
          "Complete online postal voting application using Start Application button",
          "Upload supporting documents through secure digital portal",
          "Submit application before deadline via our online system",
          "Online verification of eligibility by Election Commission staff",
          "Receive postal voting materials if approved (delivered via registered mail)"
        ]
      }
    };

    return serviceContent[serviceName] || {
      description: `Details about ${serviceName.toLowerCase()}.`,
      requirements: ["Valid identification", "Completed application form"],
      process: ["Submit application", "Document verification", "Processing", "Receive confirmation"]
    };
  };

  // Get form fields based on service type
  const getFormFields = (serviceName: string) => {
    const formFields: { [key: string]: any[] } = {
      "Voter Registration and Amendments": [
        { name: 'fullName', label: 'Full Name', type: 'text', required: true, icon: User },
        { name: 'nic', label: 'National Identity Card Number', type: 'text', required: true, icon: FileText },
        { name: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: true, icon: Calendar },
        { name: 'address', label: 'Current Residential Address', type: 'textarea', required: true, icon: MapPin },
        { name: 'phone', label: 'Contact Number', type: 'tel', required: true, icon: Phone },
        { name: 'email', label: 'Email Address', type: 'email', required: true, icon: Mail },
        { name: 'nicCopy', label: 'NIC/Birth Certificate', type: 'file', required: true, icon: Upload },
        { name: 'addressProof', label: 'Address Proof Document', type: 'file', required: true, icon: Upload },
        { name: 'photograph', label: 'Recent Photograph', type: 'file', required: true, icon: FileImage }
      ],
      "Inquiring Election Results": [
        { name: 'fullName', label: 'Full Name', type: 'text', required: true, icon: User },
        { name: 'nic', label: 'National Identity Card Number', type: 'text', required: true, icon: FileText },
        { name: 'electionYear', label: 'Election Year', type: 'number', required: true, icon: Calendar },
        { name: 'constituency', label: 'Constituency', type: 'text', required: true, icon: MapPin },
        { name: 'inquiryPurpose', label: 'Purpose of Inquiry', type: 'select', required: true, icon: FileText, options: ['Academic Research', 'Legal Purpose', 'Personal Research', 'Media/Journalism'] },
        { name: 'phone', label: 'Contact Number', type: 'tel', required: true, icon: Phone },
        { name: 'email', label: 'Email Address', type: 'email', required: true, icon: Mail },
        { name: 'idDocument', label: 'Identification Document', type: 'file', required: true, icon: Upload }
      ],
      "Obtaining Electoral Register Copies": [
        { name: 'fullName', label: 'Full Name', type: 'text', required: true, icon: User },
        { name: 'nic', label: 'National Identity Card Number', type: 'text', required: true, icon: FileText },
        { name: 'requestPurpose', label: 'Purpose of Request', type: 'textarea', required: true, icon: FileText },
        { name: 'constituency', label: 'Required Constituency', type: 'text', required: true, icon: MapPin },
        { name: 'registrationYear', label: 'Registration Year Required', type: 'number', required: true, icon: Calendar },
        { name: 'phone', label: 'Contact Number', type: 'tel', required: true, icon: Phone },
        { name: 'email', label: 'Email Address', type: 'email', required: true, icon: Mail },
        { name: 'idDocument', label: 'Identification Document', type: 'file', required: true, icon: Upload },
        { name: 'authorizationLetter', label: 'Authorization Letter (if applicable)', type: 'file', required: false, icon: Upload }
      ],
      "Application for Postal Voting": [
        { name: 'fullName', label: 'Full Name', type: 'text', required: true, icon: User },
        { name: 'nic', label: 'National Identity Card Number', type: 'text', required: true, icon: FileText },
        { name: 'voterNumber', label: 'Voter Registration Number', type: 'text', required: true, icon: FileText },
        { name: 'reasonForPostal', label: 'Reason for Postal Voting', type: 'select', required: true, icon: FileText, options: ['Overseas Employment', 'Medical Condition', 'Essential Services', 'Physical Disability', 'Other'] },
        { name: 'currentAddress', label: 'Current Address', type: 'textarea', required: true, icon: MapPin },
        { name: 'mailingAddress', label: 'Mailing Address for Postal Vote', type: 'textarea', required: true, icon: MapPin },
        { name: 'phone', label: 'Contact Number', type: 'tel', required: true, icon: Phone },
        { name: 'email', label: 'Email Address', type: 'email', required: true, icon: Mail },
        { name: 'supportingDocument', label: 'Supporting Document for Eligibility', type: 'file', required: true, icon: Upload },
        { name: 'declaration', label: 'Declaration Document', type: 'file', required: true, icon: Upload }
      ]
    };

    return formFields[serviceName] || [];
  };

  const handleServiceClick = (service: string) => {
    const hash = createServiceHash(service);
    // Update the selected service immediately for better UX
    setSelectedService(service);
    // Then update the URL hash
    window.location.hash = hash;
  };

  const handleBackToDashboard = () => {
    // Navigate to dashboard - you can change this URL to match your routing setup
    window.location.href = '/dashboard';
    // Alternative: if using React Router, you can use navigate('/dashboard');
  };

  const handleContactSupport = () => {
    const subject = encodeURIComponent(`Support Request - ${selectedService || 'Election Commission Services'}`);
    const body = encodeURIComponent(`Dear Election Commission Support Team,

I need assistance with: ${selectedService || 'General Inquiry'}

Please provide guidance on the following:
- 

Thank you for your assistance.

Best regards,`);
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=mestrix4.lankasewa@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
  };

  const handleShowAllServices = () => {
    setSelectedService(null);
    window.location.hash = '';
    setCurrentHash('');
  };

  const handleStartApplication = () => {
    console.log('Start Application clicked for:', selectedService);
    setShowApplicationDialog(true);
    setFormData({});
    setUploadedFiles({});
  };

  const handleCloseDialog = () => {
    setShowApplicationDialog(false);
    setFormData({});
    setUploadedFiles({});
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (name: string, file: File) => {
    setUploadedFiles(prev => ({ ...prev, [name]: file }));
    setFormData(prev => ({ ...prev, [name]: file }));
  };

  const handleSubmitApplication = () => {
    // Here you would typically send the data to your backend
    alert('Application submitted successfully! You will receive a confirmation email shortly.');
    handleCloseDialog();
  };

  const renderFormField = (field: any) => {
    const IconComponent = field.icon;
    
    return (
      <div key={field.name} className="space-y-2">
        <label className="flex items-center text-sm font-semibold text-blue-800">
          <IconComponent className="w-4 h-4 mr-2 text-blue-600" />
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {field.type === 'textarea' ? (
          <textarea
            className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/80 backdrop-blur-sm"
            rows={3}
            value={(formData[field.name] as string) || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
          />
        ) : field.type === 'select' ? (
          <select
            className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/80 backdrop-blur-sm"
            value={(formData[field.name] as string) || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option: string) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : field.type === 'file' ? (
          <div className="space-y-2">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-blue-300 border-dashed rounded-xl cursor-pointer bg-blue-50/50 hover:bg-blue-100/50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-2 pb-2">
                  <Upload className="w-6 h-6 mb-2 text-blue-500" />
                  <p className="text-sm text-blue-600">
                    {uploadedFiles[field.name] ? uploadedFiles[field.name].name : `Upload ${field.label}`}
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(field.name, file);
                  }}
                  required={field.required}
                />
              </label>
            </div>
          </div>
        ) : (
          <input
            type={field.type}
            className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/80 backdrop-blur-sm"
            value={(formData[field.name] as string) || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
          />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
      {/* Enhanced Header */}
      <div className="bg-white/95 backdrop-blur-xl shadow-2xl border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo Section */}
            <div className="flex items-center group">
              <div className="bg-transparent backdrop-blur-md">
                <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl flex items-center justify-center mr-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Election Commission Portal
                </h1>
                <span className="text-blue-600/80 text-sm">
                  Government Services
                </span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToDashboard}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-sky-400 to-blue-500 
                         hover:from-sky-500 hover:to-blue-600 text-white rounded-full transition-all duration-300 
                         hover:scale-105 hover:shadow-lg"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
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
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="flex items-center bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 
                           text-white px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                >
                  <LogOut className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Department Header */}
        <div className={`${departmentData.bgGradient} backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 mb-8 relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          
          <div className="flex flex-col items-center justify-center relative z-10">
            <div className={`w-24 h-24 bg-gradient-to-br ${departmentData.color} rounded-2xl flex items-center justify-center mb-6 shadow-2xl border border-white/30`}>
              <departmentData.icon className="w-12 h-12 text-white drop-shadow-lg" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4 drop-shadow-lg text-center">
              {departmentData.department}
            </h2>
            <p className="text-gray-700 text-lg text-center max-w-2xl leading-relaxed drop-shadow-md">
              {departmentData.description}
            </p>
          </div>
        </div>

        {/* Service Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleShowAllServices}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                !selectedService 
                  ? 'bg-gradient-to-r from-sky-400 to-blue-500 text-white shadow-lg' 
                  : 'bg-white/80 text-blue-600 border border-blue-200 hover:bg-blue-50'
              }`}
            >
              All Services
            </button>
            {departmentData.services.map((service) => (
              <button
                key={service}
                onClick={() => handleServiceClick(service)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  selectedService === service
                    ? 'bg-gradient-to-r from-sky-400 to-blue-500 text-white shadow-lg'
                    : 'bg-white/80 text-blue-600 border border-blue-200 hover:bg-blue-50'
                }`}
              >
                {service}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        {!selectedService ? (
          // Show all services
          <div className="space-y-6">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8 text-center">
              Available Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {departmentData.services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer group"
                  onClick={() => handleServiceClick(service)}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-blue-800 group-hover:text-indigo-600 transition-colors duration-300">
                      {service}
                    </h4>
                  </div>
                  <p className="text-blue-600 mb-4 group-hover:text-indigo-500 transition-colors duration-300">
                    {getServiceContent(service).description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sky-600 font-semibold group-hover:text-blue-600 transition-colors duration-300">
                      Click to learn more →
                    </span>
                    <CheckCircle className="w-5 h-5 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Show selected service
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 hover:shadow-3xl transition-all duration-500">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {selectedService}
                  </h3>
                  <p className="text-blue-600 font-medium">Service Details & Requirements</p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Description */}
                <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-6 border border-sky-200">
                  <h4 className="text-xl font-bold text-sky-800 mb-3">Description</h4>
                  <p className="text-sky-700 leading-relaxed">{getServiceContent(selectedService).description}</p>
                </div>

                {/* Requirements */}
                <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl p-6 border border-cyan-200">
                  <h4 className="text-xl font-bold text-cyan-800 mb-4">Required Documents</h4>
                  <ul className="space-y-2">
                    {getServiceContent(selectedService).requirements.map((req, index) => (
                      <li key={index} className="flex items-center text-cyan-700">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Process */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
                  <h4 className="text-xl font-bold text-indigo-800 mb-4">Application Process</h4>
                  <div className="space-y-4">
                    {getServiceContent(selectedService).process.map((step, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-indigo-700 mt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button 
                    onClick={handleStartApplication}
                    className="flex-1 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Start Application
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    Download Forms
                  </button>
                  <button 
                    onClick={handleContactSupport}
                    className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Application Dialog */}
      {showApplicationDialog && selectedService && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Dialog Header */}
            <div className="bg-gradient-to-r from-sky-400 to-blue-500 p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold">Online Application</h3>
                  <p className="text-sky-100">{selectedService}</p>
                </div>
                <button
                  onClick={handleCloseDialog}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Dialog Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <form onSubmit={(e) => { e.preventDefault(); handleSubmitApplication(); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getFormFields(selectedService).map(renderFormField)}
                </div>

                {/* Submit Section */}
                <div className="mt-8 pt-6 border-t border-blue-200">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 mb-6">
                    <h4 className="text-lg font-bold text-green-800 mb-3 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Application Summary
                    </h4>
                    <p className="text-green-700">
                      Please review all information before submitting. Once submitted, you will receive a confirmation email 
                      with your application reference number and tracking details.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="button"
                      onClick={handleCloseDialog}
                      className="flex-1 bg-gradient-to-r from-slate-400 to-gray-500 hover:from-slate-500 hover:to-gray-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Submit Application
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-white/95 via-sky-50/80 to-blue-100/60 backdrop-blur-xl border-t border-white/30 py-8 mt-12 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="text-sm bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
              © {new Date().getFullYear()} Election Commission of Sri Lanka. All Rights Reserved.
            </div>
            <div className="flex justify-center items-center space-x-2 text-sm text-blue-600">
              <Mail className="w-4 h-4" />
              <span>Support Email: </span>
              <button
                onClick={() => handleContactSupport()}
                className="text-blue-700 hover:text-blue-900 font-semibold hover:underline transition-colors"
              >
                mestrix4.lankasewa@gmail.com
              </button>
            </div>
            <div className="text-xs text-blue-500">
              Click the email above to open Gmail with a pre-filled support request
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ElectionCommissionPage;