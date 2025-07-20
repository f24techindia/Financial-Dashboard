import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, PieChart, BarChart3, Calendar, Target, Award, AlertCircle } from 'lucide-react';

const spendingCategories = [
  { name: 'Business', amount: 8420, percentage: 35, color: 'bg-blue-500', change: +12 },
  { name: 'Travel', amount: 4230, percentage: 18, color: 'bg-purple-500', change: -5 },
  { name: 'Shopping', amount: 3890, percentage: 16, color: 'bg-orange-500', change: +8 },
  { name: 'Food & Dining', amount: 2340, percentage: 10, color: 'bg-pink-500', change: +3 },
  { name: 'Entertainment', amount: 1890, percentage: 8, color: 'bg-indigo-500', change: -2 },
  { name: 'Other', amount: 3230, percentage: 13, color: 'bg-gray-500', change: +1 },
];

const monthlyData = [
  { month: 'Jan', income: 12000, expenses: 8500, savings: 3500 },
  { month: 'Feb', income: 13500, expenses: 9200, savings: 4300 },
  { month: 'Mar', income: 11800, expenses: 8900, savings: 2900 },
  { month: 'Apr', income: 14200, expenses: 9800, savings: 4400 },
  { month: 'May', income: 13900, expenses: 10200, savings: 3700 },
  { month: 'Jun', income: 15100, expenses: 11100, savings: 4000 },
];

const goals = [
  { name: 'Emergency Fund', target: 50000, current: 32000, deadline: '2024-12-31' },
  { name: 'Vacation Fund', target: 8000, current: 5200, deadline: '2024-08-15' },
  { name: 'Investment Portfolio', target: 100000, current: 67000, deadline: '2025-06-30' },
];

const insights = [
  {
    type: 'positive',
    icon: TrendingUp,
    title: 'Spending Decreased',
    description: 'Your spending is down 8% compared to last month',
    amount: '-$420'
  },
  {
    type: 'warning',
    icon: AlertCircle,
    title: 'High Travel Expenses',
    description: 'Travel spending is 25% above your monthly budget',
    amount: '+$890'
  },
  {
    type: 'positive',
    icon: Target,
    title: 'Savings Goal Progress',
    description: 'You\'re on track to reach your emergency fund goal',
    amount: '64% complete'
  },
];

