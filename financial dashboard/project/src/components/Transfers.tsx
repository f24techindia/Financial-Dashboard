import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Globe, Clock, Shield, ArrowRight, MapPin, CreditCard, Banknote } from 'lucide-react';

const recentRecipients = [
  { name: 'Sarah Johnson', country: 'United States', flag: '🇺🇸', lastAmount: '2,500 USD' },
  { name: 'Marco Silva', country: 'Brazil', flag: '🇧🇷', lastAmount: '1,200 BRL' },
  { name: 'Emma Thompson', country: 'United Kingdom', flag: '🇬🇧', lastAmount: '850 GBP' },
  { name: 'Hiroshi Tanaka', country: 'Japan', flag: '🇯🇵', lastAmount: '150,000 JPY' },
];

const transferMethods = [
  { 
    id: 'bank', 
    name: 'Bank Transfer', 
    icon: Banknote, 
    fee: '0.5%', 
    time: '1-3 business days',
    description: 'Direct to recipient bank account'
  },
  { 
    id: 'card', 
    name: 'Debit Card', 
    icon: CreditCard, 
    fee: '1.2%', 
    time: 'Instant',
    description: 'Fast transfer using debit card'
  },
  { 
    id: 'wallet', 
    name: 'Digital Wallet', 
    icon: Send, 
    fee: '0.8%', 
    time: 'Within minutes',
    description: 'Send to digital wallet instantly'
  },
];

