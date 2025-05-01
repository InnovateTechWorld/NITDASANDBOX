import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define user types and auth context types
export type UserRole = 'admin' | 'business';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  businessName?: string;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, businessName?: string) => Promise<void>;
  logout: () => void;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample users for demo (in a real app, this would come from a backend)
const MOCK_USERS = [
  {
    id: '1',
    name: 'NITDA Admin',
    email: 'admin@nitda.gov.ng',
    password: 'admin123',
    role: 'admin' as UserRole,
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'John Business',
    email: 'business@example.com',
    password: 'business123',
    role: 'business' as UserRole,
    businessName: 'TechInnovate Ltd',
    createdAt: new Date(),
  },
];

// Auth provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Login function - in a real app, this would make an API call
  const login = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );
    
    if (!foundUser) {
      setLoading(false);
      throw new Error('Invalid email or password');
    }
    
    // Create user object without password
    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    setLoading(false);
  };

  // Register function - in a real app, this would make an API call
  const register = async (email: string, password: string, name: string, businessName?: string) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (MOCK_USERS.find(u => u.email === email)) {
      setLoading(false);
      throw new Error('User with this email already exists');
    }
    
    // In a real app, this would add the user to the database
    const newUser = {
      id: String(MOCK_USERS.length + 1),
      name,
      email,
      password,
      role: 'business' as UserRole,
      businessName,
      createdAt: new Date(),
    };
    
    MOCK_USERS.push(newUser);
    
    // Create user object without password
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    setLoading(false);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};