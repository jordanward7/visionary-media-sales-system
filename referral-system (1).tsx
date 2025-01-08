import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { UserPlus, DollarSign, Check, Users, Link, Clock, Award } from 'lucide-react';

const ReferralSystem = () => {
  const [referrals, setReferrals] = useState([
    {
      id: 1,
      referredBy: "John Smith",
      candidate: "Sarah Johnson",
      email: "sarah@email.com",
      phone: "555-0123",
      status: "Applied", // Applied, Interviewing, Hired, Contract Signed
      dateReferred: "2025-01-01",
      firstContractDate: null,
      rewardPaid: false
    }
  ]);

  const [newReferral, setNewReferral] = useState({
    candidate: '',
    email: '',
    phone: '',
    background: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add new referral logic
    const referral = {
      id: referrals.length + 1,
      referredBy: "Current User Name",
      candidate: newReferral.candidate,
      email: newReferral.email,
      phone: newReferral.phone,
      status: "Applied",
      dateReferred: new Date().toISOString().split('T')[0],
      firstContractDate: null,
      rewardPaid: false
    };
    setReferrals([...referrals, referral]);
    setNewReferral({
      candidate: '',
      email: '',
      phone: '',
      background: '',
      notes: ''
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Applied': return 'bg-blue-100 text-blue-800';
      case 'Interviewing': return 'bg-yellow-100 text-yellow-800';
      case 'Hired': return 'bg-green-100 text-green-800';
      case 'Contract Signed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Referrals</p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
              <Users className="text-blue-600" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">In Process</p>
                <h3 className="text-2xl font-bold">5</h3>
              </div>
              <Clock className="text-yellow-600" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Successfully Hired</p>
                <h3 className="text-2xl font-bold">3</h3>
              </div>
              <Check className="text-green-600" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Rewards Earned</p>
                <h3 className="text-2xl font-bold">$1,500</h3>
              </div>
              <DollarSign className="text-purple-600" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Referral Form */}
      <Card>
        <CardHeader>
          <CardTitle>Refer a New Team Member</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Candidate Name</label>
                <input
                  type="text"
                  value={newReferral.candidate}
                  onChange={(e) => setNewReferral({...newReferral, candidate: e.target.value})}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={newReferral.email}
                  onChange={(e) => setNewReferral({...newReferral, email: e.target.value})}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={newReferral.phone}
                  onChange={(e) => setNewReferral({...newReferral, phone: e.target.value})}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Background</label>
                <input
                  type="text"
                  value={newReferral.background}
                  onChange={(e) => setNewReferral({...newReferral, background: e.target.value})}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Sales, Marketing, Video Production, etc."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
              <textarea
                value={newReferral.notes}
                onChange={(e) => setNewReferral({...newReferral, notes: e.target.value})}
                className="mt-1 p-2 w-full border rounded-md"
                rows="3"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <UserPlus size={20} />
              Submit Referral
            </button>
          </form>
        </CardContent>
      </Card>

      {/* Referrals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Referrals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-4 text-left">Candidate</th>
                  <th className="p-4 text-left">Contact</th>
                  <th className="p-4 text-left">Date Referred</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Reward</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {referrals.map((referral) => (
                  <tr key={referral.id} className="border-t">
                    <td className="p-4">{referral.candidate}</td>
                    <td className="p-4">
                      <div>{referral.email}</div>
                      <div className="text-sm text-gray-500">{referral.phone}</div>
                    </td>
                    <td className="p-4">{referral.dateReferred}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(referral.status)}`}>
                        {referral.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {referral.rewardPaid ? (
                        <span className="flex items-center gap-1 text-green-600">
                          <Award size={16} />
                          Paid
                        </span>
                      ) : (
                        <span className="text-gray-500">Pending</span>
                      )}
                    </td>
                    <td className="p-4">
                      <button className="text-blue-600 hover:text-blue-800">
                        Update Status
                      </button>
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

export default ReferralSystem;
