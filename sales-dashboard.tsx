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
  AlertCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

// Utility Functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// DashboardView Component
const DashboardView = ({ data, notifications, currentUser, onRefresh }) => {
  const [timeframe, setTimeframe] = useState('week'); // week, month, year
  const [stats, setStats] = useState({
    totalLeads: 0,
    activeLeads: 0,
    conversions: 0,
    revenue: 0
  });

  useEffect(() => {
    calculateStats();
  }, [data]);

  const calculateStats = () => {
    const now = new Date();
    const timeframeDays = timeframe === 'week' ? 7 : timeframe === 'month' ? 30 : 365;
    const cutoffDate = new Date(now.setDate(now.getDate() - timeframeDays));

    const recentLeads = data.leads.filter(lead => new Date(lead.createdAt) > cutoffDate);
    const recentConversions = data.clients.filter(client => new Date(client.createdAt) > cutoffDate);

    setStats({
      totalLeads: recentLeads.length,
      activeLeads: recentLeads.filter(lead => !lead.converted).length,
      conversions: recentConversions.length,
      revenue: recentConversions.reduce((sum, client) => sum + (client.packageValue || 0), 0)
    });
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Welcome back, {currentUser.name}!</h2>
              <p className="text-gray-600">Here's your sales overview</p>
            </div>
            <div className="flex gap-2">
              {['week', 'month', 'year'].map(period => (
                <button
                  key={period}
                  onClick={() => setTimeframe(period)}
                  className={`px-3 py-1 rounded-full ${
                    timeframe === period
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      {notifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="text-blue-600" />
              Important Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg flex items-center justify-between ${
                    notification.priority === 'urgent'
                      ? 'bg-red-50 text-red-700'
                      : notification.priority === 'high'
                      ? 'bg-yellow-50 text-yellow-700'
                      : 'bg-blue-50 text-blue-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <AlertCircle size={20} />
                    <span>{notification.message}</span>
                  </div>
                  <button className="hover:opacity-75">
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Leads</p>
                <h3 className="text-2xl font-bold">{stats.totalLeads}</h3>
              </div>
              <Target className="text-blue-600" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Leads</p>
                <h3 className="text-2xl font-bold">{stats.activeLeads}</h3>
              </div>
              <Activity className="text-yellow-600" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Conversions</p>
                <h3 className="text-2xl font-bold">{stats.conversions}</h3>
              </div>
              <Check className="text-green-600" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Revenue</p>
                <h3 className="text-2xl font-bold">{formatCurrency(stats.revenue)}</h3>
              </div>
              <DollarSign className="text-purple-600" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.leads
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 5)
                .map(lead => (
                  <div key={lead.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{lead.businessName}</p>
                      <p className="text-sm text-gray-500">{formatDate(lead.createdAt)}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-sm ${
                      lead.converted
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {lead.converted ? 'Converted' : 'Active'}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.events
                .filter(event => new Date(event.date) >= new Date())
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .slice(0, 5)
                .map(event => (
                  <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-gray-500">{formatDate(event.date)} at {event.time}</p>
                    </div>
                    <Clock size={20} className="text-blue-600" />
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Helper components would go here...

export default DashboardView;
