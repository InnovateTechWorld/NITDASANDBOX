export type ApplicationStatus = 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'testing' | 'completed';

export interface ApplicationRiskFlag {
  type: 'high' | 'medium' | 'low';
  description: string;
  area: string;
}

export interface ApplicationTestCase {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  status: 'pending' | 'in_progress' | 'passed' | 'failed';
  completedAt?: Date;
  feedback?: string;
}

export interface ApplicationProgress {
  id: string;
  testCaseId: string;
  description: string;
  attachments: string[];
  submittedAt: Date;
  status: 'pending_review' | 'approved' | 'needs_revision';
  feedback?: string;
}

export interface Application {
  id: string;
  businessId: string;
  businessName: string;
  contactName: string;
  contactEmail: string;
  productName: string;
  productDescription: string;
  innovationType: string[];
  targetMarket: string;
  businessModel: string;
  technicalApproach: string;
  dataHandlingDescription: string;
  status: ApplicationStatus;
  submittedAt?: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  aiSummary?: string;
  riskFlags?: ApplicationRiskFlag[];
  testCases?: ApplicationTestCase[];
  progress?: ApplicationProgress[];
  attachments: string[];
}

// Mock data for applications
export const MOCK_APPLICATIONS: Application[] = [
  {
    id: '1',
    businessId: '2',
    businessName: 'TechInnovate Ltd',
    contactName: 'John Business',
    contactEmail: 'business@example.com',
    productName: 'PayEasy',
    productDescription: 'A seamless payment solution that allows small businesses to accept payments through various channels including USSD, QR codes, and bank transfers. The platform integrates with existing banking infrastructure to provide real-time transaction processing.',
    innovationType: ['Payments', 'Financial Inclusion'],
    targetMarket: 'Small and medium-sized retail businesses in Nigeria',
    businessModel: 'Transaction fee (1.5% per transaction)',
    technicalApproach: 'Our platform uses a microservices architecture with Node.js backend and React frontend. Payment processing is handled through integrations with banks and payment processors. Customer data is encrypted at rest and in transit.',
    dataHandlingDescription: 'We collect customer payment information, transaction history, and merchant details. All data is encrypted using industry-standard practices. Personal information is stored separately from transaction data.',
    status: 'approved',
    submittedAt: new Date('2025-03-10'),
    reviewedAt: new Date('2025-03-12'),
    reviewedBy: 'NITDA Admin',
    aiSummary: 'PayEasy is a payment processing platform targeting SMEs in Nigeria with multiple payment channels. The application shows strong technical implementation and clear data handling practices. The main innovation is in the integration method with existing banking infrastructure and the simplified onboarding process for merchants.',
    riskFlags: [
      {
        type: 'medium',
        description: 'Handles sensitive financial data that requires strong security measures',
        area: 'Data Security'
      },
      {
        type: 'low',
        description: 'May need additional verification for compliance with CBN regulations',
        area: 'Regulatory Compliance'
      }
    ],
    testCases: [
      {
        id: 'tc1',
        title: 'Data Encryption Implementation',
        description: 'Verify that all customer payment information is properly encrypted both at rest and in transit using industry-standard encryption methods.',
        requirements: [
          'Implement TLS 1.3 for all API endpoints',
          'Use AES-256 encryption for stored payment data',
          'Implement key rotation policies'
        ],
        status: 'in_progress'
      },
      {
        id: 'tc2',
        title: 'Payment Processing Compliance',
        description: 'Ensure that the payment processing workflow complies with CBN regulations for financial transactions.',
        requirements: [
          'Implement proper KYC verification',
          'Maintain transaction logs for audit purposes',
          'Implement transaction limits according to CBN guidelines'
        ],
        status: 'pending'
      }
    ],
    progress: [],
    attachments: ['business_plan.pdf', 'technical_architecture.pdf']
  },
  {
    id: '2',
    businessId: '3',
    businessName: 'DigiSolutions Nigeria',
    contactName: 'Sarah Okafor',
    contactEmail: 'sarah@digisolutions.ng',
    productName: 'MarketLink',
    productDescription: 'An online marketplace connecting Nigerian artisans and small-scale manufacturers with international buyers. The platform handles product listing, buyer-seller communication, payment processing, and shipping logistics.',
    innovationType: ['Marketplace', 'Export Facilitation'],
    targetMarket: 'Nigerian artisans and small manufacturers seeking international market access',
    businessModel: 'Commission on sales (10%) and premium listing fees',
    technicalApproach: 'MERN stack application with AWS infrastructure. Features include AI-powered product categorization, automated translation, and logistics integration with local and international shipping providers.',
    dataHandlingDescription: 'We collect seller verification documents, product information, buyer profiles, transaction records, and shipping details. All personal information is protected with role-based access controls.',
    status: 'under_review',
    submittedAt: new Date('2025-03-15'),
    aiSummary: 'MarketLink is an e-commerce platform focused on export facilitation for Nigerian artisans. The platform has comprehensive features covering the entire sales process from listing to shipping. The innovation lies in its specialized focus on international market access and the integration of logistics for cross-border shipping.',
    riskFlags: [
      {
        type: 'high',
        description: 'Handles international payments and cross-border transactions that may require specialized licenses',
        area: 'Financial Regulations'
      },
      {
        type: 'medium',
        description: 'Collects extensive seller verification documents that must be properly secured',
        area: 'Data Protection'
      }
    ],
    attachments: ['business_proposal.pdf', 'market_research.pdf']
  },
  {
    id: '3',
    businessId: '4',
    businessName: 'HealthTech Systems',
    contactName: 'Dr. Ade Johnson',
    contactEmail: 'ade@healthtech.com.ng',
    productName: 'MediTrack',
    productDescription: 'A digital health records system for small clinics and hospitals in Nigeria. The application allows for patient registration, appointment scheduling, medical record management, and basic billing features.',
    innovationType: ['Healthcare', 'Data Management'],
    targetMarket: 'Small to medium-sized healthcare providers in Nigeria',
    businessModel: 'Monthly subscription based on facility size',
    technicalApproach: 'Cloud-based solution built with Django and PostgreSQL. The application includes a web portal for administrators and a mobile application for doctors. Data is backed up daily and encrypted.',
    dataHandlingDescription: 'We collect and store patient personal information, medical history, diagnosis records, treatment plans, and billing details. Access is controlled by role-based permissions and all actions are logged for audit purposes.',
    status: 'submitted',
    submittedAt: new Date('2025-03-18'),
    attachments: ['product_demo.mp4', 'security_protocols.pdf']
  }
];

export const findApplicationsByBusinessId = (businessId: string): Application[] => {
  return MOCK_APPLICATIONS.filter(app => app.businessId === businessId);
};

export const findApplicationById = (id: string): Application | undefined => {
  return MOCK_APPLICATIONS.find(app => app.id === id);
};