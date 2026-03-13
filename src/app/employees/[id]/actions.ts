"use server";

import { db } from "@/db";
import { employees, onboardingTasks, offboardingTasks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateTask(formData: FormData) {
  const taskId = parseInt(formData.get("taskId") as string);
  const taskType = formData.get("taskType") as string;
  
  const table = taskType === "onboarding" ? onboardingTasks : offboardingTasks;
  const task = await db.select().from(table).where(eq(table.id, taskId)).limit(1);
  
  if (task.length === 0) return;
  
  const completed = !task[0].completed;
  
  await db.update(table)
    .set({ 
      completed,
      completedAt: completed ? new Date() : null
    })
    .where(eq(table.id, taskId));
  
  revalidatePath(`/employees/${task[0].employeeId}`);
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
  
  await db.update(employees)
    .set({ status: "offboarding" })
    .where(eq(employees.id, employeeId));
  
  for (const task of DEFAULT_OFFBOARDING_TASKS) {
    await db.insert(offboardingTasks).values({
      employeeId,
      taskName: task,
    });
  }
  
  revalidatePath("/");
}

export async function completeOnboarding(formData: FormData) {
  const employeeId = parseInt(formData.get("employeeId") as string);
  
  await db.update(employees)
    .set({ status: "active" })
    .where(eq(employees.id, employeeId));
  
  revalidatePath(`/employees/${employeeId}`);
}
