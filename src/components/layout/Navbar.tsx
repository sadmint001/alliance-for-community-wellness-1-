import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import ACWLogo from '@/assets/ACW-logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';
  
  // Navbar background logic
  const showWhiteBackground = isScrolled || !isHome;
  
  const navClass = `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
    showWhiteBackground 
      ? 'bg-white shadow-md py-0' 
      : 'bg-transparent py-0'
  }`;

  const linkClass = (path: string) => {
    const isActive = location.pathname === path;
    const baseClass = "text-[15px] font-medium transition-colors duration-200 px-4 py-2.5";
    
    if (isActive) {
      return `${baseClass} text-teal-600 font-semibold relative after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-teal-600`;
    }
    
    if (showWhiteBackground) {
      return `${baseClass} text-gray-800 hover:text-teal-600`;
    }
    
    return `${baseClass} text-white hover:text-white/90`;
  };

  const menuIconColor = showWhiteBackground ? 'text-gray-800' : 'text-white';

  return (
    <nav className={navClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo with text */}
          <Link to="/" className="flex items-center space-x-3 md:space-x-4">
            <img 
              src={ACWLogo} 
              alt="ACW logo" 
              className="h-14 w-auto object-contain transition-all duration-300 hover:scale-105" 
            />
            <div className="hidden sm:block">
              <div className={`text-[28px] font-bold leading-none tracking-tight transition-colors duration-300 ${
                showWhiteBackground ? 'text-teal-800' : 'text-white'
              }`}>
                ACW
              </div>
              <div className={`text-[11px] font-medium leading-tight tracking-wide uppercase transition-colors duration-300 ${
                showWhiteBackground ? 'text-gray-600' : 'text-white/90'
              }`}>
                <span className="block">ALLIANCE FOR COMMUNITY</span>
                <span className="block">WELLNESS</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-2">
            {NAV_ITEMS.map(item => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={linkClass(item.path)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Donate Button */}
          <div className="hidden lg:flex items-center">
            <Link to="/donate">
              <Button 
                className={`
                  px-6 py-2.5 rounded-full font-semibold transition-all duration-300
                  flex items-center space-x-2
                  ${showWhiteBackground 
                    ? 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg' 
                    : 'bg-white/95 hover:bg-white text-teal-800 shadow-md hover:shadow-lg'
                  }
                `}
              >
                <Heart className="h-4.5 w-4.5" fill="currentColor" />
                <span className="text-[15px]">Donate Now</span>
              </Button>
            </Link>
          </div>

          {/* Mobile menu button and donate icon */}
          <div className="flex items-center lg:hidden space-x-4">
            <Link to="/donate" className="lg:hidden">
              <Heart className={`h-6 w-6 ${showWhiteBackground ? 'text-rose-500' : 'text-white'}`} />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`
                inline-flex items-center justify-center p-2.5 rounded-md focus:outline-none 
                ${showWhiteBackground ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'}
              `}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Menu className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-xl transition-all duration-300 ease-in-out transform ${
          isOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1">
          {/* Mobile version of logo text for context */}
          <div className="px-4 py-3 mb-2 border-b border-gray-100">
            <div className="text-2xl font-bold text-teal-800">ACW</div>
            <div className="text-xs text-gray-600 font-medium uppercase">
              <span className="block">ALLIANCE FOR COMMUNITY</span>
              <span className="block">WELLNESS</span>
            </div>
          </div>
          
          {NAV_ITEMS.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                block px-5 py-3.5 rounded-lg text-base font-medium transition-colors
                ${location.pathname === item.path
                  ? 'text-teal-600 bg-teal-50 border-l-4 border-teal-600'
                  : 'text-gray-800 hover:text-teal-600 hover:bg-gray-50'
                }
              `}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          
          <div className="pt-6 px-4">
            <Link to="/donate" onClick={() => setIsOpen(false)}>
              <Button className="w-full justify-center bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white py-3.5 rounded-lg shadow-lg text-[15px]">
                <Heart className="mr-3 h-4.5 w-4.5" fill="currentColor" />
                Donate Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;