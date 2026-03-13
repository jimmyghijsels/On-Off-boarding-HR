export interface Employee {
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