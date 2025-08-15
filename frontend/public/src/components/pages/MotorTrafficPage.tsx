// src/pages/MotorTrafficPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Home, LogOut, Bell, ArrowLeft, FileText, CheckCircle, Car, CreditCard } from 'lucide-react';
import Logo1 from '../../assets/Logo.png'; // Adjust path as needed

interface MotorTrafficPageProps {
  onLogout?: () => void;
}

const MotorTrafficPage: React.FC<MotorTrafficPageProps> = ({ onLogout }) => {
  const { id } = useParams<{ id?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string | null>(null);

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
    const service = getServiceFromHash(location.hash);
    setSelectedService(service);
  }, [location.hash]);

  const getServiceContent = (serviceName: string) => {
    const serviceContent: { [key: string]: { description: string; requirements: string[]; process: string[] } } = {
      "New Driving License Application": {
        description: "Apply for a new driving license for motorcycles, cars, or heavy vehicles with proper training and testing.",
        requirements: [
          "National Identity Card (NIC) or Birth Certificate",
          "Medical certificate from approved doctor",
          "Completed application form (Form A1)",
          "Recent passport-sized photographs (4 copies)",
          "Proof of residence",
          "Driving school completion certificate"
        ],
        process: [
          "Complete driving lessons at approved driving school",
          "Obtain medical certificate and gather required documents",
          "Submit application at nearest Motor Traffic office",
          "Pass written theory examination",
          "Pass practical driving test",
          "Pay license fees and receive new driving license"
        ]
      },
      "Driving License Renewal": {
        description: "Renew your expired or expiring driving license to continue legal driving privileges.",
        requirements: [
          "Current driving license (original)",
          "National Identity Card (NIC)",
          "Medical certificate (if required)",
          "Recent passport-sized photographs (2 copies)",
          "License renewal fee payment"
        ],
        process: [
          "Visit Motor Traffic Department before license expiry",
          "Submit current license and required documents",
          "Complete medical examination if required",
          "Pay renewal fees at designated counter",
          "Receive renewed driving license immediately"
        ]
      },
      "Vehicle Registration": {
        description: "Register new vehicles or transfer registration to ensure legal ownership and road worthiness.",
        requirements: [
          "Vehicle ownership documents from dealer",
          "Insurance certificate (comprehensive cover)",
          "National Identity Card of owner",
          "Vehicle inspection report",
          "Import permit (for imported vehicles)",
          "Registration fee payment receipt"
        ],
        process: [
          "Purchase comprehensive vehicle insurance",
          "Complete vehicle inspection at approved center",
          "Submit all documents at Motor Traffic office",
          "Pay registration fees and taxes",
          "Vehicle number allocation and plate issuance",
          "Receive registration certificate and number plates"
        ]
      },
      "Vehicle Ownership Transfer": {
        description: "Transfer vehicle ownership from seller to buyer with proper documentation and legal procedures.",
        requirements: [
          "Original vehicle registration certificate",
          "Transfer deed properly signed by both parties",
          "National Identity Cards of seller and buyer",
          "Vehicle inspection report (recent)",
          "Insurance certificate in new owner's name",
          "Transfer fee payment"
        ],
        process: [
          "Complete transfer deed with seller",
          "Obtain vehicle inspection from approved center",
          "Arrange insurance in new owner's name",
          "Submit documents at Motor Traffic office together",
          "Pay transfer fees and applicable taxes",
          "Receive new registration certificate"
        ]
      },
      "Revenue License Renewal": {
        description: "Renew your vehicle's revenue license annually to maintain legal road usage and avoid penalties.",
        requirements: [
          "Current revenue license (if available)",
          "Vehicle registration certificate",
          "Valid insurance certificate",
          "Emission test certificate (for applicable vehicles)",
          "Outstanding fine clearance certificate",
          "License fee payment"
        ],
        process: [
          "Clear any outstanding traffic fines",
          "Obtain emission test certificate if required",
          "Ensure valid insurance coverage",
          "Visit Motor Traffic office or authorized agent",
          "Submit documents and pay license fees",
          "Receive new revenue license sticker"
        ]
      },
      "Vehicle Inspection and Fitness Certificates": {
        description: "Obtain mandatory vehicle fitness certificates to ensure road safety and compliance with regulations.",
        requirements: [
          "Vehicle registration certificate",
          "Previous fitness certificate (if available)",
          "Vehicle in roadworthy condition",
          "All vehicle lights and signals functional",
          "Valid insurance certificate",
          "Inspection fee payment"
        ],
        process: [
          "Ensure vehicle meets safety standards",
          "Visit authorized vehicle testing center",
          "Complete comprehensive vehicle inspection",
          "Address any defects identified during inspection",
          "Pay inspection fees at testing center",
          "Receive fitness certificate upon passing inspection"
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
    navigate(`/motor-traffic#${hash}`);
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleShowAllServices = () => {
    navigate('/motor-traffic');
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
                  <button className="flex-1 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    Start Application
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    Download Forms
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-indigo-400 to-purple-500 hover:from-indigo-500 hover:to-purple-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="bg-gradient-to-r from-white/95 via-sky-50/80 to-blue-100/60 backdrop-blur-xl border-t border-white/30 py-6 mt-12 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
          © {new Date().getFullYear()} Department of Motor Traffic. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default MotorTrafficPage;