import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertCircle, Clock, ArrowRight, Calendar, Users, FileText, Settings, Bell } from 'lucide-react';

const WorkflowAutomation = () => {
  const [workflows, setWorkflows] = useState({
    salesStage: {
      status: 'active',
      tasks: [
        { id: 1, name: 'Initial Visit', completed: false, dueDate: null },
        { id: 2, name: 'Follow Up', completed: false, dueDate: null },
        { id: 3, name: 'Meeting with Decision Maker', completed: false, dueDate: null },
        { id: 4, name: 'Proposal Presentation', completed: false, dueDate: null }
      ],
      automations: [
        'Calendar reminder for next contact',
        'Weekly visit goal tracking'
      ]
    },
    onboardingStage: {
      status: 'pending',
      tasks: [
        { id: 1, name: 'Contract Signing', completed: false, dueDate: null },
        { id: 2, name: 'Initial Payment', completed: false, dueDate: null },
        { id: 3, name: 'Welcome Package', completed: false, dueDate: null },
        { id: 4, name: 'Resource Assignment', completed: false, dueDate: null }
      ],
      automations: [
        'Send welcome emails',
        'Create client folder structure'
      ]
    },
    productionStage: {
      status: 'pending',
      tasks: [
        { id: 1, name: 'Content Calendar', completed: false, dueDate: null },
        { id: 2, name: 'Videographer Assignment', completed: false, dueDate: null },
        { id: 3, name: 'Production Schedule', completed: false, dueDate: null }
      ],
      automations: [
        'Monthly content calendar generation',
        'Automatic resource scheduling',
        'Production milestone reminders'
      ]
    }
  });

  const [notifications, setNotifications] = useState([]);
  const [currentClient, setCurrentClient] = useState({
    name: '',
    stage: 'sales',
    status: 'active'
  });

  const automationRules = {
    sales: {
      visitComplete: () => {
        // Track visit in dashboard
        updateDashboard('visits');
      },
      proposalSent: () => {
        // Start proposal tracking
        startProposalTracking();
      }
    },
    onboarding: {
      contractSigned: () => {
        // Create client workspace
        createClientWorkspace();
      },
      paymentReceived: () => {
        // Activate services
        activateServices();
        // Generate receipts
        generateReceipts();
      }
    },
    production: {
      resourceAssigned: () => {
        // Create production schedule
        createProductionSchedule();
        // Set up monitoring
        setupMonitoring();
      },
      contentScheduled: () => {
        // Set delivery reminders
        setDeliveryReminders();
        // Update calendar
        updateProductionCalendar();
      }
    }
  };

  // Simulated automation functions
  const scheduleNotification = (message) => {
    setNotifications(prev => [...prev, { message, timestamp: new Date() }]);
  };

  const updateCalendar = (event, time) => {
    console.log(`Calendar updated: ${event} scheduled for ${time}`);
  };

  const updateDashboard = (metric) => {
    console.log(`Dashboard updated: ${metric}`);
  };

  const createClientWorkspace = () => {
    scheduleNotification('Client workspace and folders created');
  };

  const startProposalTracking = () => {
    scheduleNotification('Proposal tracking initiated');
  };

  const activateServices = () => {
    scheduleNotification('Services activated');
  };

  const generateReceipts = () => {
    scheduleNotification('Receipts generated');
  };

  const createProductionSchedule = () => {
    scheduleNotification('Production schedule created');
  };

  const setupMonitoring = () => {
    scheduleNotification('Monitoring system set up');
  };

  const setDeliveryReminders = () => {
    scheduleNotification('Delivery reminders set');
  };

  const updateProductionCalendar = () => {
    scheduleNotification('Production calendar updated');
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="text-blue-600" />
            Workflow Automation Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Workflow Stages */}
          <div className="space-y-6">
            {Object.entries(workflows).map(([stage, data]) => (
              <div key={stage} className="border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  {stage === 'salesStage' && <Users className="text-blue-600" />}
                  {stage === 'onboardingStage' && <FileText className="text-green-600" />}
                  {stage === 'productionStage' && <Calendar className="text-purple-600" />}
                  {stage.replace('Stage', '').charAt(0).toUpperCase() + stage.slice(1).replace('Stage', '')}
                </h3>

                {/* Tasks */}
                <div className="space-y-2 mb-4">
                  {data.tasks.map(task => (
                    <div key={task.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => {
                          const newWorkflows = { ...workflows };
                          const taskIndex = data.tasks.findIndex(t => t.id === task.id);
                          newWorkflows[stage].tasks[taskIndex].completed = !task.completed;
                          setWorkflows(newWorkflows);
                        }}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span>{task.name}</span>
                    </div>
                  ))}
                </div>

                {/* Automations */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Active Automations</h4>
                  <ul className="space-y-1">
                    {data.automations.map((automation, index) => (
                      <li key={index} className="text-sm flex items-center gap-2">
                        <ArrowRight size={12} className="text-gray-400" />
                        {automation}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Notifications */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Bell className="text-blue-600" />
              Recent Automation Activities
            </h3>
            <div className="space-y-2">
              {notifications.map((notification, index) => (
                <div key={index} className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded">
                  <Clock size={14} className="text-gray-400" />
                  {notification.message}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="fixed bottom-6 right-6 flex gap-2">
        <button 
          onClick={() => automationRules.sales.visitComplete()}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
        >
          + New Visit
        </button>
        <button 
          onClick={() => automationRules.onboarding.contractSigned()}
          className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700"
        >
          + New Client
        </button>
      </div>
    </div>
  );
};

export default WorkflowAutomation;
