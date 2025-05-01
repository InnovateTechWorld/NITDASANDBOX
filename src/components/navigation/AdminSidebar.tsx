import { Link, useLocation } from 'react-router-dom';
import { Clover as Government, LayoutDashboard, ClipboardCheck, FileText, BookOpen, FileBarChart, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AdminSidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const navItems = [
    { path: '/admin', icon: <LayoutDashboard />, label: 'Dashboard' },
    { path: '/admin/applications', icon: <ClipboardCheck />, label: 'Applications' },
    { path: '/admin/progress-reports', icon: <FileBarChart />, label: 'Progress Reports' },
    { path: '/admin/guidelines', icon: <BookOpen />, label: 'Guidelines' },
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
        className={`fixed inset-y-0 left-0 z-30 w-64 transition-transform duration-300 transform bg-emerald-800 md:translate-x-0 md:static md:inset-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-emerald-700">
          <div className="flex items-center space-x-3">
            <Government className="h-8 w-8 text-white" />
            <div>
              <h2 className="text-xl font-bold text-white">NITDA</h2>
              <p className="text-xs text-emerald-200">Admin Portal</p>
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
                      ? 'bg-emerald-700 text-white'
                      : 'text-emerald-100 hover:bg-emerald-700'
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
          <div className="bg-emerald-700 p-4 rounded-lg text-center">
            <p className="text-sm text-emerald-100">Need Help?</p>
            <p className="text-xs text-emerald-200 mt-1">Contact IT Support</p>
            <a href="mailto:support@nitda.gov.ng" className="mt-2 inline-block text-xs font-medium px-3 py-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors">
              Email Support
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;