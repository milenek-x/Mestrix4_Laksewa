import { useState } from 'react'
import {
  Search,
  Calendar,
  FileText,
  Users,
  Building,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  ChevronDown, // For accordion open/close
  Shield,
  Clock,
  ArrowRight,
  Menu, // Added for hamburger icon
  X, // Added for close icon
  Bell, // For notifications
  MessageSquare // For feedback
} from 'lucide-react'

import Logo from '../../assets/Logo.png';

// Add props interface to properly handle navigation
interface LandingPageProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onBookAppointmentClick: () => void; // New prop for booking flow
  onBrowseServicesClick: () => void; // New prop for browsing services
}

export default function LandingPage({ onLoginClick, onBookAppointmentClick }: LandingPageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openAccordion, setOpenAccordion] = useState<string | null>(null); // State for accordion

  const handleLoginRegisterClick = () => {
    onLoginClick() // This can lead to a modal or a separate page for login/register
  }

  const handleBookAppointment = () => {
    onBookAppointmentClick() // This should ideally take the user to the service directory
  }
  const toggleAccordion = (departmentName: string) => {
    setOpenAccordion(openAccordion === departmentName ? null : departmentName);
  };

  // Original services (Key Features) re-added
  const services = [
    { icon: Calendar, title: "Appointment Booking", desc: "Book appointments for various government services online." },
    { icon: FileText, title: "Document Pre-submission", desc: "Upload required documents securely before your appointment." },
    { icon: Users, title: "Citizen Dashboard", desc: "Manage your upcoming and past appointments in one place." },
    { icon: Bell, title: "Automated Notifications", desc: "Get timely updates, reminders, and confirmations via email/SMS." },
    { icon: Building, title: "Department Directory", desc: "Browse services from different government departments." },
    { icon: MessageSquare, title: "Feedback System", desc: "Provide ratings and feedback on your service experience." }
  ]

  const howItWorksFeatures = [
    {
      icon: Search,
      title: "Discover Services",
      description: "Easily find the government service you need through our comprehensive directory."
    },
    {
      icon: Calendar,
      title: "Book & Confirm",
      description: "Select an available time slot and receive instant booking confirmation with a unique QR code."
    },
    {
      icon: FileText,
      title: "Prepare Documents",
      description: "Upload necessary documents in advance to speed up your in-person visit."
    },
    {
      icon: Bell,
      title: "Stay Notified",
      description: "Get reminders and status updates for your appointments via email or SMS."
    },
    {
      icon: Users,
      title: "Manage & Track",
      description: "Access your personal dashboard to view and manage all your appointments."
    },
    {
      icon: MessageSquare,
      title: "Share Feedback",
      description: "Provide valuable feedback on your experience to help improve services."
    }
  ];

  const ourServicesByDepartment = [
    {
      department: "Election Commission of Sri Lanka",
      services: [
        "Voter Registration and Amendments",
        "Inquiring Election Results",
        "Obtaining Certified Copies of Electoral Registers",
        "Application for Postal Voting"
      ]
    },
    {
      department: "Department of Motor Traffic",
      services: [
        "New Driving License Application",
        "Driving License Renewal",
        "Vehicle Registration",
        "Vehicle Ownership Transfer",
        "Revenue License Renewal",
        "Vehicle Inspection and Fitness Certificates"
      ]
    },
    {
      department: "Department of Immigration & Emigration",
      services: [
        "New Passport Application",
        "Passport Renewal",
        "Visa Applications (Tourist, Business, Resident, etc.)",
        "Extension of Visa",
        "Citizenship Application",
        "Dual Citizenship Application"
      ]
    },
    {
      department: "Registrar General's Department",
      services: [
        "Obtaining Birth Certificates",
        "Obtaining Marriage Certificates",
        "Obtaining Death Certificates",
        "Correction of Errors in Certificates",
        "Registration of Births, Marriages, and Deaths"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img src={Logo} alt="Government Services Portal Logo" className="w-auto h-20 mx-auto mr-4" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent pl-3">
                  LakSewa by Mestrix4
                </h1>
                <p className="text-sm text-gray-600">Centralized Government Services Portal</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#key-features" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Key Features</a>
              <a href="#our-services" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Our Services</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">How it Works</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</a>
              <button
                onClick={handleLoginRegisterClick}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg"
              >
                Login/Register
              </button>
            </nav>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-2">
              <a href="#key-features" className="block py-2 text-gray-700 hover:text-blue-600">Key Features</a>
              <a href="#our-services" className="block py-2 text-gray-700 hover:text-blue-600">Our Services</a>
              <a href="#how-it-works" className="block py-2 text-gray-700 hover:text-blue-600">How it Works</a>
              <a href="#contact" className="block py-2 text-gray-700 hover:text-blue-600">Contact</a>
              <button
                onClick={handleLoginRegisterClick}
                className="w-full bg-blue-600 text-white py-2 rounded-lg mt-2"
              >
                Login/Register
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Streamline Your
              <span className="block bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                Government Services
              </span>
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Book appointments, submit documents, and manage all your interactions with Sri Lankan government services from a single, user-friendly platform.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={handleBookAppointment}
              className="bg-white text-blue-700 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Book an Appointment
              <ArrowRight className="inline-block w-5 h-5 ml-2" />
            </button>
            <a
              href="#our-services" // Changed to navigate to Our Services section
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-700 transition-all duration-300">
              Browse Services
            </a>
          </div>

          {/* Removed Search Bar */}
        </div>
      </section>

      {/* Key Features Section */}
      <section id="key-features" className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Features</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience a new era of convenient and efficient government interactions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h4>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.desc}</p>
                  {/* Removed the "Learn More" button */}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Services Section with Accordion */}
      <section id="our-services" className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the government services you need, organized by department for easy access.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {ourServicesByDepartment.map((department, index) => (
              <div key={index} className="mb-4 bg-white rounded-lg shadow-lg overflow-hidden border border-blue-200">
                <button
                  className={`flex justify-between items-center w-full px-6 py-4 text-left font-bold text-xl transition-all duration-300 ${
                    openAccordion === department.department ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
                  }`}
                  onClick={() => toggleAccordion(department.department)}
                >
                  {department.department}
                  {openAccordion === department.department ? (
                    <ChevronDown className="w-6 h-6 text-white" />
                  ) : (
                    <ChevronRight className="w-6 h-6 text-blue-600" />
                  )}
                </button>
                {openAccordion === department.department && (
                  <div className="px-6 py-4 bg-white border-t border-blue-100">
                    {/* Removed 'list-disc' from ul to remove discs */}
                    <ul className="pl-5 space-y-2 text-gray-700 text-lg">
                      {department.services.map((service, serviceIndex) => (
                        <li key={serviceIndex}>{service}</li>
                      ))}
                    </ul>
                    <button
                      onClick={handleBookAppointment}
                      className="mt-6 inline-flex items-center bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-md"
                    >
                      Book an Appointment for this Department <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How LakSewa Works</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A simple, step-by-step guide to accessing essential government services.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {howItWorksFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits (Previously Features) */}
      <section id="benefits" className="py-20 bg-gradient-to-br from-blue-900 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Benefits of Using LakSewa</h3>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Designed to make government services more accessible and efficient for every citizen.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Save Time & Energy</h4>
              <p className="text-blue-100">Reduce physical waiting times and avoid unnecessary delays.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Secure & Transparent</h4>
              <p className="text-blue-100">Your information is handled with utmost security and privacy.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Improved Citizen Experience</h4>
              <p className="text-blue-100">Enjoy a streamlined and burden-free process for government services.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get in Touch</h3>
            <p className="text-xl text-gray-600">Need help? We are here to assist you</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Call Center</h4>
              <p className="text-gray-600">1919 (24/7 Support)</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h4>
              <p className="text-gray-600">mestrix4.lankasewa@gmail.com</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Service Centers</h4>
              <p className="text-600">Find nearest location</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold">LakSewa</h4>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted gateway to Sri Lankan government services.
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Sri Lanka</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Government Directory</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Public Information</a></li>
                <li><a href="#" className="hover:text-white transition-colors">e-Services Roadmap</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Platform Features</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#how-it-works" className="hover:text-white transition-colors">Unified Booking</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">Citizen Dashboard</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">Automated Notifications</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">Feedback System</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Contact</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Call Center: 1919</li>
                <li>Email: mestrix4.lankasewa@gmail.com</li>
                <li>Emergency: 119</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Government of Sri Lanka. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}