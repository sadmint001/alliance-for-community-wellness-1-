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

  // Exceptional design - consistently visible
  const navClass = `fixed top-0 left-0 w-full z-50 transition-all duration-500 glass-light shadow-soft-xl`;

  const linkClass = (path: string) => {
    const isActive = location.pathname === path;
    const baseClass = "text-[14px] font-medium transition-smooth px-4 py-2.5 rounded-lg";

    // Scrolled state - dark text
    if (isActive) {
      return `${baseClass} text-teal-700 font-semibold bg-teal-50`;
    }
    return `${baseClass} text-gray-700 hover:text-teal-700 hover:bg-teal-50/50`;
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
          {/* Logo - Premium Shelf Design - Static */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className="group relative flex items-center flex-shrink-0 focus-ring rounded-2xl z-50 transition-all duration-500 logo-shelf scale-90 -translate-y-1"
            style={{ width: '240px' }}
          >
            <img
              src={NewLogo}
              alt="Alliance for Community Wellness"
              className="w-auto object-contain transition-all duration-700 transform group-hover:scale-105 h-[80px] lg:h-[100px]"
              style={{
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
                className="transition-all duration-500 font-bold px-8 shadow-soft-xl hover:shadow-2xl hover-lift border-0 rounded-full bg-gradient-to-r from-teal-700 via-teal-600 to-amber-600 text-white"
              >
                <Heart className="h-4.5 w-4.5 mr-2 text-white" fill="currentColor" />
                <span className="tracking-tight">Donate Now</span>
              </Button>
            </Link>
          </div>

          <div className="flex items-center lg:hidden space-x-4">
            <Link to="/donate" className="lg:hidden focus-ring rounded-full">
              <Heart className="h-6 w-6 transition-smooth hover:scale-110 text-rose-500" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2.5 rounded-md focus-ring transition-smooth text-gray-800 hover:bg-gray-100"
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

      {/* Mobile Navigation Menu - Enhanced Glassmorphism */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full glass-light shadow-soft-xl transition-all duration-500 ease-in-out transform ${isOpen
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-10 pointer-events-none'
          }`}
        style={{ borderBottomLeftRadius: '2rem', borderBottomRightRadius: '2rem' }}
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