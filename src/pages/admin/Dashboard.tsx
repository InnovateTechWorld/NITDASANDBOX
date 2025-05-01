import { LineChart, Clipboard, UserCheck, Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_APPLICATIONS, Application } from '../../models/Application';

const AdminDashboard = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    underReview: 0,
    approved: 0,
    completed: 0
  });

  useEffect(() => {
    // In a real application, this would fetch from an API
    setApplications(MOCK_APPLICATIONS);
    
    // Calculate stats
    setStats({
      total: MOCK_APPLICATIONS.length,
      underReview: MOCK_APPLICATIONS.filter(app => app.status === 'under_review').length,
      approved: MOCK_APPLICATIONS.filter(app => app.status === 'approved').length,
      completed: MOCK_APPLICATIONS.filter(app => app.status === 'completed').length
    });
  }, []);

  const statCards = [
    { 
      title: 'Total Applications', 
      value: stats.total, 
      icon: <Clipboard className="h-8 w-8 text-emerald-700" />,
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700'
    },
    { 
      title: 'Under Review', 
      value: stats.underReview, 
      icon: <LineChart className="h-8 w-8 text-blue-700" />,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    { 
      title: 'Approved', 
      value: stats.approved, 
      icon: <UserCheck className="h-8 w-8 text-orange-700" />,
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    },
    { 
      title: 'Completed', 
      value: stats.completed, 
      icon: <Award className="h-8 w-8 text-purple-700" />,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    }
  ];

  // Sort applications by submission date descending
  const recentApplications = [...applications]
    .sort((a, b) => {
      const dateA = a.submittedAt ? new Date(a.submittedAt).getTime() : 0;
      const dateB = b.submittedAt ? new Date(b.submittedAt).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 5);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of sandbox applications and testing progress</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div 
            key={index}
            className={`rounded-lg shadow p-5 ${stat.bgColor} border border-${stat.bgColor.split('-')[1]}-100 transition-transform hover:transform hover:scale-105`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
              </div>
              <div className="rounded-full p-3 bg-white bg-opacity-60">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Recent Applications</h2>
          <Link
            to="/admin/applications"
            className="text-sm font-medium text-emerald-600 hover:text-emerald-800"
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Business
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{app.businessName}</div>
                    <div className="text-sm text-gray-500">{app.contactName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{app.productName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {app.innovationType.map((type, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      app.status === 'submitted' ? 'bg-yellow-100 text-yellow-800' :
                      app.status === 'under_review' ? 'bg-blue-100 text-blue-800' :
                      app.status === 'approved' ? 'bg-green-100 text-green-800' :
                      app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      app.status === 'testing' ? 'bg-purple-100 text-purple-800' :
                      app.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {app.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      to={`/admin/applications/${app.id}`}
                      className="text-emerald-600 hover:text-emerald-900"
                    >
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
              {recentApplications.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No applications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-lg shadow-lg p-6 text-white">
        <h2 className="text-xl font-bold mb-2">Welcome to the NITDA Regulatory Sandbox</h2>
        <p className="mb-4">
          As an administrator, you can review applications, assign test cases, and monitor the progress of startups in the sandbox.
        </p>
        <div className="flex flex-wrap gap-4 mt-4">
          <a href="#" className="inline-flex items-center px-4 py-2 bg-white text-emerald-700 rounded-md font-medium hover:bg-gray-100 transition-colors">
            View Documentation
          </a>
          <a href="#" className="inline-flex items-center px-4 py-2 border border-white text-white rounded-md font-medium hover:bg-emerald-700 transition-colors">
            Update Guidelines
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;