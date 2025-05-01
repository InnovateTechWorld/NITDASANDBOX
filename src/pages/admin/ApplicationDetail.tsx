import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { findApplicationById, Application, ApplicationTestCase } from '../../models/Application';
import { AlertTriangle, Check, X, Plus, FileText, Download } from 'lucide-react';
import { toast } from 'react-toastify';

const ApplicationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('summary');
  const [newTestCase, setNewTestCase] = useState<Partial<ApplicationTestCase>>({
    title: '',
    description: '',
    requirements: [],
    status: 'pending'
  });
  const [showNewTestCaseForm, setShowNewTestCaseForm] = useState(false);
  const [newRequirement, setNewRequirement] = useState('');

  useEffect(() => {
    if (!id) return;

    // In a real app, this would be an API call
    const app = findApplicationById(id);
    if (app) {
      setApplication(app);
    } else {
      toast.error('Application not found');
      navigate('/admin/applications');
    }
    setLoading(false);
  }, [id, navigate]);

  const handleStatusChange = (newStatus: string) => {
    if (!application) return;
    
    // In a real app, this would be an API call
    setApplication({
      ...application,
      status: newStatus as any,
      reviewedAt: new Date(),
      reviewedBy: 'NITDA Admin'
    });
    toast.success(`Application status updated to ${newStatus.replace('_', ' ')}`);
  };

  const addRequirement = () => {
    if (!newRequirement.trim()) return;
    
    setNewTestCase({
      ...newTestCase,
      requirements: [...(newTestCase.requirements || []), newRequirement.trim()]
    });
    setNewRequirement('');
  };

  const removeRequirement = (index: number) => {
    setNewTestCase({
      ...newTestCase,
      requirements: (newTestCase.requirements || []).filter((_, i) => i !== index)
    });
  };

  const handleAddTestCase = () => {
    if (!application) return;
    if (!newTestCase.title || !newTestCase.description || !(newTestCase.requirements && newTestCase.requirements.length > 0)) {
      toast.error('Please fill all required fields');
      return;
    }
    
    const testCase: ApplicationTestCase = {
      id: `tc${Date.now()}`,
      title: newTestCase.title,
      description: newTestCase.description,
      requirements: newTestCase.requirements || [],
      status: 'pending'
    };
    
    // In a real app, this would be an API call
    setApplication({
      ...application,
      testCases: [...(application.testCases || []), testCase]
    });
    
    setNewTestCase({
      title: '',
      description: '',
      requirements: [],
      status: 'pending'
    });
    setShowNewTestCaseForm(false);
    toast.success('Test case added successfully');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading application...</p>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">Application not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with application info */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{application.productName}</h1>
            <p className="text-gray-600">{application.businessName}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
              application.status === 'submitted' ? 'bg-yellow-100 text-yellow-800' :
              application.status === 'under_review' ? 'bg-blue-100 text-blue-800' :
              application.status === 'approved' ? 'bg-green-100 text-green-800' :
              application.status === 'rejected' ? 'bg-red-100 text-red-800' :
              application.status === 'testing' ? 'bg-purple-100 text-purple-800' :
              application.status === 'completed' ? 'bg-gray-100 text-gray-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {application.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <p><span className="font-medium">Contact:</span> {application.contactName}</p>
            <p><span className="font-medium">Email:</span> {application.contactEmail}</p>
            <p><span className="font-medium">Submitted:</span> {application.submittedAt ? new Date(application.submittedAt).toLocaleString() : 'N/A'}</p>
          </div>
          <div>
            <p><span className="font-medium">Innovation Type:</span> {application.innovationType.join(', ')}</p>
            <p><span className="font-medium">Target Market:</span> {application.targetMarket}</p>
            <p><span className="font-medium">Business Model:</span> {application.businessModel}</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setTab('summary')}
              className={`py-4 px-6 text-sm font-medium ${
                tab === 'summary'
                  ? 'border-b-2 border-emerald-500 text-emerald-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => setTab('testCases')}
              className={`py-4 px-6 text-sm font-medium ${
                tab === 'testCases'
                  ? 'border-b-2 border-emerald-500 text-emerald-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Test Cases
            </button>
            <button
              onClick={() => setTab('documents')}
              className={`py-4 px-6 text-sm font-medium ${
                tab === 'documents'
                  ? 'border-b-2 border-emerald-500 text-emerald-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Documents
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Summary Tab */}
          {tab === 'summary' && (
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Product Description</h3>
                <p className="text-gray-600">{application.productDescription}</p>
              </div>
              
              {/* Technical Approach */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Technical Approach</h3>
                <p className="text-gray-600">{application.technicalApproach}</p>
              </div>
              
              {/* Data Handling */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Data Handling</h3>
                <p className="text-gray-600">{application.dataHandlingDescription}</p>
              </div>
              
              {/* AI Analysis */}
              {application.aiSummary && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="text-lg font-medium text-blue-900 mb-2">AI Analysis</h3>
                  <p className="text-blue-800 mb-4">{application.aiSummary}</p>
                  
                  {/* Risk Flags */}
                  {application.riskFlags && application.riskFlags.length > 0 && (
                    <div>
                      <h4 className="text-md font-medium text-blue-900 mb-2">Risk Flags:</h4>
                      <div className="space-y-2">
                        {application.riskFlags.map((flag, index) => (
                          <div key={index} className={`p-3 rounded-md ${
                            flag.type === 'high' ? 'bg-red-100 text-red-800' :
                            flag.type === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            <div className="flex items-start">
                              <AlertTriangle className="h-5 w-5 mr-2 mt-0.5" />
                              <div>
                                <p className="font-medium">{flag.area}</p>
                                <p className="text-sm">{flag.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Actions</h3>
                <div className="flex flex-wrap gap-3">
                  {application.status === 'submitted' && (
                    <>
                      <button 
                        onClick={() => handleStatusChange('under_review')}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Start Review
                      </button>
                      <button 
                        onClick={() => handleStatusChange('rejected')}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  
                  {application.status === 'under_review' && (
                    <>
                      <button 
                        onClick={() => handleStatusChange('approved')}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleStatusChange('rejected')}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  
                  {application.status === 'approved' && (
                    <button 
                      onClick={() => handleStatusChange('testing')}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      Start Testing
                    </button>
                  )}
                  
                  {application.status === 'testing' && (
                    <button 
                      onClick={() => handleStatusChange('completed')}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Complete Testing
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Test Cases Tab */}
          {tab === 'testCases' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Test Cases</h3>
                <button
                  onClick={() => setShowNewTestCaseForm(!showNewTestCaseForm)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Test Case
                </button>
              </div>
              
              {/* New Test Case Form */}
              {showNewTestCaseForm && (
                <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
                  <h4 className="text-md font-medium text-gray-900 mb-3">New Test Case</h4>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="testTitle" className="block text-sm font-medium text-gray-700 mb-1">
                        Title*
                      </label>
                      <input
                        id="testTitle"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                        value={newTestCase.title}
                        onChange={(e) => setNewTestCase({...newTestCase, title: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="testDescription" className="block text-sm font-medium text-gray-700 mb-1">
                        Description*
                      </label>
                      <textarea
                        id="testDescription"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                        value={newTestCase.description}
                        onChange={(e) => setNewTestCase({...newTestCase, description: e.target.value})}
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Requirements*
                      </label>
                      <div className="flex mb-2">
                        <input
                          type="text"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                          value={newRequirement}
                          onChange={(e) => setNewRequirement(e.target.value)}
                          placeholder="Add a requirement"
                          onKeyDown={(e) => e.key === 'Enter' && addRequirement()}
                        />
                        <button
                          type="button"
                          onClick={addRequirement}
                          className="px-3 py-2 border border-transparent rounded-r-md text-white bg-emerald-600 hover:bg-emerald-700"
                        >
                          Add
                        </button>
                      </div>
                      
                      <div className="space-y-2 mt-2">
                        {newTestCase.requirements && newTestCase.requirements.map((req, index) => (
                          <div key={index} className="flex items-center justify-between bg-white p-2 rounded border border-gray-200">
                            <span className="text-sm">{req}</span>
                            <button
                              type="button"
                              onClick={() => removeRequirement(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setShowNewTestCaseForm(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleAddTestCase}
                        className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700"
                      >
                        Add Test Case
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Test Cases List */}
              {application.testCases && application.testCases.length > 0 ? (
                <div className="space-y-4">
                  {application.testCases.map((testCase) => (
                    <div key={testCase.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{testCase.title}</h4>
                          <span className={`inline-flex mt-1 items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            testCase.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            testCase.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                            testCase.status === 'passed' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {testCase.status === 'in_progress' ? 'In Progress' : 
                             testCase.status.charAt(0).toUpperCase() + testCase.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      
                      <p className="mt-2 text-gray-600">{testCase.description}</p>
                      
                      <h5 className="mt-4 text-sm font-medium text-gray-700">Requirements:</h5>
                      <ul className="mt-1 space-y-1">
                        {testCase.requirements.map((req, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <span className="text-emerald-500 mr-2">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {testCase.feedback && (
                        <div className="mt-4 bg-gray-50 p-3 rounded">
                          <h5 className="text-sm font-medium text-gray-700">Feedback:</h5>
                          <p className="text-sm text-gray-600">{testCase.feedback}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No test cases have been assigned yet.</p>
                  <button
                    onClick={() => setShowNewTestCaseForm(true)}
                    className="mt-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add First Test Case
                  </button>
                </div>
              )}
            </div>
          )}
          
          {/* Documents Tab */}
          {tab === 'documents' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Application Documents</h3>
              
              {application.attachments && application.attachments.length > 0 ? (
                <div className="space-y-3">
                  {application.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center bg-white border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                      <FileText className="h-8 w-8 text-gray-400 mr-3" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700">{attachment}</p>
                        <p className="text-xs text-gray-500">
                          {attachment.split('.').pop()?.toUpperCase()} Document
                        </p>
                      </div>
                      <button className="px-2 py-1 text-xs font-medium text-emerald-700 hover:text-emerald-900">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No documents attached to this application.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetail;