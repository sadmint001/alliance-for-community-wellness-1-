import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { NAV_ITEMS, UTILITY_NAV_ITEMS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import NewLogo from '@/assets/new-logo.png';

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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isHome = location.pathname === '/';

  // Transparent at top, visible when scrolled
  const navClass = isScrolled
    ? `fixed top-0 left-0 w-full z-50 transition-all duration-300 glass-light shadow-soft-lg`
    : `fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-transparent`;

  const linkClass = (path: string) => {
    const isActive = location.pathname === path;
    const baseClass = "text-[14px] font-medium transition-smooth px-4 py-2.5 rounded-lg";

    if (isScrolled) {
      // Scrolled state - dark text
      if (isActive) {
        return `${baseClass} text-teal-700 font-semibold bg-teal-50`;
      }
      return `${baseClass} text-gray-700 hover:text-teal-700 hover:bg-teal-50/50`;
    } else {
      // Top of page - white text
      if (isActive) {
        return `${baseClass} text-white font-semibold bg-white/20`;
      }
      return `${baseClass} text-white hover:text-white hover:bg-white/10`;
    }
  };

  const utilityLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return `text-xs font-medium transition-smooth px-3 py-1.5 rounded hover:bg-teal-50 ${isActive ? 'text-teal-600 font-semibold' : 'text-gray-600 hover:text-teal-600'
      }`;
  };

  return (
    <nav className={navClass}>
      {/* Top Utility Bar - Desktop Only - Hidden when at top */}
      <div className={`hidden lg:block border-b border-gray-100 bg-gray-50 transition-all duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end h-10 space-x-3">
            {UTILITY_NAV_ITEMS.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={utilityLinkClass(item.path)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - HUGE LOGO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-20' : 'h-24'}`}>
          {/* Logo - Structurally in the same place, but allowed to overflow */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className="group relative flex items-center flex-shrink-0 focus-ring rounded-lg z-50 transition-all duration-300"
            style={{ width: '220px', height: '100%' }}
          >
            <img
              src={NewLogo}
              alt="Alliance for Community Wellness"
              className={`absolute left-0 top-1/2 -translate-y-1/2 w-auto object-contain transition-all duration-500 transform group-hover:scale-105 ${isScrolled ? 'drop-shadow-sm' : 'drop-shadow-2xl'
                }`}
              style={{
                height: isScrolled ? '75px' : '150px',
                maxWidth: 'none',
              }}
            />
          </Link>

          {/* Desktop Navigation Links & Action Button */}
          <div className="hidden lg:flex items-center space-x-1">
            <div className="flex items-center space-x-1 mr-6">
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

            <Link to="/donate">
              <Button
                size="lg"
                className={`transition-all duration-500 font-bold px-8 shadow-soft hover:shadow-soft-xl hover-lift border-0 ${isScrolled
                  ? 'bg-gradient-to-r from-teal-600 via-teal-500 to-amber-500 text-white'
                  : 'bg-white text-teal-900 hover:bg-teal-50 shadow-soft-xl'
                  }`}
              >
                <Heart className={`h-4 w-4 mr-2 ${isScrolled ? 'text-white' : 'text-amber-500'}`} fill="currentColor" />
                Donate Now
              </Button>
            </Link>
          </div>

          {/* Mobile menu button and donate icon */}
          <div className="flex items-center lg:hidden space-x-4">
            <Link to="/donate" className="lg:hidden focus-ring rounded-full">
              <Heart className={`h-6 w-6 transition-smooth hover:scale-110 ${isScrolled ? 'text-rose-500' : 'text-white'}`} />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2.5 rounded-md focus-ring transition-smooth ${isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
              aria-label="Toggle menu"
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
        className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-xl transition-all duration-300 ease-in-out transform ${isOpen
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1">
          {/* Main Navigation Items */}
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

          {/* Divider */}
          <div className="border-t border-gray-200 my-4"></div>

          {/* Utility Navigation Items */}
          {UTILITY_NAV_ITEMS.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                block px-5 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${location.pathname === item.path
                  ? 'text-teal-600 bg-teal-50'
                  : 'text-gray-600 hover:text-teal-600 hover:bg-gray-50'
                }
              `}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {/* Donate Button */}
          <div className="pt-6 px-4">
            <Link to="/donate" onClick={() => setIsOpen(false)}>
              <Button className="w-full justify-center bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white py-3.5 rounded-lg shadow-lg text-[15px]">
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