'use client';

import { db } from "@/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/lib/language";
import { useEffect, useState } from "react";
import { updateTask, startOffboarding, completeOnboarding } from "./actions";

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

interface Task {
  id: number;
  employeeId: number;
  taskName: string;
  completed: boolean;
  completedAt?: Date;
}

export default function EmployeeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { t, language } = useLanguage();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [onboarding, setOnboarding] = useState<Task[]>([]);
  const [offboarding, setOffboarding] = useState<Task[]>([]);
  const [employeeId, setEmployeeId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { id } = await params;
      const idNum = parseInt(id);
      setEmployeeId(idNum);

      const emp = db.getEmployee(idNum);
      if (!emp) notFound();
      setEmployee(emp);

      setOnboarding(db.getOnboardingTasks(idNum));
      setOffboarding(db.getOffboardingTasks(idNum));
    };

    fetchData();
  }, [params]);

  if (!employee || employeeId === null) return <div>Loading...</div>;

  const onboardingCompleted = onboarding.filter((t) => t.completed).length;
  const offboardingCompleted = offboarding.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-[var(--neutral-50)]">
      <header className="bg-white border-b border-[var(--neutral-200)] shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="text-[var(--primary-600)] hover:text-[var(--primary-700)] transition-colors">
            ← {t.backToOverview}
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-[var(--neutral-200)] mb-6">
          <div className="p-6 border-b border-[var(--neutral-200)]">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-semibold text-[var(--neutral-900)]">{employee.name}</h1>
                <p className="text-[var(--neutral-600)]">{employee.email}</p>
                <div className="mt-3 flex gap-6 text-sm text-[var(--neutral-600)]">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-[var(--neutral-400)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    {employee.department}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-[var(--neutral-400)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6m8 0H8" />
                    </svg>
                    {employee.position}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-[var(--neutral-400)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {t.startDate}: {employee.startDate ? new Date(employee.startDate).toLocaleDateString(language === 'nl' ? 'nl-NL' : 'en-US') : "-"}
                  </div>
                </div>
              </div>
              <span
                className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                  employee.status === "active"
                    ? "bg-[var(--success-100)] text-[var(--success-700)]"
                    : employee.status === "onboarding"
                    ? "bg-[var(--primary-100)] text-[var(--primary-700)]"
                    : "bg-[var(--warning-100)] text-[var(--warning-700)]"
                }`}
              >
                {employee.status === "active"
                  ? t.active
                  : employee.status === "onboarding"
                  ? t.onboarding
                  : t.offboarding}
              </span>
            </div>
          </div>
        </div>

        {employee.status === "onboarding" && (
          <div className="bg-white rounded-xl shadow-sm border border-[var(--neutral-200)] mb-6">
            <div className="p-6 border-b border-[var(--neutral-200)] flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-[var(--neutral-900)]">{t.onboardingTasks}</h2>
                <p className="text-sm text-[var(--neutral-600)]">
                  {onboardingCompleted} {t.completed} {onboarding.length}
                </p>
              </div>
              {onboardingCompleted === onboarding.length && onboarding.length > 0 && (
                <form action={completeOnboarding}>
                  <input type="hidden" name="employeeId" value={employeeId} />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[var(--success-600)] text-white rounded-lg hover:bg-[var(--success-700)] transition-colors font-medium"
                  >
                    {t.completeOnboarding}
                  </button>
                </form>
              )}
            </div>
            <div className="p-6">
              {onboarding.length === 0 ? (
                <p className="text-[var(--neutral-500)]">{t.noTasks}</p>
              ) : (
                <ul className="space-y-3">
                  {onboarding.map((task) => (
                    <li key={task.id} className="flex items-center gap-3">
                      <form action={updateTask}>
                        <input type="hidden" name="taskId" value={task.id} />
                        <input type="hidden" name="taskType" value="onboarding" />
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={(e) => e.target.form?.requestSubmit()}
                          className="w-5 h-5 rounded border-[var(--neutral-300)] text-[var(--primary-600)] focus:ring-[var(--primary-500)]"
                        />
                      </form>
                      <span className={task.completed ? "text-[var(--neutral-400)] line-through" : "text-[var(--neutral-700)]"}>
                        {task.taskName}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {employee.status === "active" && (
          <div className="bg-white rounded-xl shadow-sm border border-[var(--neutral-200)] mb-6 p-6">
            <h2 className="text-lg font-semibold text-[var(--neutral-900)] mb-4">{t.offboardEmployee}</h2>
            <p className="text-[var(--neutral-600)] mb-6">
              {t.offboardDesc}
            </p>
            <form action={startOffboarding}>
              <input type="hidden" name="employeeId" value={employeeId} />
              <button
                type="submit"
                className="px-4 py-2 bg-[var(--warning-600)] text-white rounded-lg hover:bg-[var(--warning-700)] transition-colors font-medium"
              >
                {t.startOffboarding}
              </button>
            </form>
          </div>
        )}

        {employee.status === "offboarding" && (
          <div className="bg-white rounded-xl shadow-sm border border-[var(--neutral-200)] mb-6">
            <div className="p-6 border-b border-[var(--neutral-200)]">
              <h2 className="text-lg font-semibold text-[var(--neutral-900)]">{t.offboardingTasks}</h2>
              <p className="text-sm text-[var(--neutral-600)]">
                {offboardingCompleted} {t.completed} {offboarding.length}
              </p>
            </div>
            <div className="p-6">
              {offboarding.length === 0 ? (
                <p className="text-[var(--neutral-500)]">{t.noTasks}</p>
              ) : (
                <ul className="space-y-3">
                  {offboarding.map((task) => (
                    <li key={task.id} className="flex items-center gap-3">
                      <form action={updateTask}>
                        <input type="hidden" name="taskId" value={task.id} />
                        <input type="hidden" name="taskType" value="offboarding" />
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={(e) => e.target.form?.requestSubmit()}
                          className="w-5 h-5 rounded border-[var(--neutral-300)] text-[var(--warning-600)] focus:ring-[var(--warning-500)]"
                        />
                      </form>
                      <span className={task.completed ? "text-[var(--neutral-400)] line-through" : "text-[var(--neutral-700)]"}>
                        {task.taskName}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
