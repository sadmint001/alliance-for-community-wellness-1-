import ACWLogo from '@/assets/ACW-logo.png';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Heart } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex flex-col items-center md:items-start space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <img 
                  src={ACWLogo} 
                  alt="ACW logo" 
                  className="h-14 w-auto object-contain" 
                />
                <div>
                  <div className="text-2xl font-bold text-white leading-tight">ACW</div>
                  <div className="text-xs text-gray-300 uppercase leading-tight tracking-wide">
                    <div>ALLIANCE FOR COMMUNITY</div>
                    <div>WELLNESS</div>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed text-center md:text-left text-sm">
              Empowering communities through collaboration, cultivating a culture of inclusivity, resilience, and wellness.
            </p>
            
            <div className="flex space-x-4 mb-6">
              <a 
                href="#" 
                className="bg-gray-800 hover:bg-teal-600 text-gray-300 hover:text-white p-2 rounded-full transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="bg-gray-800 hover:bg-teal-600 text-gray-300 hover:text-white p-2 rounded-full transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="#" 
                className="bg-gray-800 hover:bg-teal-600 text-gray-300 hover:text-white p-2 rounded-full transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
            
            <Link to="/donate">
              <Button className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-6 py-2.5 text-sm">
                <Heart className="h-4 w-4 mr-2" fill="currentColor" />
                Donate Now
              </Button>
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 pb-2 border-b border-gray-800">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-300 hover:text-teal-400 transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                About Us
              </Link></li>
              <li><Link to="/programs" className="text-gray-300 hover:text-teal-400 transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Our Work
              </Link></li>
              <li><Link to="/projects" className="text-gray-300 hover:text-teal-400 transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Projects
              </Link></li>
              <li><Link to="/get-involved" className="text-gray-300 hover:text-teal-400 transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Get Involved
              </Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-teal-400 transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Contact
              </Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 pb-2 border-b border-gray-800">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-gray-800 p-2 rounded-lg mr-3 flex-shrink-0">
                  <MapPin className="h-5 w-5 text-teal-400" />
                </div>
                <div>
                  <h5 className="font-medium text-white mb-1">Address</h5>
                  <p className="text-gray-300 text-sm leading-relaxed">{CONTACT_INFO.address}</p>
                </div>
              </li>
              <li className="flex items-center">
                <div className="bg-gray-800 p-2 rounded-lg mr-3 flex-shrink-0">
                  <Phone className="h-5 w-5 text-teal-400" />
                </div>
                <div>
                  <h5 className="font-medium text-white mb-1">Phone</h5>
                  <a href={`tel:${CONTACT_INFO.phone}`} className="text-gray-300 hover:text-teal-400 text-sm">{CONTACT_INFO.phone}</a>
                </div>
              </li>
              <li className="flex items-center">
                <div className="bg-gray-800 p-2 rounded-lg mr-3 flex-shrink-0">
                  <Mail className="h-5 w-5 text-teal-400" />
                </div>
                <div>
                  <h5 className="font-medium text-white mb-1">Email</h5>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-gray-300 hover:text-teal-400 text-sm break-all">{CONTACT_INFO.email}</a>
                </div>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div>
            <h4 className="text-lg font-bold mb-6 pb-2 border-b border-gray-800">Our Location</h4>
            <div className="h-48 rounded-lg overflow-hidden bg-gray-800 border border-gray-700 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.817557345678!2d36.7909!3d-1.2833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10b000000001%3A0x0!2sHurlingham%20Plaza!5e0!3m2!1sen!2ske!4v1620000000000!5m2!1sen!2ske"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="ACW Location"
                className="opacity-90 hover:opacity-100 transition-opacity duration-300"
              ></iframe>
            </div>
            <p className="text-gray-400 text-sm mt-3 italic">
              Visit us at our headquarters in Nairobi, Kenya
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              <p>&copy; {new Date().getFullYear()} Alliance for Community Wellness. All rights reserved.</p>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-teal-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-teal-400 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-gray-400 hover:text-teal-400 text-sm transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-gray-600 text-xs">
              Registered Non-Profit Organization in Kenya • PBO No: 0000000
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;