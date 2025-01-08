import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Check, X, AlertCircle, Camera, DollarSign, Calendar, Building, User, Clock, Send } from 'lucide-react';

const ClientOnboarding = () => {
  const [onboardingData, setOnboardingData] = useState({
    companyName: '',
    startDate: '',
    packageDetails: {
      price: '',
      adsSpendBudget: '',
      videosPerMonth: ''
    },
    companyType: '',
    recordingPerson: '',
    needVideoographer: false,
    extraDetails: '',
    status: 'pending', // pending, approved, rejected
    submittedBy: '',
    submissionDate: ''
  });

  const [approvalComments, setApprovalComments] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setOnboardingData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setOnboardingData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Submitted:', onboardingData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader className="bg-blue-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <Building size={24} />
            Client Onboarding Form
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Company Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={onboardingData.companyName}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={onboardingData.startDate}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Company Type</label>
                <input
                  type="text"
                  name="companyType"
                  value={onboardingData.companyType}
                  onChange={handleChange}
                  placeholder="e.g., New Car Dealership, Used Cars, Service Center"
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
            </div>

            {/* Package Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Package Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Package Price</label>
                  <div className="mt-1 relative">
                    <DollarSign className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      name="packageDetails.price"
                      value={onboardingData.packageDetails.price}
                      onChange={handleChange}
                      className="pl-8 p-2 w-full border rounded-md"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Monthly Ad Spend</label>
                  <div className="mt-1 relative">
                    <DollarSign className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      name="packageDetails.adsSpendBudget"
                      value={onboardingData.packageDetails.adsSpendBudget}
                      onChange={handleChange}
                      className="pl-8 p-2 w-full border rounded-md"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Videos per Month</label>
                  <input
                    type="number"
                    name="packageDetails.videosPerMonth"
                    value={onboardingData.packageDetails.videosPerMonth}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded-md"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Video Production */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Video Production Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Who will be recording?</label>
                <input
                  type="text"
                  name="recordingPerson"
                  value={onboardingData.recordingPerson}
                  onChange={handleChange}
                  placeholder="Name of assigned videographer or client contact"
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="needVideoographer"
                  checked={onboardingData.needVideoographer}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600"
                />
                <label className="text-sm text-gray-700">Need to hire/assign a videographer</label>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Additional Details</label>
              <textarea
                name="extraDetails"
                value={onboardingData.extraDetails}
                onChange={handleChange}
                rows="4"
                placeholder="Any special requirements, notes, or specific details about the project..."
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <Send size={20} />
              Submit for Approval
            </button>
          </form>
        </CardContent>
      </Card>

      {/* Approval Section (Visible only to admin) */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Approval Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-medium">Status:</span>
              <span className={`px-2 py-1 rounded-full text-sm ${
                onboardingData.status === 'approved' ? 'bg-green-100 text-green-800' :
                onboardingData.status === 'rejected' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {onboardingData.status.charAt(0).toUpperCase() + onboardingData.status.slice(1)}
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Approval Comments</label>
              <textarea
                value={approvalComments}
                onChange={(e) => setApprovalComments(e.target.value)}
                rows="3"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Add any comments about the approval/rejection..."
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setOnboardingData(prev => ({ ...prev, status: 'approved' }))}
                className="flex-1 bg-green-600 text-white p-3 rounded-md hover:bg-green-700 flex items-center justify-center gap-2"
              >
                <Check size={20} />
                Approve
              </button>
              <button
                onClick={() => setOnboardingData(prev => ({ ...prev, status: 'rejected' }))}
                className="flex-1 bg-red-600 text-white p-3 rounded-md hover:bg-red-700 flex items-center justify-center gap-2"
              >
                <X size={20} />
                Reject
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientOnboarding;
