// src/pages/ImmigrationEmigrationPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { FileText, LogOut, Bell, ArrowLeft, CheckCircle, Plane, Globe } from 'lucide-react';
import Logo1 from '../../assets/Logo.png'; // Adjust path as needed

interface ImmigrationEmigrationPageProps {
  onLogout?: () => void;
}

const ImmigrationEmigrationPage: React.FC<ImmigrationEmigrationPageProps> = ({ onLogout }) => {
  const { id } = useParams<{ id?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string | null>(null);

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
    const service = getServiceFromHash(location.hash);
    setSelectedService(service);
  }, [location.hash]);

  const getServiceContent = (serviceName: string) => {
    const serviceContent: { [key: string]: { description: string; requirements: string[]; process: string[] } } = {
      "New Passport Application": {
        description: "Apply for a new Sri Lankan passport for international travel with proper documentation and verification.",
        requirements: [
          "Birth certificate (certified copy)",
          "National Identity Card (NIC)",
          "Completed passport application form",
          "Recent passport-sized photographs (4 copies)",
          "Character certificate from Grama Niladhari",
          "Passport application fee payment receipt",
          "Educational certificates (for verification)"
        ],
        process: [
          "Complete online pre-application or obtain forms",
          "Gather all required documents and photographs",
          "Visit nearest Regional Passport Office",
          "Submit application with documents and biometric data",
          "Interview with passport officer if required",
          "Collect passport after processing (7-14 days)"
        ]
      },
      "Passport Renewal": {
        description: "Renew your expired or expiring Sri Lankan passport to continue international travel privileges.",
        requirements: [
          "Current passport (original)",
          "National Identity Card (NIC)",
          "Completed passport renewal form",
          "Recent passport-sized photographs (2 copies)",
          "Passport renewal fee payment",
          "Police clearance (if passport expired over 3 years)"
        ],
        process: [
          "Check passport expiry date and requirements",
          "Complete renewal application form",
          "Submit application at Regional Passport Office",
          "Provide biometric data and interview if needed",
          "Pay applicable renewal fees",
          "Collect renewed passport within specified timeframe"
        ]
      },
      "Visa Applications": {
        description: "Apply for various types of visas for foreign nationals to enter and stay in Sri Lanka legally.",
        requirements: [
          "Valid foreign passport",
          "Completed visa application form",
          "Recent passport photographs",
          "Proof of purpose of visit",
          "Financial documentation",
          "Return flight tickets or travel itinerary",
          "Accommodation details in Sri Lanka"
        ],
        process: [
          "Determine appropriate visa type for your purpose",
          "Complete online visa application or paper form",
          "Submit application with supporting documents",
          "Pay visa processing fees",
          "Attend interview if required",
          "Receive visa approval and collect visa"
        ]
      },
      "Extension of Visa": {
        description: "Extend your current visa to prolong your legal stay in Sri Lanka for valid reasons.",
        requirements: [
          "Current valid passport with existing visa",
          "Visa extension application form",
          "Recent passport photographs",
          "Proof of reason for extension",
          "Financial means to support extended stay",
          "Extension fee payment",
          "No objection letter from relevant authorities (if required)"
        ],
        process: [
          "Apply for extension before current visa expires",
          "Submit extension application with documents",
          "Provide justification for extension request",
          "Pay extension processing fees",
          "Wait for approval from immigration authorities",
          "Receive extended visa stamp or new permit"
        ]
      },
      "Citizenship Application": {
        description: "Apply for Sri Lankan citizenship through naturalization, registration, or other eligible categories.",
        requirements: [
          "Proof of eligibility for citizenship category",
          "Birth certificates of applicant and parents",
          "Marriage certificate (if applicable)",
          "Proof of continuous residence in Sri Lanka",
          "Character certificates and police clearances",
          "Language proficiency certificates",
          "Medical certificate",
          "Citizenship application fee"
        ],
        process: [
          "Determine eligibility category for citizenship",
          "Collect comprehensive documentation",
          "Submit application at Department of Immigration",
          "Attend interview and verification process",
          "Background checks and security clearance",
          "Receive citizenship certificate upon approval"
        ]
      },
      "Dual Citizenship Application": {
        description: "Apply for dual citizenship to retain Sri Lankan citizenship while holding foreign nationality.",
        requirements: [
          "Current foreign passport and citizenship documents",
          "Original Sri Lankan birth certificate",
          "Evidence of Sri Lankan parentage",
          "Completed dual citizenship application",
          "Recent passport photographs",
          "Character certificates from both countries",
          "Dual citizenship application fee"
        ],
        process: [
          "Verify eligibility for dual citizenship",
          "Complete comprehensive application form",
          "Submit application with all required documents",
          "Undergo background verification process",
          "Pay applicable fees and processing charges",
          "Receive dual citizenship certificate and updated documents"
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
    navigate(`/immigration-emigration#${hash}`);
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleShowAllServices = () => {
    navigate('/immigration-emigration');
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
                  <button className="flex-1 bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    Start Application
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-sky-400 to-cyan-500 hover:from-sky-500 hover:to-cyan-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    Download Forms
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-500 hover:to-emerald-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="bg-gradient-to-r from-white/95 via-cyan-50/80 to-teal-100/60 backdrop-blur-xl border-t border-white/30 py-6 mt-12 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent font-semibold">
          © {new Date().getFullYear()} Department of Immigration & Emigration. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default ImmigrationEmigrationPage;