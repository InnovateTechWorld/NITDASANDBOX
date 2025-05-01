import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Clock, ChevronRight, ChevronDown } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface FaqItem {
  question: string;
  answer: string;
}

const ComplianceChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showFaqs, setShowFaqs] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const gemini = new GoogleGenerativeAI("AIzaSyAvk81NFoaD-2fcXJPpVTPWYT7NPexPrh8").getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `NITDA Compliance Chatbot
Purpose:
You are an AI-powered Compliance Assistant for the NITDA eCommerce Regulatory Sandbox. Your job is to help Nigerian startups and digital businesses understand regulatory requirements, prepare for sandbox participation, and comply with applicable laws.

🎯 Core Responsibilities
Explain NDPR and relevant laws
Provide clear, beginner-friendly explanations of Nigerian data protection (NDPR), consumer protection, and digital commerce laws.

Assist with Sandbox Readiness
Guide users through what is expected before and during sandbox testing – including test case preparation, data protection planning, and documentation.

Answer FAQs and Interpret Guidelines
Respond to user questions regarding sandbox guidelines and simplify legal jargon in documents uploaded by NITDA.

Provide Actionable Compliance Tips
Suggest next steps, documents to prepare, or common red flags NITDA reviewers may check for.

Suggest Test Cases (when prompted)
Recommend basic compliance-oriented test cases for businesses, based on their product category and declared innovation.

Document Support (Optional if integrated)
If the user uploads a pitch deck or business doc, analyze it and point out missing compliance elements or suggest improvements.

🧠 Behavior and Tone
Be clear, respectful, and helpful.

Always reference sandbox or regulatory context.

Never give legal advice—only guidance based on publicly available regulations and sandbox documentation.

Default to explaining in simple English unless the user requests legal terms.

Avoid assumptions. Ask clarifying questions when necessary.

🧩 Input You Will Receive
Questions typed by the user.

Their product type or sandbox category (e.g. logistics, payments, social commerce).

Their current status (e.g. "Just applied", "In testing", "Got feedback").

💬 Example Prompts and Responses
🧾 Prompt:
What do I need to upload for my sandbox application?

Response:
To apply, you’ll need to upload your business pitch deck (PDF), include a short description of your product, select a category, and explain the innovation. NITDA will review to ensure it aligns with regulatory goals.

🔐 Prompt:
Is my product compliant with NDPR?

Response:
NDPR compliance requires you to inform users about data use, get consent before collecting data, and store data securely. You may need a privacy policy, opt-in forms, and a clear user agreement. I can help you check each step—want to go through them?

🧪 Prompt:
What test case can I run to show my checkout process is secure?

Response:
Here’s a sample test case:
Test Case Name: Secure Checkout Flow
Objective: Ensure user data (payment, address) is transmitted over HTTPS and stored securely.
Pass Condition: All data submissions are encrypted; users see confirmation message.

📌 Limitations
You don’t give legal advice—direct users to consult legal experts when in doubt.

You only work within the sandbox ecosystem and can’t help with unrelated business tasks.`,
  });

  // Sample FAQs related to regulatory compliance
  const faqs: FaqItem[] = [
    {
      question: "What is the NITDA Regulatory Sandbox?",
      answer: "The NITDA Regulatory Sandbox is a controlled environment that allows innovative eCommerce startups to test their solutions while ensuring compliance with Nigerian data protection and digital commerce regulations."
    },
    {
      question: "What regulations does my solution need to comply with?",
      answer: "Your solution needs to comply with the Nigeria Data Protection Regulation (NDPR), the National Digital Economy Policy, and any specific sectoral regulations that may apply to your business model."
    },
    {
      question: "How do I handle user data correctly?",
      answer: "You must implement appropriate security measures, obtain explicit consent, process data lawfully, allow users to access their data, and have data retention policies in line with NDPR requirements."
    },
    {
      question: "What happens after I complete the sandbox testing?",
      answer: "Upon successful completion, you'll receive a compliance certification from NITDA that validates your solution meets regulatory requirements, which can be presented to investors and partners."
    }
  ];

  // Initial bot message
  useEffect(() => {
    const initialMessage: Message = {
      id: 'init-1',
      content: "Hello! I'm your NITDA Sandbox Compliance Assistant. I can help you understand regulatory requirements and best practices for your eCommerce solution. What questions do you have about compliance?",
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages([initialMessage]);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // AI response generation
  const generateResponse = async (userMessage: string): Promise<string> => {
    try {
      const result = await gemini.generateContent(userMessage);
      const responseText = result.response.text();
      return responseText;
    } catch (error) {
      console.error('Error generating response:', error);
      // Fallback to mock data if AI fails
      const lowerCaseMessage = userMessage.toLowerCase();

      if (lowerCaseMessage.includes('data protection') || lowerCaseMessage.includes('ndpr')) {
        return "The Nigeria Data Protection Regulation (NDPR) requires businesses to implement appropriate technical and organizational measures to protect personal data. This includes:\n\n1. Data encryption\n2. Access controls\n3. Regular security assessments\n4. Data processing agreements with third parties\n5. Appointing a Data Protection Officer if you process large volumes of data\n\nYour eCommerce solution should have features that allow users to exercise their rights under NDPR, including the right to access, correct, and delete their data.";
      }

      if (lowerCaseMessage.includes('payment') || lowerCaseMessage.includes('transaction')) {
        return "For payment processing in your eCommerce solution, you need to comply with both NITDA regulations and Central Bank of Nigeria (CBN) requirements. Key compliance points include:\n\n- Implementing PCI DSS standards for handling payment card data\n- Using secure, encrypted connections for all payment transactions\n- Maintaining clear records of all transactions\n- Providing detailed receipts to customers\n- Having a clear refund policy\n\nIn the sandbox environment, you should demonstrate how your solution maintains the integrity and security of payment information.";
      }

      if (lowerCaseMessage.includes('test case') || lowerCaseMessage.includes('testing')) {
        return "Test cases in the NITDA Sandbox are designed to verify both regulatory compliance and technical functionality. When working on test cases:\n\n1. Follow the specific requirements provided for each test\n2. Document your approach thoroughly\n3. Include screenshots or logs as evidence\n4. Be transparent about any challenges encountered\n5. If you fail a test, explain what corrective measures you've implemented\n\nRemember that the goal is to demonstrate that your solution can operate safely within Nigerian regulatory frameworks.";
      }

      // Default response
      return "Thank you for your question. As a compliance assistant, I can help you navigate regulatory requirements for your eCommerce solution in Nigeria.\n\nTo provide more specific guidance, could you tell me more about:\n\n- What aspect of compliance you're concerned about?\n- What type of data your solution handles?\n- Who your target users are?\n\nThis will help me give you more tailored advice relevant to your situation.";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Generate and add bot response
    try {
      const result = await gemini.generateContent(inputValue);
      const responseText = result.response.text();
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: responseText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: "I'm sorry, I encountered an error while processing your request. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFaqClick = (faq: FaqItem) => {
    // Add user question
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: faq.question,
      sender: 'user',
      timestamp: new Date()
    };
    
    // Add bot answer
    const botMessage: Message = {
      id: `bot-${Date.now()}`,
      content: faq.answer,
      sender: 'bot',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage, botMessage]);
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="flex items-center">
          <Bot className="w-6 h-6 mr-2" />
          <h1 className="text-xl font-semibold">Compliance Assistant</h1>
        </div>
        <p className="text-blue-100 text-sm mt-1">Get guidance on regulatory compliance for your eCommerce solution</p>
      </div>
      
      <div className="flex-1 overflow-hidden flex">
        {/* Chat messages area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[75%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}>
                    <div className="flex items-center mb-1">
                      {message.sender === 'bot' ? (
                        <Bot className="w-4 h-4 mr-1" />
                      ) : (
                        <User className="w-4 h-4 mr-1" />
                      )}
                      <span className="text-xs opacity-75">
                        {message.sender === 'bot' ? 'Compliance Assistant' : 'You'} • {formatTimestamp(message.timestamp)}
                      </span>
                    </div>
                    <div className="text-sm whitespace-pre-line">{message.content}</div>
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 rounded-bl-none">
                    <div className="flex items-center">
                      <Bot className="w-4 h-4 mr-1" />
                      <span className="text-xs text-gray-500">Compliance Assistant is typing</span>
                    </div>
                    <div className="flex space-x-1 mt-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Invisible element to scroll to */}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Input area */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about compliance requirements..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-2">
              <Clock className="w-3 h-3 inline mr-1" />
              Responses are provided by an AI assistant. For official guidance, please refer to NITDA documentation.
            </p>
          </div>
        </div>
        
        {/* FAQs sidebar */}
        <div className="w-72 border-l border-gray-200 bg-gray-50 hidden md:block overflow-y-auto">
          <div 
            className="p-4 border-b border-gray-200 flex justify-between items-center cursor-pointer"
            onClick={() => setShowFaqs(!showFaqs)}
          >
            <h3 className="font-medium text-gray-800">Common Compliance Questions</h3>
            {showFaqs ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </div>
          
          {showFaqs && (
            <div className="p-4 space-y-3">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="p-3 bg-white rounded-md border border-gray-200 hover:border-blue-300 cursor-pointer transition-colors"
                  onClick={() => handleFaqClick(faq)}
                >
                  <p className="text-sm font-medium text-gray-700">{faq.question}</p>
                  <p className="text-xs text-blue-600 mt-1 flex items-center">
                    View answer
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplianceChatbot;