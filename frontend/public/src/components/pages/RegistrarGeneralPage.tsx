// src/pages/RegistrarGeneralPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Settings, LogOut, Bell, ArrowLeft, CheckCircle, FileText, Award } from 'lucide-react';
import Logo1 from '../../assets/Logo.png'; // Adjust path as needed

interface RegistrarGeneralPageProps {
  onLogout?: () => void;
}

const RegistrarGeneralPage: React.FC<RegistrarGeneralPageProps> = ({ onLogout }) => {
  const { id } = useParams<{ id?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string | null>(null);

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
    description: 'Obtain and correct birth, marriage, and death certificates.',
    id: 'registrar-general',
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
    const service = getServiceFromHash(location.hash);
    setSelectedService(service);
  }, [location.hash]);

  const getServiceContent = (serviceName: string) => {
    const serviceContent: { [key: string]: { description: string; requirements: string[]; process: string[] } } = {
      "Obtaining Birth Certificates": {
        description: "Obtain certified copies of birth certificates for official purposes including passport applications, school admissions, and legal proceedings.",
        requirements: [
          "National Identity Card of applicant or parent",
          "Completed application form (Form 1)",
          "Birth registration number (if available)",
          "Parent's marriage certificate (if applicable)",
          "Hospital discharge summary or midwife report",
          "Fee payment receipt",
          "Affidavit if applying after one year of birth"
        ],
        process: [
          "Obtain application form from Registrar's office or online",
          "Complete form with accurate birth details",
          "Gather all required supporting documents",
          "Submit application at relevant Divisional Secretariat",
          "Pay prescribed fees at the counter",
          "Collect birth certificate within 7-14 working days"
        ]
      },
      "Obtaining Marriage Certificates": {
        description: "Obtain official marriage certificates for couples married under different marriage laws in Sri Lanka.",
        requirements: [
          "National Identity Cards of both spouses",
          "Original marriage register entry details",
          "Completed application form for marriage certificate",
          "Marriage registration number",
          "Witnesses' details and signatures",
          "Certificate fee payment",
          "Marriage celebrant's certification"
        ],
        process: [
          "Locate marriage registration office where ceremony was registered",
          "Complete marriage certificate application form",
          "Provide marriage registration details and reference number",
          "Submit application with required documents",
          "Pay applicable certificate fees",
          "Receive certified marriage certificate copy"
        ]
      },
      "Obtaining Death Certificates": {
        description: "Obtain official death certificates required for legal, financial, and administrative purposes following a person's death.",
        requirements: [
          "Death registration details and reference number",
          "National Identity Card of deceased person",
          "Applicant's identification (next of kin or authorized person)",
          "Completed death certificate application form",
          "Medical certificate of cause of death",
          "Certificate fee payment",
          "Legal authorization if not immediate family member"
        ],
        process: [
          "Report death to local Registrar within 14 days",
          "Complete death certificate application form",
          "Provide death registration reference number",
          "Submit application with supporting documents",
          "Pay prescribed certificate fees",
          "Collect official death certificate within specified timeframe"
        ]
      },
      "Correction of Errors in Certificates": {
        description: "Correct factual errors, spelling mistakes, or incorrect information in existing birth, marriage, or death certificates.",
        requirements: [
          "Original certificate containing the error",
          "Completed error correction application form",
          "Supporting documents proving correct information",
          "Affidavit explaining the error and correct details",
          "National Identity Cards of relevant persons",
          "Correction fee payment",
          "Legal documentation supporting the correction"
        ],
        process: [
          "Identify and document the specific error in certificate",
          "Gather evidence supporting the correct information",
          "Complete error correction application form",
          "Submit application with original certificate and proof",
          "Pay correction processing fees",
          "Receive corrected certificate after verification process"
        ]
      },
      "Registration of Certificates": {
        description: "Register vital events including births, marriages, and deaths that occurred within Sri Lanka or to Sri Lankan citizens abroad.",
        requirements: [
          "Completed registration form for the specific event",
          "Supporting documents proving the event occurred",
          "National Identity Cards of parties involved",
          "Hospital records, medical certificates, or official reports",
          "Witness statements and signatures",
          "Registration fee payment",
          "Translator certification for foreign documents"
        ],
        process: [
          "Report vital event within stipulated time period",
          "Complete appropriate registration form",
          "Gather all supporting documentation and evidence",
          "Submit application at correct Registrar's office",
          "Pay registration fees and processing charges",
          "Receive registration confirmation and reference number"
        ]
      }
    };

    return serviceContent[serviceName] || {
      description: `Details about ${serviceName.toLowerCase()}.`,
      requirements: ["Valid identification", "Completed application form"],
      process: ["Submit application", "Document verification", "Processing", "Receive confirmation"]
    };
  };

  const handleServiceClick = (service: string) => {
    const hash = createServiceHash(service);
    navigate(`/registrar-general#${hash}`);
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleShowAllServices = () => {
    navigate('/registrar-general');
    setSelectedService(null);
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
                  <button className="flex-1 bg-gradient-to-r from-indigo-400 to-violet-500 hover:from-indigo-500 hover:to-violet-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    Start Application
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-purple-400 to-indigo-500 hover:from-purple-500 hover:to-indigo-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    Download Forms
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-violet-400 to-purple-500 hover:from-violet-500 hover:to-purple-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="bg-gradient-to-r from-white/95 via-indigo-50/80 to-violet-100/60 backdrop-blur-xl border-t border-white/30 py-6 mt-12 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent font-semibold">
          © {new Date().getFullYear()} Registrar General's Department. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default RegistrarGeneralPage;