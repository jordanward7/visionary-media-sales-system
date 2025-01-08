import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  Calendar, 
  LayoutDashboard, 
  ClipboardList, 
  Users, 
  Settings, 
  UserPlus, 
  Gift,
  LogOut,
  Bell
} from 'lucide-react';

// Storage and Authentication Utilities
const STORAGE_KEYS = {
  AUTH_TOKEN: 'vm_auth_token',
  USER_DATA: 'vm_user_data',
  LEADS: 'vm_leads',
  CLIENTS: 'vm_clients',
  REFERRALS: 'vm_referrals',
  EVENTS: 'vm_events'
};

const auth = {
  login: (email, password) => {
    const users = JSON.parse(localStorage.getItem('vm_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      const token = btoa(JSON.stringify({ userId: user.id, timestamp: Date.now() }));
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, error: 'Invalid credentials' };
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    return { success: true };
  },

  getCurrentUser: () => {
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }
};

const dataStore = {
  getLeads: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.LEADS) || '[]');
  },
  
  addLead: (lead) => {
    const leads = dataStore.getLeads();
    const newLead = {
      ...lead,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    leads.push(newLead);
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
    return newLead;
  },

  getClients: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CLIENTS) || '[]');
  },

  getEvents: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.EVENTS) || '[]');
  },

  addEvent: (event) => {
    const events = dataStore.getEvents();
    const newEvent = {
      ...event,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    events.push(newEvent);
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    return newEvent;
  },

  getReferrals: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.REFERRALS) || '[]');
  }
};

// Login Component
const LoginPage = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = auth.login(credentials.email, credentials.password);
    
    if (result.success) {
      onLogin(result.user);
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center bg-blue-600 text-white">
          <CardTitle className="text-2xl">
            Visionary Media Sales System
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
            >
              Sign In
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// Main App Component
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = auth.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    auth.logout();
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <SalesNavigation currentUser={currentUser} onLogout={handleLogout} />;
};

// Main Navigation Component
const SalesNavigation = ({ currentUser, onLogout }) => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewData, setViewData] = useState({
    leads: [],
    clients: [],
    events: [],
    referrals: []
  });

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = () => {
    setIsLoading(true);
    try {
      const leads = dataStore.getLeads();
      const clients = dataStore.getClients();
      const events = dataStore.getEvents();
      const referrals = dataStore.getReferrals();

      setViewData({
        leads,
        clients,
        events,
        referrals
      });

      generateNotifications(leads, events);
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setIsLoading(false);
  };

  const generateNotifications = (leads, events) => {
    const today = new Date();
    const notifications = [];

    // Check for follow-ups needed
    leads.forEach(lead => {
      if (!lead.followedUp && lead.stoppedBy) {
        notifications.push({
          id: `followup-${lead.id}`,
          type: 'followup',
          message: `Follow up needed for ${lead.businessName}`,
          priority: 'high'
        });
      }
    });

    // Check for upcoming appointments
    events.forEach(event => {
      const eventDate = new Date(event.date);
      const diffTime = eventDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= 2 && diffDays >= 0) {
        notifications.push({
          id: `event-${event.id}`,
          type: 'appointment',
          message: `Upcoming appointment with ${event.title} in ${diffDays} days`,
          priority: diffDays === 0 ? 'urgent' : 'medium'
        });
      }
    });

    setNotifications(notifications);
  };

  // ... rest of the SalesNavigation component implementation
  return (
    <div className="min-h-screen flex">
      {/* Navigation implementation */}
    </div>
  );
};

export default App;