export const Insights: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [activeTab, setActiveTab] = useState('overview');

  const totalIncome = monthlyData.reduce((sum, month) => sum + month.income, 0);
  const totalExpenses = monthlyData.reduce((sum, month) => sum + month.expenses, 0);
  const totalSavings = monthlyData.reduce((sum, month) => sum + month.savings, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold text-light-text dark:text-dark-text font-editorial">Financial Insights</h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">Understand your spending patterns and financial health</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl px-4 py-2 text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50"
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-light-glass dark:bg-dark-glass rounded-xl p-1">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'spending', label: 'Spending', icon: PieChart },
          { id: 'goals', label: 'Goals', icon: Target },
        ].map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-lime-accent text-dark-base'
                : 'text-light-text dark:text-dark-text hover:bg-light-surface dark:hover:bg-dark-surface'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <tab.icon className="w-4 h-4" />
            <span className="font-medium">{tab.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Total Income', value: totalIncome, change: +8.2, color: 'text-lime-accent' },
              { label: 'Total Expenses', value: totalExpenses, change: -3.1, color: 'text-orange-400' },
              { label: 'Total Savings', value: totalSavings, change: +15.7, color: 'text-blue-400' },
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-xl p-6"
              >
                <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">{metric.label}</p>
                <div className="flex items-baseline space-x-2 mt-2">
                  <span className={`text-2xl font-bold font-editorial ${metric.color}`}>
                    ${metric.value.toLocaleString()}
                  </span>
                  <span className={`text-sm flex items-center ${metric.change > 0 ? 'text-lime-accent' : 'text-red-400'}`}>
                    {metric.change > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {Math.abs(metric.change)}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Monthly Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-light-text dark:text-dark-text font-editorial mb-6">Monthly Trends</h3>
            <div className="space-y-4">
              {monthlyData.map((month, index) => (
                <div key={month.month} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-light-text dark:text-dark-text font-medium">{month.month}</span>
                    <div className="flex space-x-4">
                      <span className="text-lime-accent">${month.income.toLocaleString()}</span>
                      <span className="text-orange-400">${month.expenses.toLocaleString()}</span>
                      <span className="text-blue-400">${month.savings.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex space-x-1 h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(month.income / 16000) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="bg-lime-accent/30 rounded-full"
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(month.expenses / 16000) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                      className="bg-orange-400/30 rounded-full"
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(month.savings / 16000) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.4 }}
                      className="bg-blue-400/30 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-6 mt-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-lime-accent rounded-full" />
                <span className="text-light-text-secondary dark:text-dark-text-secondary">Income</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-400 rounded-full" />
                <span className="text-light-text-secondary dark:text-dark-text-secondary">Expenses</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full" />
                <span className="text-light-text-secondary dark:text-dark-text-secondary">Savings</span>
              </div>
            </div>
          </motion.div>

          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-light-text dark:text-dark-text font-editorial mb-6">AI-Powered Insights</h3>
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className={`flex items-start space-x-4 p-4 rounded-xl ${
                    insight.type === 'positive' ? 'bg-lime-accent/5 border border-lime-accent/20' :
                    insight.type === 'warning' ? 'bg-orange-400/5 border border-orange-400/20' :
                    'bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border'
                  }`}
                >
                  <insight.icon className={`w-5 h-5 mt-0.5 ${
                    insight.type === 'positive' ? 'text-lime-accent' :
                    insight.type === 'warning' ? 'text-orange-400' :
                    'text-light-text dark:text-dark-text'
                  }`} />
                  <div className="flex-1">
                    <h4 className="font-medium text-light-text dark:text-dark-text">{insight.title}</h4>
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">{insight.description}</p>
                  </div>
                  <span className={`text-sm font-medium ${
                    insight.type === 'positive' ? 'text-lime-accent' :
                    insight.type === 'warning' ? 'text-orange-400' :
                    'text-light-text dark:text-dark-text'
                  }`}>
                    {insight.amount}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {activeTab === 'spending' && (
        <div className="space-y-6">
          {/* Spending Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-light-text dark:text-dark-text font-editorial mb-6">Spending by Category</h3>
            <div className="space-y-4">
              {spendingCategories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${category.color}`} />
                      <span className="text-light-text dark:text-dark-text font-medium">{category.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-light-text dark:text-dark-text">${category.amount.toLocaleString()}</span>
                      <span className={`text-sm flex items-center ${category.change > 0 ? 'text-red-400' : 'text-lime-accent'}`}>
                        {category.change > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {Math.abs(category.change)}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-light-glass dark:bg-dark-glass rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${category.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      className={`h-2 rounded-full ${category.color}`}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-light-text-secondary dark:text-dark-text-secondary">
                    <span>{category.percentage}% of total</span>
                    <span>vs last month</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {activeTab === 'goals' && (
        <div className="space-y-6">
          {/* Financial Goals */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {goals.map((goal, index) => (
              <motion.div
                key={goal.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-light-text dark:text-dark-text font-editorial">{goal.name}</h3>
                  <Award className="w-5 h-5 text-lime-accent" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">Progress</span>
                    <span className="text-light-text dark:text-dark-text">${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-light-glass dark:bg-dark-glass rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(goal.current / goal.target) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      className="h-3 bg-lime-accent rounded-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-lime-accent font-medium">{Math.round((goal.current / goal.target) * 100)}% complete</span>
                    <div className="flex items-center space-x-1 text-light-text-secondary dark:text-dark-text-secondary">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(goal.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Add New Goal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-xl p-6"
          >
            <h3 className="text-lg font-bold text-light-text dark:text-dark-text font-editorial mb-4">Set New Goal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Goal name"
                className="bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl px-4 py-3 text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50"
              />
              <input
                type="number"
                placeholder="Target amount"
                className="bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl px-4 py-3 text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50"
              />
              <input
                type="date"
                className="bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl px-4 py-3 text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-lime-accent text-dark-base py-3 rounded-xl font-medium hover:shadow-glow transition-all"
              >
                Create Goal
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};