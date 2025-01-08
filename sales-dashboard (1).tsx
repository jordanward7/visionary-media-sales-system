import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Users, TrendingUp, PhoneCall } from 'lucide-react';

const SalesDashboard = () => {
  // Sample data - In real implementation, this would come from your database
  const [leads, setLeads] = useState([
    {
      id: 1,
      businessName: "ABC Motors",
      city: "Austin",
      stoppedBy: true,
      followedUp: true,
      appointmentSet: true,
      appointmentDateTime: "2025-01-10T10:00",
      status: "Appointment Set"
    },
    // Add more sample leads as needed
  ]);

  const weeklyStats = [
    { week: 'Week 1', visits: 12, appointments: 5 },
    { week: 'Week 2', visits: 15, appointments: 7 },
    { week: 'Week 3', visits: 10, appointments: 4 },
    { week: 'Week 4', visits: 18, appointments: 8 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const statusData = [
    { name: 'New Lead', value: 30 },
    { name: 'Followed Up', value: 25 },
    { name: 'Appointment Set', value: 15 },
    { name: 'Closed', value: 10 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Leads</p>
                <h3 className="text-2xl font-bold">128</h3>
              </div>
              <Users className="text-blue-600" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Weekly Visits</p>
                <h3 className="text-2xl font-bold">15</h3>
              </div>
              <TrendingUp className="text-green-600" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Appointments</p>
                <h3 className="text-2xl font-bold">8</h3>
              </div>
              <Calendar className="text-purple-600" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Follow-ups Needed</p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
              <PhoneCall className="text-red-600" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart width={500} height={300} data={weeklyStats}>
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="visits" fill="#8884d8" name="Visits" />
              <Bar dataKey="appointments" fill="#82ca9d" name="Appointments" />
            </BarChart>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lead Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <PieChart width={400} height={300}>
              <Pie
                data={statusData}
                cx={200}
                cy={150}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </CardContent>
        </Card>
      </div>

      {/* Recent Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-4 text-left">Business Name</th>
                  <th className="p-4 text-left">City</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Appointment</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-t">
                    <td className="p-4">{lead.businessName}</td>
                    <td className="p-4">{lead.city}</td>
                    <td className="p-4">{lead.status}</td>
                    <td className="p-4">{lead.appointmentDateTime}</td>
                    <td className="p-4">
                      <button className="text-blue-600 hover:text-blue-800">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesDashboard;
