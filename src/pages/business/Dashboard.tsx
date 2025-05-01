import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { findApplicationsByBusinessId, Application } from '../../models/Application';
import { ClipboardCheck, FileText, CheckCircle, AlertCircle, ChevronRight, MessageSquareText } from 'lucide-react';

const BusinessDashboard = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [latestApplication, setLatestApplication] = useState<Application | null>(null);
  
  useEffect(() => {
    if (!user) return;
    
    // In a real app, this would be an API call
    const businessApps = findApplicationsByBusinessId(user.id);
    setApplications(businessApps);
    
    // Get latest application
    if (businessApps.length > 0) {
      // Sort by submitted date (most recent first)
      const sortedApps = [...businessApps].sort((a, b) => {
        const dateA = a.submittedAt ? new Date(a.submittedAt).getTime() : 0;
        const dateB = b.submittedAt ? new Date(b.submittedAt).getTime() : 0;
        return dateB - dateA;
      });
      setLatestApplication(sortedApps[0]);
    }
  }, [user]);

  // Helper function to get status text and color
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'draft':
        return { color: 'text-gray-500', bgColor: 'bg-gray-100', text: 'Draft' };
      case 'submitted':
        return { color: 'text-yellow-700', bgColor: 'bg-yellow-100', text: 'Submitted' };
      case 'under_review':
        return { color: 'text-blue-700', bgColor: 'bg-blue-100', text: 'Under Review' };
      case 'approved':
        return { color: 'text-green-700', bgColor: 'bg-green-100', text: 'Approved' };
      case 'rejected':
        return { color: 'text-red-700', bgColor: 'bg-red-100', text: 'Rejected' };
      case 'testing':
        return { color: 'text-purple-700', bgColor: 'bg-purple-100', text: 'Testing in Progress' };
      case 'completed':
        return { color: 'text-gray-700', bgColor: 'bg-gray-100', text: 'Testing Completed' };
      default:
        return { color: 'text-gray-700', bgColor: 'bg-gray-100', text: 'Unknown' };
    }
  };

  // Helper function to get progress percentage based on status
  const getProgressPercentage = (status: string) => {
    switch (status) {
      case 'draft':
        return 10;
      case 'submitted':
        return 25;
      case 'under_review':
        return 40;
      case 'approved':
        return 60;
      case 'testing':
        return 80;
      case 'completed':
        return 100;
      case 'rejected':
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome to the NITDA eCommerce Regulatory Sandbox</p>
      </div>

      {/* Getting Started / No Applications */}
      {applications.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 border border-blue-100 mb-8">
          <div className="flex items-start space-x-4">
            <div className="rounded-full p-3 bg-blue-100 text-blue-600">
              <ClipboardCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Get Started</h2>
              <p className="text-gray-600 mb-4">
                Welcome to the NITDA eCommerce Regulatory Sandbox. To begin testing your innovative solution, you need to submit an application.
              </p>
              <div className="mt-2">
                <Link
                  to="/business/apply"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : latestApplication && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{latestApplication.productName}</h2>
              <div className="flex items-center mt-1">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusInfo(latestApplication.status).bgColor} ${getStatusInfo(latestApplication.status).color}`}>
                  {getStatusInfo(latestApplication.status).text}
                </span>
                {latestApplication.submittedAt && (
                  <span className="text-gray-500 text-xs ml-2">
                    Submitted: {new Date(latestApplication.submittedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
            
            <div className="mt-4 md:mt-0">
              {latestApplication.status === 'approved' && !latestApplication.testCases?.length && (
                <div className="text-sm text-amber-600 mb-2">
                  Waiting for NITDA to assign test cases
                </div>
              )}
              {latestApplication.status === 'testing' && (
                <Link
                  to="/business/test-cases"
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  View Test Cases
                </Link>
              )}
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4 mb-6">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Application Process</span>
              <span>{getProgressPercentage(latestApplication.status)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${
                  latestApplication.status === 'rejected' ? 'bg-red-600' : 'bg-blue-600'
                }`}
                style={{ width: `${getProgressPercentage(latestApplication.status)}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Application</span>
              <span>Review</span>
              <span>Approval</span>
              <span>Testing</span>
              <span>Completion</span>
            </div>
          </div>
          
          {/* Next steps */}
          <div className="border-t border-gray-100 pt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Next Steps:</h3>
            <ul className="space-y-3">
              {latestApplication.status === 'submitted' && (
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-blue-600 text-xs font-medium text-blue-600">1</span>
                  </div>
                  <p className="ml-3 text-sm text-gray-600">
                    Your application is being reviewed by NITDA. You will be notified once the review is complete.
                  </p>
                </li>
              )}
              
              {latestApplication.status === 'under_review' && (
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-blue-600 text-xs font-medium text-blue-600">1</span>
                  </div>
                  <p className="ml-3 text-sm text-gray-600">
                    NITDA is currently reviewing your application. This typically takes 3-5 business days.
                  </p>
                </li>
              )}
              
              {latestApplication.status === 'approved' && (
                <>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-600">
                        Your application has been approved! NITDA will now assign specific test cases for your innovation.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-blue-600 text-xs font-medium text-blue-600">1</span>
                    </div>
                    <p className="ml-3 text-sm text-gray-600">
                      Once test cases are assigned, you can begin testing your product in the sandbox environment.
                    </p>
                  </li>
                </>
              )}
              
              {latestApplication.status === 'testing' && (
                <>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-600">
                        You are now in the testing phase! Complete all assigned test cases and document your progress.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-blue-600 text-xs font-medium text-blue-600">1</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-600">
                        Upload progress reports for each test case as you complete them.
                      </p>
                      <Link
                        to="/business/progress"
                        className="mt-1 inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-800"
                      >
                        Upload Progress
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </li>
                </>
              )}
              
              {latestApplication.status === 'rejected' && (
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-6 w-6 text-red-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">
                      Your application has been rejected. Please review NITDA's feedback and consider reapplying with the suggested improvements.
                    </p>
                    <Link
                      to="/business/apply"
                      className="mt-2 inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-800"
                    >
                      Submit New Application
                      <ChevronRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </li>
              )}
              
              {latestApplication.status === 'completed' && (
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">
                      Congratulations! You have successfully completed all test cases in the regulatory sandbox. You may now proceed with your market launch, ensuring all requirements are met.
                    </p>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-5 border-t-4 border-blue-500 transition-transform hover:transform hover:scale-105">
          <div className="flex items-center mb-4">
            <FileText className="h-8 w-8 text-blue-500 mr-3" />
            <h3 className="text-lg font-semibold text-gray-800">Guidelines</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Review the regulatory sandbox guidelines and compliance requirements.
          </p>
          <Link
            to="/business/guidelines"
            className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
          >
            View Guidelines
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5 border-t-4 border-purple-500 transition-transform hover:transform hover:scale-105">
          <div className="flex items-center mb-4">
            <ClipboardCheck className="h-8 w-8 text-purple-500 mr-3" />
            <h3 className="text-lg font-semibold text-gray-800">Test Cases</h3>
          </div>
          <p className="text-gray-600 mb-4">
            View and track your assigned test cases and testing requirements.
          </p>
          <Link
            to="/business/test-cases"
            className="text-purple-600 hover:text-purple-800 font-medium inline-flex items-center"
          >
            View Test Cases
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5 border-t-4 border-orange-500 transition-transform hover:transform hover:scale-105">
          <div className="flex items-center mb-4">
            <MessageSquareText className="h-8 w-8 text-orange-500 mr-3" />
            <h3 className="text-lg font-semibold text-gray-800">Compliance Assistant</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Get AI-powered guidance on regulatory compliance and sandbox requirements.
          </p>
          <Link
            to="/business/chatbot"
            className="text-orange-600 hover:text-orange-800 font-medium inline-flex items-center"
          >
            Ask Assistant
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Recent Notifications */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Recent Notifications</h3>
        </div>
        <div className="p-4">
          {latestApplication ? (
            <div className="divide-y divide-gray-100">
              {latestApplication.status === 'approved' && (
                <div className="py-3 flex items-start">
                  <div className="rounded-full p-1 bg-green-100 mr-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Application Approved</p>
                    <p className="text-xs text-gray-500">Your application has been approved by NITDA. Test cases will be assigned soon.</p>
                    <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                  </div>
                </div>
              )}
              
              {latestApplication.status === 'testing' && latestApplication.testCases && (
                <div className="py-3 flex items-start">
                  <div className="rounded-full p-1 bg-blue-100 mr-3">
                    <ClipboardCheck className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Test Cases Assigned</p>
                    <p className="text-xs text-gray-500">{latestApplication.testCases.length} test cases have been assigned to your application.</p>
                    <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                  </div>
                </div>
              )}
              
              <div className="py-3 flex items-start">
                <div className="rounded-full p-1 bg-blue-100 mr-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Guidelines Updated</p>
                  <p className="text-xs text-gray-500">NITDA has updated the sandbox guidelines. Please review the latest changes.</p>
                  <p className="text-xs text-gray-500 mt-1">5 days ago</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center py-4 text-gray-500">No notifications to display.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;