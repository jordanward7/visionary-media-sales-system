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
  Check,
  User,
  Building
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts';

const DashboardView = ({ currentUser }) => {
  const [stats, setStats] = useState({
    leads: [],
    totalLeads: 0,
    activeLeads: 0,
    conversions: 0,
    revenue: 0,
    appointments: 0,
    weeklyGoalProgress: 0
  });

  const [timeframe, setTimeframe] = useState('week');
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, [timeframe]);

  const loadDashboardData = () => {
    // Load data from localStorage
    const leads = JSON.parse(localStorage.getItem('vm_leads') || '[]');
    const clients = JSON.parse(localStorage.getItem('vm_clients') || '[]');
    const events = JSON.parse(localStorage.getItem('vm_events') || '[]');

    // Calculate date range
    const now = new Date();
    const range = timeframe === 'week' ? 7 : timeframe === 'month' ? 30 : 365;
    const startDate = new Date(now.setDate(now.getDate() - range));

    // Filter data by date range
    const filteredLeads = leads.filter(lead => new Date(lead.createdAt) >= startDate);
    const filteredClients = clients.filter(client => new Date(client.createdAt) >= startDate);
    const filteredEvents = events.filter(event => new Date(event.date) >= startDate);

    // Calculate stats
    const newStats = {
      leads: filteredLeads,
      totalLeads: filteredLeads.length,
      activeLeads: filteredLeads.filter(lead => !lead.converted).length,
      conversions: filteredClients.length,
      revenue: filteredClients.reduce((sum, client) => sum + (client.packageValue || 0), 0),
      appointments: filteredEvents.filter(event => event.type === 'meeting').length,
      weeklyGoalProgress: (filteredLeads.length / 10) * 100 // Assuming goal is 10 leads per week
    };

    setStats(newStats);

    // Combine and sort recent activity
    const activity = [
      ...leads.map(lead => ({
        id: `lead-${lead.id}`,
        type: 'lead',
        title: `New lead: ${lead.businessName}`,
        date: lead.createdAt,
        icon: User
      })),
      ...clients.map(client => ({
        id: `client-${client.id}`,
        type: 'conversion',
        title: `New client: ${client.businessName}`,
        date: client.createdAt,
        icon: Building
      })),
      ...events.map(event => ({
        id: `event-${event.id}`,
        type: 'appointment',
        title: event.title,
        date: event.date,
        icon: Calendar
      }))
    ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

    setRecentActivity(activity);
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

      {/* Key Metrics */}
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
                <h3 className="text-2xl font-bold">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0
                  }).format(stats.revenue)}
                </h3>
              </div>
              <DollarSign className="text-purple-600" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts & Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart width={500} height={300} data={stats.leads}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#8884d8" name="Leads" />
              <Line type="monotone" dataKey="conversions" stroke="#82ca9d" name="Conversions" />
            </LineChart>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map(activity => (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                >
                  <div className={`p-2 rounded-full ${
                    activity.type === 'lead' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'conversion' ? 'bg-green-100 text-green-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    <activity.icon size={20} />
                  </div>
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(activity.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;
