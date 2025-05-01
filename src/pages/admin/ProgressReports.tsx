import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  FileCheck, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  Download, 
  X 
} from 'lucide-react';
import { MOCK_APPLICATIONS, Application, ApplicationProgress, ApplicationTestCase } from '../../models/Application';
import { toast } from 'react-toastify';

interface ProgressWithDetails extends ApplicationProgress {
  businessName: string;
  productName: string;
  testCaseTitle: string;
  applicationId: string;
}

const ProgressReports = () => {
  const [allReports, setAllReports] = useState<ProgressWithDetails[]>([]);
  const [filteredReports, setFilteredReports] = useState<ProgressWithDetails[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [expandedReport, setExpandedReport] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [currentReportId, setCurrentReportId] = useState<string | null>(null);
  const [currentAction, setCurrentAction] = useState<'approve' | 'revision' | null>(null);
  
  useEffect(() => {
    // In a real app, this would be an API call
    setLoading(true);
    
    // Extract progress reports from all applications with business details
    const extractedReports: ProgressWithDetails[] = [];
    
    MOCK_APPLICATIONS.forEach(app => {
      if (app.progress && app.progress.length > 0) {
        app.progress.forEach(progress => {
          // Find the test case associated with this progress
          const testCase = app.testCases?.find(tc => tc.id === progress.testCaseId);
          
          if (testCase) {
            extractedReports.push({
              ...progress,
              businessName: app.businessName,
              productName: app.productName,
              testCaseTitle: testCase.title,
              applicationId: app.id
            });
          }
        });
      }
    });
    
    // Add some mock progress reports
    if (extractedReports.length === 0) {
      // Get the first application with test cases
      const appWithTestCases = MOCK_APPLICATIONS.find(app => app.testCases && app.testCases.length > 0);
      
      if (appWithTestCases && appWithTestCases.testCases) {
        const mockProgress1: ProgressWithDetails = {
          id: 'progress1',
          testCaseId: appWithTestCases.testCases[0].id,
          testCaseTitle: appWithTestCases.testCases[0].title,
          description: 'We have implemented the required data encryption for all customer payment information. We now use AES-256 encryption for stored data and TLS 1.3 for all API endpoints. Key rotation policies have been implemented as required.',
          attachments: ['encryption_implementation.pdf', 'security_test_results.pdf'],
          submittedAt: new Date('2025-03-15'),
          status: 'pending_review',
          businessName: appWithTestCases.businessName,
          productName: appWithTestCases.productName,
          applicationId: appWithTestCases.id
        };
        
        const mockProgress2: ProgressWithDetails = {
          id: 'progress2',
          testCaseId: appWithTestCases.testCases[0].id,
          testCaseTitle: appWithTestCases.testCases[0].title,
          description: 'We have improved our data encryption implementation based on the feedback. We now correctly implement key rotation every 90 days and have added additional encryption for backups.',
          attachments: ['updated_encryption.pdf', 'key_rotation_policy.pdf'],
          submittedAt: new Date('2025-03-18'),
          status: 'approved',
          feedback: 'Your implementation now correctly addresses all the encryption requirements. Good work on implementing proper key rotation policies.',
          businessName: appWithTestCases.businessName,
          productName: appWithTestCases.productName,
          applicationId: appWithTestCases.id
        };
        
        extractedReports.push(mockProgress1, mockProgress2);
      }
    }
    
    // Sort by submission date (newest first)
    const sortedReports = extractedReports.sort((a, b) => 
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
    
    setAllReports(sortedReports);
    setFilteredReports(sortedReports);
    setLoading(false);
  }, []);
  
  useEffect(() => {
    // Filter reports based on search term and status
    let filtered = [...allReports];
    
    if (searchTerm) {
      filtered = filtered.filter(report => 
        report.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.testCaseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(report => report.status === statusFilter);
    }
    
    setFilteredReports(filtered);
  }, [allReports, searchTerm, statusFilter]);
  
  const toggleReportExpand = (reportId: string) => {
    if (expandedReport === reportId) {
      setExpandedReport(null);
    } else {
      setExpandedReport(reportId);
    }
  };
  
  const handleReportAction = (reportId: string, action: 'approve' | 'revision') => {
    setCurrentReportId(reportId);
    setCurrentAction(action);
    setFeedbackText('');
    setShowFeedbackModal(true);
  };
  
  const submitFeedback = () => {
    if (!currentReportId || !currentAction) return;
    
    // In a real app, this would be an API call
    const updatedReports = allReports.map(report => {
      if (report.id === currentReportId) {
        return {
          ...report,
          status: currentAction === 'approve' ? 'approved' : 'needs_revision',
          feedback: feedbackText
        };
      }
      return report;
    });
    
    setAllReports(updatedReports);
    setFilteredReports(updatedReports.filter(report => 
      statusFilter === 'all' || report.status === statusFilter
    ));
    
    toast.success(
      currentAction === 'approve' 
        ? 'Progress report approved successfully' 
        : 'Feedback sent to business'
    );
    
    setShowFeedbackModal(false);
    setCurrentReportId(null);
    setCurrentAction(null);
    setFeedbackText('');
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending_review':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending Review
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </span>
        );
      case 'needs_revision':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Needs Revision
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
        <h1 className="text-2xl font-bold text-gray-800">Progress Reports</h1>
        <p className="text-gray-600">Review and manage testing progress submissions from businesses</p>
      </div>
      
      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search reports..."
              className="pl-10 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="pl-10 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending_review">Pending Review</option>
              <option value="approved">Approved</option>
              <option value="needs_revision">Needs Revision</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Progress Reports List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">Testing Progress Reports</h2>
        </div>
        
        {loading ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">Loading progress reports...</p>
          </div>
        ) : filteredReports.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredReports.map(report => (
              <div key={report.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex items-center mb-1">
                      <h3 className="text-lg font-medium text-gray-800 mr-3">{report.testCaseTitle}</h3>
                      {getStatusBadge(report.status)}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">{report.businessName}</span> - {report.productName}
                    </p>
                    <p className="text-xs text-gray-500">
                      Submitted on {new Date(report.submittedAt).toLocaleDateString()} at {new Date(report.submittedAt).toLocaleTimeString()}
                    </p>
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex items-center space-x-3">
                    <button
                      onClick={() => toggleReportExpand(report.id)}
                      className="px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                    >
                      {expandedReport === report.id ? 'Collapse' : 'View Details'}
                    </button>
                    <Link
                      to={`/admin/applications/${report.applicationId}`}
                      className="hidden md:inline-flex px-3 py-1.5 border border-transparent text-sm font-medium rounded text-emerald-700 bg-emerald-100 hover:bg-emerald-200"
                    >
                      View Application
                    </Link>
                  </div>
                </div>
                
                {expandedReport === report.id && (
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Progress Description:</h4>
                      <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-800">
                        {report.description}
                      </div>
                    </div>
                    
                    {report.attachments && report.attachments.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {report.attachments.map((attachment, index) => (
                            <div 
                              key={index}
                              className="flex items-center bg-gray-50 p-2 rounded border border-gray-200"
                            >
                              <FileText className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-700 flex-1 truncate">{attachment}</span>
                              <button className="text-emerald-600 hover:text-emerald-800">
                                <Download className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {report.feedback && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Feedback Provided:</h4>
                        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-800 border-l-4 border-emerald-500">
                          {report.feedback}
                        </div>
                      </div>
                    )}
                    
                    {report.status === 'pending_review' && (
                      <div className="mt-4 flex justify-end space-x-3">
                        <button
                          onClick={() => handleReportAction(report.id, 'revision')}
                          className="px-3 py-1.5 border border-transparent text-sm font-medium rounded text-red-700 bg-red-100 hover:bg-red-200"
                        >
                          Request Revision
                        </button>
                        <button
                          onClick={() => handleReportAction(report.id, 'approve')}
                          className="px-3 py-1.5 border border-transparent text-sm font-medium rounded text-white bg-emerald-600 hover:bg-emerald-700"
                        >
                          Approve
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center">
            <FileCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">No Progress Reports Found</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== 'all'
                ? 'No reports match your current filters. Try adjusting your search or filter criteria.'
                : 'There are no progress reports submitted by businesses yet.'}
            </p>
          </div>
        )}
      </div>
      
      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10 ${
                    currentAction === 'approve' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {currentAction === 'approve' ? (
                      <CheckCircle className={`h-6 w-6 text-green-600`} />
                    ) : (
                      <AlertTriangle className={`h-6 w-6 text-red-600`} />
                    )}
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {currentAction === 'approve' ? 'Approve Progress Report' : 'Request Revision'}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {currentAction === 'approve'
                          ? 'Provide feedback for the business on their successful implementation.'
                          : 'Explain what needs to be improved or corrected in their implementation.'
                        }
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
                    Feedback
                  </label>
                  <textarea
                    id="feedback"
                    rows={4}
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder={currentAction === 'approve'
                      ? 'Great work! Your implementation meets all the requirements...'
                      : 'Your implementation needs some improvements in the following areas...'
                    }
                  ></textarea>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={submitFeedback}
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm ${
                    currentAction === 'approve'
                      ? 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500'
                      : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                  }`}
                >
                  {currentAction === 'approve' ? 'Approve' : 'Request Revision'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowFeedbackModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressReports;