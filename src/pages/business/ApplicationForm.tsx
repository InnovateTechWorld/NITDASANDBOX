import { useState, FormEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { Upload, X, Check, Info, Paperclip } from 'lucide-react';

const ApplicationForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    innovationType: [] as string[],
    targetMarket: '',
    businessModel: '',
    technicalApproach: '',
    dataHandlingDescription: ''
  });
  
  const [innovationTypeOptions, setInnovationTypeOptions] = useState({
    Payments: false,
    Marketplace: false,
    Logistics: false,
    'Financial Inclusion': false,
    'Data Management': false,
    'Export Facilitation': false,
    Healthcare: false,
    'Customer Service': false
  });
  
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  // Form validation
  const validateStep = (step: number) => {
    const newErrors: {[key: string]: string} = {};
    
    if (step === 1) {
      if (!formData.productName.trim()) newErrors.productName = 'Product name is required';
      if (formData.productDescription.trim().length < 50) newErrors.productDescription = 'Please provide a more detailed description (at least 50 characters)';
      if (formData.innovationType.length === 0) newErrors.innovationType = 'Please select at least one innovation type';
    } else if (step === 2) {
      if (!formData.targetMarket.trim()) newErrors.targetMarket = 'Target market is required';
      if (!formData.businessModel.trim()) newErrors.businessModel = 'Business model is required';
    } else if (step === 3) {
      if (formData.technicalApproach.trim().length < 50) newErrors.technicalApproach = 'Please provide a more detailed technical approach (at least 50 characters)';
      if (formData.dataHandlingDescription.trim().length < 50) newErrors.dataHandlingDescription = 'Please provide more details about data handling (at least 50 characters)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to submit the application
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Application submitted successfully!');
      navigate('/business');
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleInnovationTypeChange = (type: string) => {
    setInnovationTypeOptions(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof innovationTypeOptions]
    }));
    
    setFormData(prev => {
      const updatedTypes = prev.innovationType.includes(type)
        ? prev.innovationType.filter(t => t !== type)
        : [...prev.innovationType, type];
      
      return {
        ...prev,
        innovationType: updatedTypes
      };
    });
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
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Sandbox Application</h1>
        <p className="text-gray-600">Apply to test your eCommerce innovation in the NITDA Regulatory Sandbox</p>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Application Progress</span>
          <span className="text-sm font-medium text-blue-600">{currentStep} of 4</span>
        </div>
        <div className="h-2 w-full bg-gray-200 rounded-full">
          <div 
            className="h-2 bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Application Form */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {currentStep === 1 && "Basic Information"}
            {currentStep === 2 && "Business Details"}
            {currentStep === 3 && "Technical Information"}
            {currentStep === 4 && "Review & Submit"}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {currentStep === 1 && "Provide basic details about your eCommerce innovation"}
            {currentStep === 2 && "Tell us about your business model and target market"}
            {currentStep === 3 && "Explain your technical approach and data handling practices"}
            {currentStep === 4 && "Review your application before submission"}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
                  Product/Service Name*
                </label>
                <input
                  id="productName"
                  type="text"
                  value={formData.productName}
                  onChange={(e) => setFormData({...formData, productName: e.target.value})}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.productName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., PayEasy, MarketLink"
                />
                {errors.productName && (
                  <p className="mt-1 text-sm text-red-600">{errors.productName}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Product/Service Description*
                </label>
                <textarea
                  id="productDescription"
                  rows={5}
                  value={formData.productDescription}
                  onChange={(e) => setFormData({...formData, productDescription: e.target.value})}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.productDescription ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Describe your eCommerce innovation in detail. What problem does it solve? What makes it unique?"
                ></textarea>
                {errors.productDescription ? (
                  <p className="mt-1 text-sm text-red-600">{errors.productDescription}</p>
                ) : (
                  <p className="mt-1 text-xs text-gray-500">Minimum 50 characters required.</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Innovation Type* (Select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(innovationTypeOptions).map(([type, checked]) => (
                    <div key={type} className="flex items-center">
                      <input
                        id={`type-${type}`}
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleInnovationTypeChange(type)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor={`type-${type}`} className="ml-2 text-sm text-gray-700">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.innovationType && (
                  <p className="mt-1 text-sm text-red-600">{errors.innovationType}</p>
                )}
              </div>
            </div>
          )}
          
          {/* Step 2: Business Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="targetMarket" className="block text-sm font-medium text-gray-700 mb-1">
                  Target Market*
                </label>
                <textarea
                  id="targetMarket"
                  rows={3}
                  value={formData.targetMarket}
                  onChange={(e) => setFormData({...formData, targetMarket: e.target.value})}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.targetMarket ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Describe your target customers or market segment"
                ></textarea>
                {errors.targetMarket && (
                  <p className="mt-1 text-sm text-red-600">{errors.targetMarket}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="businessModel" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Model*
                </label>
                <textarea
                  id="businessModel"
                  rows={3}
                  value={formData.businessModel}
                  onChange={(e) => setFormData({...formData, businessModel: e.target.value})}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.businessModel ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Explain how your business makes money (e.g., subscription, transaction fees, etc.)"
                ></textarea>
                {errors.businessModel && (
                  <p className="mt-1 text-sm text-red-600">{errors.businessModel}</p>
                )}
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800">Why This Matters</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      NITDA evaluates applications based on market viability and business model sustainability. 
                      Providing clear information helps us understand the potential impact of your innovation 
                      in the Nigerian eCommerce ecosystem.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 3: Technical Information */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="technicalApproach" className="block text-sm font-medium text-gray-700 mb-1">
                  Technical Approach*
                </label>
                <textarea
                  id="technicalApproach"
                  rows={4}
                  value={formData.technicalApproach}
                  onChange={(e) => setFormData({...formData, technicalApproach: e.target.value})}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.technicalApproach ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Describe the technology stack, architecture, and implementation approach for your solution"
                ></textarea>
                {errors.technicalApproach ? (
                  <p className="mt-1 text-sm text-red-600">{errors.technicalApproach}</p>
                ) : (
                  <p className="mt-1 text-xs text-gray-500">Minimum 50 characters required.</p>
                )}
              </div>
              
              <div>
                <label htmlFor="dataHandlingDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Data Handling & Protection*
                </label>
                <textarea
                  id="dataHandlingDescription"
                  rows={4}
                  value={formData.dataHandlingDescription}
                  onChange={(e) => setFormData({...formData, dataHandlingDescription: e.target.value})}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.dataHandlingDescription ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Explain what data your solution collects, how it's stored, secured, and processed in accordance with NDPR"
                ></textarea>
                {errors.dataHandlingDescription ? (
                  <p className="mt-1 text-sm text-red-600">{errors.dataHandlingDescription}</p>
                ) : (
                  <p className="mt-1 text-xs text-gray-500">Minimum 50 characters required.</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Supporting Documents (Business Plan, Technical Documentation, etc.)
                </label>
                
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition"
                  onClick={triggerFileInput}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    multiple
                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                  />
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX, PPT, PPTX up to 10MB each</p>
                </div>
                
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
            </div>
          )}
          
          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 mb-6">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-yellow-500 mt-0.5 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">Please Review Carefully</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Ensure all information is accurate before submission. After submission, your application will be reviewed by NITDA, and you may be contacted for additional information.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-md font-medium text-gray-800 mb-2">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Product/Service Name:</p>
                      <p className="font-medium text-gray-800">{formData.productName}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Innovation Type:</p>
                      <p className="font-medium text-gray-800">{formData.innovationType.join(', ')}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-gray-500">Product Description:</p>
                    <p className="text-gray-800">{formData.productDescription}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-md font-medium text-gray-800 mb-2">Business Details</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-gray-500">Target Market:</p>
                      <p className="text-gray-800">{formData.targetMarket}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Business Model:</p>
                      <p className="text-gray-800">{formData.businessModel}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-md font-medium text-gray-800 mb-2">Technical Information</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-gray-500">Technical Approach:</p>
                      <p className="text-gray-800">{formData.technicalApproach}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Data Handling & Protection:</p>
                      <p className="text-gray-800">{formData.dataHandlingDescription}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Supporting Documents:</p>
                      {attachments.length > 0 ? (
                        <ul className="list-disc list-inside text-gray-800">
                          {attachments.map((file, index) => (
                            <li key={index}>{file.name}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-800">No documents uploaded</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start mt-6">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  I confirm that all information provided is accurate and complete. I understand that providing false information may result in the rejection of my application or removal from the sandbox program.
                </label>
              </div>
            </div>
          )}
          
          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between items-center pt-4 border-t border-gray-200">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}
            
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Next
              </button>
            ) : (
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
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Submit Application
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;