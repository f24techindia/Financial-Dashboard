import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Bell, Globe, CreditCard, Smartphone, Key, Eye, EyeOff, Check } from 'lucide-react';

const securitySettings = [
  { id: 'twoFactor', label: 'Two-Factor Authentication', description: 'Add an extra layer of security', enabled: true },
  { id: 'biometric', label: 'Biometric Login', description: 'Use fingerprint or face recognition', enabled: false },
  { id: 'loginAlerts', label: 'Login Alerts', description: 'Get notified of new device logins', enabled: true },
  { id: 'transactionLimits', label: 'Transaction Limits', description: 'Set daily and monthly limits', enabled: true },
];

const notificationSettings = [
  { id: 'transactions', label: 'Transaction Notifications', description: 'Get notified of all transactions', enabled: true },
  { id: 'exchangeRates', label: 'Exchange Rate Alerts', description: 'Notify when rates hit your targets', enabled: false },
  { id: 'monthlyReports', label: 'Monthly Reports', description: 'Receive spending summaries', enabled: true },
  { id: 'promotions', label: 'Promotions & Updates', description: 'Product updates and offers', enabled: false },
];

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    security: securitySettings,
    notifications: notificationSettings,
  });

  const toggleSetting = (category: 'security' | 'notifications', id: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: prev[category].map(setting =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    }));
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Globe },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-light-text dark:text-dark-text font-editorial">Settings</h2>
        <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">Manage your account and preferences</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-xl p-4 space-y-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-lime-accent/10 text-lime-accent border border-lime-accent/20'
                    : 'text-light-text dark:text-dark-text hover:bg-light-glass dark:hover:bg-dark-glass'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Profile Information */}
              <div className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-xl p-6">
                <h3 className="text-xl font-bold text-light-text dark:text-dark-text font-editorial mb-6">Profile Information</h3>
                
                {/* Avatar Section */}
                <div className="flex items-center space-x-6 mb-6">
                  <div className="w-20 h-20 bg-lime-accent rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-dark-base">JD</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-light-text dark:text-dark-text">John Doe</h4>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary">Premium Member since 2023</p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-2 text-lime-accent hover:text-lime-accent/80 text-sm font-medium"
                    >
                      Change Photo
                    </motion.button>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">First Name</label>
                    <input
                      type="text"
                      defaultValue="John"
                      className="w-full bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl px-4 py-3 text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">Last Name</label>
                    <input
                      type="text"
                      defaultValue="Doe"
                      className="w-full bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl px-4 py-3 text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="john.doe@email.com"
                      className="w-full bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl px-4 py-3 text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">Phone</label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="w-full bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl px-4 py-3 text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">Address</label>
                    <input
                      type="text"
                      defaultValue="123 Main Street, New York, NY 10001"
                      className="w-full bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl px-4 py-3 text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-lime-accent text-dark-base px-6 py-3 rounded-xl font-medium hover:shadow-glow transition-all"
                  >
                    Save Changes
                  </motion.button>
                </div>
              </div>

              {/* Change Password */}
              <div className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-xl p-6">
                <h3 className="text-xl font-bold text-light-text dark:text-dark-text font-editorial mb-6">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="w-full bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl px-4 py-3 pr-12 text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">New Password</label>
                    <input
                      type="password"
                      className="w-full bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl px-4 py-3 text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl px-4 py-3 text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-lime-accent text-dark-base px-6 py-3 rounded-xl font-medium hover:shadow-glow transition-all"
                  >
                    Update Password
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-xl p-6">
                <h3 className="text-xl font-bold text-light-text dark:text-dark-text font-editorial mb-6">Security Settings</h3>
                <div className="space-y-4">
                  {settings.security.map((setting, index) => (
                    <motion.div
                      key={setting.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-light-glass dark:bg-dark-glass rounded-xl"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-light-text dark:text-dark-text">{setting.label}</h4>
                        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">{setting.description}</p>
                      </div>
                      <motion.button
                        onClick={() => toggleSetting('security', setting.id)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          setting.enabled ? 'bg-lime-accent' : 'bg-light-border dark:bg-dark-border'
                        }`}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                          animate={{ x: setting.enabled ? 24 : 4 }}
                          transition={{ duration: 0.2 }}
                        />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Connected Devices */}
              <div className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-xl p-6">
                <h3 className="text-xl font-bold text-light-text dark:text-dark-text font-editorial mb-6">Connected Devices</h3>
                <div className="space-y-4">
                  {[
                    { device: 'iPhone 14 Pro', location: 'New York, US', lastActive: '2 minutes ago', current: true },
                    { device: 'MacBook Pro', location: 'New York, US', lastActive: '1 hour ago', current: false },
                    { device: 'Chrome Browser', location: 'San Francisco, US', lastActive: '2 days ago', current: false },
                  ].map((device, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-light-glass dark:bg-dark-glass rounded-xl">
                      <div className="flex items-center space-x-4">
                        <Smartphone className="w-5 h-5 text-lime-accent" />
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-light-text dark:text-dark-text">{device.device}</h4>
                            {device.current && (
                              <span className="px-2 py-1 bg-lime-accent/20 text-lime-accent text-xs rounded-full">Current</span>
                            )}
                          </div>
                          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{device.location} • {device.lastActive}</p>
                        </div>
                      </div>
                      {!device.current && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="text-red-400 hover:text-red-300 text-sm font-medium"
                        >
                          Remove
                        </motion.button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-xl p-6">
                <h3 className="text-xl font-bold text-light-text dark:text-dark-text font-editorial mb-6">Notification Preferences</h3>
                <div className="space-y-4">
                  {settings.notifications.map((setting, index) => (
                    <motion.div
                      key={setting.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-light-glass dark:bg-dark-glass rounded-xl"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-light-text dark:text-dark-text">{setting.label}</h4>
                        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">{setting.description}</p>
                      </div>
                      <motion.button
                        onClick={() => toggleSetting('notifications', setting.id)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          setting.enabled ? 'bg-lime-accent' : 'bg-light-border dark:bg-dark-border'
                        }`}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                          animate={{ x: setting.enabled ? 24 : 4 }}
                          transition={{ duration: 0.2 }}
                        />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'preferences' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Currency & Language */}
              <div className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-xl p-6">
                <h3 className="text-xl font-bold text-light-text dark:text-dark-text font-editorial mb-6">Regional Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">Primary Currency</label>
                    <select className="w-full bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl px-4 py-3 text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50">
                      <option>USD - US Dollar</option>
                      <option>EUR - Euro</option>
                      <option>GBP - British Pound</option>
                      <option>JPY - Japanese Yen</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">Language</label>
                    <select className="w-full bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl px-4 py-3 text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">Time Zone</label>
                    <select className="w-full bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl px-4 py-3 text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50">
                      <option>Eastern Time (ET)</option>
                      <option>Central Time (CT)</option>
                      <option>Mountain Time (MT)</option>
                      <option>Pacific Time (PT)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">Date Format</label>
                    <select className="w-full bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl px-4 py-3 text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50">
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-xl p-6">
                <h3 className="text-xl font-bold text-light-text dark:text-dark-text font-editorial mb-6">Privacy Settings</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Data Analytics', description: 'Help improve our services with anonymous usage data' },
                    { label: 'Marketing Communications', description: 'Receive personalized offers and updates' },
                    { label: 'Third-party Integrations', description: 'Allow connections with external financial services' },
                  ].map((setting, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-light-glass dark:bg-dark-glass rounded-xl">
                      <div className="flex-1">
                        <h4 className="font-medium text-light-text dark:text-dark-text">{setting.label}</h4>
                        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">{setting.description}</p>
                      </div>
                      <motion.button
                        className="relative w-12 h-6 rounded-full bg-light-border dark:bg-dark-border"
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                      </motion.button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-lime-accent text-dark-base px-6 py-3 rounded-xl font-medium hover:shadow-glow transition-all"
                >
                  Save Preferences
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};