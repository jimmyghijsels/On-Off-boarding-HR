'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language';
import { Sidebar } from '@/components/sidebar';

interface Template {
  id: number;
  name: string;
  description: string;
  tasks: string[];
  category: string;
}

export default function TemplatesPage() {
  const { t } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: 1,
      name: 'Standaard Onboarding',
      description: 'Basis onboarding taken voor nieuwe medewerkers',
      category: 'Onboarding',
      tasks: [
        'Arbeidscontract ondertekenen',
        'ID-bewijs kopiëren',
        'Bankgegevens registreren',
        'E-mailaccount aanmaken',
        'Laptop/workstation leveren'
      ]
    },
    {
      id: 2,
      name: 'Standaard Offboarding',
      description: 'Basis offboarding taken voor vertrekkende medewerkers',
      category: 'Offboarding',
      tasks: [
        'Exit gesprek plannen',
        'Bedrijfseigendom innemen',
        'E-mailaccount deactiveren',
        'Toegangsrechten intrekken'
      ]
    }
  ]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    category: 'Onboarding',
    tasks: ['']
  });

  const addTask = () => {
    setNewTemplate(prev => ({
      ...prev,
      tasks: [...prev.tasks, '']
    }));
  };

  const updateTask = (index: number, value: string) => {
    setNewTemplate(prev => ({
      ...prev,
      tasks: prev.tasks.map((task, i) => i === index ? value : task)
    }));
  };

  const removeTask = (index: number) => {
    setNewTemplate(prev => ({
      ...prev,
      tasks: prev.tasks.filter((_, i) => i !== index)
    }));
  };

  const createTemplate = () => {
    if (newTemplate.name.trim() && newTemplate.tasks.some(task => task.trim())) {
      const template: Template = {
        id: Date.now(),
        name: newTemplate.name,
        description: newTemplate.description,
        category: newTemplate.category,
        tasks: newTemplate.tasks.filter(task => task.trim())
      };
      setTemplates(prev => [...prev, template]);
      setNewTemplate({
        name: '',
        description: '',
        category: 'Onboarding',
        tasks: ['']
      });
      setShowCreateForm(false);
    }
  };

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 min-h-screen bg-[var(--neutral-50)] dark:bg-[var(--neutral-900)]">
        <header className="bg-white dark:bg-[var(--neutral-800)] border-b border-[var(--neutral-200)] dark:border-[var(--neutral-700)] shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[var(--primary-600)] rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[var(--neutral-900)] dark:text-[var(--neutral-100)]">Sjablonen</h1>
                  <p className="text-sm text-[var(--neutral-500)] dark:text-[var(--neutral-400)]">Beheer onboarding en offboarding sjablonen</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg bg-[var(--neutral-100)] dark:bg-[var(--neutral-800)] text-[var(--neutral-700)] dark:text-[var(--neutral-300)] hover:bg-[var(--neutral-200)] dark:hover:bg-[var(--neutral-700)] transition-colors"
                aria-label="Menu openen"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-[var(--neutral-900)] dark:text-[var(--neutral-100)]">
              Alle sjablonen
            </h2>
            <button
              onClick={() => setShowCreateForm(true)}
              className="inline-flex items-center px-4 py-2 bg-[var(--primary-600)] text-white rounded-lg hover:bg-[var(--primary-700)] transition-colors font-medium shadow-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nieuw sjabloon
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div key={template.id} className="bg-white dark:bg-[var(--neutral-800)] rounded-xl shadow-sm border border-[var(--neutral-200)] dark:border-[var(--neutral-700)] p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-[var(--primary-100)] dark:bg-[var(--primary-900)] rounded-lg flex items-center justify-center">
                    <span className="text-lg">📋</span>
                  </div>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    template.category === 'Onboarding'
                      ? 'bg-[var(--primary-100)] dark:bg-[var(--primary-900)] text-[var(--primary-700)] dark:text-[var(--primary-300)]'
                      : 'bg-[var(--warning-100)] dark:bg-[var(--warning-900)] text-[var(--warning-700)] dark:text-[var(--warning-300)]'
                  }`}>
                    {template.category}
                  </span>
                </div>
                <h3 className="font-semibold text-[var(--neutral-900)] dark:text-[var(--neutral-100)] mb-2">
                  {template.name}
                </h3>
                <p className="text-sm text-[var(--neutral-600)] dark:text-[var(--neutral-400)] mb-4">
                  {template.description}
                </p>
                <div className="text-xs text-[var(--neutral-500)] dark:text-[var(--neutral-400)]">
                  {template.tasks.length} taken
                </div>
              </div>
            ))}
          </div>

          {showCreateForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-[var(--neutral-800)] rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-[var(--neutral-200)] dark:border-[var(--neutral-700)]">
                  <h3 className="text-lg font-semibold text-[var(--neutral-900)] dark:text-[var(--neutral-100)]">
                    Nieuw sjabloon maken
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[var(--neutral-700)] dark:text-[var(--neutral-300)] mb-2">
                      Naam sjabloon
                    </label>
                    <input
                      type="text"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-[var(--neutral-300)] dark:border-[var(--neutral-600)] rounded-lg focus:ring-2 focus:ring-[var(--primary-500)] focus:border-[var(--primary-500)] bg-white dark:bg-[var(--neutral-700)] text-[var(--neutral-900)] dark:text-[var(--neutral-100)]"
                      placeholder="bijv. Standaard Onboarding"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--neutral-700)] dark:text-[var(--neutral-300)] mb-2">
                      Beschrijving
                    </label>
                    <textarea
                      value={newTemplate.description}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-[var(--neutral-300)] dark:border-[var(--neutral-600)] rounded-lg focus:ring-2 focus:ring-[var(--primary-500)] focus:border-[var(--primary-500)] bg-white dark:bg-[var(--neutral-700)] text-[var(--neutral-900)] dark:text-[var(--neutral-100)]"
                      rows={3}
                      placeholder="Beschrijving van het sjabloon..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--neutral-700)] dark:text-[var(--neutral-300)] mb-2">
                      Categorie
                    </label>
                    <select
                      value={newTemplate.category}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-[var(--neutral-300)] dark:border-[var(--neutral-600)] rounded-lg focus:ring-2 focus:ring-[var(--primary-500)] focus:border-[var(--primary-500)] bg-white dark:bg-[var(--neutral-700)] text-[var(--neutral-900)] dark:text-[var(--neutral-100)]"
                    >
                      <option value="Onboarding">Onboarding</option>
                      <option value="Offboarding">Offboarding</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-[var(--neutral-700)] dark:text-[var(--neutral-300)]">
                        Taken
                      </label>
                      <button
                        onClick={addTask}
                        className="text-sm text-[var(--primary-600)] hover:text-[var(--primary-700)] font-medium"
                      >
                        + Taak toevoegen
                      </button>
                    </div>
                    <div className="space-y-2">
                      {newTemplate.tasks.map((task, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={task}
                            onChange={(e) => updateTask(index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-[var(--neutral-300)] dark:border-[var(--neutral-600)] rounded-lg focus:ring-2 focus:ring-[var(--primary-500)] focus:border-[var(--primary-500)] bg-white dark:bg-[var(--neutral-700)] text-[var(--neutral-900)] dark:text-[var(--neutral-100)]"
                            placeholder={`Taak ${index + 1}`}
                          />
                          {newTemplate.tasks.length > 1 && (
                            <button
                              onClick={() => removeTask(index)}
                              className="p-2 text-[var(--neutral-400)] hover:text-[var(--error-500)] transition-colors"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => setShowCreateForm(false)}
                      className="px-4 py-2 border border-[var(--neutral-300)] dark:border-[var(--neutral-600)] text-[var(--neutral-700)] dark:text-[var(--neutral-300)] rounded-lg hover:bg-[var(--neutral-50)] dark:hover:bg-[var(--neutral-700)] transition-colors"
                    >
                      Annuleren
                    </button>
                    <button
                      onClick={createTemplate}
                      className="px-4 py-2 bg-[var(--primary-600)] text-white rounded-lg hover:bg-[var(--primary-700)] transition-colors font-medium"
                    >
                      Sjabloon maken
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}