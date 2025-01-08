// Sales Tracker Form Component
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
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="bg-blue-600 text-white">
        <CardTitle className="flex items-center gap-2">
          <ClipboardList size={24} />
          New Lead Tracker
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Week Number</label>
              <input
                type="text"
                name="weekNumber"
                value={formData.weekNumber}
                onChange={handleChange}
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

          {/* Progress Tracking */}
          <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="stoppedBy"
                checked={formData.stoppedBy}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <label>Stopped By</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="followedUp"
                checked={formData.followedUp}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <label>Followed Up</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="contactedLeadership"
                checked={formData.contactedLeadership}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <label>Connected with GM/Owner</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="appointmentSet"
                checked={formData.appointmentSet}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <label>Appointment Set</label>
            </div>
          </div>

          {/* Appointment Details */}
          {formData.appointmentSet && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Appointment Date & Time</label>
              <input
                type="datetime-local"
                name="appointmentDateTime"
                value={formData.appointmentDateTime}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
          )}

          {/* Additional Information */}
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
              <label className="block text-sm font-medium text-gray-700">Current Marketing Strategy</label>
              <input
                type="text"
                name="currentMarketingStrategy"
                value={formData.currentMarketingStrategy}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="What marketing are they currently doing?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Extra Details</label>
              <textarea
                name="extraDetails"
                value={formData.extraDetails}
                onChange={handleChange}
                rows="3"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <Send size={20} />
            Save Lead Information
          </button>
        </form>
      </CardContent>
    </Card>
  );
};

// Client Onboarding Component
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
    status: 'pending',
    submittedBy: '',
    submissionDate: ''
  });

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

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="bg-blue-600 text-white">
        <CardTitle className="flex items-center gap-2">
          <UserPlus size={24} />
          Client Onboarding
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <form className="space-y-6">
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
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="needVideoographer"
                checked={onboardingData.needVideoographer}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <label>Need to hire/assign a videographer</label>
            </div>
          </div>

          {/* Additional Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Additional Details</label>
            <textarea
              name="extraDetails"
              value={onboardingData.extraDetails}
              onChange={handleChange}
              rows="4"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Any special requirements or notes..."
            />
          </div>

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
  );
};

// This completes the first part of the remaining components. Would you like me to continue with the Referral System and Workflow Automation components?