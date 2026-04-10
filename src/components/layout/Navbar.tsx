import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, Facebook, Twitter, MapPin } from 'lucide-react';
import { NAV_ITEMS, CONTACT_INFO } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import NewLogo from '@/assets/new-logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    const base = 'relative text-[13px] font-bold tracking-wider uppercase px-5 py-3 transition-all duration-300 group';
    const active = 'text-amber-400';
    const inactive = 'text-gray-300 hover:text-white';
    return `${base} ${isActive ? active : inactive}`;
  };

  // Animated underline element to render inside each link
  const NavLink = ({ to, label }: { to: string; label: string }) => {
    const isActive = location.pathname === to;
    return (
      <Link to={to} className={navLinkClass(to)}>
        {label}
        <span
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-amber-400 transition-all duration-300 ease-out ${
            isActive ? 'w-4/5' : 'w-0 group-hover:w-4/5'
          }`}
        />
      </Link>
    );
  };

  return (
    <>
      {/* ===== TOP WHITE HEADER - Logo + Contact Info ===== */}
      {/* This is in normal document flow, OUTSIDE the hero image */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24 lg:h-28">
            {/* Logo - preserving exact original sizing */}
            <Link
              to="/"
              onClick={handleLogoClick}
              className="flex items-center flex-shrink-0"
            >
              <img
                src={NewLogo}
                alt="Alliance for Community Wellness"
                className="w-auto object-contain h-[50px] md:h-[80px] lg:h-[100px]"
                style={{ maxWidth: 'none' }}
              />
            </Link>

            {/* Contact Info - Desktop Only */}
            <div className="hidden lg:flex items-center space-x-6 text-[13px] text-gray-600">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-teal-700" />
                <span>{CONTACT_INFO.phone}</span>
              </div>
              <div className="flex items-center space-x-2 border-l border-gray-200 pl-6">
                <Phone className="h-4 w-4 text-teal-700" />
                <span>+254 20 260 3433</span>
              </div>
              <div className="flex items-center space-x-2 border-l border-gray-200 pl-6">
                <Mail className="h-4 w-4 text-teal-700" />
                <span>{CONTACT_INFO.email}</span>
              </div>
              <Link to="/donate">
                <Button
                  size="sm"
                  className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-6 py-2 rounded-sm uppercase tracking-wider text-xs"
                >
                  Donate
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button - shown in header on mobile */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-md"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </header>

      {/* ===== DARK BLUE NAV BAR - overlays the hero image ===== */}
      {/* This sits in normal flow but the hero image uses negative margin to slide under it */}
      <nav className="relative z-20 bg-slate-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-12 lg:h-14">
            {/* Desktop Navigation Links - Centered */}
            <div className="hidden lg:flex items-center flex-1 justify-center">
              <NavLink to="/" label="HOME" />
              {NAV_ITEMS.map(item => (
                <NavLink key={item.path} to={item.path} label={item.label.toUpperCase()} />
              ))}
              <NavLink to="/contact" label="CONTACTS" />
            </div>

            {/* Social Media Icons - Desktop */}
            <div className="hidden lg:flex items-center h-12 lg:h-14">
              <a href="#" className="h-full w-12 flex items-center justify-center bg-white/5 text-gray-400 hover:bg-amber-400 hover:text-slate-900 transition-all duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="h-full w-12 flex items-center justify-center bg-white/5 text-gray-400 hover:bg-amber-400 hover:text-slate-900 transition-all duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="h-full w-12 flex items-center justify-center bg-white/5 text-gray-400 hover:bg-amber-400 hover:text-slate-900 transition-all duration-300">
                <MapPin className="h-5 w-5" />
              </a>
            </div>

            {/* Mobile: show a compact nav indicator */}
            <div className="lg:hidden flex items-center justify-between w-full">
              <span className="text-white text-sm font-bold tracking-wider uppercase">Menu</span>
              <div className="flex items-center space-x-1">
                <a href="#" className="w-9 h-9 flex items-center justify-center bg-teal-800 text-white">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" className="w-9 h-9 flex items-center justify-center bg-teal-600 text-white">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" className="w-9 h-9 flex items-center justify-center bg-teal-900 text-white">
                  <MapPin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== MOBILE DROPDOWN MENU ===== */}
      <div
        className={`lg:hidden bg-slate-900 relative z-20 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[500px] border-t border-white/10' : 'max-h-0'}`}
      >
        <div className="px-4 py-2 space-y-1">
          <Link to="/" className="block py-3 text-white font-bold border-b border-white/10 hover:text-amber-400 transition-colors" onClick={() => setIsOpen(false)}>HOME</Link>
          {NAV_ITEMS.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className="block py-3 text-white font-bold border-b border-white/10 hover:text-amber-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.label.toUpperCase()}
            </Link>
          ))}
          <Link to="/contact" className="block py-3 text-white font-bold hover:text-amber-400 transition-colors" onClick={() => setIsOpen(false)}>CONTACTS</Link>
          
          {/* Mobile contact info */}
          <div className="pt-4 pb-2 border-t border-white/10 space-y-2 text-white/80 text-sm">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>{CONTACT_INFO.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>{CONTACT_INFO.email}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;