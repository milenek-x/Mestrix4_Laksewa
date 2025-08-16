// src/pages/ImmigrationEmigrationPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { FileText, LogOut, Bell, ArrowLeft, CheckCircle, Plane, Globe, X, Upload, Calendar, User, MapPin, Phone, Mail, FileImage, Download, Send, CreditCard, Flag } from 'lucide-react';
import Logo1 from '../../assets/Logo.png'; // Adjust path as needed

interface ImmigrationEmigrationPageProps {
  onLogout?: () => void;
}

interface FormData {
  [key: string]: string | File | null;
}

const ImmigrationEmigrationPage: React.FC<ImmigrationEmigrationPageProps> = ({ onLogout }) => {
  const { id } = useParams<{ id?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);
  const [formData, setFormData] = useState<FormData>({});
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File }>({});
  const [currentHash, setCurrentHash] = useState(location.hash);

  const departmentData = {
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
      "New Passport Application": {
        description: "Apply for a new Sri Lankan passport online for international travel with digital document submission and verification.",
        requirements: [
          "Birth certificate (Digital Upload)",
          "National Identity Card (NIC) (Digital Copy)",
          "Completed online passport application form",
          "Recent passport-sized photographs (Digital Upload)",
          "Character certificate from Grama Niladhari (Digital Upload)",
          "Online payment of passport application fees",
          "Educational certificates for verification (Digital Upload)"
        ],
        process: [
          "Complete the online passport application using Start Application button",
          "Upload all required documents through secure digital portal",
          "Submit the completed application via our online system",
          "Schedule biometric data collection at nearest Regional Office",
          "Complete online interview with passport officer if required",
          "Receive passport via registered mail or collect from office within 7-14 days"
        ]
      },
      "Passport Renewal": {
        description: "Renew your expired or expiring Sri Lankan passport online to continue international travel privileges through our digital platform.",
        requirements: [
          "Current passport (Digital Copy)",
          "National Identity Card (NIC) (Digital Copy)",
          "Completed online passport renewal form",
          "Recent passport-sized photographs (Digital Upload)",
          "Online payment of passport renewal fees",
          "Police clearance if passport expired over 3 years (Digital Upload)"
        ],
        process: [
          "Complete online renewal application using Start Application button",
          "Upload current passport and required documents through digital portal",
          "Submit renewal application via our secure online system",
          "Schedule biometric verification at Regional Office if required",
          "Complete online payment of applicable renewal fees",
          "Receive renewed passport via registered mail within specified timeframe"
        ]
      },
      "Visa Applications": {
        description: "Apply online for various types of visas for foreign nationals to enter and stay in Sri Lanka legally through our digital visa system.",
        requirements: [
          "Valid foreign passport (Digital Copy)",
          "Completed online visa application form",
          "Recent passport photographs (Digital Upload)",
          "Proof of purpose of visit (Digital Upload)",
          "Financial documentation (Digital Upload)",
          "Return flight tickets or travel itinerary (Digital Upload)",
          "Accommodation details in Sri Lanka (Digital Upload)"
        ],
        process: [
          "Complete online visa application using Start Application button",
          "Upload passport and all supporting documents through secure portal",
          "Submit application with digital payment of visa processing fees",
          "Track application status through our online system",
          "Attend virtual interview if required via video call",
          "Receive electronic visa approval and download visa documents"
        ]
      },
      "Extension of Visa": {
        description: "Extend your current visa online to prolong your legal stay in Sri Lanka for valid reasons through our digital extension system.",
        requirements: [
          "Current valid passport with existing visa (Digital Copy)",
          "Online visa extension application form",
          "Recent passport photographs (Digital Upload)",
          "Proof of reason for extension (Digital Upload)",
          "Financial means to support extended stay (Digital Upload)",
          "Online payment of extension fees",
          "No objection letter from relevant authorities if required (Digital Upload)"
        ],
        process: [
          "Complete online extension application using Start Application button before current visa expires",
          "Upload all required documents through secure digital portal",
          "Provide detailed justification for extension request online",
          "Complete secure online payment of extension processing fees",
          "Track application status and receive updates via email/SMS",
          "Download extended visa permit or receive updated visa digitally"
        ]
      },
      "Citizenship Application": {
        description: "Apply for Sri Lankan citizenship online through naturalization, registration, or other eligible categories with digital document processing.",
        requirements: [
          "Proof of eligibility for citizenship category (Digital Upload)",
          "Birth certificates of applicant and parents (Digital Copies)",
          "Marriage certificate if applicable (Digital Upload)",
          "Proof of continuous residence in Sri Lanka (Digital Upload)",
          "Character certificates and police clearances (Digital Upload)",
          "Language proficiency certificates (Digital Upload)",
          "Medical certificate (Digital Upload)",
          "Online payment of citizenship application fees"
        ],
        process: [
          "Complete comprehensive online citizenship application using Start Application button",
          "Upload all required documentation through secure digital portal",
          "Submit application via our online system with digital payment",
          "Schedule virtual interview and verification process online",
          "Complete online background checks and security clearance process",
          "Receive citizenship certificate digitally upon approval and via registered mail"
        ]
      },
      "Dual Citizenship Application": {
        description: "Apply online for dual citizenship to retain Sri Lankan citizenship while holding foreign nationality through our digital processing system.",
        requirements: [
          "Current foreign passport and citizenship documents (Digital Copies)",
          "Original Sri Lankan birth certificate (Digital Upload)",
          "Evidence of Sri Lankan parentage (Digital Upload)",
          "Completed online dual citizenship application",
          "Recent passport photographs (Digital Upload)",
          "Character certificates from both countries (Digital Upload)",
          "Online payment of dual citizenship application fees"
        ],
        process: [
          "Complete online dual citizenship application using Start Application button",
          "Upload all eligibility documents through secure digital portal",
          "Submit comprehensive application via our online system",
          "Complete online background verification and document authentication",
          "Make secure online payment of applicable fees and processing charges",
          "Receive dual citizenship certificate digitally and via registered mail"
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
      "New Passport Application": [
        { name: 'fullName', label: 'Full Name (as per Birth Certificate)', type: 'text', required: true, icon: User },
        { name: 'nic', label: 'National Identity Card Number', type: 'text', required: true, icon: FileText },
        { name: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: true, icon: Calendar },
        { name: 'placeOfBirth', label: 'Place of Birth', type: 'text', required: true, icon: MapPin },
        { name: 'address', label: 'Current Residential Address', type: 'textarea', required: true, icon: MapPin },
        { name: 'phone', label: 'Contact Number', type: 'tel', required: true, icon: Phone },
        { name: 'email', label: 'Email Address', type: 'email', required: true, icon: Mail },
        { name: 'passportType', label: 'Passport Type', type: 'select', required: true, icon: Globe, options: ['Ordinary Passport', 'Official Passport', 'Diplomatic Passport'] },
        { name: 'emergencyContact', label: 'Emergency Contact Name', type: 'text', required: true, icon: User },
        { name: 'emergencyPhone', label: 'Emergency Contact Phone', type: 'tel', required: true, icon: Phone },
        { name: 'birthCertificate', label: 'Birth Certificate', type: 'file', required: true, icon: Upload },
        { name: 'nicCopy', label: 'NIC Copy', type: 'file', required: true, icon: Upload },
        { name: 'photographs', label: 'Passport Photographs (4 copies)', type: 'file', required: true, icon: FileImage },
        { name: 'characterCertificate', label: 'Character Certificate', type: 'file', required: true, icon: Upload },
        { name: 'educationCertificates', label: 'Educational Certificates', type: 'file', required: true, icon: Upload }
      ],
      "Passport Renewal": [
        { name: 'fullName', label: 'Full Name', type: 'text', required: true, icon: User },
        { name: 'nic', label: 'National Identity Card Number', type: 'text', required: true, icon: FileText },
        { name: 'currentPassportNo', label: 'Current Passport Number', type: 'text', required: true, icon: Globe },
        { name: 'passportIssueDate', label: 'Passport Issue Date', type: 'date', required: true, icon: Calendar },
        { name: 'passportExpiryDate', label: 'Passport Expiry Date', type: 'date', required: true, icon: Calendar },
        { name: 'phone', label: 'Contact Number', type: 'tel', required: true, icon: Phone },
        { name: 'email', label: 'Email Address', type: 'email', required: true, icon: Mail },
        { name: 'renewalReason', label: 'Reason for Renewal', type: 'select', required: true, icon: FileText, options: ['Expiry', 'Damaged', 'Lost', 'Pages Full', 'Other'] },
        { name: 'currentPassport', label: 'Current Passport (All Pages)', type: 'file', required: true, icon: Upload },
        { name: 'nicCopy', label: 'NIC Copy', type: 'file', required: true, icon: Upload },
        { name: 'photographs', label: 'Recent Passport Photographs', type: 'file', required: true, icon: FileImage },
        { name: 'policeClearance', label: 'Police Clearance (if expired over 3 years)', type: 'file', required: false, icon: Upload }
      ],
      "Visa Applications": [
        { name: 'fullName', label: 'Full Name (as per Passport)', type: 'text', required: true, icon: User },
        { name: 'nationality', label: 'Nationality', type: 'text', required: true, icon: Flag },
        { name: 'passportNumber', label: 'Passport Number', type: 'text', required: true, icon: Globe },
        { name: 'passportIssueDate', label: 'Passport Issue Date', type: 'date', required: true, icon: Calendar },
        { name: 'passportExpiryDate', label: 'Passport Expiry Date', type: 'date', required: true, icon: Calendar },
        { name: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: true, icon: Calendar },
        { name: 'phone', label: 'Contact Number', type: 'tel', required: true, icon: Phone },
        { name: 'email', label: 'Email Address', type: 'email', required: true, icon: Mail },
        { name: 'visaType', label: 'Visa Type', type: 'select', required: true, icon: FileText, options: ['Tourist Visa', 'Business Visa', 'Transit Visa', 'Student Visa', 'Employment Visa', 'Residence Visa'] },
        { name: 'purposeOfVisit', label: 'Purpose of Visit', type: 'textarea', required: true, icon: FileText },
        { name: 'durationOfStay', label: 'Intended Duration of Stay (Days)', type: 'number', required: true, icon: Calendar },
        { name: 'arrivalDate', label: 'Intended Arrival Date', type: 'date', required: true, icon: Calendar },
        { name: 'accommodation', label: 'Accommodation Details in Sri Lanka', type: 'textarea', required: true, icon: MapPin },
        { name: 'passportCopy', label: 'Passport Copy (All Pages)', type: 'file', required: true, icon: Upload },
        { name: 'photographs', label: 'Passport Photographs', type: 'file', required: true, icon: FileImage },
        { name: 'purposeProof', label: 'Proof of Purpose of Visit', type: 'file', required: true, icon: Upload },
        { name: 'financialProof', label: 'Financial Documentation', type: 'file', required: true, icon: Upload },
        { name: 'travelItinerary', label: 'Travel Itinerary/Flight Tickets', type: 'file', required: true, icon: Upload }
      ],
      "Extension of Visa": [
        { name: 'fullName', label: 'Full Name', type: 'text', required: true, icon: User },
        { name: 'passportNumber', label: 'Passport Number', type: 'text', required: true, icon: Globe },
        { name: 'currentVisaNumber', label: 'Current Visa Number', type: 'text', required: true, icon: FileText },
        { name: 'visaExpiryDate', label: 'Current Visa Expiry Date', type: 'date', required: true, icon: Calendar },
        { name: 'requestedExtensionPeriod', label: 'Requested Extension Period (Days)', type: 'number', required: true, icon: Calendar },
        { name: 'phone', label: 'Contact Number', type: 'tel', required: true, icon: Phone },
        { name: 'email', label: 'Email Address', type: 'email', required: true, icon: Mail },
        { name: 'extensionReason', label: 'Reason for Extension', type: 'textarea', required: true, icon: FileText },
        { name: 'currentAddress', label: 'Current Address in Sri Lanka', type: 'textarea', required: true, icon: MapPin },
        { name: 'passportWithVisa', label: 'Passport with Current Visa', type: 'file', required: true, icon: Upload },
        { name: 'photographs', label: 'Recent Passport Photographs', type: 'file', required: true, icon: FileImage },
        { name: 'extensionJustification', label: 'Supporting Documents for Extension', type: 'file', required: true, icon: Upload },
        { name: 'financialSupport', label: 'Proof of Financial Means', type: 'file', required: true, icon: Upload },
        { name: 'noObjectionLetter', label: 'No Objection Letter (if required)', type: 'file', required: false, icon: Upload }
      ],
      "Citizenship Application": [
        { name: 'fullName', label: 'Full Name', type: 'text', required: true, icon: User },
        { name: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: true, icon: Calendar },
        { name: 'placeOfBirth', label: 'Place of Birth', type: 'text', required: true, icon: MapPin },
        { name: 'currentNationality', label: 'Current Nationality', type: 'text', required: true, icon: Flag },
        { name: 'fatherName', label: 'Father\'s Full Name', type: 'text', required: true, icon: User },
        { name: 'motherName', label: 'Mother\'s Full Name', type: 'text', required: true, icon: User },
        { name: 'spouseName', label: 'Spouse Name (if applicable)', type: 'text', required: false, icon: User },
        { name: 'residenceYears', label: 'Years of Continuous Residence in Sri Lanka', type: 'number', required: true, icon: Calendar },
        { name: 'currentAddress', label: 'Current Address', type: 'textarea', required: true, icon: MapPin },
        { name: 'phone', label: 'Contact Number', type: 'tel', required: true, icon: Phone },
        { name: 'email', label: 'Email Address', type: 'email', required: true, icon: Mail },
        { name: 'citizenshipCategory', label: 'Citizenship Category', type: 'select', required: true, icon: FileText, options: ['Descent', 'Registration', 'Naturalization'] },
        { name: 'birthCertificate', label: 'Birth Certificate', type: 'file', required: true, icon: Upload },
        { name: 'parentsBirthCerts', label: 'Parents\' Birth Certificates', type: 'file', required: true, icon: Upload },
        { name: 'marriageCertificate', label: 'Marriage Certificate (if applicable)', type: 'file', required: false, icon: Upload },
        { name: 'residenceProof', label: 'Proof of Continuous Residence', type: 'file', required: true, icon: Upload },
        { name: 'characterCertificates', label: 'Character Certificates', type: 'file', required: true, icon: Upload },
        { name: 'languageCertificate', label: 'Language Proficiency Certificate', type: 'file', required: true, icon: Upload },
        { name: 'medicalCertificate', label: 'Medical Certificate', type: 'file', required: true, icon: Upload }
      ],
      "Dual Citizenship Application": [
        { name: 'fullName', label: 'Full Name', type: 'text', required: true, icon: User },
        { name: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: true, icon: Calendar },
        { name: 'placeOfBirth', label: 'Place of Birth in Sri Lanka', type: 'text', required: true, icon: MapPin },
        { name: 'currentNationality', label: 'Current Foreign Nationality', type: 'text', required: true, icon: Flag },
        { name: 'foreignPassportNo', label: 'Foreign Passport Number', type: 'text', required: true, icon: Globe },
        { name: 'sriLankanParent', label: 'Sri Lankan Parent Name', type: 'text', required: true, icon: User },
        { name: 'parentNIC', label: 'Parent\'s NIC Number', type: 'text', required: true, icon: FileText },
        { name: 'currentAddress', label: 'Current Address', type: 'textarea', required: true, icon: MapPin },
        { name: 'phone', label: 'Contact Number', type: 'tel', required: true, icon: Phone },
        { name: 'email', label: 'Email Address', type: 'email', required: true, icon: Mail },
        { name: 'reasonForDualCitizenship', label: 'Reason for Dual Citizenship Application', type: 'textarea', required: true, icon: FileText },
        { name: 'foreignPassport', label: 'Foreign Passport (All Pages)', type: 'file', required: true, icon: Upload },
        { name: 'foreignCitizenshipDoc', label: 'Foreign Citizenship Documents', type: 'file', required: true, icon: Upload },
        { name: 'sriLankanBirthCert', label: 'Sri Lankan Birth Certificate', type: 'file', required: true, icon: Upload },
        { name: 'parentageEvidence', label: 'Evidence of Sri Lankan Parentage', type: 'file', required: true, icon: Upload },
        { name: 'photographs', label: 'Passport Photographs', type: 'file', required: true, icon: FileImage },
        { name: 'characterCertSL', label: 'Character Certificate from Sri Lanka', type: 'file', required: true, icon: Upload },
        { name: 'characterCertForeign', label: 'Character Certificate from Foreign Country', type: 'file', required: true, icon: Upload }
      ]
    };

    return formFields[serviceName] || [];
  };

  const handleServiceClick = (service: string) => {
    const hash = createServiceHash(service);
    setSelectedService(service);
    navigate(`/immigration-emigration#${hash}`);
    setCurrentHash(`#${hash}`);
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleContactSupport = () => {
    const subject = encodeURIComponent(`Support Request - ${selectedService || 'Immigration & Emigration Services'}`);
    const body = encodeURIComponent(`Dear Immigration & Emigration Support Team,

I need assistance with: ${selectedService || 'General Inquiry'}

Please provide guidance on the following:
- 

Thank you for your assistance.

Best regards,`);
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=mestrix4.lankasewa@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
  };

  const handleShowAllServices = () => {
    navigate('/immigration-emigration');
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
        <label className="flex items-center text-sm font-semibold text-cyan-800">
          <IconComponent className="w-4 h-4 mr-2 text-cyan-600" />
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {field.type === 'textarea' ? (
          <textarea
            className="w-full px-4 py-3 border border-cyan-200 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent bg-white/80 backdrop-blur-sm"
            rows={3}
            value={(formData[field.name] as string) || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
          />
        ) : field.type === 'select' ? (
          <select
            className="w-full px-4 py-3 border border-cyan-200 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent bg-white/80 backdrop-blur-sm"
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
              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-cyan-300 border-dashed rounded-xl cursor-pointer bg-cyan-50/50 hover:bg-cyan-100/50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-2 pb-2">
                  <Upload className="w-6 h-6 mb-2 text-cyan-500" />
                  <p className="text-sm text-cyan-600">
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
            className="w-full px-4 py-3 border border-cyan-200 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent bg-white/80 backdrop-blur-sm"
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
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                  Immigration & Emigration Portal
                </h1>
                <span className="text-cyan-600/80 text-sm">
                  Government Services
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToDashboard}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-teal-500 
                         hover:from-cyan-500 hover:to-teal-600 text-white rounded-full transition-all duration-300 
                         hover:scale-105 hover:shadow-lg"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </button>

              <button className="relative p-3 text-cyan-500 hover:text-white hover:bg-gradient-to-br from-cyan-400 to-teal-500 
                               rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg border border-cyan-300
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
                  ? 'bg-gradient-to-r from-cyan-400 to-teal-500 text-white shadow-lg' 
                  : 'bg-white/80 text-cyan-600 border border-cyan-200 hover:bg-cyan-50'
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
                    ? 'bg-gradient-to-r from-cyan-400 to-teal-500 text-white shadow-lg'
                    : 'bg-white/80 text-cyan-600 border border-cyan-200 hover:bg-cyan-50'
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
            <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-8 text-center">
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
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <Plane className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-cyan-800 group-hover:text-teal-600 transition-colors duration-300">
                      {service}
                    </h4>
                  </div>
                  <p className="text-cyan-600 mb-4 group-hover:text-teal-500 transition-colors duration-300">
                    {getServiceContent(service).description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-600 font-semibold group-hover:text-teal-600 transition-colors duration-300">
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
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                    {selectedService}
                  </h3>
                  <p className="text-cyan-600 font-medium">Service Details & Requirements</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl p-6 border border-cyan-200">
                  <h4 className="text-xl font-bold text-cyan-800 mb-3">Description</h4>
                  <p className="text-cyan-700 leading-relaxed">{getServiceContent(selectedService).description}</p>
                </div>

                <div className="bg-gradient-to-r from-sky-50 to-cyan-50 rounded-2xl p-6 border border-sky-200">
                  <h4 className="text-xl font-bold text-sky-800 mb-4">Required Documents</h4>
                  <ul className="space-y-2">
                    {getServiceContent(selectedService).requirements.map((req, index) => (
                      <li key={index} className="flex items-center text-sky-700">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-6 border border-teal-200">
                  <h4 className="text-xl font-bold text-teal-800 mb-4">Application Process</h4>
                  <div className="space-y-4">
                    {getServiceContent(selectedService).process.map((step, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-teal-700 mt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button 
                    onClick={handleStartApplication}
                    className="flex-1 bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Start Application
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-sky-400 to-cyan-500 hover:from-sky-500 hover:to-cyan-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center">
                    <Download className="w-5 h-5 mr-2" />
                    Download Forms
                  </button>
                  <button 
                    onClick={handleContactSupport}
                    className="flex-1 bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-500 hover:to-emerald-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center"
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
            <div className="bg-gradient-to-r from-cyan-400 to-teal-500 p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold">Online Application</h3>
                  <p className="text-cyan-100">{selectedService}</p>
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
                <div className="mt-8 pt-6 border-t border-cyan-200">
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
                      className="flex-1 bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
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
      <footer className="bg-gradient-to-r from-white/95 via-cyan-50/80 to-teal-100/60 backdrop-blur-xl border-t border-white/30 py-8 mt-12 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="text-sm bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent font-semibold">
              © {new Date().getFullYear()} Department of Immigration & Emigration. All Rights Reserved.
            </div>
            <div className="flex justify-center items-center space-x-2 text-sm text-cyan-600">
              <Mail className="w-4 h-4" />
              <span>Support Email: </span>
              <button
                onClick={() => handleContactSupport()}
                className="text-cyan-700 hover:text-cyan-900 font-semibold hover:underline transition-colors"
              >
                mestrix4.lankasewa@gmail.com
              </button>
            </div>
            <div className="text-xs text-cyan-500">
              Click the email above to open Gmail with a pre-filled support request
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ImmigrationEmigrationPage;