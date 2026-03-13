'use client';

import { db } from "@/db";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/lib/language";

const DEFAULT_ONBOARDING_TASKS = {
  nl: [
    "Arbeidscontract ondertekenen",
    "ID-bewijs kopiëren",
    "Bankgegevens registreren",
    "E-mailaccount aanmaken",
    "Laptop/workstation leveren",
    "Toegang badges uitgeven",
    "Interne systemen toegang geven",
    "Introductiegesprek plannen",
    "Mentor/ buddy toewijzen",
    "Vacatieverlof instellen",
  ],
  en: [
    "Sign employment contract",
    "Copy ID proof",
    "Register bank details",
    "Create email account",
    "Deliver laptop/workstation",
    "Issue access badges",
    "Grant access to internal systems",
    "Schedule introduction meeting",
    "Assign mentor/buddy",
    "Set up vacation leave",
  ],
};

function createEmployee(formData: FormData, language: 'nl' | 'en', router: ReturnType<typeof useRouter>) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const department = formData.get("department") as string;
  const position = formData.get("position") as string;
  const startDate = new Date(formData.get("startDate") as string);

  const employeeId = db.addEmployee({
    name,
    email,
    department,
    position,
    startDate,
    status: "onboarding",
  });

  for (const task of DEFAULT_ONBOARDING_TASKS[language]) {
    db.addOnboardingTask({
      employeeId,
      taskName: task,
      completed: false,
    });
  }

  router.push(`/employees/${employeeId}`);
}

export default function NewEmployeePage() {
  const { t, language } = useLanguage();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createEmployee(formData, language, router);
  };
  return (
    <div className="flex-1 min-h-screen bg-[var(--neutral-50)] dark:bg-[var(--neutral-900)]">
      <header className="bg-white dark:bg-[var(--neutral-800)] border-b border-[var(--neutral-200)] dark:border-[var(--neutral-700)] shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link href="/" className="text-[var(--primary-600)] hover:text-[var(--primary-700)] transition-colors">
            ← {t.backToOverview}
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-[var(--neutral-200)]">
          <div className="p-6 border-b border-[var(--neutral-200)]">
            <h1 className="text-2xl font-semibold text-[var(--neutral-900)]">{t.addNewEmployee}</h1>
            <p className="text-[var(--neutral-600)] mt-1">{t.enterDetails}</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[var(--neutral-700)] mb-2">
                {t.fullName}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-3 py-2.5 border border-[var(--neutral-300)] rounded-lg focus:ring-2 focus:ring-[var(--primary-500)] focus:border-[var(--primary-500)] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--neutral-700)] mb-2">
                {t.email}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2.5 border border-[var(--neutral-300)] rounded-lg focus:ring-2 focus:ring-[var(--primary-500)] focus:border-[var(--primary-500)] transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-[var(--neutral-700)] mb-2">
                  {t.department}
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  required
                  className="w-full px-3 py-2.5 border border-[var(--neutral-300)] rounded-lg focus:ring-2 focus:ring-[var(--primary-500)] focus:border-[var(--primary-500)] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="position" className="block text-sm font-medium text-[var(--neutral-700)] mb-2">
                  {t.position}
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  required
                  className="w-full px-3 py-2.5 border border-[var(--neutral-300)] rounded-lg focus:ring-2 focus:ring-[var(--primary-500)] focus:border-[var(--primary-500)] transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-[var(--neutral-700)] mb-2">
                {t.startDateLabel}
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                required
                className="w-full px-3 py-2.5 border border-[var(--neutral-300)] rounded-lg focus:ring-2 focus:ring-[var(--primary-500)] focus:border-[var(--primary-500)] transition-colors"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Link
                href="/"
                className="px-4 py-2 border border-[var(--neutral-300)] text-[var(--neutral-700)] rounded-lg hover:bg-[var(--neutral-50)] transition-colors"
              >
                {t.cancel}
              </Link>
              <button
                type="submit"
                className="px-4 py-2 bg-[var(--primary-600)] text-white rounded-lg hover:bg-[var(--primary-700)] transition-colors font-medium"
              >
                {t.addEmployee}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
