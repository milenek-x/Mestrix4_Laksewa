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
  ChevronDown,
  Shield,
  Clock,
  ArrowRight,
  Menu,
  X,
  Bell,
  MessageSquare
} from 'lucide-react'

import Logo1 from '../../assets/Logo.png';
import { useNavigate } from "react-router-dom";

// Mock logo component since we can't import the actual image
const Logo = () => (
  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
    <Building className="w-12 h-12 text-white" />
  </div>
)

// Add props interface to properly handle navigation
interface LandingPageProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onBookAppointmentClick: () => void;
  onBrowseServicesClick: () => void;
}

export default function LandingPage({ onLoginClick, onBookAppointmentClick }: LandingPageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)
  const navigate = useNavigate();
  const handleLoginRegisterClick = () => {
    onLoginClick()
  }

  const handleBookAppointment = () => {
     navigate("/login");
  }

  const toggleAccordion = (departmentName: string) => {
    setOpenAccordion(openAccordion === departmentName ? null : departmentName)
  }

  const services = [
    { icon: Calendar, title: "Appointment Booking", desc: "Book appointments for various government services online.", color: "from-blue-500 to-cyan-500" },
    { icon: FileText, title: "Document Pre-submission", desc: "Upload required documents securely before your appointment.", color: "from-indigo-500 to-blue-500" },
    { icon: Users, title: "Citizen Dashboard", desc: "Manage your upcoming and past appointments in one place.", color: "from-blue-600 to-indigo-600" },
    { icon: Bell, title: "Automated Notifications", desc: "Get timely updates, reminders, and confirmations via email/SMS.", color: "from-cyan-500 to-blue-500" },
    { icon: Building, title: "Department Directory", desc: "Browse services from different government departments.", color: "from-blue-700 to-indigo-700" },
    { icon: MessageSquare, title: "Feedback System", desc: "Provide ratings and feedback on your service experience.", color: "from-indigo-600 to-purple-600" }
  ]

  const howItWorksFeatures = [
    {
      icon: Search,
      title: "Discover Services",
      description: "Easily find the government service you need through our comprehensive directory.",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: Calendar,
      title: "Book & Confirm",
      description: "Select an available time slot and receive instant booking confirmation with a unique QR code.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: FileText,
      title: "Prepare Documents",
      description: "Upload necessary documents in advance to speed up your in-person visit.",
      color: "from-blue-600 to-indigo-500"
    },
    {
      icon: Bell,
      title: "Stay Notified",
      description: "Get reminders and status updates for your appointments via email or SMS.",
      color: "from-cyan-400 to-blue-500"
    },
    {
      icon: Users,
      title: "Manage & Track",
      description: "Access your personal dashboard to view and manage all your appointments.",
      color: "from-blue-700 to-indigo-600"
    },
    {
      icon: MessageSquare,
      title: "Share Feedback",
      description: "Provide valuable feedback on your experience to help improve services.",
      color: "from-indigo-600 to-purple-500"
    }
  ]

  const ourServicesByDepartment = [
    {
      department: "Election Commission of Sri Lanka",
      services: [
        "Voter Registration and Amendments",
        "Inquiring Election Results",
        "Obtaining Certified Copies of Electoral Registers",
        "Application for Postal Voting"
      ],
      color: "from-blue-500 to-cyan-500"
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
      ],
      color: "from-indigo-500 to-blue-600"
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
      ],
      color: "from-blue-600 to-indigo-700"
    },
    {
      department: "Registrar General's Department",
      services: [
        "Obtaining Birth Certificates",
        "Obtaining Marriage Certificates",
        "Obtaining Death Certificates",
        "Correction of Errors in Certificates",
        "Registration of Births, Marriages, and Deaths"
      ],
      color: "from-cyan-500 to-blue-600"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl shadow-xl sticky top-0 z-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img src={Logo1} alt="LakSewa Logo" className="w-auto h-20 mx-auto mr-4" />
              <div className="ml-4">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-800 via-indigo-700 to-blue-600 bg-clip-text text-transparent">
                  Powered by Mestrix4
                </h1>
                <p className="text-sm text-slate-600">Centralized Government Services Portal</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#key-features" className="text-slate-700 hover:text-blue-600 font-medium transition-all duration-300 hover:scale-105">Key Features</a>
              <a href="#our-services" className="text-slate-700 hover:text-blue-600 font-medium transition-all duration-300 hover:scale-105">Our Services</a>
              <a href="#how-it-works" className="text-slate-700 hover:text-blue-600 font-medium transition-all duration-300 hover:scale-105">How it Works</a>
              <a href="#contact" className="text-slate-700 hover:text-blue-600 font-medium transition-all duration-300 hover:scale-105">Contact</a>
              <button
                onClick={handleLoginRegisterClick}
                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white px-8 py-3 rounded-2xl hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold"
              >
                Login/Register
              </button>
            </nav>

            <button
              className="md:hidden p-2 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6 text-blue-600" /> : <Menu className="w-6 h-6 text-blue-600" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-blue-100">
            <div className="px-4 py-2 space-y-2">
              <a href="#key-features" className="block py-3 text-slate-700 hover:text-blue-600 rounded-lg hover:bg-blue-50 px-3 transition-all">Key Features</a>
              <a href="#our-services" className="block py-3 text-slate-700 hover:text-blue-600 rounded-lg hover:bg-blue-50 px-3 transition-all">Our Services</a>
              <a href="#how-it-works" className="block py-3 text-slate-700 hover:text-blue-600 rounded-lg hover:bg-blue-50 px-3 transition-all">How it Works</a>
              <a href="#contact" className="block py-3 text-slate-700 hover:text-blue-600 rounded-lg hover:bg-blue-50 px-3 transition-all">Contact</a>
              <button
                onClick={handleLoginRegisterClick}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl mt-2 font-semibold shadow-lg"
              >
                Login/Register
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-blue-900"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Streamline Your
              <span className="block bg-gradient-to-r from-cyan-200 via-blue-200 to-indigo-200 bg-clip-text text-transparent">
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
              className="bg-gradient-to-r from-white to-blue-50 text-blue-700 px-8 py-4 rounded-2xl font-semibold hover:from-blue-50 hover:to-white transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
            >
              Book an Appointment
              <ArrowRight className="inline-block w-5 h-5 ml-2" />
            </button>
            <a
              href="#our-services"
              className="border-2 border-white/80 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-blue-700 transition-all duration-300 hover:scale-105">
              Browse Services
            </a>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="key-features" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-4">Key Features</h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experience a new era of convenient and efficient government interactions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <div key={index} className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-3 border border-blue-100/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/20 to-indigo-100/20 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-cyan-100/20 to-blue-100/20 rounded-full translate-y-12 -translate-x-12"></div>
                  
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg relative z-10`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-800 mb-3 relative z-10">{service.title}</h4>
                  <p className="text-slate-600 mb-6 leading-relaxed relative z-10">{service.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Services Section with Accordion */}
      <section id="our-services" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-indigo-800 bg-clip-text text-transparent mb-4">Our Services</h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Find the government services you need, organized by department for easy access.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {ourServicesByDepartment.map((department, index) => (
              <div key={index} className="mb-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-blue-100/50 relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-50/30 to-indigo-50/30 rounded-full -translate-y-20 translate-x-20"></div>
                
                <button
                  className={`flex justify-between items-center w-full px-8 py-6 text-left font-bold text-xl transition-all duration-300 relative z-10 ${
                    openAccordion === department.department 
                      ? `bg-gradient-to-r ${department.color} text-white shadow-lg` 
                      : 'bg-gradient-to-r from-blue-50/80 to-indigo-50/80 text-slate-800 hover:from-blue-100/80 hover:to-indigo-100/80'
                  }`}
                  onClick={() => toggleAccordion(department.department)}
                >
                  {department.department}
                  <div className={`p-2 rounded-xl transition-all duration-300 ${
                    openAccordion === department.department ? 'bg-white/20 rotate-90' : 'bg-blue-100 hover:bg-blue-200'
                  }`}>
                    {openAccordion === department.department ? (
                      <ChevronDown className="w-6 h-6 text-white" />
                    ) : (
                      <ChevronRight className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                </button>
                
                {openAccordion === department.department && (
                  <div className="px-8 py-6 bg-gradient-to-br from-white/90 to-blue-50/50 backdrop-blur-sm border-t border-blue-100/50 relative">
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-50/20 to-indigo-50/20 rounded-full translate-y-16 -translate-x-16"></div>
                    
                    <ul className="pl-5 space-y-3 text-slate-700 text-lg relative z-10">
                      {department.services.map((service, serviceIndex) => (
                        <li key={serviceIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mt-3 mr-3 flex-shrink-0"></div>
                          {service}
                        </li>
                      ))}
                    </ul>
                    
                    <button
                      onClick={handleBookAppointment}
                      className={`mt-8 inline-flex items-center bg-gradient-to-r ${department.color} text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 shadow-lg hover:scale-105 relative z-10`}
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
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-4">How LakSewa Works</h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A simple, step-by-step guide to accessing essential government services.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {howItWorksFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-blue-100/50 group hover:-translate-y-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50/30 to-indigo-50/30 rounded-full -translate-y-12 translate-x-12"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-br from-cyan-50/30 to-blue-50/30 rounded-full translate-y-10 -translate-x-10"></div>
                  
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg relative z-10`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-800 mb-3 relative z-10">{feature.title}</h4>
                  <p className="text-slate-600 relative z-10">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Benefits of Using LakSewa</h3>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Designed to make government services more accessible and efficient for every citizen.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Save Time & Energy</h4>
              <p className="text-blue-100">Reduce physical waiting times and avoid unnecessary delays.</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Secure & Transparent</h4>
              <p className="text-blue-100">Your information is handled with utmost security and privacy.</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Improved Citizen Experience</h4>
              <p className="text-blue-100">Enjoy a streamlined and burden-free process for government services.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-gradient-to-br from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-4">Get in Touch</h3>
            <p className="text-xl text-slate-600">Need help? We are here to assist you</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <Phone className="w-10 h-10 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-slate-800 mb-2">Call Center</h4>
              <p className="text-slate-600">1919 (24/7 Support)</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <Mail className="w-10 h-10 text-indigo-600" />
              </div>
              <h4 className="text-lg font-semibold text-slate-800 mb-2">Email Support</h4>
              <p className="text-slate-600">mestrix4.lankasewa@gmail.com</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <MapPin className="w-10 h-10 text-cyan-600" />
              </div>
              <h4 className="text-lg font-semibold text-slate-800 mb-2">Service Centers</h4>
              <p className="text-slate-600">Find nearest location</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 to-blue-900 text-white py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex flex-col items-center text-center space-y-2 m-2">
                <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center">
                  <img src={Logo1} className="w-15 h-15 text-white" />
                </div>
              </div>
              <p className="text-blue-100 mb-4">
                Your trusted gateway to Sri Lankan government services.
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-4 text-blue-100">Quick Links</h5>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">About Sri Lanka</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">Government Directory</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">Public Information</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">e-Services Roadmap</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4 text-blue-100">Platform Features</h5>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#how-it-works" className="hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">Unified Booking</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">Citizen Dashboard</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">Automated Notifications</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">Feedback System</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4 text-blue-100">Contact</h5>
              <ul className="space-y-2 text-slate-300">
                <li>Call Center: 1919</li>
                <li>Email: mestrix4.lankasewa@gmail.com</li>
                <li>Emergency: 119</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-300">
            <p>&copy; 2025 Government of Sri Lanka. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}