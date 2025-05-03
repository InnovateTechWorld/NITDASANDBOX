import { Outlet } from 'react-router-dom';
import { Clover as Government } from 'lucide-react';
import Navbar from "../components/navigation/Navbar";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 to-teal-800 flex flex-col items-center justify-center">
      {/* NAVBAR */}
      <div className="px-2 md:px-16 mb-4 w-full">
                    <Navbar />
                </div>
      <div className="auth-container w-full max-w-md rounded-xl bg-white shadow-xl overflow-hidden">
        <div className="py-5 px-6 text-center bg-gradient-to-r from-emerald-800 to-teal-700">
          <div className="flex justify-center mb-2">
          <img src="/LogoFull.svg" alt="NITDA SandBox Logo" className="h-8 mb-2" />
          </div>
          <h1 className="text-xl font-bold text-white">Regulatory Innovation Platform</h1>
        </div>
        <div className="p-6">
          <Outlet />
        </div>
      </div>
      <div className="my-6 text-center text-white text-[12px]">
        <p>© 2025 National Information Technology Development Agency (NITDA)</p>
        <p className="mt-1">Federal Republic of Nigeria</p>
      </div>
    </div>
  );
};

export default AuthLayout;