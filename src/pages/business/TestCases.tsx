import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { findApplicationsByBusinessId, ApplicationTestCase } from '../../models/Application';
import { ClipboardCheck, CheckCircle, AlertCircle, ChevronRight, ChevronDown, Clock } from 'lucide-react';

const TestCases = () => {
  const { user } = useAuth();
  const [testCases, setTestCases] = useState<ApplicationTestCase[]>([]);
  const [expandedTestCase, setExpandedTestCase] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!user) return;
    
    // In a real app, this would be an API call
    setLoading(true);
    
    // Fetch applications for this business
    const applications = findApplicationsByBusinessId(user.id);
    
    // Get test cases from the most recent application
    if (applications.length > 0) {
      // Sort by submission date (newest first)
      const sortedApps = [...applications].sort((a, b) => {
        const dateA = a.submittedAt ? new Date(a.submittedAt).getTime() : 0;
        const dateB = b.submittedAt ? new Date(b.submittedAt).getTime() : 0;
        return dateB - dateA;
      });
      
      // Get test cases from the most recent application
      const latestApp = sortedApps[0];
      if (latestApp.testCases) {
        setTestCases(latestApp.testCases);
      }
    }
    
    setLoading(false);
  }, [user]);
  
  const toggleTestCase = (testCaseId: string) => {
    if (expandedTestCase === testCaseId) {
      setExpandedTestCase(null);
    } else {
      setExpandedTestCase(testCaseId);
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            In Progress
          </span>
        );
      case 'passed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Passed
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Unknown
          </span>
        );
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Test Cases</h1>
        <p className="text-gray-600">Your assigned compliance test cases for the regulatory sandbox</p>
      </div>
      
      {loading ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500">Loading test cases...</p>
        </div>
      ) : testCases.length > 0 ? (
        <div className="space-y-6">
          {/* Instructions Card */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 rounded-full p-2">
                <ClipboardCheck className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-blue-800 text-lg mb-2">Test Case Instructions</h3>
                <ul className="space-y-2 text-blue-700 text-sm">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Each test case is designed to verify compliance with specific regulatory requirements.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Implement the requirements for each test case in your application.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Upload evidence of implementation in the Progress Upload section.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>NITDA will review your submissions and provide feedback or approval.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Test Cases List */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-800">Assigned Test Cases</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {testCases.map((testCase) => (
                <div key={testCase.id} className="px-6 py-4">
                  <div 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleTestCase(testCase.id)}
                  >
                    <div>
                      <h3 className="text-md font-medium text-gray-800">{testCase.title}</h3>
                      <div className="mt-1">
                        {getStatusBadge(testCase.status)}
                      </div>
                    </div>
                    <div>
                      {expandedTestCase === testCase.id ? (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  
                  {expandedTestCase === testCase.id && (
                    <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Description:</h4>
                        <p className="text-sm text-gray-600">{testCase.description}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Requirements:</h4>
                        <ul className="space-y-2">
                          {testCase.requirements.map((req, index) => (
                            <li key={index} className="flex items-start text-sm">
                              <span className="text-blue-500 mr-2">•</span>
                              <span className="text-gray-600">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {testCase.feedback && (
                        <div className="mt-4 p-3 bg-orange-50 border border-orange-100 rounded">
                          <h4 className="text-sm font-medium text-orange-800 mb-1">Feedback from NITDA:</h4>
                          <p className="text-sm text-orange-700">{testCase.feedback}</p>
                        </div>
                      )}
                      
                      <div className="mt-4 flex justify-end">
                        <a 
                          href="/business/progress" 
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Submit Progress
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Resources Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-800">Helpful Resources</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="#" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <h3 className="font-medium text-gray-800 mb-1">NDPR Compliance Guide</h3>
                  <p className="text-sm text-gray-600">A comprehensive guide to Nigeria Data Protection Regulation compliance</p>
                </a>
                <a href="#" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <h3 className="font-medium text-gray-800 mb-1">eCommerce Standards</h3>
                  <p className="text-sm text-gray-600">Technical and operational standards for eCommerce in Nigeria</p>
                </a>
                <a href="#" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <h3 className="font-medium text-gray-800 mb-1">Payment Processing Guidelines</h3>
                  <p className="text-sm text-gray-600">CBN and NITDA guidelines for secure payment processing</p>
                </a>
                <a href="#" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <h3 className="font-medium text-gray-800 mb-1">Security Best Practices</h3>
                  <p className="text-sm text-gray-600">Recommended security measures for eCommerce platforms</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <ClipboardCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">No Test Cases Assigned Yet</h3>
          <p className="text-gray-600 mb-4">
            Your application is still being reviewed. Once approved, NITDA will assign specific test cases for your innovation.
          </p>
          <a
            href="/business/dashboard"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Return to Dashboard
          </a>
        </div>
      )}
    </div>
  );
};

export default TestCases;