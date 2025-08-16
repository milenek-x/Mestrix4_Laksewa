import React, { useEffect, useState } from 'react';
import { Settings, LogOut, Bell, ArrowLeft, CheckCircle, FileText, Award, User, Calendar, MapPin, Phone, Mail, Upload, FileImage, Send, X } from 'lucide-react';

interface RegistrarGeneralPageProps {
  onLogout?: () => void;
}

interface FormData {
  [key: string]: string | File | null;
}

const RegistrarGeneralPage: React.FC<RegistrarGeneralPageProps> = ({ onLogout }) => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);
  const [formData, setFormData] = useState<FormData>({});
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File }>({});
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  const departmentData = {
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
    description: 'Obtain and correct birth, marriage, and death certificates online.',
    id: 'registrar-general',
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

  const getServiceContent = (serviceName: string) => {
    const serviceContent: { [key: string]: { description: string; requirements: string[]; process: string[] } } = {
      "Obtaining Birth Certificates": {
        description: "Obtain certified copies of birth certificates online for official purposes including passport applications, school admissions, and legal proceedings.",
        requirements: [
          "National Identity Card of applicant or parent (Digital Copy)",
          "Birth registration number (if available)",
          "Parent's marriage certificate (Digital Copy if applicable)",
          "Hospital discharge summary or midwife report (Digital Copy)",
          "Recent passport-sized photograph (Digital Upload)",
          "Affidavit if applying after one year of birth (Digital Upload)"
        ],
        process: [
          "Complete the online application form through Start Application button",
          "Upload required documents through our secure digital portal",
          "Make online payment for certificate fees via our payment gateway",
          "Submit the completed form via our online system",
          "Track application status in real-time through our online portal",
          "Download certified digital birth certificate or receive via registered mail within 7-14 working days"
        ]
      },
      "Obtaining Marriage Certificates": {
        description: "Obtain official marriage certificates online for couples married under different marriage laws in Sri Lanka.",
        requirements: [
          "National Identity Cards of both spouses (Digital Copies)",
          "Marriage registration number",
          "Completed online application form",
          "Marriage celebrant's certification (Digital Copy)",
          "Witnesses' details and digital signatures",
          "Recent photographs of both spouses (Digital Upload)"
        ],
        process: [
          "Complete online marriage certificate application through Start Application button",
          "Upload marriage registration details and required documents via secure portal",
          "Provide marriage registration reference number in the online form",
          "Complete secure online payment for certificate fees",
          "Submit application through our digital platform",
          "Receive certified marriage certificate digitally or via registered mail within 5-10 working days"
        ]
      },
      "Obtaining Death Certificates": {
        description: "Obtain official death certificates online required for legal, financial, and administrative purposes following a person's death.",
        requirements: [
          "Death registration reference number",
          "National Identity Card of deceased person (Digital Copy)",
          "Applicant's identification (next of kin or authorized person) (Digital Copy)",
          "Medical certificate of cause of death (Digital Copy)",
          "Legal authorization letter if not immediate family member (Digital Upload)",
          "Recent photograph of applicant for verification (Digital Upload)"
        ],
        process: [
          "Complete online death certificate application through Start Application button",
          "Upload death registration reference number and supporting documents",
          "Provide deceased person's details through secure online form",
          "Complete online payment for certificate fees",
          "Submit application via our digital platform",
          "Receive official death certificate digitally or via registered mail within 5-10 working days"
        ]
      },
      "Correction of Errors in Certificates": {
        description: "Correct factual errors, spelling mistakes, or incorrect information in existing birth, marriage, or death certificates through our online portal.",
        requirements: [
          "Original certificate containing the error (Digital Copy)",
          "Supporting documents proving correct information (Digital Copies)",
          "Sworn affidavit explaining the error and correct details (Digital Upload)",
          "National Identity Cards of relevant persons (Digital Copies)",
          "Legal documentation supporting the correction (Digital Upload)",
          "Recent photographs for identity verification (Digital Upload)"
        ],
        process: [
          "Complete online error correction application through Start Application button",
          "Upload original certificate and evidence supporting correct information",
          "Provide detailed explanation of errors through online form",
          "Submit sworn affidavit and supporting documentation via secure portal",
          "Complete online payment for correction processing fees",
          "Receive corrected certificate after online verification process within 10-15 working days"
        ]
      },
      "Registration of Certificates": {
        description: "Register vital events including births, marriages, and deaths online that occurred within Sri Lanka or to Sri Lankan citizens abroad.",
        requirements: [
          "Supporting documents proving the event occurred (Digital Copies)",
          "National Identity Cards of parties involved (Digital Copies)",
          "Hospital records, medical certificates, or official reports (Digital Copies)",
          "Witness statements and digital signatures",
          "Recent photographs of parties involved (Digital Upload)",
          "Translator certification for foreign documents (Digital Upload if applicable)"
        ],
        process: [
          "Complete online registration application through Start Application button",
          "Upload all supporting documentation and evidence via secure portal",
          "Provide witness statements through digital signature system",
          "Submit completed application through our online platform",
          "Complete online payment for registration fees and processing charges",
          "Receive registration confirmation and reference number via email within 7-14 days"
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
      "Obtaining Birth Certificates": [
        { name: 'childFullName', label: 'Full Name of Child', type: 'text', required: true, icon: User },
        { name: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: true, icon: Calendar },
        { name: 'placeOfBirth', label: 'Place of Birth', type: 'text', required: true, icon: MapPin },
        { name: 'fatherName', label: 'Father\'s Full Name', type: 'text', required: true, icon: User },
        { name: 'motherName', label: 'Mother\'s Full Name', type: 'text', required: true, icon: User },
        { name: 'applicantNIC', label: 'Applicant\'s NIC Number', type: 'text', required: true, icon: FileText },
        { name: 'birthRegNumber', label: 'Birth Registration Number (if available)', type: 'text', required: false, icon: FileText },
        { name: 'phone', label: 'Contact Number', type: 'tel', required: true, icon: Phone },
        { name: 'email', label: 'Email Address', type: 'email', required: true, icon: Mail },
        { name: 'applicantNICCopy', label: 'Applicant\'s NIC Copy', type: 'file', required: true, icon: Upload },
        { name: 'hospitalRecord', label: 'Hospital Discharge Summary/Midwife Report', type: 'file', required: true, icon: Upload },
        { name: 'parentsMarriageCert', label: 'Parents\' Marriage Certificate (if applicable)', type: 'file', required: false, icon: Upload },
        { name: 'photograph', label: 'Recent Passport-sized Photograph', type: 'file', required: true, icon: FileImage }
      ],
      "Obtaining Marriage Certificates": [
        { name: 'husbandName', label: 'Husband\'s Full Name', type: 'text', required: true, icon: User },
        { name: 'wifeName', label: 'Wife\'s Full Name', type: 'text', required: true, icon: User },
        { name: 'marriageDate', label: 'Date of Marriage', type: 'date', required: true, icon: Calendar },
        { name: 'marriagePlace', label: 'Place of Marriage', type: 'text', required: true, icon: MapPin },
        { name: 'marriageRegNumber', label: 'Marriage Registration Number', type: 'text', required: true, icon: FileText },
        { name: 'husbandNIC', label: 'Husband\'s NIC Number', type: 'text', required: true, icon: FileText },
        { name: 'wifeNIC', label: 'Wife\'s NIC Number', type: 'text', required: true, icon: FileText },
        { name: 'celebrantName', label: 'Marriage Celebrant\'s Name', type: 'text', required: true, icon: User },
        { name: 'phone', label: 'Contact Number', type: 'tel', required: true, icon: Phone },
        { name: 'email', label: 'Email Address', type: 'email', required: true, icon: Mail },
        { name: 'husbandNICCopy', label: 'Husband\'s NIC Copy', type: 'file', required: true, icon: Upload },
        { name: 'wifeNICCopy', label: 'Wife\'s NIC Copy', type: 'file', required: true, icon: Upload },
        { name: 'celebrantCert', label: 'Celebrant\'s Certification', type: 'file', required: true, icon: Upload },
        { name: 'marriagePhotos', label: 'Recent Photographs of Both Spouses', type: 'file', required: true, icon: FileImage }
      ],
      "Obtaining Death Certificates": [
        { name: 'deceasedName', label: 'Full Name of Deceased', type: 'text', required: true, icon: User },
        { name: 'dateOfDeath', label: 'Date of Death', type: 'date', required: true, icon: Calendar },
        { name: 'placeOfDeath', label: 'Place of Death', type: 'text', required: true, icon: MapPin },
        { name: 'deceasedNIC', label: 'Deceased\'s NIC Number', type: 'text', required: true, icon: FileText },
        { name: 'deathRegNumber', label: 'Death Registration Number', type: 'text', required: true, icon: FileText },
        { name: 'applicantName', label: 'Applicant\'s Full Name', type: 'text', required: true, icon: User },
        { name: 'applicantNIC', label: 'Applicant\'s NIC Number', type: 'text', required: true, icon: FileText },
        { name: 'relationship', label: 'Relationship to Deceased', type: 'select', required: true, icon: User, options: ['Spouse', 'Child', 'Parent', 'Sibling', 'Legal Representative', 'Other'] },
        { name: 'phone', label: 'Contact Number', type: 'tel', required: true, icon: Phone },
        { name: 'email', label: 'Email Address', type: 'email', required: true, icon: Mail },
        { name: 'deceasedNICCopy', label: 'Deceased\'s NIC Copy', type: 'file', required: true, icon: Upload },
        { name: 'applicantNICCopy', label: 'Applicant\'s NIC Copy', type: 'file', required: true, icon: Upload },
        { name: 'medicalCertificate', label: 'Medical Certificate of Cause of Death', type: 'file', required: true, icon: Upload },
        { name: 'authorizationLetter', label: 'Authorization Letter (if not immediate family)', type: 'file', required: false, icon: Upload }
      ],
      "Correction of Errors in Certificates": [
        { name: 'certificateType', label: 'Type of Certificate', type: 'select', required: true, icon: FileText, options: ['Birth Certificate', 'Marriage Certificate', 'Death Certificate'] },
        { name: 'certificateNumber', label: 'Certificate Registration Number', type: 'text', required: true, icon: FileText },
        { name: 'applicantName', label: 'Applicant\'s Full Name', type: 'text', required: true, icon: User },
        { name: 'applicantNIC', label: 'Applicant\'s NIC Number', type: 'text', required: true, icon: FileText },
        { name: 'errorDescription', label: 'Description of Error', type: 'textarea', required: true, icon: FileText },
        { name: 'correctInformation', label: 'Correct Information', type: 'textarea', required: true, icon: FileText },
        { name: 'reasonForError', label: 'Reason for Error', type: 'textarea', required: true, icon: FileText },
        { name: 'phone', label: 'Contact Number', type: 'tel', required: true, icon: Phone },
        { name: 'email', label: 'Email Address', type: 'email', required: true, icon: Mail },
        { name: 'originalCertificate', label: 'Original Certificate with Error', type: 'file', required: true, icon: Upload },
        { name: 'supportingDocuments', label: 'Supporting Documents for Correction', type: 'file', required: true, icon: Upload },
        { name: 'swornAffidavit', label: 'Sworn Affidavit', type: 'file', required: true, icon: Upload },
        { name: 'applicantPhoto', label: 'Recent Photograph of Applicant', type: 'file', required: true, icon: FileImage }
      ],
      "Registration of Certificates": [
        { name: 'eventType', label: 'Type of Event to Register', type: 'select', required: true, icon: FileText, options: ['Birth', 'Marriage', 'Death'] },
        { name: 'eventDate', label: 'Date of Event', type: 'date', required: true, icon: Calendar },
        { name: 'eventPlace', label: 'Place of Event', type: 'text', required: true, icon: MapPin },
        { name: 'applicantName', label: 'Applicant\'s Full Name', type: 'text', required: true, icon: User },
        { name: 'applicantNIC', label: 'Applicant\'s NIC Number', type: 'text', required: true, icon: FileText },
        { name: 'relationshipToEvent', label: 'Relationship to Event', type: 'select', required: true, icon: User, options: ['Self', 'Parent', 'Spouse', 'Child', 'Legal Representative', 'Other'] },
        { name: 'delayReason', label: 'Reason for Late Registration (if applicable)', type: 'textarea', required: false, icon: FileText },
        { name: 'witnessName1', label: 'First Witness Full Name', type: 'text', required: true, icon: User },
        { name: 'witnessName2', label: 'Second Witness Full Name', type: 'text', required: true, icon: User },
        { name: 'phone', label: 'Contact Number', type: 'tel', required: true, icon: Phone },
        { name: 'email', label: 'Email Address', type: 'email', required: true, icon: Mail },
        { name: 'applicantNICCopy', label: 'Applicant\'s NIC Copy', type: 'file', required: true, icon: Upload },
        { name: 'eventProofDocuments', label: 'Documents Proving Event Occurred', type: 'file', required: true, icon: Upload },
        { name: 'witnessStatements', label: 'Witness Statements', type: 'file', required: true, icon: Upload },
        { name: 'applicantPhoto', label: 'Recent Photograph of Applicant', type: 'file', required: true, icon: FileImage }
      ]
    };

    return formFields[serviceName] || [];
  };

  const handleServiceClick = (service: string) => {
    const hash = createServiceHash(service);
    setSelectedService(service);
    window.location.hash = hash;
    setCurrentHash(`#${hash}`);
  };

  const handleBackToDashboard = () => {
    // Navigate to dashboard - you can change this URL to match your routing setup
    window.location.href = '/dashboard';
    // Alternative: if using React Router, you can use navigate('/dashboard');
  };

  const handleContactSupport = () => {
    const subject = encodeURIComponent(`Support Request - ${selectedService || 'Registrar General Services'}`);
    const body = encodeURIComponent(`Dear Registrar General Support Team,

I need assistance with: ${selectedService || 'General Inquiry'}

Please provide guidance on the following:
- 

Thank you for your assistance.

Best regards,`);
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=registrar.support@rg.gov.lk&su=${subject}&body=${body}`;
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
    alert('Application submitted successfully! You will receive a confirmation email shortly.');
    handleCloseDialog();
  };

  const renderFormField = (field: any) => {
    const IconComponent = field.icon;
    
    return (
      <div key={field.name} className="space-y-2">
        <label className="flex items-center text-sm font-semibold text-indigo-800">
          <IconComponent className="w-4 h-4 mr-2 text-indigo-600" />
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {field.type === 'textarea' ? (
          <textarea
            className="w-full px-4 py-3 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white/80 backdrop-blur-sm"
            rows={3}
            value={(formData[field.name] as string) || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
          />
        ) : field.type === 'select' ? (
          <select
            className="w-full px-4 py-3 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white/80 backdrop-blur-sm"
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
              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-indigo-300 border-dashed rounded-xl cursor-pointer bg-indigo-50/50 hover:bg-indigo-100/50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-2 pb-2">
                  <Upload className="w-6 h-6 mb-2 text-indigo-500" />
                  <p className="text-sm text-indigo-600">
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
            className="w-full px-4 py-3 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white/80 backdrop-blur-sm"
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
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-violet-500 rounded-2xl flex items-center justify-center mr-4">
                  <Settings className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  Registrar General Portal
                </h1>
                <span className="text-indigo-600/80 text-sm">
                  Government Services
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToDashboard}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-400 to-violet-500 
                         hover:from-indigo-500 hover:to-violet-600 text-white rounded-full transition-all duration-300 
                         hover:scale-105 hover:shadow-lg"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </button>

              <button className="relative p-3 text-indigo-500 hover:text-white hover:bg-gradient-to-br from-indigo-400 to-violet-500 
                               rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg border border-indigo-300
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
                  ? 'bg-gradient-to-r from-indigo-400 to-violet-500 text-white shadow-lg' 
                  : 'bg-white/80 text-indigo-600 border border-indigo-200 hover:bg-indigo-50'
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
                    ? 'bg-gradient-to-r from-indigo-400 to-violet-500 text-white shadow-lg'
                    : 'bg-white/80 text-indigo-600 border border-indigo-200 hover:bg-indigo-50'
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
            <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent mb-8 text-center">
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
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-violet-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-indigo-800 group-hover:text-violet-600 transition-colors duration-300">
                      {service}
                    </h4>
                  </div>
                  <p className="text-indigo-600 mb-4 group-hover:text-violet-500 transition-colors duration-300">
                    {getServiceContent(service).description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-600 font-semibold group-hover:text-violet-600 transition-colors duration-300">
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
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-violet-500 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                    {selectedService}
                  </h3>
                  <p className="text-indigo-600 font-medium">Service Details & Requirements</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-gradient-to-r from-indigo-50 to-violet-50 rounded-2xl p-6 border border-indigo-200">
                  <h4 className="text-xl font-bold text-indigo-800 mb-3">Description</h4>
                  <p className="text-indigo-700 leading-relaxed">{getServiceContent(selectedService).description}</p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200">
                  <h4 className="text-xl font-bold text-purple-800 mb-4">Required Documents</h4>
                  <ul className="space-y-2">
                    {getServiceContent(selectedService).requirements.map((req, index) => (
                      <li key={index} className="flex items-center text-purple-700">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-200">
                  <h4 className="text-xl font-bold text-violet-800 mb-4">Application Process</h4>
                  <div className="space-y-4">
                    {getServiceContent(selectedService).process.map((step, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-8 h-8 bg-gradient-to-r from-violet-400 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-violet-700 mt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button 
                    onClick={handleStartApplication}
                    className="flex-1 bg-gradient-to-r from-indigo-400 to-violet-500 hover:from-indigo-500 hover:to-violet-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center"
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
            <div className="bg-gradient-to-r from-indigo-400 to-violet-500 p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold">Online Application</h3>
                  <p className="text-indigo-100">{selectedService}</p>
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
                <div className="mt-8 pt-6 border-t border-indigo-200">
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
                      className="flex-1 bg-gradient-to-r from-indigo-400 to-violet-500 hover:from-indigo-500 hover:to-violet-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
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
      <footer className="bg-gradient-to-r from-white/95 via-indigo-50/80 to-violet-100/60 backdrop-blur-xl border-t border-white/30 py-8 mt-12 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="text-sm bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent font-semibold">
              © {new Date().getFullYear()} Registrar General's Department. All Rights Reserved.
            </div>
            <div className="flex justify-center items-center space-x-2 text-sm text-indigo-600">
              <Mail className="w-4 h-4" />
              <span>Support Email: </span>
              <button
                onClick={() => handleContactSupport()}
                className="text-indigo-700 hover:text-indigo-900 font-semibold hover:underline transition-colors"
              >
                registrar.support@rg.gov.lk
              </button>
            </div>
            <div className="text-xs text-indigo-500">
              Click the email above to open Gmail with a pre-filled support request
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RegistrarGeneralPage;