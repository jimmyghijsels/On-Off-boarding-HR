'use client';

import { db } from "@/db";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ExportButton } from "@/components/export-button";
import { DarkModeToggle } from "@/components/dark-mode-toggle";
import { Sidebar } from "@/components/sidebar";
import { useLanguage } from "@/lib/language";
import { useState, useMemo } from "react";
import { Employee } from "@/types/employee";

export default function HomePage() {
  const { t } = useLanguage();
  const [allEmployees, setAllEmployees] = useState<Employee[]>(db.getEmployees());
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredEmployees = useMemo(() => {
    return allEmployees.filter((employee) => {
      const matchesSearch = searchTerm === "" ||
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === "all" || employee.status === statusFilter;
      const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter;

      return matchesSearch && matchesStatus && matchesDepartment;
    });
  }, [allEmployees, searchTerm, statusFilter, departmentFilter]);

  const active = filteredEmployees.filter((e) => e.status === "active");
  const onboarding = filteredEmployees.filter((e) => e.status === "onboarding");
  const offboarding = filteredEmployees.filter((e) => e.status === "offboarding");

  // Get unique departments for filter
  const departments = useMemo(() => {
    const depts = Array.from(new Set(allEmployees.map(e => e.department)));
    return depts.sort();
  }, [allEmployees]);

  return (
    <>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 min-h-screen bg-[var(--neutral-50)] dark:bg-[var(--neutral-900)]">
        <header className="bg-white dark:bg-[var(--neutral-800)] border-b border-[var(--neutral-200)] dark:border-[var(--neutral-700)] shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[var(--primary-600)] rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.496-.769a1 1 0 011.228.113l.502.289a1 1 0 01.228 1.397l-.769 1.496L17.323 10H19a1 1 0 110 2h-1.323l-1.582 3.954.769 1.496a1 1 0 01-.113 1.228l-.289.502a1 1 0 01-1.397.228l-1.496-.769L11 17.323V19a1 1 0 11-2 0v-1.323l-3.954-1.582-1.496.769a1 1 0 01-1.228-.113l-.502-.289a1 1 0 011.397-.228l.769-1.496L2.677 10H1a1 1 0 110-2h1.323l1.582-3.954-.769-1.496a1 1 0 01.113-1.228l.289-.502a1 1 0 011.397-.228l1.496.769L9 2.677V1a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[var(--neutral-900)] dark:text-[var(--neutral-100)]">{t.appTitle}</h1>
                  <p className="text-sm text-[var(--neutral-500)] dark:text-[var(--neutral-400)]">{t.appSubtitle}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <DarkModeToggle />
                <LanguageSwitcher />

                {/* Menu Button */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 rounded-lg bg-[var(--neutral-100)] dark:bg-[var(--neutral-800)] text-[var(--neutral-700)] dark:text-[var(--neutral-300)] hover:bg-[var(--neutral-200)] dark:hover:bg-[var(--neutral-700)] transition-colors"
                  aria-label="Menu openen"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                <Link
                  href="/employees/new"
                  className="inline-flex items-center px-4 py-2 bg-[var(--primary-600)] text-white rounded-lg hover:bg-[var(--primary-700)] transition-colors font-medium shadow-sm"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  {t.newEmployee}
                </Link>
              </div>
            </div>
          </div>
        </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[var(--neutral-900)] mb-6">{t.overview}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-[var(--neutral-200)] p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[var(--success-100)] rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-[var(--success-600)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[var(--neutral-900)]">{active.length}</div>
                  <div className="text-sm text-[var(--neutral-600)] font-medium">{t.activeEmployees}</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-[var(--neutral-200)] p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[var(--primary-100)] rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-[var(--primary-600)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[var(--neutral-900)]">{onboarding.length}</div>
                  <div className="text-sm text-[var(--neutral-600)] font-medium">{t.inOnboarding}</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-[var(--neutral-200)] p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[var(--warning-100)] rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-[var(--warning-600)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[var(--neutral-900)]">{offboarding.length}</div>
                  <div className="text-sm text-[var(--neutral-600)] font-medium">{t.inOffboarding}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-[var(--neutral-200)] overflow-hidden">
          <div className="px-6 py-4 border-b border-[var(--neutral-200)] bg-[var(--neutral-50)]">
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <h2 className="text-lg font-semibold text-[var(--neutral-900)]">{t.allEmployees}</h2>
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                {/* Search Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-[var(--neutral-400)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Zoek medewerkers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-[var(--neutral-300)] rounded-lg focus:ring-2 focus:ring-[var(--primary-500)] focus:border-[var(--primary-500)] w-full sm:w-64"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-[var(--neutral-300)] rounded-lg focus:ring-2 focus:ring-[var(--primary-500)] focus:border-[var(--primary-500)] bg-white"
                >
                  <option value="all">Alle statussen</option>
                  <option value="active">Actief</option>
                  <option value="onboarding">Onboarding</option>
                  <option value="offboarding">Offboarding</option>
                </select>

                {/* Department Filter */}
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="px-3 py-2 border border-[var(--neutral-300)] rounded-lg focus:ring-2 focus:ring-[var(--primary-500)] focus:border-[var(--primary-500)] bg-white"
                >
                  <option value="all">Alle afdelingen</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>

                {/* Export Button */}
                <ExportButton employees={filteredEmployees} />
              </div>
            </div>
            {filteredEmployees.length !== allEmployees.length && (
              <div className="mt-2 text-sm text-[var(--neutral-600)]">
                {filteredEmployees.length} van {allEmployees.length} medewerkers weergegeven
              </div>
            )}
          </div>
          {allEmployees.length === 0 ? (
            <div className="p-12 text-center">
              <svg className="w-16 h-16 text-[var(--neutral-400)] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="text-lg font-medium text-[var(--neutral-900)] mb-2">{t.noEmployees}</h3>
              <p className="text-[var(--neutral-500)] mb-6">{t.noEmployeesDesc}</p>
              <Link
                href="/employees/new"
                className="inline-flex items-center px-4 py-2 bg-[var(--primary-600)] text-white rounded-lg hover:bg-[var(--primary-700)] transition-colors font-medium"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {t.addFirstEmployee}
              </Link>
            </div>
          ) : filteredEmployees.length === 0 ? (
            <div className="p-12 text-center">
              <svg className="w-16 h-16 text-[var(--neutral-400)] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-lg font-medium text-[var(--neutral-900)] mb-2">Geen resultaten gevonden</h3>
              <p className="text-[var(--neutral-500)] mb-6">Probeer andere zoektermen of filters.</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setDepartmentFilter("all");
                }}
                className="inline-flex items-center px-4 py-2 bg-[var(--neutral-100)] text-[var(--neutral-700)] rounded-lg hover:bg-[var(--neutral-200)] transition-colors font-medium"
              >
                Filters wissen
              </button>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[var(--neutral-50)] dark:bg-[var(--neutral-800)]">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider">{t.employee}</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider">{t.department}</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider">{t.position}</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider">{t.startDate}</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider">{t.status}</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider">{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-[var(--neutral-900)] divide-y divide-[var(--neutral-200)] dark:divide-[var(--neutral-700)]">
                    {filteredEmployees.map((emp) => (
                      <tr key={emp.id} className="hover:bg-[var(--neutral-50)] dark:hover:bg-[var(--neutral-800)] transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-[var(--primary-100)] dark:bg-[var(--primary-900)] rounded-full flex items-center justify-center mr-3">
                              <span className="text-sm font-medium text-[var(--primary-700)] dark:text-[var(--primary-300)]">
                                {emp.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium text-[var(--neutral-900)] dark:text-[var(--neutral-100)]">{emp.name}</div>
                              <div className="text-sm text-[var(--neutral-500)]">{emp.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--neutral-700)] dark:text-[var(--neutral-300)]">{emp.department}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--neutral-700)] dark:text-[var(--neutral-300)]">{emp.position}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--neutral-700)] dark:text-[var(--neutral-300)]">
                          {emp.startDate ? new Date(emp.startDate).toLocaleDateString("nl-NL") : "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              emp.status === "active"
                                ? "bg-[var(--success-100)] dark:bg-[var(--success-900)] text-[var(--success-700)] dark:text-[var(--success-300)]"
                                : emp.status === "onboarding"
                                ? "bg-[var(--primary-100)] dark:bg-[var(--primary-900)] text-[var(--primary-700)] dark:text-[var(--primary-300)]"
                                : "bg-[var(--warning-100)] dark:bg-[var(--warning-900)] text-[var(--warning-700)] dark:text-[var(--warning-300)]"
                            }`}
                          >
                            {emp.status === "active"
                              ? t.active
                              : emp.status === "onboarding"
                              ? t.onboarding
                              : t.offboarding}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            href={`/employees/${emp.id}`}
                            className="text-[var(--primary-600)] hover:text-[var(--primary-700)] dark:text-[var(--primary-400)] dark:hover:text-[var(--primary-300)] transition-colors"
                          >
                            {t.viewDetails}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {filteredEmployees.map((emp) => (
                  <div key={emp.id} className="bg-white dark:bg-[var(--neutral-800)] rounded-xl shadow-sm border border-[var(--neutral-200)] dark:border-[var(--neutral-700)] p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-[var(--primary-100)] dark:bg-[var(--primary-900)] rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-[var(--primary-700)] dark:text-[var(--primary-300)]">
                            {emp.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium text-[var(--neutral-900)] dark:text-[var(--neutral-100)]">{emp.name}</h3>
                          <p className="text-sm text-[var(--neutral-500)]">{emp.email}</p>
                          <div className="flex items-center space-x-4 mt-1 text-xs text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">
                            <span>📁 {emp.department}</span>
                            <span>💼 {emp.position}</span>
                          </div>
                        </div>
                      </div>
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          emp.status === "active"
                            ? "bg-[var(--success-100)] dark:bg-[var(--success-900)] text-[var(--success-700)] dark:text-[var(--success-300)]"
                            : emp.status === "onboarding"
                            ? "bg-[var(--primary-100)] dark:bg-[var(--primary-900)] text-[var(--primary-700)] dark:text-[var(--primary-300)]"
                            : "bg-[var(--warning-100)] dark:bg-[var(--warning-900)] text-[var(--warning-700)] dark:text-[var(--warning-300)]"
                        }`}
                      >
                        {emp.status === "active"
                          ? t.active
                          : emp.status === "onboarding"
                          ? t.onboarding
                          : t.offboarding}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">
                        📅 {emp.startDate ? new Date(emp.startDate).toLocaleDateString("nl-NL") : "-"}
                      </span>
                      <Link
                        href={`/employees/${emp.id}`}
                        className="text-[var(--primary-600)] hover:text-[var(--primary-700)] dark:text-[var(--primary-400)] dark:hover:text-[var(--primary-300)] transition-colors font-medium"
                      >
                        {t.viewDetails} →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
    </>
  );
}
