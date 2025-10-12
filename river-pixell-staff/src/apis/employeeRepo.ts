import employeesJson from "../data/employees.json";
import type { Employee } from "../types/Employee";

export const employeeData: Employee[] = Object.entries(
  employeesJson.departments as Record<string, string[]>
).flatMap(([department, names]) =>
  names.map((name, employeeIndex) => ({
    id: `${department}-${employeeIndex}-${name}`,
    name,
    department,
  }))
);

export function getEmployees() {
  return employeeData;
}

export function getEmployeeById(employeeId: string): Employee {
  const foundEmployee = employeeData.find((e) => e.id === employeeId);
  if (!foundEmployee) throw new Error(`Failed to fetch employee with ${employeeId}`);
  return foundEmployee;
}

export async function createEmployee(employee: Employee) {
  employeeData.push(employee);
  return employee;
}

export async function updateEmployee(employee: Employee) {
  const foundEmployeeIndex = employeeData.findIndex((e) => e.id === employee.id);
  if (foundEmployeeIndex === -1) {
    throw new Error(`Failed to update employee with ${employee.id}`);
  }
  employeeData[foundEmployeeIndex] = employee;
  return employeeData[foundEmployeeIndex];
}

export async function updateEmployeeDepartment(employeeId: string, department: string) {
  const foundEmployee = employeeData.find((e) => e.id === employeeId);
  if (!foundEmployee) throw new Error(`Failed to fetch employee with ${employeeId}`);
  foundEmployee.department = department;
  return foundEmployee;
}
