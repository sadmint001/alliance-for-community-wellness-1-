import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  title?: string;
  items: { label: string; path: string }[];
}

const Sidebar = ({ title = "Consulting Services", items }: SidebarProps) => {
  return (
    <div className="flex flex-col w-full max-w-[280px]">
      {/* Sidebar Header */}
      <div className="bg-glide-gold text-white px-5 py-4 font-bold text-lg">
        {title}
      </div>

      {/* Sidebar Links */}
      <div className="flex flex-col border border-gray-100">
        {items.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="px-5 py-3 border-b border-gray-100 text-glide-blue font-medium hover:bg-glide-gray transition-colors last:border-b-0"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Booking Button */}
      <Link to="/contact" className="mt-8">
        <Button className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-6 rounded-none flex items-center justify-center space-x-2">
          <Calendar className="h-5 w-5" />
          <span>24/7 WORKSHOPS BOOKING</span>
        </Button>
      </Link>
    </div>
  );
};

export default Sidebar;
