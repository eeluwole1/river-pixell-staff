import type { BaseResponse } from "../types/BaseResponse";
import type { Employee } from "../types/Employee";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

export type EmployeeCreateInput = {
  name: string;
  department: string;
  roleId?: string | null;
};

export async function getEmployees(): Promise<Employee[]> {
  const res: Response = await fetch(`${BASE_URL}/employees`);
  if (!res.ok) throw new Error("Failed to fetch employees");
  const json: BaseResponse<Employee[]> = await res.json();
  return json.data!;
}

export async function getEmployeeById(employeeId: string): Promise<Employee> {
  const res: Response = await fetch(`${BASE_URL}/employees/${employeeId}`);
  if (!res.ok) throw new Error(`Failed to fetch employee with ${employeeId}`);
  const json: BaseResponse<Employee> = await res.json();
  return json.data!;
}

export async function createEmployee(employee: Employee): Promise<Employee> {
  const res: Response = await fetch(`${BASE_URL}/employees/create`, {
    method: "POST",
    body: JSON.stringify(employee),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to create employee");
  const json: BaseResponse<Employee> = await res.json();
  return json.data!;
}

export async function updateEmployee(employee: Employee):Promise<Employee> {
  const res: Response = await fetch(`${BASE_URL}/employees/update/${employee.id}`, {
    method: "PUT",
    body: JSON.stringify(employee),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`Failed to update employee with id ${employee.id}`);
  const json: BaseResponse<Employee> = await res.json();
  return json.data!;
}
