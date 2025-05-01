import { useState, useRef, FormEvent, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { findApplicationsByBusinessId, ApplicationTestCase } from '../../models/Application';
import { toast } from 'react-toastify';
import { Upload, Paperclip, CheckCircle, X, ExternalLink, ClipboardCheck } from 'lucide-react';

const ProgressUpload = () => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [testCases, setTestCases] = useState<ApplicationTestCase[]>([]);
  const [selectedTestCase, setSelectedTestCase] = useState<string>('');
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  
  useEffect(() => {
    if (!user) return;
    
    // In a real app, this would be an API call
    const applications = findApplicationsByBusinessId(user.id);
    
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
        // Filter to only show test cases that are not completed (passed or failed)
        const activeTestCases = latestApp.testCases.filter(
          tc => tc.status === 'pending' || tc.status === 'in_progress'
        );
        setTestCases(activeTestCases);
      }
    }
  }, [user]);
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: {[key: string]: string} = {};
    if (!selectedTestCase) newErrors.testCase = 'Please select a test case';
    if (description.trim().length < 50) newErrors.description = 'Please provide a more detailed description (at least 50 characters)';
    if (attachments.length === 0) newErrors.attachments = 'Please attach at least one file as evidence';
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to upload files and submit progress
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmissionSuccess(true);
      toast.success('Progress report submitted successfully!');
      
      // Reset form
      setSelectedTestCase('');
      setDescription('');
      setAttachments([]);
    } catch (error) {
      toast.error('Failed to submit progress report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...newFiles]);
    }
  };
  
  const removeFile = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  // Get test case title for display
  const getTestCaseTitle = (id: string) => {
    const testCase = testCases.find(tc => tc.id === id);
    return testCase ? testCase.title : '';
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Progress Upload</h1>
        <p className="text-gray-600">Document your progress on assigned test cases</p>
      </div>
      
      {submissionSuccess ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Progress Report Submitted!</h3>
            <p className="mt-2 text-gray-600">
              Your progress report has been submitted successfully. NITDA will review your submission and provide feedback if needed.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setSubmissionSuccess(false)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit Another Report
              </button>
            </div>
          </div>
        </div>
      ) : testCases.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">Upload Progress Report</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="testCase" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Test Case*
                </label>
                <select
                  id="testCase"
                  value={selectedTestCase}
                  onChange={(e) => setSelectedTestCase(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.testCase ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a test case</option>
                  {testCases.map((testCase) => (
                    <option key={testCase.id} value={testCase.id}>
                      {testCase.title}
                    </option>
                  ))}
                </select>
                {errors.testCase && (
                  <p className="mt-1 text-sm text-red-600">{errors.testCase}</p>
                )}
              </div>
              
              {selectedTestCase && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">
                    Test Case: {getTestCaseTitle(selectedTestCase)}
                  </h3>
                  <div className="text-sm text-blue-700">
                    <p className="mb-2">Requirements:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {testCases
                        .find(tc => tc.id === selectedTestCase)
                        ?.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              )}
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Progress Description*
                </label>
                <textarea
                  id="description"
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Describe how you've implemented the requirements for this test case. Include any challenges faced and how you addressed them."
                ></textarea>
                {errors.description ? (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                ) : (
                  <p className="mt-1 text-xs text-gray-500">Minimum 50 characters required.</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Evidence Files* (Screenshots, logs, documentation, etc.)
                </label>
                
                <div 
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition ${
                    errors.attachments ? 'border-red-300' : 'border-gray-300'
                  }`}
                  onClick={triggerFileInput}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    multiple
                    accept="image/*,.pdf,.doc,.docx,.txt,.log"
                  />
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">Images, PDFs, DOCs, text files up to 10MB each</p>
                </div>
                
                {errors.attachments && (
                  <p className="mt-1 text-sm text-red-600">{errors.attachments}</p>
                )}
                
                {attachments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-gray-700">Uploaded Files:</p>
                    {attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-200">
                        <div className="flex items-center overflow-hidden">
                          <Paperclip className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700 truncate">{file.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex items-center mt-4">
                <input
                  id="testComplete"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="testComplete" className="ml-2 text-sm text-gray-700">
                  I believe this test case is now complete and ready for review
                </label>
              </div>
              
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Progress Report'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <ClipboardCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">No Active Test Cases Found</h3>
          <p className="text-gray-600 mb-4">
            You either don't have any test cases assigned yet, or all your test cases have been completed.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/business/dashboard"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Return to Dashboard
            </a>
            <a
              href="/business/test-cases"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              View Test Cases
            </a>
          </div>
        </div>
      )}
      
      {/* Tips Section */}
      {!submissionSuccess && (
        <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">Tips for a Successful Submission</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">Provide Comprehensive Documentation</h3>
                <p className="text-sm text-gray-600">
                  Include detailed explanations of how your implementation meets each requirement. Be specific about your approach and methodology.
                </p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">Include Visual Evidence</h3>
                <p className="text-sm text-gray-600">
                  Screenshots, diagrams, and flowcharts can help illustrate your implementation better than text alone. Annotate images when necessary.
                </p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">Be Honest About Challenges</h3>
                <p className="text-sm text-gray-600">
                  If you encountered difficulties, explain them along with your solutions. This demonstrates your problem-solving capabilities.
                </p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">Reference Standards & Best Practices</h3>
                <p className="text-sm text-gray-600">
                  Mention any industry standards, frameworks, or best practices you've followed in your implementation.
                </p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <a 
                href="#"
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                View Full Submission Guidelines
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressUpload;