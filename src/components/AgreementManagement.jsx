import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Edit3, 
  Eye, 
  Trash2, 
  FileText,
  Calendar,
  Users,
  MoreVertical,
  Search,
  Filter
} from 'lucide-react';

const mockAgreements = [
  {
    id: 1,
    title: "Marketing Data Usage Agreement",
    name: "marketing",
    version: 2,
    agreement_text: "By agreeing, you consent to your data being used for various marketing and analytics purposes.",
    purposes: [
      {
        name: "ad_personalization",
        description: "To personalize advertisements based on user behavior and preferences."
      },
      {
        name: "email_marketing", 
        description: "To send targeted email campaigns based on user interests."
      },
      {
        name: "analytics",
        description: "To analyze user interactions to improve services and features."
      }
    ],
    created_date: "2024-01-15",
    consents_count: 1250,
    status: "active"
  },
  {
    id: 2,
    title: "Cookie Policy Agreement",
    name: "cookies",
    version: 1,
    agreement_text: "This agreement covers the use of cookies and similar tracking technologies on our website.",
    purposes: [
      {
        name: "essential_cookies",
        description: "Necessary cookies for website functionality."
      },
      {
        name: "analytics_cookies",
        description: "Cookies for website analytics and performance monitoring."
      }
    ],
    created_date: "2024-02-01",
    consents_count: 890,
    status: "active"
  }
];

export default function AgreementManagement({ onBack, onEditAgreement, onCreateAgreement }) {
  const [agreements] = useState(mockAgreements);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAgreement, setSelectedAgreement] = useState(null);

  const filteredAgreements = agreements.filter(agreement =>
    agreement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agreement.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewAgreement = (agreement) => {
    setSelectedAgreement(agreement);
  };

  const handleEditAgreement = (agreement) => {
    onEditAgreement(agreement);
  };

  const handleCreateNew = () => {
    onCreateAgreement();
  };

  if (selectedAgreement) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSelectedAgreement(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-xl font-semibold text-gray-900">Agreement Details</h1>
              </div>
              <button
                onClick={() => handleEditAgreement(selectedAgreement)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Agreement</span>
              </button>
            </div>
          </div>
        </div>

        {/* Agreement Details */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Agreement Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedAgreement.title}</h2>
                  <p className="text-indigo-100 text-lg leading-relaxed">
                    {selectedAgreement.agreement_text}
                  </p>
                </div>
                <div className="bg-white/20 rounded-lg px-3 py-1 text-sm font-medium">
                  v{selectedAgreement.version}
                </div>
              </div>
            </div>

            {/* Agreement Info */}
            <div className="p-6 border-b border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-600">Agreement Name</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedAgreement.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Created Date</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(selectedAgreement.created_date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Consents</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedAgreement.consents_count}</p>
                </div>
              </div>
            </div>

            {/* Purposes */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Data Usage Purposes</h3>
              <div className="space-y-4">
                {selectedAgreement.purposes.map((purpose, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-lg font-medium text-gray-900 mb-2 capitalize">
                      {purpose.name.replace('_', ' ')}
                    </h4>
                    <p className="text-gray-600">{purpose.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Data Agreements</h1>
            </div>
            <button
              onClick={handleCreateNew}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Agreement</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search agreements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>

        {/* Agreements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAgreements.map((agreement) => (
            <div key={agreement.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{agreement.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{agreement.agreement_text}</p>
                  </div>
                  <div className="ml-4">
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <FileText className="w-4 h-4" />
                    <span>v{agreement.version}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(agreement.created_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{agreement.consents_count} consents</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Purposes ({agreement.purposes.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {agreement.purposes.slice(0, 3).map((purpose, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full"
                      >
                        {purpose.name.replace('_', ' ')}
                      </span>
                    ))}
                    {agreement.purposes.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{agreement.purposes.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    agreement.status === 'active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {agreement.status}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleViewAgreement(agreement)}
                      className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditAgreement(agreement)}
                      className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAgreements.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No agreements found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating your first data agreement.'}
            </p>
            {!searchTerm && (
              <button
                onClick={handleCreateNew}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Create New Agreement
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}