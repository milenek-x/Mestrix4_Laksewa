// src/pages/MotorTrafficPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Home, LogOut, Bell, ArrowLeft, FileText, CheckCircle, Car, CreditCard, X, Upload, Calendar, User, MapPin, Phone, Mail, FileImage, Download, Send } from 'lucide-react';
import Logo1 from '../../assets/Logo.png'; // Adjust path as needed

interface MotorTrafficPageProps {
  onLogout?: () => void;
}

interface FormData {
  [key: string]: string | File | null;
}

const MotorTrafficPage: React.FC<MotorTrafficPageProps> = ({ onLogout }) => {
  const { id } = useParams<{ id?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);
  const [formData, setFormData] = useState<FormData>({});
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File }>({});
  const [currentHash, setCurrentHash] = useState(location.hash);

  const departmentData = {
    department: "Department of Motor Traffic",
    services: [
      "New Driving License Application",
      "Driving License Renewal",
      "Vehicle Registration",
      "Vehicle Ownership Transfer",
      "Revenue License Renewal",
      "Vehicle Inspection and Fitness Certificates"
    ],
    icon: Home,
    color: 'from-blue-300 to-indigo-400',
    bgGradient: 'bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-400',
    description: 'Apply for licenses, register vehicles, and manage transfers.',
    id: 'motor-traffic',
  };

  const createServiceHash = (serviceName: string) => {
    return serviceName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  const getServiceFromHash = (hash: string) => {
    if (!hash) return null;
    const serviceHash = hash.substring(1);
    return departmentData.services.find(service => 
      createServiceHash(service) === serviceHash
    ) || null;
  };

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

  const getServiceContent = (serviceName: string) => {
    const serviceContent: { [key: string]: { description: string; requirements: string[]; process: string[] } } = {
      "New Driving License Application": {
        description: "Apply for a new driving license for motorcycles, cars, or heavy vehicles online with digital submission and testing.",
        requirements: [
          "National Identity Card (NIC) or Birth Certificate (Digital Copy)",
          "Medical certificate from approved doctor (Digital Upload)",
          "Completed online application form",
          "Recent passport-sized photographs (Digital Upload)",
          "Proof of residence (Digital Copy)",
          "Driving school completion certificate (Digital Upload)"
        ],
        process: [
          "Complete the online application form through Start Application button",
          "Upload required documents through our secure digital portal",
          "Submit the completed form via our online system",
          "Schedule and complete theory examination online",
          "Schedule practical driving test at nearest testing center",
          "Receive digital confirmation and download license upon passing both tests"
        ]
      },
      "Driving License Renewal": {
        description: "Renew your expired or expiring driving license online to continue legal driving privileges through our digital platform.",
        requirements: [
          "Current driving license (Digital Copy)",
          "National Identity Card (NIC) (Digital Copy)",
          "Medical certificate (if required) (Digital Upload)",
          "Recent passport-sized photographs (Digital Upload)",
          "Online payment of license renewal fees"
        ],
        process: [
          "Complete online renewal application using Start Application button",
          "Upload current license and required documents through secure portal",
          "Complete medical examination if required and upload certificate",
          "Complete online payment of renewal fees via secure payment gateway",
          "Receive renewed driving license digitally within 24 hours",
          "Download and print license or receive via registered mail if needed"
        ]
      },
      "Vehicle Registration": {
        description: "Register new vehicles online with digital document submission to ensure legal ownership and road worthiness.",
        requirements: [
          "Vehicle ownership documents from dealer (Digital Copy)",
          "Insurance certificate (comprehensive cover) (Digital Upload)",
          "National Identity Card of owner (Digital Copy)",
          "Vehicle inspection report (Digital Upload)",
          "Import permit for imported vehicles (Digital Upload)",
          "Online payment of registration fees"
        ],
        process: [
          "Complete online vehicle registration form using Start Application button",
          "Upload all ownership documents and insurance certificate",
          "Submit vehicle inspection report through digital portal",
          "Complete online payment of registration fees and taxes",
          "Receive digital vehicle number allocation and registration certificate",
          "Download registration documents or receive number plates via courier"
        ]
      },
      "Vehicle Ownership Transfer": {
        description: "Transfer vehicle ownership online from seller to buyer with digital documentation and automated legal procedures.",
        requirements: [
          "Original vehicle registration certificate (Digital Copy)",
          "Transfer deed signed by both parties (Digital Upload)",
          "National Identity Cards of seller and buyer (Digital Copies)",
          "Recent vehicle inspection report (Digital Upload)",
          "Insurance certificate in new owner's name (Digital Upload)",
          "Online payment of transfer fees"
        ],
        process: [
          "Complete online transfer application using Start Application button",
          "Upload signed transfer deed and all required documents",
          "Submit vehicle inspection report through digital portal",
          "Complete online payment of transfer fees and applicable taxes",
          "Both parties receive digital confirmation of transfer completion",
          "New owner receives updated registration certificate digitally within 48 hours"
        ]
      },
      "Revenue License Renewal": {
        description: "Renew your vehicle's revenue license online annually to maintain legal road usage and avoid penalties.",
        requirements: [
          "Current revenue license (Digital Copy if available)",
          "Vehicle registration certificate (Digital Copy)",
          "Valid insurance certificate (Digital Upload)",
          "Emission test certificate for applicable vehicles (Digital Upload)",
          "Outstanding fine clearance certificate (Auto-verified online)",
          "Online payment of license fees"
        ],
        process: [
          "Complete online revenue license renewal using Start Application button",
          "Upload vehicle registration and insurance documents",
          "System automatically checks and clears outstanding fines",
          "Upload emission test certificate if required for your vehicle type",
          "Complete secure online payment of license fees",
          "Receive new revenue license digitally and download sticker for printing"
        ]
      },
      "Vehicle Inspection and Fitness Certificates": {
        description: "Apply for mandatory vehicle fitness certificates online and schedule inspection to ensure road safety compliance.",
        requirements: [
          "Vehicle registration certificate (Digital Copy)",
          "Previous fitness certificate if available (Digital Upload)",
          "Vehicle photographs showing current condition (Digital Upload)",
          "Valid insurance certificate (Digital Upload)",
          "Online payment of inspection fees",
          "Vehicle availability for physical inspection at scheduled time"
        ],
        process: [
          "Complete online inspection application using Start Application button",
          "Upload vehicle registration and insurance documents",
          "Submit current vehicle photographs through digital portal",
          "Schedule convenient inspection time at nearest authorized center",
          "Complete online payment of inspection fees",
          "Attend physical inspection and receive digital fitness certificate upon passing"
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
      "New Driving License Application": [
        { name: 'fullName', label: 'Full Name', type: 'text', required: true, icon: User },
        { name: 'nic', label: 'National Identity Card Number', type: 'text', required: true, icon: FileText },
        { name: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: true, icon: Calendar },
        { name: 'address', label: 'Current Residential Address', type: 'textarea', required: true, icon: MapPin },
        { name: 'phone', label: 'Contact Number', type: 'tel', required: true, icon: Phone },
        { name: 'email', label: 'Email Address', type: 'email', required: true, icon: Mail },
        { name: 'licenseType', label: 'License Type', type: 'select', required: true, icon: Car, options: ['Motorcycle (A1)', 'Light Vehicle (B1)', 'Heavy Vehicle (C1)', 'Passenger Vehicle (D1)'] },
        { name: 'nicCopy', label: 'NIC/Birth Certificate', type: 'file', required: true, icon: Upload },
        { name: 'medicalCertificate', label: 'Medical Certificate', type: 'file', required: true, icon: Upload },
        { name: 'photograph', label: 'Recent Photograph', type: 'file', required: true, icon: FileImage },
        { name: 'residenceProof', label: 'Proof of Residence', type: 'file', required: true, icon: Upload },
        { name: 'drivingSchoolCert', label: 'Driving School Certificate', type: 'file', required: true, icon: Upload }
      ],
      "Driving License Renewal": [
        { name: 'fullName', label: 'Full Name', type: 'text', required: true, icon: User },
        { name: 'nic', label: 'National Identity Card Number', type: 'text', required: true, icon: FileText },
        { name: 'currentLicenseNo', label: 'Current License Number', type: 'text', required: true, icon: FileText },
        { name: 'expiryDate', label: 'License Expiry Date', type: 'date', required: true, icon: Calendar },
        { name: 'phone', label: 'Contact Number', type: 'tel', required: true, icon: Phone },
        { name: 'email', label: 'Email Address', type: 'email', required: true, icon: Mail },
        { name: 'currentLicense', label: 'Current Driving License', type: 'file', required: true, icon: Upload },
        { name: 'nicCopy', label: 'NIC Copy', type: 'file', required: true, icon: Upload },
        { name: 'photograph', label: 'Recent Photograph', type: 'file', required: true, icon: FileImage },
        { name: 'medicalCertificate', label: 'Medical Certificate (if required)', type: 'file', required: false, icon: Upload }
      ],
      "Vehicle Registration": [
        { name: 'ownerName', label: 'Vehicle Owner Full Name', type: 'text', required: true, icon: User },
        { name: 'nic', label: 'National Identity Card Number', type: 'text', required: true, icon: FileText },
        { name: 'vehicleMake', label: 'Vehicle Make', type: 'text', required: true, icon: Car },
        { name: 'vehicleModel', label: 'Vehicle Model', type: 'text', required: true, icon: Car },
        { name: 'vehicleYear', label: 'Manufacturing Year', type: 'number', required: true, icon: Calendar },
        { name: 'engineNo', label: 'Engine Number', type: 'text', required: true, icon: FileText },
        { name: 'chassisNo', label: 'Chassis Number', type: 'text', required: true, icon: FileText },
        { name: 'phone', label: 'Contact Number', type: 'tel', required: true, icon: Phone },
        { name: 'email', label: 'Email Address', type: 'email', required: true, icon: Mail },
        { name: 'ownershipDocs', label: 'Vehicle Ownership Documents', type: 'file', required: true, icon: Upload },
        { name: 'insurance', label: 'Insurance Certificate', type: 'file', required: true, icon: Upload },
        { name: 'nicCopy', label: 'NIC Copy', type: 'file', required: true, icon: Upload },
        { name: 'inspectionReport', label: 'Vehicle Inspection Report', type: 'file', required: true, icon: Upload },
        { name: 'importPermit', label: 'Import Permit (if applicable)', type: 'file', required: false, icon: Upload }
      ],
      "Vehicle Ownership Transfer": [
        { name: 'sellerName', label: 'Current Owner (Seller) Name', type: 'text', required: true, icon: User },
        { name: 'sellerNIC', label: 'Seller NIC Number', type: 'text', required: true, icon: FileText },
        { name: 'buyerName', label: 'New Owner (Buyer) Name', type: 'text', required: true, icon: User },
        { name: 'buyerNIC', label: 'Buyer NIC Number', type: 'text', required: true, icon: FileText },
        { name: 'vehicleRegNo', label: 'Vehicle Registration Number', type: 'text', required: true, icon: Car },
        { name: 'transferDate', label: 'Transfer Date', type: 'date', required: true, icon: Calendar },
        { name: 'salePrice', label: 'Sale Price (LKR)', type: 'number', required: true, icon: CreditCard },
        { name: 'buyerPhone', label: 'Buyer Contact Number', type: 'tel', required: true, icon: Phone },
        { name: 'buyerEmail', label: 'Buyer Email Address', type: 'email', required: true, icon: Mail },
        { name: 'regCertificate', label: 'Vehicle Registration Certificate', type: 'file', required: true, icon: Upload },
        { name: 'transferDeed', label: 'Signed Transfer Deed', type: 'file', required: true, icon: Upload },
        { name: 'sellerNICCopy', label: 'Seller NIC Copy', type: 'file', required: true, icon: Upload },
        { name: 'buyerNICCopy', label: 'Buyer NIC Copy', type: 'file', required: true, icon: Upload },
        { name: 'inspectionReport', label: 'Vehicle Inspection Report', type: 'file', required: true, icon: Upload },
        { name: 'newInsurance', label: 'Insurance in New Owner Name', type: 'file', required: true, icon: Upload }
      ],
      "Revenue License Renewal": [
        { name: 'ownerName', label: 'Vehicle Owner Name', type: 'text', required: true, icon: User },
        { name: 'nic', label: 'National Identity Card Number', type: 'text', required: true, icon: FileText },
        { name: 'vehicleRegNo', label: 'Vehicle Registration Number', type: 'text', required: true, icon: Car },
        { name: 'currentLicenseNo', label: 'Current Revenue License Number', type: 'text', required: false, icon: FileText },
        { name: 'phone', label: 'Contact Number', type: 'tel', required: true, icon: Phone },
        { name: 'email', label: 'Email Address', type: 'email', required: true, icon: Mail },
        { name: 'regCertificate', label: 'Vehicle Registration Certificate', type: 'file', required: true, icon: Upload },
        { name: 'insurance', label: 'Valid Insurance Certificate', type: 'file', required: true, icon: Upload },
        { name: 'currentLicense', label: 'Current Revenue License (if available)', type: 'file', required: false, icon: Upload },
        { name: 'emissionTest', label: 'Emission Test Certificate (if required)', type: 'file', required: false, icon: Upload }
      ],
      "Vehicle Inspection and Fitness Certificates": [
        { name: 'ownerName', label: 'Vehicle Owner Name', type: 'text', required: true, icon: User },
        { name: 'nic', label: 'National Identity Card Number', type: 'text', required: true, icon: FileText },
        { name: 'vehicleRegNo', label: 'Vehicle Registration Number', type: 'text', required: true, icon: Car },
        { name: 'vehicleType', label: 'Vehicle Type', type: 'select', required: true, icon: Car, options: ['Private Car', 'Motorcycle', 'Commercial Vehicle', 'Heavy Vehicle', 'Bus', 'Three Wheeler'] },
        { name: 'inspectionCenter', label: 'Preferred Inspection Center', type: 'select', required: true, icon: MapPin, options: ['Colombo Center', 'Kandy Center', 'Galle Center', 'Kurunegala Center', 'Anuradhapura Center'] },
        { name: 'preferredDate', label: 'Preferred Inspection Date', type: 'date', required: true, icon: Calendar },
        { name: 'phone', label: 'Contact Number', type: 'tel', required: true, icon: Phone },
        { name: 'email', label: 'Email Address', type: 'email', required: true, icon: Mail },
        { name: 'regCertificate', label: 'Vehicle Registration Certificate', type: 'file', required: true, icon: Upload },
        { name: 'insurance', label: 'Valid Insurance Certificate', type: 'file', required: true, icon: Upload },
        { name: 'previousFitness', label: 'Previous Fitness Certificate (if available)', type: 'file', required: false, icon: Upload },
        { name: 'vehiclePhotos', label: 'Current Vehicle Photographs', type: 'file', required: true, icon: FileImage }
      ]
    };

    return formFields[serviceName] || [];
  };

  const handleServiceClick = (service: string) => {
    const hash = createServiceHash(service);
    setSelectedService(service);
    navigate(`/motor-traffic#${hash}`);
    setCurrentHash(`#${hash}`);
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleContactSupport = () => {
    const subject = encodeURIComponent(`Support Request - ${selectedService || 'Motor Traffic Services'}`);
    const body = encodeURIComponent(`Dear Motor Traffic Support Team,

I need assistance with: ${selectedService || 'General Inquiry'}

Please provide guidance on the following:
- 

Thank you for your assistance.

Best regards,`);
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=mestrix4.lankasewa@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
  };

  const handleShowAllServices = () => {
    navigate('/motor-traffic');
    setSelectedService(null);
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
            <div className="flex items-center group">
              <div className="bg-transparent backdrop-blur-md">
                <img src={Logo1} alt="LakSewa Logo" className="w-auto h-16 mx-auto mr-4" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Motor Traffic Portal
                </h1>
                <span className="text-blue-600/80 text-sm">
                  Government Services
                </span>
              </div>
            </div>

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

              <button className="relative p-3 text-blue-500 hover:text-white hover:bg-gradient-to-br from-sky-400 to-blue-500 
                               rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg border border-blue-300
                               hover:border-transparent">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-400 to-rose-500 text-white text-xs 
                               rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse">
                  3
                </span>
              </button>

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
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <Car className="w-6 h-6 text-white" />
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
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 hover:shadow-3xl transition-all duration-500">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {selectedService}
                  </h3>
                  <p className="text-blue-600 font-medium">Service Details & Requirements</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-6 border border-sky-200">
                  <h4 className="text-xl font-bold text-sky-800 mb-3">Description</h4>
                  <p className="text-sky-700 leading-relaxed">{getServiceContent(selectedService).description}</p>
                </div>

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

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button 
                    onClick={handleStartApplication}
                    className="flex-1 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Start Application
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center">
                    <Download className="w-5 h-5 mr-2" />
                    Download Forms
                  </button>
                  <button 
                    onClick={handleContactSupport}
                    className="flex-1 bg-gradient-to-r from-indigo-400 to-purple-500 hover:from-indigo-500 hover:to-purple-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center"
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
            <div className="bg-gradient-to-r from-blue-400 to-indigo-500 p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold">Online Application</h3>
                  <p className="text-blue-100">{selectedService}</p>
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
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105"
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
              © {new Date().getFullYear()} Department of Motor Traffic. All Rights Reserved.
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

export default MotorTrafficPage;