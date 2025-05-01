import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book, FileText, Download, ExternalLink, ChevronRight, ChevronDown, Search } from 'lucide-react';

interface GuidelineSection {
  id: string;
  title: string;
  content: string;
}

interface GuidelineCategory {
  id: string;
  title: string;
  sections: GuidelineSection[];
}

const Guidelines = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('data-protection');
  const [expandedSection, setExpandedSection] = useState<string | null>('data-collection');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample guidelines data
  const guidelines: GuidelineCategory[] = [
    {
      id: 'data-protection',
      title: 'Data Protection & Privacy',
      sections: [
        {
          id: 'data-collection',
          title: 'Data Collection & Consent',
          content: `
            <h4>Requirements</h4>
            <p>All eCommerce solutions in the NITDA Regulatory Sandbox must implement proper data collection practices that respect user privacy and comply with the Nigeria Data Protection Regulation (NDPR).</p>
            
            <h4>Implementation Guidelines</h4>
            <ol>
              <li>
                <strong>Explicit Consent:</strong> Always obtain explicit consent before collecting any personal data from users. This consent must be:
                <ul>
                  <li>Freely given, specific, informed, and unambiguous</li>
                  <li>Obtained through a clear affirmative action (e.g., checking a box)</li>
                  <li>Separate from other terms and conditions</li>
                </ul>
              </li>
              <li>
                <strong>Purpose Limitation:</strong> Clearly state the specific purpose for which the data is being collected, and only use it for those purposes.
              </li>
              <li>
                <strong>Data Minimization:</strong> Only collect data that is necessary for the stated purpose. Avoid collecting excessive information.
              </li>
              <li>
                <strong>Privacy Notices:</strong> Provide clear, concise, and easily accessible privacy notices that explain:
                <ul>
                  <li>What data is collected</li>
                  <li>Why it is collected</li>
                  <li>How it will be used</li>
                  <li>Who it will be shared with</li>
                  <li>How long it will be retained</li>
                  <li>User rights regarding their data</li>
                </ul>
              </li>
            </ol>
            
            <h4>Testing & Verification</h4>
            <p>During the sandbox testing, you must demonstrate that your application:</p>
            <ul>
              <li>Implements proper consent mechanisms before collecting user data</li>
              <li>Provides clear and accessible privacy notices</li>
              <li>Allows users to withdraw consent and request deletion of their data</li>
              <li>Implements technical measures to ensure data minimization</li>
            </ul>
          `
        },
        {
          id: 'data-security',
          title: 'Data Security & Storage',
          content: `
            <h4>Requirements</h4>
            <p>All personal data collected through your eCommerce solution must be adequately protected using appropriate technical and organizational measures.</p>
            
            <h4>Implementation Guidelines</h4>
            <ol>
              <li>
                <strong>Encryption:</strong> Implement strong encryption for:
                <ul>
                  <li>Data in transit (TLS 1.2 or higher)</li>
                  <li>Data at rest (AES-256 or equivalent)</li>
                  <li>Sensitive personal data (payment information, credentials)</li>
                </ul>
              </li>
              <li>
                <strong>Access Controls:</strong> Implement role-based access controls to ensure that only authorized personnel can access user data, with different levels of access based on job responsibilities.
              </li>
              <li>
                <strong>Data Retention:</strong> Establish clear data retention policies that specify:
                <ul>
                  <li>How long different types of data will be stored</li>
                  <li>When and how data will be deleted after the retention period</li>
                  <li>Procedures for secure deletion of data</li>
                </ul>
              </li>
              <li>
                <strong>Security Testing:</strong> Regularly conduct security assessments including:
                <ul>
                  <li>Vulnerability scanning</li>
                  <li>Penetration testing</li>
                  <li>Code reviews</li>
                </ul>
              </li>
            </ol>
            
            <h4>Testing & Verification</h4>
            <p>During the sandbox testing, you must demonstrate that your application:</p>
            <ul>
              <li>Uses proper encryption for all sensitive data</li>
              <li>Implements secure authentication and authorization</li>
              <li>Has clear data retention policies</li>
              <li>Can withstand common security threats</li>
            </ul>
          `
        }
      ]
    },
    {
      id: 'payment-compliance',
      title: 'Payment Processing & Financial Compliance',
      sections: [
        {
          id: 'payment-security',
          title: 'Payment Security',
          content: `
            <h4>Requirements</h4>
            <p>eCommerce solutions that handle payments must comply with both NITDA regulations and Central Bank of Nigeria (CBN) requirements for financial transactions.</p>
            
            <h4>Implementation Guidelines</h4>
            <ol>
              <li>
                <strong>PCI DSS Compliance:</strong> If handling payment card data, ensure compliance with the Payment Card Industry Data Security Standard (PCI DSS).
              </li>
              <li>
                <strong>Secure Processing:</strong> Implement the following security measures:
                <ul>
                  <li>Use trusted payment gateways and processors</li>
                  <li>Implement secure checkout processes</li>
                  <li>Never store full card details (unless absolutely necessary and in compliance with PCI DSS)</li>
                </ul>
              </li>
              <li>
                <strong>Transaction Records:</strong> Maintain detailed and secure records of all financial transactions, including:
                <ul>
                  <li>Transaction ID</li>
                  <li>Date and time</li>
                  <li>Amount</li>
                  <li>Status (success/failure)</li>
                  <li>Minimal payment method details (last 4 digits of card, etc.)</li>
                </ul>
              </li>
              <li>
                <strong>Customer Verification:</strong> Implement appropriate Know Your Customer (KYC) procedures in accordance with CBN guidelines.
              </li>
            </ol>
            
            <h4>Testing & Verification</h4>
            <p>During the sandbox testing, you must demonstrate that your application:</p>
            <ul>
              <li>Securely processes payment transactions</li>
              <li>Maintains appropriate transaction records</li>
              <li>Implements proper error handling for failed transactions</li>
              <li>Complies with relevant financial regulations</li>
            </ul>
          `
        }
      ]
    },
    {
      id: 'technical-requirements',
      title: 'Technical & Operational Requirements',
      sections: [
        {
          id: 'api-security',
          title: 'API Security & Integration',
          content: `
            <h4>Requirements</h4>
            <p>APIs used in your eCommerce solution must be secure and properly implemented to protect against common vulnerabilities.</p>
            
            <h4>Implementation Guidelines</h4>
            <ol>
              <li>
                <strong>Authentication & Authorization:</strong> Implement robust authentication for all API endpoints using:
                <ul>
                  <li>API keys for public APIs</li>
                  <li>OAuth 2.0 or similar for protected resources</li>
                  <li>JWT with appropriate expiration and signing</li>
                </ul>
              </li>
              <li>
                <strong>Input Validation:</strong> Validate all input to prevent:
                <ul>
                  <li>SQL injection</li>
                  <li>Cross-site scripting (XSS)</li>
                  <li>Command injection</li>
                </ul>
              </li>
              <li>
                <strong>Rate Limiting:</strong> Implement rate limiting to prevent abuse and DoS attacks.
              </li>
              <li>
                <strong>Logging & Monitoring:</strong> Maintain comprehensive logs of API access and usage.
              </li>
            </ol>
            
            <h4>Testing & Verification</h4>
            <p>During the sandbox testing, you must demonstrate that your application:</p>
            <ul>
              <li>Securely implements APIs with proper authentication</li>
              <li>Validates all input to prevent common attacks</li>
              <li>Implements appropriate error handling</li>
              <li>Has monitoring and logging capabilities</li>
            </ul>
          `
        },
        {
          id: 'availability',
          title: 'Availability & Performance',
          content: `
            <h4>Requirements</h4>
            <p>Your eCommerce solution must be reliable and perform adequately under normal operating conditions.</p>
            
            <h4>Implementation Guidelines</h4>
            <ol>
              <li>
                <strong>Scalability:</strong> Design your system to handle expected growth in users and transactions.
              </li>
              <li>
                <strong>Redundancy:</strong> Implement appropriate redundancy measures to prevent single points of failure.
              </li>
              <li>
                <strong>Monitoring:</strong> Set up monitoring for:
                <ul>
                  <li>Server performance</li>
                  <li>Application performance</li>
                  <li>Error rates</li>
                  <li>Response times</li>
                </ul>
              </li>
              <li>
                <strong>Disaster Recovery:</strong> Have a clear disaster recovery plan and backup procedures.
              </li>
            </ol>
            
            <h4>Testing & Verification</h4>
            <p>During the sandbox testing, you must demonstrate that your application:</p>
            <ul>
              <li>Performs adequately under normal load</li>
              <li>Has appropriate monitoring in place</li>
              <li>Can recover from common failure scenarios</li>
            </ul>
          `
        }
      ]
    }
  ];
  
  const toggleCategory = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
    }
  };
  
  const toggleSection = (sectionId: string) => {
    if (expandedSection === sectionId) {
      setExpandedSection(null);
    } else {
      setExpandedSection(sectionId);
    }
  };
  
  // Filter guidelines based on search term
  const filteredGuidelines = guidelines.map(category => ({
    ...category,
    sections: category.sections.filter(section => 
      section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.sections.length > 0);
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Sandbox Guidelines</h1>
        <p className="text-gray-600">Regulatory requirements and best practices for the NITDA eCommerce Sandbox</p>
      </div>
      
      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search guidelines..."
            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-6">
            <div className="p-4 bg-blue-600 text-white">
              <div className="flex items-center">
                <Book className="h-5 w-5 mr-2" />
                <h2 className="text-lg font-semibold">Contents</h2>
              </div>
            </div>
            <nav className="p-4">
              <ul className="space-y-1">
                {filteredGuidelines.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md ${
                        expandedCategory === category.id
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span>{category.title}</span>
                      {expandedCategory === category.id ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    
                    {expandedCategory === category.id && (
                      <ul className="mt-1 ml-4 space-y-1">
                        {category.sections.map((section) => (
                          <li key={section.id}>
                            <button
                              onClick={() => toggleSection(section.id)}
                              className={`w-full text-left px-3 py-1.5 text-sm rounded-md ${
                                expandedSection === section.id
                                  ? 'bg-blue-50 text-blue-700 font-medium'
                                  : 'text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              {section.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-4 border-t border-gray-200">
              <a 
                href="#"
                className="flex items-center px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Full Guidelines
              </a>
              <a 
                href="#"
                className="flex items-center px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                NITDA NDPR Documentation
              </a>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            {expandedSection ? (
              filteredGuidelines.map(category => 
                category.sections.map(section => 
                  section.id === expandedSection && (
                    <div key={section.id}>
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">{section.title}</h2>
                      <div 
                        className="prose max-w-none" 
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      ></div>
                      
                      <div className="mt-8 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <Link
                            to="/business/chatbot"
                            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                          >
                            Ask the Compliance Assistant
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Link>
                          <Link
                            to="/business/test-cases"
                            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                          >
                            View Related Test Cases
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                )
              )
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">Select a Guideline</h3>
                <p className="text-gray-600 mb-4">
                  Please select a guideline section from the menu to view its content.
                </p>
              </div>
            )}
          </div>
          
          {/* Related Resources */}
          {expandedSection && (
            <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-800">Related Resources</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href="#" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <h3 className="font-medium text-gray-800 mb-1">NDPR Implementation Framework</h3>
                    <p className="text-sm text-gray-600">Official guidelines for implementing NDPR requirements</p>
                  </a>
                  <a href="#" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <h3 className="font-medium text-gray-800 mb-1">Security Best Practices</h3>
                    <p className="text-sm text-gray-600">Recommended security measures for eCommerce platforms</p>
                  </a>
                  <a href="#" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <h3 className="font-medium text-gray-800 mb-1">Consent Management Templates</h3>
                    <p className="text-sm text-gray-600">Sample templates for obtaining proper user consent</p>
                  </a>
                  <a href="#" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <h3 className="font-medium text-gray-800 mb-1">API Security Checklist</h3>
                    <p className="text-sm text-gray-600">Essential security measures for API implementation</p>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Guidelines;