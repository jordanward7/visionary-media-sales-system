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
  Bell,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  TrendingUp,
  Target,
  Activity,
  Send,
  Phone,
  MapPin,
  User,
  Check,
  X,
  AlertCircle,
  Plus
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts';

// Storage Constants
const STORAGE_KEYS = {
  AUTH_TOKEN: 'vm_auth_token',
  USER_DATA: 'vm_user_data',
  LEADS: 'vm_leads',
  CLIENTS: 'vm_clients',
  REFERRALS: 'vm_referrals',
  EVENTS: 'vm_events'
};

// Utility Functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(amount);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Main App Component
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    if (userData) {
      setCurrentUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <MainLayout currentUser={currentUser} onLogout={handleLogout} />;
};

// Main Layout Component
const MainLayout = ({ currentUser, onLogout }) => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [viewData, setViewData] = useState({
    leads: [],
    clients: [],
    events: [],
    referrals: []
  });
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = () => {
    const data = {
      leads: JSON.parse(localStorage.getItem(STORAGE_KEYS.LEADS) || '[]'),
      clients: JSON.parse(localStorage.getItem(STORAGE_KEYS.CLIENTS) || '[]'),
      events: JSON.parse(localStorage.getItem(STORAGE_KEYS.EVENTS) || '[]'),
      referrals: JSON.parse(localStorage.getItem(STORAGE_KEYS.REFERRALS) || '[]')
    };
    setViewData(data);
    generateNotifications(data);
  };

  const generateNotifications = (data) => {
    const notifs = [];
    // Add lead follow-ups
    data.leads
      .filter(lead => !lead.followedUp && lead.status === 'new')
      .forEach(lead => {
        notifs.push({
          id: `lead-${lead.id}`,
          type: 'follow-up',
          message: `Follow up needed for ${lead.businessName}`,
          priority: 'high'
        });
      });

    // Add upcoming appointments
    const today = new Date();
    data.events
      .filter(event => {
        const eventDate = new Date(event.date);
        const diffDays = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
        return diffDays >= 0 && diffDays <= 2;
      })
      .forEach(event => {
        notifs.push({
          id: `event-${event.id}`,
          type: 'appointment',
          message: `Upcoming: ${event.title}`,
          priority: 'medium'
        });
      });

    setNotifications(notifs);
  };

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, view: 'dashboard' },
    { name: 'Calendar', icon: Calendar, view: 'calendar' },
    { name: 'Leads', icon: ClipboardList, view: 'leads' },
    { name: 'Clients', icon: Users, view: 'clients' },
    { name: 'Referrals', icon: Gift, view: 'referrals' }
  ];

  if (currentUser.role === 'admin') {
    navigation.push({ name: 'Settings', icon: Settings, view: 'settings' });
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <DashboardView 
            data={viewData} 
            notifications={notifications} 
            currentUser={currentUser} 
            onRefresh={loadAllData}
          />
        );
      case 'calendar':
        return (
          <CalendarView 
            events={viewData.events} 
            onEventAdd={() => loadAllData()}
          />
        );
      case 'leads':
        return (
          <LeadManagement 
            currentUser={currentUser} 
            onUpdate={loadAllData}
          />
        );
      case 'clients':
        return (
          <ClientOnboarding 
            currentUser={currentUser} 
            onUpdate={loadAllData}
          />
        );
      case 'referrals':
        return (
          <ReferralSystem 
            currentUser={currentUser} 
            onUpdate={loadAllData}
          />
        );
      case 'settings':
        return (
          <SettingsPanel 
            currentUser={currentUser} 
            onUpdate={loadAllData}
          />
        );
      default:
        return <DashboardView data={viewData} notifications={notifications} currentUser={currentUser} />;
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Navigation Sidebar */}
      <div className="w-20 bg-blue-600 p-4 flex flex-col items-center gap-8">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold">
          {currentUser.name.charAt(0)}
        </div>
        {navigation.map((item) => (
          <button
            key={item.view}
            onClick={() => setCurrentView(item.view)}
            className={`p-3 rounded-lg transition-colors relative ${
              currentView === item.view
                ? 'bg-white text-blue-600'
                : 'text-white hover:bg-blue-500'
            }`}
            title={item.name}
          >
            <item.icon size={24} />
            {notifications.length > 0 && item.view === 'dashboard' && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>
        ))}
        <button
          onClick={onLogout}
          className="mt-auto p-3 rounded-lg text-white hover:bg-blue-500"
          title="Logout"
        >
          <LogOut size={24} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-50">
        <div className="p-4 border-b bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-gray-800">
                {navigation.find(item => item.view === currentView)?.name}
              </h1>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {currentUser.team}
              </span>
            </div>
            {notifications.length > 0 && (
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  {notifications.length}
                </span>
              </button>
            )}
          </div>
        </div>
        <div className="flex-1 overflow-auto p-6">
          {renderView()}
        </div>
      </div>
    </div>
  );
};

export default App;
