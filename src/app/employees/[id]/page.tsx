import { db } from "@/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { updateTask, startOffboarding, completeOnboarding } from "./actions";

export const dynamic = "force-dynamic";

async function getEmployee(id: number) {
  return db.getEmployee(id) || null;
}

async function getOnboardingTasks(employeeId: number) {
  return db.getOnboardingTasks(employeeId);
}

async function getOffboardingTasks(employeeId: number) {
  return db.getOffboardingTasks(employeeId);
}

export default async function EmployeeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const employeeId = parseInt(id);
  
  const employee = await getEmployee(employeeId);
  if (!employee) notFound();

  const onboarding = await getOnboardingTasks(employeeId);
  const offboarding = await getOffboardingTasks(employeeId);

  const onboardingCompleted = onboarding.filter((t) => t.completed).length;
  const offboardingCompleted = offboarding.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Terug naar overzicht
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">{employee.name}</h1>
                <p className="text-gray-600">{employee.email}</p>
                <div className="mt-2 flex gap-4 text-sm text-gray-600">
                  <span>📁 {employee.department}</span>
                  <span>💼 {employee.position}</span>
                  <span>📅 Start: {employee.startDate ? new Date(employee.startDate).toLocaleDateString("nl-NL") : "-"}</span>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  employee.status === "active"
                    ? "bg-green-100 text-green-800"
                    : employee.status === "onboarding"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-orange-100 text-orange-800"
                }`}
              >
                {employee.status === "active"
                  ? "Actief"
                  : employee.status === "onboarding"
                  ? "Onboarding"
                  : "Offboarding"}
              </span>
            </div>
          </div>
        </div>

        {employee.status === "onboarding" && (
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-4 border-b flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">Onboarding taken</h2>
                <p className="text-sm text-gray-600">
                  {onboardingCompleted} van {onboarding.length} voltooid
                </p>
              </div>
              {onboardingCompleted === onboarding.length && onboarding.length > 0 && (
                <form action={completeOnboarding}>
                  <input type="hidden" name="employeeId" value={employeeId} />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Onboarding voltooien
                  </button>
                </form>
              )}
            </div>
            <div className="p-4">
              {onboarding.length === 0 ? (
                <p className="text-gray-500">Geen onboarding taken.</p>
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
                          className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </form>
                      <span className={task.completed ? "text-gray-400 line-through" : "text-gray-700"}>
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
          <div className="bg-white rounded-lg shadow mb-6 p-6">
            <h2 className="text-lg font-semibold mb-4">Werknemer offboarden</h2>
            <p className="text-gray-600 mb-4">
              Start het offboarding proces om alle benodigde taken te doorlopen wanneer een werknemer uit dienst gaat.
            </p>
            <form action={startOffboarding}>
              <input type="hidden" name="employeeId" value={employeeId} />
              <button
                type="submit"
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Start offboarding
              </button>
            </form>
          </div>
        )}

        {employee.status === "offboarding" && (
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Offboarding taken</h2>
              <p className="text-sm text-gray-600">
                {offboardingCompleted} van {offboarding.length} voltooid
              </p>
            </div>
            <div className="p-4">
              {offboarding.length === 0 ? (
                <p className="text-gray-500">Geen offboarding taken.</p>
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
                          className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                        />
                      </form>
                      <span className={task.completed ? "text-gray-400 line-through" : "text-gray-700"}>
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
