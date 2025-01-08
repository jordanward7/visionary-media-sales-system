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
import { dataStore } from './utils/auth-storage-utils';

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

  // Load initial data
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
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

      // Generate notifications
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

  const navigation = [
    { 
      name: 'Dashboard', 
      icon: LayoutDashboard, 
      view: 'dashboard', 
      roles: ['sales', 'admin'],
      badge: notifications.length
    },
    { 
      name: 'Calendar', 
      icon: Calendar, 
      view: 'calendar', 
      roles: ['sales', 'admin'],
      badge: viewData.events.length
    },
    { 
      name: 'Leads', 
      icon: ClipboardList, 
      view: 'leads', 
      roles: ['sales', 'admin'],
      badge: viewData.leads.filter(l => !l.converted).length
    },
    { 
      name: 'Clients', 
      icon: Users, 
      view: 'clients', 
      roles: ['sales', 'admin'],
      badge: viewData.clients.length
    },
    { 
      name: 'Referrals', 
      icon: Gift, 
      view: 'referrals', 
      roles: ['sales', 'admin'],
      badge: viewData.referrals.filter(r => r.status === 'pending').length
    }
  ];

  if (currentUser.role === 'admin') {
    navigation.push({ 
      name: 'Settings', 
      icon: Settings, 
      view: 'settings', 
      roles: ['admin']
    });
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
            onEventAdd={(event) => {
              dataStore.addEvent(event);
              loadAllData();
            }}
          />
        );
      // Add other views here
      default:
        return <DashboardView data={viewData} notifications={notifications} />;
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Side Navigation */}
      <div className="w-20 bg-blue-600 p-4 flex flex-col items-center gap-8">
        {/* User Avatar */}
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold">
          {currentUser.name.charAt(0)}
        </div>

        {/* Navigation Items */}
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
            {item.badge > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                {item.badge}
              </div>
            )}
          </button>
        ))}

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="mt-auto p-3 rounded-lg text-white hover:bg-blue-500"
          title="Logout"
        >
          <LogOut size={24} />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Header */}
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

            {/* Notifications */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-xl text-gray-500">Loading...</div>
            </div>
          ) : (
            renderView()
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesNavigation;
