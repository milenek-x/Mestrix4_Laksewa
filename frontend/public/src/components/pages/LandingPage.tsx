import React, { useState } from 'react'
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
  Globe,
  Shield,
  Clock,
  ArrowRight,
  Menu,
  X
} from 'lucide-react'

// Add props interface to properly handle navigation
interface LandingPageProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export default function LandingPage({ onLoginClick, onRegisterClick }: LandingPageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Use the props instead of navigate
  const handleLoginClick = () => {
    onLoginClick()
  }

  const handleBookAppointment = () => {
    onLoginClick() // This will take user to login first
  }

  const services = [
    { icon: FileText, title: "Birth Certificates", desc: "Apply for birth certificates online" },
    { icon: Users, title: "National ID Services", desc: "NIC applications and renewals" },
    { icon: Building, title: "Business Registration", desc: "Register your business with ROC" },
    { icon: Calendar, title: "Passport Services", desc: "Apply and renew passports" },
    { icon: Shield, title: "Police Clearance", desc: "Get police clearance certificates" },
    { icon: Globe, title: "Visa Services", desc: "Tourist and residence visa applications" }
  ]

  const quickLinks = [
    "Weather Information",
    "Government Procurements", 
    "Central Bank of Sri Lanka",
    "Exchange Rates",
    "e-Participation Portal",
    "Open Data Portal",
    "eLaws and Policies",
    "Computer Emergency Readiness Team"
  ]

  const importantLinks = [
    "Presidential Secretariat",
    "Prime Minister's Office", 
    "Parliament",
    "Supreme Court",
    "Office of the Cabinet of Ministers"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
                  Lanka Sewa
                </h1>
                <p className="text-sm text-gray-600">Government Services Portal</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Services</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">About</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</a>
              <button 
                onClick={handleLoginClick}
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
              <a href="#services" className="block py-2 text-gray-700 hover:text-blue-600">Services</a>
              <a href="#about" className="block py-2 text-gray-700 hover:text-blue-600">About</a>
              <a href="#contact" className="block py-2 text-gray-700 hover:text-blue-600">Contact</a>
              <button 
                onClick={handleLoginClick}
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
              Your Gateway to
              <span className="block bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                Government Services
              </span>
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Access Sri Lankan government services from a single platform, on your schedule. 
              Simple, secure, and available 24/7.
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
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-700 transition-all duration-300">
              Browse Services
            </button>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="flex items-center bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
              <Search className="w-6 h-6 text-white/80 ml-4" />
              <input 
                type="text" 
                placeholder="Search government services..."
                className="flex-1 bg-transparent text-white placeholder-white/60 px-4 py-3 focus:outline-none text-lg"
              />
              <button className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section id="services" className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Services</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access the most requested government services quickly and efficiently
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
                  <button 
                    onClick={handleLoginClick}
                    className="text-blue-600 font-semibold flex items-center group-hover:text-blue-700 transition-colors"
                  >
                    Learn More <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick Links & Important Links */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Quick Links */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Quick Links</h3>
              <div className="grid gap-4">
                {quickLinks.map((link, index) => (
                  <a key={index} href="#" className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group">
                    <span className="text-gray-800 font-medium">{link}</span>
                    <ChevronRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            {/* Important Links */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Important Links</h3>
              <div className="grid gap-4">
                {importantLinks.map((link, index) => (
                  <a key={index} href="#" className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group">
                    <span className="text-gray-800 font-medium">{link}</span>
                    <ChevronRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="about" className="py-20 bg-gradient-to-br from-blue-900 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose Lanka Sewa?</h3>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              The smart gateway to Sri Lankan government services
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">24/7 Available</h4>
              <p className="text-blue-100">Access services anytime, anywhere at your convenience.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Secure & Reliable</h4>
              <p className="text-blue-100">Your data is protected with enterprise-grade security.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">User Friendly</h4>
              <p className="text-blue-100">Simple interface designed for everyone to use easily.</p>
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
              <p className="text-gray-600">support@lankasewa.gov.lk</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Service Centers</h4>
              <p className="text-gray-600">Find nearest location</p>
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
                <h4 className="text-xl font-bold">Lanka Sewa</h4>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted gateway to Sri Lankan government services.
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Sri Lanka</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Government</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Constitution</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Legal System</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Services</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Online Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile Apps</a></li>
                <li><a href="#" className="hover:text-white transition-colors">SMS Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Support</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Contact</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Call Center: 1919</li>
                <li>Email: info@gov.lk</li>
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