import { Menu, BellDot, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
  userType: 'admin' | 'business';
}

const Header = ({ title, onMenuClick, userType }: HeaderProps) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    setProfileOpen(false);
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
    setNotificationsOpen(false);
  };

  return (
    <header className="z-10 py-4 bg-white shadow-sm">
      <div className="px-4 mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="p-1 mr-4 -ml-1 rounded-md md:hidden focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
            {title}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <BellDot className="w-6 h-6 text-gray-700" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg overflow-hidden z-20">
                <div className="py-2 px-3 bg-emerald-700 text-white text-sm font-medium">
                  Notifications
                </div>
                <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto">
                  {userType === 'admin' ? (
                    <>
                      <div className="px-4 py-3 hover:bg-gray-50 transition cursor-pointer">
                        <p className="text-sm font-medium text-gray-900">New application submitted</p>
                        <p className="text-xs text-gray-500">TechInnovate Ltd - 2 hours ago</p>
                      </div>
                      <div className="px-4 py-3 hover:bg-gray-50 transition cursor-pointer">
                        <p className="text-sm font-medium text-gray-900">Progress report updated</p>
                        <p className="text-xs text-gray-500">DigiSolutions - 5 hours ago</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-3 hover:bg-gray-50 transition cursor-pointer">
                        <p className="text-sm font-medium text-gray-900">Application approved</p>
                        <p className="text-xs text-gray-500">NITDA Admin - 1 day ago</p>
                      </div>
                      <div className="px-4 py-3 hover:bg-gray-50 transition cursor-pointer">
                        <p className="text-sm font-medium text-gray-900">New test case assigned</p>
                        <p className="text-xs text-gray-500">NITDA Admin - 2 days ago</p>
                      </div>
                    </>
                  )}
                </div>
                <a href="#" className="block py-2 text-sm font-medium text-center text-emerald-700 bg-gray-50 hover:bg-gray-100">
                  View all notifications
                </a>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={toggleProfile}
              className="rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center text-white">
                  <User className="w-5 h-5" />
                </div>
                <span className="hidden md:block ml-2 text-sm font-medium text-gray-700">
                  {user?.name || 'User'}
                </span>
              </div>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20">
                <div className="py-2 px-3 bg-emerald-700 text-white text-sm font-medium truncate">
                  {user?.email || 'user@example.com'}
                </div>
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </a>
                  {userType === 'admin' && (
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </a>
                  )}
                  <button
                    onClick={logout}
                    className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;