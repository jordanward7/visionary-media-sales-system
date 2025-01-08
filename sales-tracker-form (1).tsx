import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckSquare, Save } from 'lucide-react';

const SalesTrackerForm = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    city: '',
    address: '',
    phoneNumber: '',
    stoppedBy: false,
    followedUp: false,
    contactedLeadership: false,
    appointmentSet: false,
    appointmentDateTime: '',
    extraDetails: '',
    decisionMaker: '',
    bestTimeToContact: '',
    competitorInfo: '',
    currentMarketingStrategy: '',
    weekNumber: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically save the data to your database
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white shadow-lg">
      <CardHeader className="bg-blue-600 text-white">
        <CardTitle className="flex items-center gap-2">
          <img src="/api/placeholder/40/40" alt="Visionary Media Logo" className="rounded-full" />
          Visionary Media - Sales Lead Tracker
        </CardTitle>
        <p className="text-sm opacity-90">Automotive Dealership Video Marketing & Meta Ads</p>
      </CardHeader>
      
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Week Number</label>
              <input
                type="text"
                name="weekNumber"
                value={formData.weekNumber}
                onChange={handleChange}
                placeholder="Week #"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Business Name</label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Enter dealership name"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
          </div>

          {/* Progress Tracking Section */}
          <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="stoppedBy"
                checked={formData.stoppedBy}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <label className="text-sm font-medium">Stopped By</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="followedUp"
                checked={formData.followedUp}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <label className="text-sm font-medium">Followed Up</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="contactedLeadership"
                checked={formData.contactedLeadership}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <label className="text-sm font-medium">Connected with GM/Owner</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="appointmentSet"
                checked={formData.appointmentSet}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <label className="text-sm font-medium">Appointment Set</label>
            </div>
          </div>

          {/* Appointment Details */}
          <div className={formData.appointmentSet ? 'block' : 'hidden'}>
            <label className="block text-sm font-medium text-gray-700">Appointment Date & Time</label>
            <input
              type="datetime-local"
              name="appointmentDateTime"
              value={formData.appointmentDateTime}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          {/* Additional Information Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Decision Maker's Name & Position</label>
              <input
                type="text"
                name="decisionMaker"
                value={formData.decisionMaker}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Best Time to Contact</label>
              <input
                type="text"
                name="bestTimeToContact"
                value={formData.bestTimeToContact}
                onChange={handleChange}
                placeholder="e.g., Mornings, After 2 PM"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Current Marketing Strategy</label>
              <input
                type="text"
                name="currentMarketingStrategy"
                value={formData.currentMarketingStrategy}
                onChange={handleChange}
                placeholder="What marketing are they currently doing?"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Competitor Information</label>
              <input
                type="text"
                name="competitorInfo"
                value={formData.competitorInfo}
                onChange={handleChange}
                placeholder="Are they working with any other agencies?"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Important Extra Details</label>
              <textarea
                name="extraDetails"
                value={formData.extraDetails}
                onChange={handleChange}
                rows="3"
                placeholder="Notes about budget, pain points, specific needs..."
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <Save size={20} />
            Save Lead Information
          </button>

          {/* Weekly Progress Indicator */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <CheckSquare size={20} className="text-blue-600" />
              Remember: Target at least 10 businesses per week
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SalesTrackerForm;