export const Transfers: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState('bank');
  const [formData, setFormData] = useState({
    amount: '',
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    recipient: '',
    email: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const exchangeRate = 0.8923;
  const convertedAmount = parseFloat(formData.amount) * exchangeRate || 0;
  const fee = convertedAmount * 0.005;
  const totalReceived = convertedAmount - fee;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-light-text dark:text-dark-text font-editorial">International Transfers</h2>
        <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">Send money globally with real-time tracking</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Transfer Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    activeStep >= step 
                      ? 'bg-lime-accent text-dark-base' 
                      : 'bg-light-glass dark:bg-dark-glass text-light-text-secondary dark:text-dark-text-secondary'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {step}
                </motion.div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-4 ${
                    activeStep > step ? 'bg-lime-accent' : 'bg-light-glass dark:bg-dark-glass'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-2xl p-6 space-y-6"
              >
                <h3 className="text-xl font-bold text-light-text dark:text-dark-text font-editorial">Transfer Details</h3>
                
                {/* Amount Input */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">You Send</label>
                    <div className="flex">
                      <select 
                        value={formData.fromCurrency}
                        onChange={(e) => handleInputChange('fromCurrency', e.target.value)}
                        className="bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-l-xl px-4 py-3 text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50"
                      >
                        <option>USD</option>
                        <option>EUR</option>
                        <option>GBP</option>
                        <option>JPY</option>
                      </select>
                      <input
                        type="number"
                        placeholder="1000"
                        value={formData.amount}
                        onChange={(e) => handleInputChange('amount', e.target.value)}
                        className="bg-light-glass dark:bg-dark-glass border border-l-0 border-light-border dark:border-dark-border rounded-r-xl px-4 py-3 text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50 flex-1"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <motion.button
                      whileHover={{ rotate: 180 }}
                      className="p-2 bg-lime-accent/10 rounded-full"
                    >
                      <ArrowRight className="w-5 h-5 text-lime-accent rotate-90" />
                    </motion.button>
                  </div>

                  <div>
                    <label className="block text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">Recipient Gets</label>
                    <div className="flex">
                      <select 
                        value={formData.toCurrency}
                        onChange={(e) => handleInputChange('toCurrency', e.target.value)}
                        className="bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-l-xl px-4 py-3 text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50"
                      >
                        <option>EUR</option>
                        <option>USD</option>
                        <option>GBP</option>
                        <option>JPY</option>
                      </select>
                      <input
                        type="number"
                        value={convertedAmount.toFixed(2)}
                        readOnly
                        className="bg-light-glass dark:bg-dark-glass border border-l-0 border-light-border dark:border-dark-border rounded-r-xl px-4 py-3 text-light-text dark:text-dark-text flex-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Exchange Rate Info */}
                <div className="bg-lime-accent/5 border border-lime-accent/20 rounded-xl p-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">Exchange Rate</span>
                    <span className="text-light-text dark:text-dark-text">1 USD = {exchangeRate} EUR</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">Fee</span>
                    <span className="text-light-text dark:text-dark-text">{fee.toFixed(2)} EUR</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2 font-bold">
                    <span className="text-lime-accent">Total to Recipient</span>
                    <span className="text-lime-accent">{totalReceived.toFixed(2)} EUR</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveStep(2)}
                  disabled={!formData.amount}
                  className="w-full bg-lime-accent text-dark-base py-3 rounded-xl font-medium hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </motion.button>
              </motion.div>
            )}

            {activeStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-2xl p-6 space-y-6"
              >
                <h3 className="text-xl font-bold text-light-text dark:text-dark-text font-editorial">Recipient Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">Recipient Name</label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      value={formData.recipient}
                      onChange={(e) => handleInputChange('recipient', e.target.value)}
                      className="w-full bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl px-4 py-3 text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">Email Address</label>
                    <input
                      type="email"
                      placeholder="recipient@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl px-4 py-3 text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">Transfer Method</label>
                    <div className="space-y-3">
                      {transferMethods.map((method) => (
                        <motion.div
                          key={method.id}
                          whileHover={{ scale: 1.01 }}
                          onClick={() => setSelectedMethod(method.id)}
                          className={`p-4 border rounded-xl cursor-pointer transition-all ${
                            selectedMethod === method.id
                              ? 'border-lime-accent bg-lime-accent/5'
                              : 'border-light-border dark:border-dark-border bg-light-glass dark:bg-dark-glass'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <method.icon className="w-5 h-5 text-lime-accent" />
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-light-text dark:text-dark-text">{method.name}</span>
                                <span className="text-sm text-lime-accent">{method.fee}</span>
                              </div>
                              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{method.description}</p>
                              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">{method.time}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">Message (Optional)</label>
                    <textarea
                      placeholder="Add a note for the recipient"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="w-full bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl px-4 py-3 text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50 h-20 resize-none"
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveStep(1)}
                    className="flex-1 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border py-3 rounded-xl font-medium text-light-text dark:text-dark-text hover:border-lime-accent/30 transition-all"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveStep(3)}
                    disabled={!formData.recipient || !formData.email}
                    className="flex-1 bg-lime-accent text-dark-base py-3 rounded-xl font-medium hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Review Transfer
                  </motion.button>
                </div>
              </motion.div>
            )}

            {activeStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-2xl p-6 space-y-6"
              >
                <h3 className="text-xl font-bold text-light-text dark:text-dark-text font-editorial">Review & Confirm</h3>
                
                <div className="space-y-4">
                  <div className="bg-light-glass dark:bg-dark-glass rounded-xl p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-light-text-secondary dark:text-dark-text-secondary">You Send</span>
                      <span className="text-light-text dark:text-dark-text font-medium">{formData.amount} {formData.fromCurrency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-light-text-secondary dark:text-dark-text-secondary">Recipient Gets</span>
                      <span className="text-light-text dark:text-dark-text font-medium">{totalReceived.toFixed(2)} {formData.toCurrency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-light-text-secondary dark:text-dark-text-secondary">Transfer Fee</span>
                      <span className="text-light-text dark:text-dark-text">{fee.toFixed(2)} {formData.toCurrency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-light-text-secondary dark:text-dark-text-secondary">Exchange Rate</span>
                      <span className="text-light-text dark:text-dark-text">1 {formData.fromCurrency} = {exchangeRate} {formData.toCurrency}</span>
                    </div>
                  </div>

                  <div className="bg-light-glass dark:bg-dark-glass rounded-xl p-4">
                    <h4 className="font-medium text-light-text dark:text-dark-text mb-2">Recipient Details</h4>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary">{formData.recipient}</p>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary">{formData.email}</p>
                    {formData.message && (
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-2 italic">"{formData.message}"</p>
                    )}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveStep(2)}
                    className="flex-1 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border py-3 rounded-xl font-medium text-light-text dark:text-dark-text hover:border-lime-accent/30 transition-all"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-lime-accent text-dark-base py-3 rounded-xl font-medium hover:shadow-glow transition-all"
                  >
                    Send Transfer
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Security Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-2xl p-6"
          >
            <h3 className="text-lg font-bold text-light-text dark:text-dark-text font-editorial mb-4">Security Features</h3>
            <div className="space-y-3">
              {[
                { icon: Shield, text: 'Bank-level encryption' },
                { icon: Globe, text: 'Regulated worldwide' },
                { icon: Clock, text: 'Real-time tracking' },
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <feature.icon className="w-5 h-5 text-lime-accent" />
                  <span className="text-sm text-light-text dark:text-dark-text">{feature.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Recipients */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-2xl p-6"
          >
            <h3 className="text-lg font-bold text-light-text dark:text-dark-text font-editorial mb-4">Recent Recipients</h3>
            <div className="space-y-3">
              {recentRecipients.map((recipient, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-light-glass dark:hover:bg-dark-glass cursor-pointer transition-all"
                >
                  <span className="text-2xl">{recipient.flag}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-light-text dark:text-dark-text text-sm truncate">{recipient.name}</p>
                    <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{recipient.country}</p>
                  </div>
                  <p className="text-xs text-lime-accent">{recipient.lastAmount}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};