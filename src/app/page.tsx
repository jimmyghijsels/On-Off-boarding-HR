import { getDb } from "@/db";
import { employees } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getEmployees() {
  const db = getDb();
  return await db.select().from(employees).orderBy(desc(employees.createdAt));
}

export default async function HomePage() {
  const allEmployees = await getEmployees();

  const active = allEmployees.filter((e) => e.status === "active");
  const onboarding = allEmployees.filter((e) => e.status === "onboarding");
  const offboarding = allEmployees.filter((e) => e.status === "offboarding");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">HR On/Offboarding</h1>
          <Link
            href="/employees/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Nieuwe werknemer
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-green-600">{active.length}</div>
            <div className="text-gray-600">Actieve werknemers</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-blue-600">{onboarding.length}</div>
            <div className="text-gray-600">In onboarding</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-orange-600">{offboarding.length}</div>
            <div className="text-gray-600">In offboarding</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Alle werknemers</h2>
          </div>
          {allEmployees.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Nog geen werknemers. Voeg een nieuwe werknemer toe om te beginnen.
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Naam</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Afdeling</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Functie</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Startdatum</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {allEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{emp.name}</div>
                      <div className="text-sm text-gray-500">{emp.email}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{emp.department}</td>
                    <td className="px-4 py-3 text-gray-600">{emp.position}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {emp.startDate ? new Date(emp.startDate).toLocaleDateString("nl-NL") : "-"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          emp.status === "active"
                            ? "bg-green-100 text-green-800"
                            : emp.status === "onboarding"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {emp.status === "active"
                          ? "Actief"
                          : emp.status === "onboarding"
                          ? "Onboarding"
                          : "Offboarding"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/employees/${emp.id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Bekijk
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
