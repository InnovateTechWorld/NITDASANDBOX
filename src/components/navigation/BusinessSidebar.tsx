import { Link, useLocation } from 'react-router-dom';
import { 
  Store, 
  LayoutDashboard, 
  ClipboardList, 
  Upload, 
  BookOpen, 
  MessageSquareText,
  X 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const BusinessSidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const navItems = [
    { path: '/business', icon: <LayoutDashboard />, label: 'Dashboard' },
    { path: '/business/apply', icon: <ClipboardList />, label: 'Apply to Sandbox' },
    { path: '/business/test-cases', icon: <BookOpen />, label: 'Test Cases' },
    { path: '/business/progress', icon: <Upload />, label: 'Progress Upload' },
    { path: '/business/chatbot', icon: <MessageSquareText />, label: 'Compliance Assistant' },
    { path: '/business/guidelines', icon: <BookOpen />, label: 'Guidelines' },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 transition-transform duration-300 transform bg-blue-800 md:translate-x-0 md:static md:inset-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-blue-700">
          <div className="flex items-center space-x-3">
            <Store className="h-8 w-8 text-white" />
            <div>
              <h2 className="text-xl font-bold text-white">Sandbox</h2>
              <p className="text-xs text-blue-200">Business Portal</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-md -mr-1 md:hidden focus:outline-none focus:ring-2 focus:ring-white"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-100 hover:bg-blue-700'
                  }`}
                >
                  <span className="w-6 h-6">{item.icon}</span>
                  <span className="ml-3">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="bg-blue-700 p-4 rounded-lg text-center">
            <p className="text-sm text-blue-100">Need Help?</p>
            <p className="text-xs text-blue-200 mt-1">Contact Sandbox Support</p>
            <a href="#" className="mt-2 inline-block text-xs font-medium px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">
              Live Chat
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default BusinessSidebar;