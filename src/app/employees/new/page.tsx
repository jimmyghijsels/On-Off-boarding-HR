import { db } from "@/db";
import { employees, onboardingTasks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

const DEFAULT_ONBOARDING_TASKS = [
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
];

async function createEmployee(formData: FormData) {
  "use server";
  
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const department = formData.get("department") as string;
  const position = formData.get("position") as string;
  const startDate = new Date(formData.get("startDate") as string);

  const result = await db.insert(employees).values({
    name,
    email,
    department,
    position,
    startDate,
    status: "onboarding",
  }).returning({ id: employees.id });

  const employeeId = result[0].id;

  for (const task of DEFAULT_ONBOARDING_TASKS) {
    await db.insert(onboardingTasks).values({
      employeeId,
      taskName: task,
    });
  }

  redirect(`/employees/${employeeId}`);
}

export default function NewEmployeePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Terug naar overzicht
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-semibold text-gray-900">Nieuwe werknemer toevoegen</h1>
            <p className="text-gray-600 mt-1">Voer de gegevens in om een nieuwe werknemer te onboarden.</p>
          </div>

          <form action={createEmployee} className="p-6 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Volledige naam
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-mailadres
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                  Afdeling
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                  Functie
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Startdatum
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Link
                href="/"
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Annuleren
              </Link>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Werknemer toevoegen
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
