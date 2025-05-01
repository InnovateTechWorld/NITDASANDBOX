import { Outlet } from 'react-router-dom';
import { Clover as Government } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 to-teal-800 flex flex-col items-center justify-center p-4">
      <div className="auth-container w-full max-w-md rounded-xl bg-white shadow-xl overflow-hidden">
        <div className="py-5 px-6 text-center bg-gradient-to-r from-emerald-800 to-teal-700">
          <div className="flex justify-center mb-2">
            <Government className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">NITDA eCommerce Sandbox</h1>
          <p className="text-emerald-100 mt-1">Regulatory Innovation Platform</p>
        </div>
        <div className="p-6">
          <Outlet />
        </div>
      </div>
      <div className="mt-6 text-center text-white text-sm">
        <p>© 2025 National Information Technology Development Agency (NITDA)</p>
        <p className="mt-1">Federal Republic of Nigeria</p>
      </div>
    </div>
  );
};

export default AuthLayout;