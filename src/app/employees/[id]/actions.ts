"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";

export async function updateTask(formData: FormData) {
  const taskId = parseInt(formData.get("taskId") as string);
  const taskType = formData.get("taskType") as string;

  // Find the task to get employee ID
  const allTasks = taskType === "onboarding" ? db.getOnboardingTasks(0) : db.getOffboardingTasks(0);
  const task = allTasks.find(t => t.id === taskId);

  if (!task) return;

  const completed = !task.completed;

  db.updateTask(taskId, taskType as 'onboarding' | 'offboarding', {
    completed,
    completedAt: completed ? new Date() : undefined
  });

  revalidatePath(`/employees/${task.employeeId}`);
}

export async function startOffboarding(formData: FormData) {
  const employeeId = parseInt(formData.get("employeeId") as string);

  const DEFAULT_OFFBOARDING_TASKS = [
    "Exit gesprek plannen",
    "Bedrijfseigendom innemen",
    "E-mailaccount deactiveren",
    "Toegangsrechten intrekken",
    "Auto/leaseauto innemen",
    "Laatste salaris afhandelen",
    "Getuigschrift opstellen",
    "RVU regeling bespreken",
    "Kennisoverdracht organiseren",
    "Netwerk toegang blokkeren",
  ];

  db.updateEmployee(employeeId, { status: "offboarding" });

  for (const task of DEFAULT_OFFBOARDING_TASKS) {
    db.addOffboardingTask({
      employeeId,
      taskName: task,
      completed: false,
    });
  }

  revalidatePath("/");
}

export async function completeOnboarding(formData: FormData) {
  const employeeId = parseInt(formData.get("employeeId") as string);

  db.updateEmployee(employeeId, { status: "active" });

  revalidatePath(`/employees/${employeeId}`);
}
