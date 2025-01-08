// auth-storage-utils.js

// Storage Keys
const STORAGE_KEYS = {
  AUTH_TOKEN: 'vm_auth_token',
  USER_DATA: 'vm_user_data',
  LEADS: 'vm_leads',
  CLIENTS: 'vm_clients',
  REFERRALS: 'vm_referrals',
  EVENTS: 'vm_events'
};

// Sample Users (Replace with your actual team members)
const INITIAL_USERS = [
  {
    id: '1',
    email: 'admin@visionarymedia.com',
    password: 'admin123', // In production, use proper password hashing
    name: 'Admin User',
    role: 'admin',
    team: 'Management'
  },
  {
    id: '2',
    email: 'sales@visionarymedia.com',
    password: 'sales123',
    name: 'Sales User',
    role: 'sales',
    team: 'Sales Team A'
  }
];

// Initialize local storage with default data
const initializeStorage = () => {
  // Only initialize if not already done
  if (!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)) {
    localStorage.setItem('vm_users', JSON.stringify(INITIAL_USERS));
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.REFERRALS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify([]));
  }
};

// Authentication Functions
const auth = {
  login: (email, password) => {
    const users = JSON.parse(localStorage.getItem('vm_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      const token = btoa(JSON.stringify({ userId: user.id, timestamp: Date.now() }));
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, error: 'Invalid credentials' };
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    return { success: true };
  },

  getCurrentUser: () => {
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }
};

// Data Management Functions
const dataStore = {
  // Leads
  getLeads: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.LEADS) || '[]');
  },
  
  addLead: (lead) => {
    const leads = dataStore.getLeads();
    const newLead = {
      ...lead,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    leads.push(newLead);
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
    return newLead;
  },

  updateLead: (id, updates) => {
    const leads = dataStore.getLeads();
    const index = leads.findIndex(lead => lead.id === id);
    if (index !== -1) {
      leads[index] = { ...leads[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
      return leads[index];
    }
    return null;
  },

  // Clients
  getClients: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CLIENTS) || '[]');
  },

  addClient: (client) => {
    const clients = dataStore.getClients();
    const newClient = {
      ...client,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    clients.push(newClient);
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
    return newClient;
  },

  // Events
  getEvents: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.EVENTS) || '[]');
  },

  addEvent: (event) => {
    const events = dataStore.getEvents();
    const newEvent = {
      ...event,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    events.push(newEvent);
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    return newEvent;
  },

  // Referrals
  getReferrals: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.REFERRALS) || '[]');
  },

  addReferral: (referral) => {
    const referrals = dataStore.getReferrals();
    const newReferral = {
      ...referral,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    referrals.push(newReferral);
    localStorage.setItem(STORAGE_KEYS.REFERRALS, JSON.stringify(referrals));
    return newReferral;
  }
};

export { initializeStorage, auth, dataStore, STORAGE_KEYS };
