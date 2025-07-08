import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Save, 
  AlertCircle,
  FileText,
  Target,
  Mail,
  BarChart3,
  Shield
} from 'lucide-react';

const purposeIcons = {
  ad_personalization: Target,
  email_marketing: Mail,
  analytics: BarChart3,
  default: Shield
};

export default function AgreementForm({ onBack, onSave, editingAgreement = null }) {
  const [formData, setFormData] = useState({
    title: editingAgreement?.title || '',
    name: editingAgreement?.name || '',
    agreement_text: editingAgreement?.agreement_text || '',
    version: editingAgreement?.version || 1,
    purposes: editingAgreement?.purposes || [
      {
        name: '',
        description: ''
      }
    ]
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Agreement name is required';
    }

    if (!formData.agreement_text.trim()) {
      newErrors.agreement_text = 'Agreement text is required';
    }

    formData.purposes.forEach((purpose, index) => {
      if (!purpose.name.trim()) {
        newErrors[`purpose_name_${index}`] = 'Purpose name is required';
      }
      if (!purpose.description.trim()) {
        newErrors[`purpose_description_${index}`] = 'Purpose description is required';
      }
    });

    if (formData.purposes.length === 0) {
      newErrors.purposes = 'At least one purpose is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const agreementData = {
        ...formData,
        id: editingAgreement?.id || Date.now(),
        created_date: editingAgreement?.created_date || new Date().toISOString().split('T')[0],
        consents_count: editingAgreement?.consents_count || 0,
        status: 'active'
      };
      
      onSave(agreementData);
    } catch (error) {
      console.error('Error saving agreement:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handlePurposeChange = (index, field, value) => {
    const newPurposes = [...formData.purposes];
    newPurposes[index] = {
      ...newPurposes[index],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      purposes: newPurposes
    }));

    // Clear errors
    const errorKey = `purpose_${field}_${index}`;
    if (errors[errorKey]) {
      setErrors(prev => ({
        ...prev,
        [errorKey]: undefined
      }));
    }
  };

  const addPurpose = () => {
    setFormData(prev => ({
      ...prev,
      purposes: [...prev.purposes, { name: '', description: '' }]
    }));
  };

  const removePurpose = (index) => {
    if (formData.purposes.length > 1) {
      const newPurposes = formData.purposes.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        purposes: newPurposes
      }));
    }
  };

  const getPurposeIcon = (purposeName) => {
    const IconComponent = purposeIcons[purposeName] || purposeIcons.default;
    return IconComponent;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                {editingAgreement ? 'Edit Agreement' : 'Create New Agreement'}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Agreement Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    errors.title ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Marketing Data Usage Agreement"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.title}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Agreement Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g., marketing"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Agreement Text *
              </label>
              <textarea
                value={formData.agreement_text}
                onChange={(e) => handleInputChange('agreement_text', e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  errors.agreement_text ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Describe what users are consenting to..."
              />
              {errors.agreement_text && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.agreement_text}
                </p>
              )}
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Version
              </label>
              <input
                type="number"
                min="1"
                value={formData.version}
                onChange={(e) => handleInputChange('version', parseInt(e.target.value) || 1)}
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Purposes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-600" />
                Data Usage Purposes
              </h2>
              <button
                type="button"
                onClick={addPurpose}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Purpose</span>
              </button>
            </div>

            {errors.purposes && (
              <p className="mb-4 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.purposes}
              </p>
            )}

            <div className="space-y-6">
              {formData.purposes.map((purpose, index) => {
                const IconComponent = getPurposeIcon(purpose.name);
                
                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-indigo-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Purpose {index + 1}
                        </h3>
                      </div>
                      {formData.purposes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePurpose(index)}
                          className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Purpose Name *
                        </label>
                        <input
                          type="text"
                          value={purpose.name}
                          onChange={(e) => handlePurposeChange(index, 'name', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                            errors[`purpose_name_${index}`] ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="e.g., ad_personalization"
                        />
                        {errors[`purpose_name_${index}`] && (
                          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors[`purpose_name_${index}`]}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description *
                        </label>
                        <textarea
                          value={purpose.description}
                          onChange={(e) => handlePurposeChange(index, 'description', e.target.value)}
                          rows={3}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                            errors[`purpose_description_${index}`] ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Describe how data will be used for this purpose..."
                        />
                        {errors[`purpose_description_${index}`] && (
                          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors[`purpose_description_${index}`]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {editingAgreement ? 'Update Agreement' : 'Create Agreement'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}