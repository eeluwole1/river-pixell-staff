import type { BaseResponse } from "../types/BaseResponse";
import type { Role } from "../types/Roles";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

export async function getRoles(): Promise<Role[]> {
  const res = await fetch(`${BASE_URL}/roles`);
  if (!res.ok) throw new Error("Failed to fetch roles");
  const json: BaseResponse<Role[]> = await res.json();
  return json.data!;
}

export async function getRoleById(roleId: string): Promise<Role> {
  const res = await fetch(`${BASE_URL}/roles/${roleId}`);
  if (!res.ok) throw new Error(`Failed to fetch role with id ${roleId}`);
  const json: BaseResponse<Role> = await res.json();
  return json.data!;
}

export async function createRole(role: Role): Promise<Role> {
  const res = await fetch(`${BASE_URL}/roles/create`, {
    method: "POST",
    body: JSON.stringify(role),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to create role");
  const json: BaseResponse<Role> = await res.json();
  return json.data!;
}

export async function updateRole(role: Role): Promise<Role> {
  const res = await fetch(`${BASE_URL}/roles/update/${role.id}`, {
    method: "PUT",
    body: JSON.stringify(role),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`Failed to update role with id ${role.id}`);
  const json: BaseResponse<Role> = await res.json();
  return json.data!;
}
