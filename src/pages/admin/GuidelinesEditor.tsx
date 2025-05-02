import { useState, useEffect } from 'react';
import { BookOpen, Save, Plus, Trash2, ChevronUp, ChevronDown, Eye, X } from 'lucide-react';
import { toast } from 'react-toastify';
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

const GuidelinesEditor = () => {
  const [guidelines, setGuidelines] = useState<GuidelineCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingContent, setEditingContent] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Load initial guidelines data
  useEffect(() => {
    // In a real app, this would be an API call
    const initialGuidelines: GuidelineCategory[] = [
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
      }
    ];

    setGuidelines(initialGuidelines);

    // Default selection
    if (initialGuidelines.length > 0) {
      setSelectedCategory(initialGuidelines[0].id);
      if (initialGuidelines[0].sections.length > 0) {
        setSelectedSection(initialGuidelines[0].sections[0].id);
        setEditingTitle(initialGuidelines[0].sections[0].title);
        setEditingContent(initialGuidelines[0].sections[0].content);
      }
    }

  }, []);

  // Handlers for selection
  const handleCategorySelect = (categoryId: string) => {
    if (hasUnsavedChanges) {
      setShowDiscardModal(true);
      return;
    }

    setSelectedCategory(categoryId);
    const category = guidelines.find(c => c.id === categoryId);
    if (category && category.sections.length > 0) {
      setSelectedSection(category.sections[0].id);
      setEditingTitle(category.sections[0].title);
      setEditingContent(category.sections[0].content);
    } else {
      setSelectedSection(null);
      setEditingTitle('');
      setEditingContent('');
    }
  };

  const handleSectionSelect = (sectionId: string) => {
    if (hasUnsavedChanges) {
      setShowDiscardModal(true);
      return;
    }

    setSelectedSection(sectionId);
    const category = guidelines.find(c => c.id === selectedCategory);
    if (category) {
      const section = category.sections.find(s => s.id === sectionId);
      if (section) {
        setEditingTitle(section.title);
        setEditingContent(section.content);
      }
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingTitle(e.target.value);
    setHasUnsavedChanges(true);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditingContent(e.target.value);
    setHasUnsavedChanges(true);
  };

  // Save changes
  const handleSaveChanges = async () => {
    if (!selectedCategory || !selectedSection) return;

    setIsSaving(true);

    try {
      // In a real app, this would be an API call to update the guidelines
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update the guidelines data
      const updatedGuidelines = guidelines.map(category => {
        if (category.id === selectedCategory) {
          return {
            ...category,
            sections: category.sections.map(section => {
              if (section.id === selectedSection) {
                return {
                  ...section,
                  title: editingTitle,
                  content: editingContent
                };
              }
              return section;
            })
          };
        }
        return category;
      });

      setGuidelines(updatedGuidelines);
      setHasUnsavedChanges(false);
      toast.success('Guidelines updated successfully');
    } catch (error) {
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  // Discard changes
  const handleDiscardChanges = () => {
    setShowDiscardModal(false);

    // Reset to saved content
    const category = guidelines.find(c => c.id === selectedCategory);
    if (category) {
      const section = category.sections.find(s => s.id === selectedSection);
      if (section) {
        setEditingTitle(section.title);
        setEditingContent(section.content);
      }
    }

    setHasUnsavedChanges(false);
  };

  // Add new category
  const handleAddCategory = async () => {
    if (!newCategoryTitle.trim()) {
      toast.error('Category title is required');
      return;
    }

    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const categoryId = `category-${Date.now()}`;
      const newCategory: GuidelineCategory = {
        id: categoryId,
        title: newCategoryTitle.trim(),
        sections: []
      };

      setGuidelines([...guidelines, newCategory]);
      setSelectedCategory(categoryId);
      setSelectedSection(null);
      setEditingTitle('');
      setEditingContent('');

      setShowAddCategoryModal(false);
      setNewCategoryTitle('');
      toast.success('Category added successfully');
    } catch (error) {
      toast.error('Failed to add category');
    }
  };

  // Add new section
  const handleAddSection = async () => {
    if (!selectedCategory) {
      toast.error('Please select a category first');
      return;
    }

    if (!newSectionTitle.trim()) {
      toast.error('Section title is required');
      return;
    }

    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const sectionId = `section-${Date.now()}`;
      const newSection: GuidelineSection = {
        id: sectionId,
        title: newSectionTitle.trim(),
        content: '<p>Add content here...</p>'
      };

      const updatedGuidelines = guidelines.map(category => {
        if (category.id === selectedCategory) {
          return {
            ...category,
            sections: [...category.sections, newSection]
          };
        }
        return category;
      });

      setGuidelines(updatedGuidelines);
      setSelectedSection(sectionId);
      setEditingTitle(newSection.title);
      setEditingContent(newSection.content);

      setShowAddSectionModal(false);
      setNewSectionTitle('');
      toast.success('Section added successfully');
    } catch (error) {
      toast.error('Failed to add section');
    }
  };

  // Delete section
  const handleDeleteSection = async () => {
    if (!selectedCategory || !selectedSection) return;

    if (!window.confirm('Are you sure you want to delete this section? This action cannot be undone.')) {
      return;
    }

    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const updatedGuidelines = guidelines.map(category => {
        if (category.id === selectedCategory) {
          return {
            ...category,
            sections: category.sections.filter(section => section.id !== selectedSection)
          };
        }
        return category;
      });

      setGuidelines(updatedGuidelines);

      // Select first section of current category, if any
      const updatedCategory = updatedGuidelines.find(c => c.id === selectedCategory);
      if (updatedCategory && updatedCategory.sections.length > 0) {
        setSelectedSection(updatedCategory.sections[0].id);
        setEditingTitle(updatedCategory.sections[0].title);
        setEditingContent(updatedCategory.sections[0].content);
      } else {
        setSelectedSection(null);
        setEditingTitle('');
        setEditingContent('');
      }

      setHasUnsavedChanges(false);
      toast.success('Section deleted successfully');
    } catch (error) {
      toast.error('Failed to delete section');
    }
  };

  // Move section up or down
  const handleMoveSection = async (direction: 'up' | 'down') => {
    if (!selectedCategory || !selectedSection) return;

    const categoryIndex = guidelines.findIndex(c => c.id === selectedCategory);
    if (categoryIndex === -1) return;

    const category = guidelines[categoryIndex];
    const sectionIndex = category.sections.findIndex(s => s.id === selectedSection);
    if (sectionIndex === -1) return;

    // Check bounds
    if (direction === 'up' && sectionIndex === 0) return;
    if (direction === 'down' && sectionIndex === category.sections.length - 1) return;

    // Create new sections array with swapped elements
    const newSections = [...category.sections];
    const targetIndex = direction === 'up' ? sectionIndex - 1 : sectionIndex + 1;
    [newSections[sectionIndex], newSections[targetIndex]] = [newSections[targetIndex], newSections[sectionIndex]];

    // Update guidelines
    const updatedGuidelines = [...guidelines];
    updatedGuidelines[categoryIndex] = {
      ...category,
      sections: newSections
    };

    setGuidelines(updatedGuidelines);
    toast.success(`Section moved ${direction}`);
  };

  // Get current category and section
  const currentCategory = guidelines.find(c => c.id === selectedCategory);
  const currentSection = currentCategory?.sections.find(s => s.id === selectedSection);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Guidelines Editor</h1>
        <p className="text-gray-600">Manage and update regulatory sandbox guidelines</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-emerald-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  <h2 className="text-lg font-semibold">Guidelines</h2>
                </div>
                <button
                  onClick={() => setShowAddCategoryModal(true)}
                  className="p-1 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white transition-colors"
                  title="Add Category"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-4">
              {guidelines.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No guidelines available</p>
              ) : (
                <ul className="space-y-2">
                  {guidelines.map((category) => (
                    <li key={category.id}>
                      <div
                        className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${selectedCategory === category.id
                            ? 'bg-emerald-50 text-emerald-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        onClick={() => handleCategorySelect(category.id)}
                      >
                        <span>{category.title}</span>
                      </div>

                      {selectedCategory === category.id && (
                        <ul className="mt-1 ml-3 border-l border-gray-200 pl-2 space-y-1">
                          {category.sections.map((section) => (
                            <li key={section.id}>
                              <button
                                className={`w-full text-left px-2 py-1 text-sm rounded-md ${selectedSection === section.id
                                    ? 'bg-emerald-50 text-emerald-700 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50'
                                  }`}
                                onClick={() => handleSectionSelect(section.id)}
                              >
                                {section.title}
                              </button>
                            </li>
                          ))}
                          <li>
                            <button
                              className="w-full text-left px-2 py-1 text-sm text-emerald-600 hover:bg-gray-50 rounded-md flex items-center"
                              onClick={() => setShowAddSectionModal(true)}
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              Add Section
                            </button>
                          </li>
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                {selectedSection ? 'Edit Section' : 'Guidelines Editor'}
              </h2>
              <div className="flex items-center space-x-2">
                {selectedSection && (
                  <>
                    <button
                      onClick={() => setIsPreviewMode(!isPreviewMode)}
                      className={`p-2 rounded-md ${isPreviewMode
                          ? 'bg-gray-100 text-gray-700'
                          : 'text-gray-500 hover:bg-gray-100'
                        }`}
                      title={isPreviewMode ? 'Edit' : 'Preview'}
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleMoveSection('up')}
                      className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
                      title="Move Up"
                      disabled={!currentCategory || !selectedSection || currentCategory.sections.findIndex(s => s.id === selectedSection) === 0}
                    >
                      <ChevronUp className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleMoveSection('down')}
                      className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
                      title="Move Down"
                      disabled={!currentCategory || !selectedSection || currentCategory.sections.findIndex(s => s.id === selectedSection) === (currentCategory.sections.length - 1)}
                    >
                      <ChevronDown className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleDeleteSection}
                      className="p-2 rounded-md text-red-500 hover:bg-red-50"
                      title="Delete Section"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {selectedSection ? (
              <div className="p-6">
                {isPreviewMode ? (
                  // Preview Mode
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{editingTitle}</h2>
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: editingContent }}
                    ></div>
                  </div>
                ) : (
                  // Edit Mode
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="section-title" className="block text-sm font-medium text-gray-700 mb-1">
                        Section Title
                      </label>
                      <input
                        id="section-title"
                        type="text"
                        value={editingTitle}
                        onChange={handleTitleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>

                    <div>

                    </div>

                    <div>
                      <label htmlFor="section-content" className="block text-sm font-medium text-gray-700 mb-1">
                        Content (HTML)
                      </label>
                      <textarea
                        id="section-content"
                        rows={20}
                        value={editingContent}
                        onChange={handleContentChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      ></textarea>
                      <p className="mt-1 text-xs text-gray-500">
                        You can use HTML tags for formatting. Use &lt;h4&gt; for headings, &lt;p&gt; for paragraphs, &lt;ul&gt;/&lt;ol&gt; for lists, and &lt;strong&gt; for emphasis.
                      </p>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        onClick={handleSaveChanges}
                        disabled={!hasUnsavedChanges || isSaving}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-emerald-300 disabled:cursor-not-allowed"
                      >
                        {isSaving ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">No Section Selected</h3>
                <p className="text-gray-500 mb-4">
                  Please select a section from the sidebar to edit its content, or create a new section.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Plus className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Add New Category
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Enter a title for the new guidelines category.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="category-title" className="block text-sm font-medium text-gray-700 mb-1">
                    Category Title
                  </label>
                  <input
                    id="category-title"
                    type="text"
                    value={newCategoryTitle}
                    onChange={(e) => setNewCategoryTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g., Technical Requirements"
                  />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add Category
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddCategoryModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Section Modal */}
      {showAddSectionModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Plus className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Add New Section
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Enter a title for the new guidelines section.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="section-title" className="block text-sm font-medium text-gray-700 mb-1">
                    Section Title
                  </label>
                  <input
                    id="section-title"
                    type="text"
                    value={newSectionTitle}
                    onChange={(e) => setNewSectionTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g., API Security"
                  />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleAddSection}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add Section
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddSectionModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Discard Changes Modal */}
      {showDiscardModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <X className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Discard Unsaved Changes?
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        You have unsaved changes. If you navigate away, these changes will be lost.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleDiscardChanges}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Discard Changes
                </button>
                <button
                  type="button"
                  onClick={() => setShowDiscardModal(false)}
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

export default GuidelinesEditor;