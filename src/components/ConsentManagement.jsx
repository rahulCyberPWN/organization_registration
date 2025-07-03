import React, { useState } from 'react';
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  Info, 
  Settings, 
  Clock,
  Mail,
  BarChart3,
  Target,
  Save,
  AlertTriangle
} from 'lucide-react';

const consentData = {
  "agreement_text": "By agreeing, you consent to your data being used for various marketing and analytics purposes.",
  "name": "marketing",
  "purposes": [
    {
      "description": "To personalize advertisements based on user behavior and preferences.",
      "name": "ad_personalization"
    },
    {
      "description": "To send targeted email campaigns based on user interests.",
      "name": "email_marketing"
    },
    {
      "description": "To analyze user interactions to improve services and features.",
      "name": "analytics"
    }
  ],
  "title": "Marketing Data Usage Agreement",
  "version": 2
};

const purposeIcons = {
  ad_personalization: Target,
  email_marketing: Mail,
  analytics: BarChart3
};

const purposeColors = {
  ad_personalization: 'bg-purple-100 text-purple-700 border-purple-200',
  email_marketing: 'bg-blue-100 text-blue-700 border-blue-200',
  analytics: 'bg-green-100 text-green-700 border-green-200'
};

export default function ConsentManagement() {
  const [consentPreferences, setConsentPreferences] = useState({
    ad_personalization: true,
    email_marketing: false,
    analytics: true
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastUpdated] = useState(new Date('2024-12-15T10:30:00'));

  const handleConsentChange = (purposeName, value) => {
    setConsentPreferences(prev => ({
      ...prev,
      [purposeName]: value
    }));
    setHasChanges(true);
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setHasChanges(false);
    console.log('Consent preferences saved:', consentPreferences);
  };

  const getConsentSummary = () => {
    const total = Object.keys(consentPreferences).length;
    const accepted = Object.values(consentPreferences).filter(Boolean).length;
    return { total, accepted };
  };

  const { total, accepted } = getConsentSummary();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Consent Management</h1>
              <p className="text-gray-600">Manage your data usage preferences and privacy settings</p>
            </div>
          </div>

          {/* Consent Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Purposes</p>
                  <p className="text-2xl font-bold text-gray-900">{total}</p>
                </div>
                <Settings className="w-8 h-8 text-gray-400" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Consents Given</p>
                  <p className="text-2xl font-bold text-green-600">{accepted}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Last Updated</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {lastUpdated.toLocaleDateString()}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Consent Agreement */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-6">
          {/* Agreement Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">{consentData.title}</h2>
                <p className="text-indigo-100 text-lg leading-relaxed">
                  {consentData.agreement_text}
                </p>
              </div>
              <div className="bg-white/20 rounded-lg px-3 py-1 text-sm font-medium">
                v{consentData.version}
              </div>
            </div>
          </div>

          {/* Purposes List */}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Info className="w-5 h-5 text-indigo-600" />
              Data Usage Purposes
            </h3>

            <div className="space-y-4">
              {consentData.purposes.map((purpose, index) => {
                const IconComponent = purposeIcons[purpose.name];
                const isConsented = consentPreferences[purpose.name];
                
                return (
                  <div 
                    key={purpose.name}
                    className={`border-2 rounded-xl p-6 transition-all duration-200 ${
                      isConsented 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Purpose Icon */}
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${purposeColors[purpose.name]}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>

                      {/* Purpose Details */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-semibold text-gray-900 capitalize">
                            {purpose.name.replace('_', ' ')}
                          </h4>
                          <div className="flex items-center gap-3">
                            {isConsented ? (
                              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                <CheckCircle className="w-4 h-4" />
                                Consented
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                                <XCircle className="w-4 h-4" />
                                Declined
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {purpose.description}
                        </p>

                        {/* Toggle Controls */}
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleConsentChange(purpose.name, true)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${
                              isConsented
                                ? 'bg-green-600 text-white shadow-md'
                                : 'bg-gray-200 text-gray-700 hover:bg-green-100 hover:text-green-700'
                            }`}
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleConsentChange(purpose.name, false)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${
                              !isConsented
                                ? 'bg-red-600 text-white shadow-md'
                                : 'bg-gray-200 text-gray-700 hover:bg-red-100 hover:text-red-700'
                            }`}
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Save Changes Section */}
          {hasChanges && (
            <div className="border-t border-gray-200 bg-amber-50 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="font-medium text-amber-800">You have unsaved changes</p>
                    <p className="text-sm text-amber-600">Save your preferences to update your consent settings</p>
                  </div>
                </div>
                <button
                  onClick={handleSaveChanges}
                  disabled={isSaving}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Information</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              You can change your consent preferences at any time. Changes will take effect immediately.
            </p>
            <p className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              Your data is processed in accordance with our privacy policy and applicable data protection laws.
            </p>
            <p className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
              Consent history and timestamps are maintained for compliance and audit purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}