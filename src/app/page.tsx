'use client';

import { db } from "@/db";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/lib/language";
import { useEffect, useState } from "react";

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  status: string;
  createdAt: Date;
}

export default function HomePage() {
  const { t } = useLanguage();
  const [allEmployees, setAllEmployees] = useState<Employee[]>(db.getEmployees());

  const active = allEmployees.filter((e) => e.status === "active");
  const onboarding = allEmployees.filter((e) => e.status === "onboarding");
  const offboarding = allEmployees.filter((e) => e.status === "offboarding");

  return (
    <div className="min-h-screen bg-[var(--neutral-50)]">
      <header className="bg-white border-b border-[var(--neutral-200)] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[var(--primary-600)] rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.496-.769a1 1 0 011.228.113l.502.289a1 1 0 01.228 1.397l-.769 1.496L17.323 10H19a1 1 0 110 2h-1.323l-1.582 3.954.769 1.496a1 1 0 01-.113 1.228l-.289.502a1 1 0 01-1.397.228l-1.496-.769L11 17.323V19a1 1 0 11-2 0v-1.323l-3.954-1.582-1.496.769a1 1 0 01-1.228-.113l-.502-.289a1 1 0 011.397-.228l.769-1.496L2.677 10H1a1 1 0 110-2h1.323l1.582-3.954-.769-1.496a1 1 0 01.113-1.228l.289-.502a1 1 0 011.397-.228l1.496.769L9 2.677V1a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[var(--neutral-900)]">{t.appTitle}</h1>
                <p className="text-sm text-[var(--neutral-500)]">{t.appSubtitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
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
            <h2 className="text-lg font-semibold text-[var(--neutral-900)]">{t.allEmployees}</h2>
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
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[var(--neutral-50)]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider">{t.employee}</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider">{t.department}</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider">{t.position}</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider">{t.startDate}</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider">{t.status}</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider">{t.actions}</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[var(--neutral-200)]">
                  {allEmployees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-[var(--neutral-50)] transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-[var(--primary-100)] rounded-full flex items-center justify-center mr-3">
                            <span className="text-sm font-medium text-[var(--primary-700)]">
                              {emp.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-[var(--neutral-900)]">{emp.name}</div>
                            <div className="text-sm text-[var(--neutral-500)]">{emp.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--neutral-700)]">{emp.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--neutral-700)]">{emp.position}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--neutral-700)]">
                        {emp.startDate ? new Date(emp.startDate).toLocaleDateString("nl-NL") : "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            emp.status === "active"
                              ? "bg-[var(--success-100)] text-[var(--success-700)]"
                              : emp.status === "onboarding"
                              ? "bg-[var(--primary-100)] text-[var(--primary-700)]"
                              : "bg-[var(--warning-100)] text-[var(--warning-700)]"
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
                          className="text-[var(--primary-600)] hover:text-[var(--primary-700)] transition-colors"
                        >
                          {t.viewDetails}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
