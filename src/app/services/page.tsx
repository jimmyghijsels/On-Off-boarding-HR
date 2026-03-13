'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';

interface Service {
  id: number;
  name: string;
  description: string;
  category: string;
  responsible: string;
  status: 'active' | 'inactive';
}

export default function ServicesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      name: 'HR Systeem',
      description: 'Hoofd HR management systeem',
      category: 'HR',
      responsible: 'HR Manager',
      status: 'active'
    },
    {
      id: 2,
      name: 'Laptop Uitgifte',
      description: 'Uitgifte van laptops aan nieuwe medewerkers',
      category: 'IT',
      responsible: 'IT Support',
      status: 'active'
    },
    {
      id: 3,
      name: 'E-mail Setup',
      description: 'Instellen van e-mail accounts',
      category: 'IT',
      responsible: 'IT Support',
      status: 'active'
    }
  ]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    category: 'HR',
    responsible: ''
  });

  const createService = () => {
    if (newService.name.trim() && newService.responsible.trim()) {
      const service: Service = {
        id: Date.now(),
        name: newService.name,
        description: newService.description,
        category: newService.category,
        responsible: newService.responsible,
        status: 'active'
      };
      setServices(prev => [...prev, service]);
      setNewService({
        name: '',
        description: '',
        category: 'HR',
        responsible: ''
      });
      setShowCreateForm(false);
    }
  };

  const toggleServiceStatus = (id: number) => {
    setServices(prev => prev.map(service =>
      service.id === id
        ? { ...service, status: service.status === 'active' ? 'inactive' : 'active' }
        : service
    ));
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
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.947c-1.37-.559-2.914.353-2.373 1.711a1.532 1.532 0 01-.947 2.286c-1.56.38-1.56 2.6 0 2.98a1.532 1.532 0 01.947 2.286c-.547 1.37.343 2.914 1.711 2.373a1.532 1.532 0 012.286.947c.38 1.56 2.6 1.56 2.98 0a1.532 1.532 0 012.286-.947c1.37.547 2.914-.343 2.373-1.711a1.532 1.532 0 01.947-2.286c1.56-.38 1.56-2.6 0-2.98a1.532 1.532 0 01-.947-2.286c.547-1.37-.343-2.914-1.711-2.373a1.532 1.532 0 01-2.286-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[var(--neutral-900)] dark:text-[var(--neutral-100)]">Diensten</h1>
                  <p className="text-sm text-[var(--neutral-500)] dark:text-[var(--neutral-400)]">Beheer diensten en verantwoordelijkheden</p>
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
              Alle diensten
            </h2>
            <button
              onClick={() => setShowCreateForm(true)}
              className="inline-flex items-center px-4 py-2 bg-[var(--primary-600)] text-white rounded-lg hover:bg-[var(--primary-700)] transition-colors font-medium shadow-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nieuwe dienst
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} className="bg-white dark:bg-[var(--neutral-800)] rounded-xl shadow-sm border border-[var(--neutral-200)] dark:border-[var(--neutral-700)] p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-[var(--primary-100)] dark:bg-[var(--primary-900)] rounded-lg flex items-center justify-center">
                    <span className="text-lg">🔧</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleServiceStatus(service.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)] focus:ring-offset-2 ${
                        service.status === 'active' ? 'bg-[var(--primary-600)]' : 'bg-[var(--neutral-200)] dark:bg-[var(--neutral-600)]'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          service.status === 'active' ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                    <span className={`text-xs font-medium ${
                      service.status === 'active'
                        ? 'text-[var(--success-600)]'
                        : 'text-[var(--neutral-400)]'
                    }`}>
                      {service.status === 'active' ? 'Actief' : 'Inactief'}
                    </span>
                  </div>
                </div>
                <h3 className="font-semibold text-[var(--neutral-900)] dark:text-[var(--neutral-100)] mb-2">
                  {service.name}
                </h3>
                <p className="text-sm text-[var(--neutral-600)] dark:text-[var(--neutral-400)] mb-3">
                  {service.description}
                </p>
                <div className="flex items-center justify-between text-xs text-[var(--neutral-500)] dark:text-[var(--neutral-400)]">
                  <span>📁 {service.category}</span>
                  <span>👤 {service.responsible}</span>
                </div>
              </div>
            ))}
          </div>

          {showCreateForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-[var(--neutral-800)] rounded-xl shadow-xl max-w-md w-full mx-4">
                <div className="p-6 border-b border-[var(--neutral-200)] dark:border-[var(--neutral-700)]">
                  <h3 className="text-lg font-semibold text-[var(--neutral-900)] dark:text-[var(--neutral-100)]">
                    Nieuwe dienst toevoegen
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--neutral-700)] dark:text-[var(--neutral-300)] mb-2">
                      Naam dienst
                    </label>
                    <input
                      type="text"
                      value={newService.name}
                      onChange={(e) => setNewService(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-[var(--neutral-300)] dark:border-[var(--neutral-600)] rounded-lg focus:ring-2 focus:ring-[var(--primary-500)] focus:border-[var(--primary-500)] bg-white dark:bg-[var(--neutral-700)] text-[var(--neutral-900)] dark:text-[var(--neutral-100)]"
                      placeholder="bijv. IT Support"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--neutral-700)] dark:text-[var(--neutral-300)] mb-2">
                      Beschrijving
                    </label>
                    <textarea
                      value={newService.description}
                      onChange={(e) => setNewService(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-[var(--neutral-300)] dark:border-[var(--neutral-600)] rounded-lg focus:ring-2 focus:ring-[var(--primary-500)] focus:border-[var(--primary-500)] bg-white dark:bg-[var(--neutral-700)] text-[var(--neutral-900)] dark:text-[var(--neutral-100)]"
                      rows={3}
                      placeholder="Beschrijving van de dienst..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--neutral-700)] dark:text-[var(--neutral-300)] mb-2">
                        Categorie
                      </label>
                      <select
                        value={newService.category}
                        onChange={(e) => setNewService(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 border border-[var(--neutral-300)] dark:border-[var(--neutral-600)] rounded-lg focus:ring-2 focus:ring-[var(--primary-500)] focus:border-[var(--primary-500)] bg-white dark:bg-[var(--neutral-700)] text-[var(--neutral-900)] dark:text-[var(--neutral-100)]"
                      >
                        <option value="HR">HR</option>
                        <option value="IT">IT</option>
                        <option value="Finance">Finance</option>
                        <option value="Facilities">Facilities</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--neutral-700)] dark:text-[var(--neutral-300)] mb-2">
                        Verantwoordelijke
                      </label>
                      <input
                        type="text"
                        value={newService.responsible}
                        onChange={(e) => setNewService(prev => ({ ...prev, responsible: e.target.value }))}
                        className="w-full px-3 py-2 border border-[var(--neutral-300)] dark:border-[var(--neutral-600)] rounded-lg focus:ring-2 focus:ring-[var(--primary-500)] focus:border-[var(--primary-500)] bg-white dark:bg-[var(--neutral-700)] text-[var(--neutral-900)] dark:text-[var(--neutral-100)]"
                        placeholder="bijv. IT Manager"
                      />
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
                      onClick={createService}
                      className="px-4 py-2 bg-[var(--primary-600)] text-white rounded-lg hover:bg-[var(--primary-700)] transition-colors font-medium"
                    >
                      Dienst toevoegen
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