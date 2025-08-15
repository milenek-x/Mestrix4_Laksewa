// src/pages/ImmigrationEmigrationPage.tsx
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Removed useParams as 'id' is no longer used
import { FileText } from 'lucide-react';

const ImmigrationEmigrationPage: React.FC = () => {
  // const { id } = useParams<{ id?: string }>(); // This line is removed/commented out
  const location = useLocation();

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
    color: 'from-cyan-500 to-cyan-600',
    description: 'Apply for passports, visas, and citizenship services.',
    id: 'immigration-emigration',
  };

  const createServiceHash = (serviceName: string) => {
    return serviceName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.substring(1);
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-blue-200 p-8">
        <div className="flex flex-col items-center justify-center mb-6">
          <div className={`w-20 h-20 bg-gradient-to-r ${departmentData.color} rounded-full flex items-center justify-center mb-4 shadow-lg`}>
            <departmentData.icon className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-blue-900 mb-2">
            {departmentData.department}
          </h2>
          <p className="text-blue-700 text-lg text-center">
            {departmentData.description}
          </p>
        </div>

        <hr className="my-8 border-blue-200" />

        <h3 className="text-2xl font-bold text-blue-900 mb-6">Available Services</h3>
        <div className="space-y-6">
          {departmentData.services.map((service, index) => (
            <div
              key={index}
              id={createServiceHash(service)}
              className="bg-cyan-50 p-6 rounded-lg border border-cyan-200 hover:shadow-md transition-shadow duration-300"
            >
              <h4 className="text-xl font-semibold text-cyan-800 mb-2">{service}</h4>
              <p className="text-cyan-600">
                {/* Placeholder for service description or application link */}
                Details about {service.toLowerCase()}. Click here to apply.
              </p>
              <button className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors duration-300">
                Learn More / Apply
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImmigrationEmigrationPage;