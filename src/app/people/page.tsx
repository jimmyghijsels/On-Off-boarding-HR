'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';

interface Person {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  phone?: string;
  status: 'active' | 'inactive';
}

export default function PeoplePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [people, setPeople] = useState<Person[]>([
    {
      id: 1,
      name: 'Jan Jansen',
      email: 'jan.jansen@company.com',
      role: 'HR Manager',
      department: 'HR',
      phone: '+31 6 12345678',
      status: 'active'
    },
    {
      id: 2,
      name: 'Marieke de Vries',
      email: 'marieke.devries@company.com',
      role: 'IT Support Lead',
      department: 'IT',
      phone: '+31 6 87654321',
      status: 'active'
    },
    {
      id: 3,
      name: 'Peter Bakker',
      email: 'peter.bakker@company.com',
      role: 'Finance Manager',
      department: 'Finance',
      status: 'active'
    }
  ]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPerson, setNewPerson] = useState({
    name: '',
    email: '',
    role: '',
    department: 'HR',
    phone: ''
  });

  const createPerson = () => {
    if (newPerson.name.trim() && newPerson.email.trim() && newPerson.role.trim()) {
      const person: Person = {
        id: Date.now(),
        name: newPerson.name,
        email: newPerson.email,
        role: newPerson.role,
        department: newPerson.department,
        phone: newPerson.phone || undefined,
        status: 'active'
      };
      setPeople(prev => [...prev, person]);
      setNewPerson({
        name: '',
        email: '',
        role: '',
        department: 'HR',
        phone: ''
      });
      setShowCreateForm(false);
    }
  };

  const togglePersonStatus = (id: number) => {
    setPeople(prev => prev.map(person =>
      person.id === id
        ? { ...person, status: person.status === 'active' ? 'inactive' : 'active' }
        : person
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
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[var(--neutral-900)] dark:text-[var(--neutral-100)]">Personen</h1>
                  <p className="text-sm text-[var(--neutral-500)] dark:text-[var(--neutral-400)]">Beheer HR personeel en contactpersonen</p>
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
              Alle personen
            </h2>
            <button
              onClick={() => setShowCreateForm(true)}
              className="inline-flex items-center px-4 py-2 bg-[var(--primary-600)] text-white rounded-lg hover:bg-[var(--primary-700)] transition-colors font-medium shadow-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nieuwe persoon
            </button>
          </div>

          <div className="bg-white dark:bg-[var(--neutral-800)] rounded-xl shadow-sm border border-[var(--neutral-200)] dark:border-[var(--neutral-700)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[var(--neutral-50)] dark:bg-[var(--neutral-700)]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider">Persoon</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider">Rol</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider">Afdeling</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider">Acties</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-[var(--neutral-800)] divide-y divide-[var(--neutral-200)] dark:divide-[var(--neutral-700)]">
                  {people.map((person) => (
                    <tr key={person.id} className="hover:bg-[var(--neutral-50)] dark:hover:bg-[var(--neutral-700)] transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-[var(--primary-100)] dark:bg-[var(--primary-900)] rounded-full flex items-center justify-center mr-3">
                            <span className="text-sm font-medium text-[var(--primary-700)] dark:text-[var(--primary-300)]">
                              {person.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-[var(--neutral-900)] dark:text-[var(--neutral-100)]">{person.name}</div>
                            <div className="text-sm text-[var(--neutral-500)]">{person.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--neutral-700)] dark:text-[var(--neutral-300)]">
                        {person.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--neutral-700)] dark:text-[var(--neutral-300)]">
                        {person.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--neutral-700)] dark:text-[var(--neutral-300)]">
                        {person.phone || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => togglePersonStatus(person.id)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)] focus:ring-offset-2 ${
                              person.status === 'active' ? 'bg-[var(--success-500)]' : 'bg-[var(--neutral-200)] dark:bg-[var(--neutral-600)]'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                person.status === 'active' ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                          <span className={`text-xs font-medium ${
                            person.status === 'active'
                              ? 'text-[var(--success-600)]'
                              : 'text-[var(--neutral-400)]'
                          }`}>
                            {person.status === 'active' ? 'Actief' : 'Inactief'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button className="text-[var(--primary-600)] hover:text-[var(--primary-700)] dark:text-[var(--primary-400)] dark:hover:text-[var(--primary-300)] transition-colors">
                            Bewerken
                          </button>
                          <button className="text-[var(--neutral-400)] hover:text-[var(--error-500)] transition-colors">
                            Verwijderen
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {showCreateForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-[var(--neutral-800)] rounded-xl shadow-xl max-w-md w-full mx-4">
                <div className="p-6 border-b border-[var(--neutral-200)] dark:border-[var(--neutral-700)]">
                  <h3 className="text-lg font-semibold text-[var(--neutral-900)] dark:text-[var(--neutral-100)]">
                    Nieuwe persoon toevoegen
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--neutral-700)] dark:text-[var(--neutral-300)] mb-2">
                      Volledige naam
                    </label>
                    <input
                      type="text"
                      value={newPerson.name}
                      onChange={(e) => setNewPerson(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-[var(--neutral-300)] dark:border-[var(--neutral-600)] rounded-lg focus:ring-2 focus:ring-[var(--primary-500)] focus:border-[var(--primary-500)] bg-white dark:bg-[var(--neutral-700)] text-[var(--neutral-900)] dark:text-[var(--neutral-100)]"
                      placeholder="bijv. Jan Jansen"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--neutral-700)] dark:text-[var(--neutral-300)] mb-2">
                      E-mailadres
                    </label>
                    <input
                      type="email"
                      value={newPerson.email}
                      onChange={(e) => setNewPerson(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-[var(--neutral-300)] dark:border-[var(--neutral-600)] rounded-lg focus:ring-2 focus:ring-[var(--primary-500)] focus:border-[var(--primary-500)] bg-white dark:bg-[var(--neutral-700)] text-[var(--neutral-900)] dark:text-[var(--neutral-100)]"
                      placeholder="bijv. jan.jansen@company.com"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--neutral-700)] dark:text-[var(--neutral-300)] mb-2">
                        Rol
                      </label>
                      <input
                        type="text"
                        value={newPerson.role}
                        onChange={(e) => setNewPerson(prev => ({ ...prev, role: e.target.value }))}
                        className="w-full px-3 py-2 border border-[var(--neutral-300)] dark:border-[var(--neutral-600)] rounded-lg focus:ring-2 focus:ring-[var(--primary-500)] focus:border-[var(--primary-500)] bg-white dark:bg-[var(--neutral-700)] text-[var(--neutral-900)] dark:text-[var(--neutral-100)]"
                        placeholder="bijv. HR Manager"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--neutral-700)] dark:text-[var(--neutral-300)] mb-2">
                        Afdeling
                      </label>
                      <select
                        value={newPerson.department}
                        onChange={(e) => setNewPerson(prev => ({ ...prev, department: e.target.value }))}
                        className="w-full px-3 py-2 border border-[var(--neutral-300)] dark:border-[var(--neutral-600)] rounded-lg focus:ring-2 focus:ring-[var(--primary-500)] focus:border-[var(--primary-500)] bg-white dark:bg-[var(--neutral-700)] text-[var(--neutral-900)] dark:text-[var(--neutral-100)]"
                      >
                        <option value="HR">HR</option>
                        <option value="IT">IT</option>
                        <option value="Finance">Finance</option>
                        <option value="Facilities">Facilities</option>
                        <option value="Management">Management</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--neutral-700)] dark:text-[var(--neutral-300)] mb-2">
                      Telefoonnummer (optioneel)
                    </label>
                    <input
                      type="tel"
                      value={newPerson.phone}
                      onChange={(e) => setNewPerson(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-[var(--neutral-300)] dark:border-[var(--neutral-600)] rounded-lg focus:ring-2 focus:ring-[var(--primary-500)] focus:border-[var(--primary-500)] bg-white dark:bg-[var(--neutral-700)] text-[var(--neutral-900)] dark:text-[var(--neutral-100)]"
                      placeholder="bijv. +31 6 12345678"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => setShowCreateForm(false)}
                      className="px-4 py-2 border border-[var(--neutral-300)] dark:border-[var(--neutral-600)] text-[var(--neutral-700)] dark:text-[var(--neutral-300)] rounded-lg hover:bg-[var(--neutral-50)] dark:hover:bg-[var(--neutral-700)] transition-colors"
                    >
                      Annuleren
                    </button>
                    <button
                      onClick={createPerson}
                      className="px-4 py-2 bg-[var(--primary-600)] text-white rounded-lg hover:bg-[var(--primary-700)] transition-colors font-medium"
                    >
                      Persoon toevoegen
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