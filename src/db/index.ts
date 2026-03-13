// Simple in-memory database for development - replace with real database in production
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

let employees: Employee[] = [];
let onboardingTasks: Task[] = [];
let offboardingTasks: Task[] = [];
let nextEmployeeId = 1;
let nextTaskId = 1;

// Simple database interface
const db = {
  // Get all employees sorted by creation date
  getEmployees: () => [...employees].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),

  // Get employee by ID
  getEmployee: (id: number) => employees.find(emp => emp.id === id),

  // Add new employee
  addEmployee: (data: Omit<Employee, 'id' | 'createdAt'>) => {
    const employee: Employee = { ...data, id: nextEmployeeId++, createdAt: new Date() };
    employees.push(employee);
    return employee.id;
  },

  // Update employee
  updateEmployee: (id: number, updates: Partial<Employee>) => {
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
      Object.assign(employee, updates);
    }
  },

  // Get onboarding tasks for employee
  getOnboardingTasks: (employeeId: number) => onboardingTasks.filter(task => task.employeeId === employeeId),

  // Get offboarding tasks for employee
  getOffboardingTasks: (employeeId: number) => offboardingTasks.filter(task => task.employeeId === employeeId),

  // Add onboarding task
  addOnboardingTask: (data: Omit<Task, 'id' | 'completedAt'>) => {
    const task: Task = { ...data, id: nextTaskId++, completedAt: undefined };
    onboardingTasks.push(task);
  },

  // Add offboarding task
  addOffboardingTask: (data: Omit<Task, 'id' | 'completedAt'>) => {
    const task: Task = { ...data, id: nextTaskId++, completedAt: undefined };
    offboardingTasks.push(task);
  },

  // Update task
  updateTask: (taskId: number, type: 'onboarding' | 'offboarding', updates: Partial<Task>) => {
    const tasks = type === 'onboarding' ? onboardingTasks : offboardingTasks;
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      Object.assign(task, updates);
    }
  }
};

export { db };
