import React, { useState } from 'react';
import { 
  User, 
  FileText, 
  Plus, 
  Settings, 
  Bell,
  Search,
  BarChart3,
  Shield,
  ChevronRight
} from 'lucide-react';

export default function Dashboard({ onNavigateToAgreements }) {
  const [user] = useState({
    name: 'John Doe',
    company: 'Acme Corporation',
    email: 'john.doe@acme.com',
    avatar: null
  });

  const stats = [
    {
      title: 'Active Agreements',
      value: '3',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Consents',
      value: '12',
      icon: Shield,
      color: 'bg-green-500'
    },
    {
      title: 'Compliance Score',
      value: '98%',
      icon: BarChart3,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">ConsentHub</span>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search agreements..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Settings className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.company}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-gray-600">
            Manage your data agreements and consent preferences from your dashboard.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Manage Data Agreements */}
            <button
              onClick={onNavigateToAgreements}
              className="group p-6 border-2 border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 text-left"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                  <FileText className="w-6 h-6 text-indigo-600" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Data Agreements</h3>
              <p className="text-gray-600">
                View, edit, and create new data usage agreements for your organization.
              </p>
            </button>

            {/* View Analytics */}
            <button className="group p-6 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 text-left">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">View Analytics</h3>
              <p className="text-gray-600">
                Monitor consent rates and compliance metrics across all agreements.
              </p>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              {
                action: 'New agreement created',
                details: 'Marketing Data Usage Agreement v2.0',
                time: '2 hours ago',
                type: 'create'
              },
              {
                action: 'Consent updated',
                details: 'Analytics purpose modified by user@example.com',
                time: '5 hours ago',
                type: 'update'
              },
              {
                action: 'Agreement published',
                details: 'Cookie Policy Agreement v1.2',
                time: '1 day ago',
                type: 'publish'
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'create' ? 'bg-green-500' :
                  activity.type === 'update' ? 'bg-blue-500' : 'bg-purple-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.details}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}