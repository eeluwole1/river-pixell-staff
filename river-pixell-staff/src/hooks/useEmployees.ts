import { useEffect, useMemo, useState } from "react";
import * as EmployeeService from "../services/employeeService";
import type { Employee } from "../types/Employee";

interface FilterOptions {
  searchTerm: string;
  department: string;
}

export function useEmployees(
  dependencies: unknown[],
  filterFn?: ((emp: Employee) => boolean) | null
) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState<string | null>();
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: "",
    department: "All",
  });

  const fetchEmployees = async () => {
    try {
      let result = await EmployeeService.fetchEmployees();

      if (filterFn) {
        result = result.filter(filterFn);
      }

      setEmployees([...result]);
    } catch (errorObject) {
      setError(`${errorObject}`);
    }
  };

const updateEmployeeDepartment = async (employeeId: string, department: string) => {
  try {
    await EmployeeService.moveEmployee(employeeId, department);
    await fetchEmployees();
  } catch (errorObject) {
    setError(`${errorObject}`);
  }
};

  const filterOptions = useMemo(() => {
    const uniqueDepts = Array.from(new Set(employees.map((eEmployee) => eEmployee.department)));
    return ["All", ...uniqueDepts];
  }, [employees]);


  const filteredEmployees = useMemo(() => {
    let result = [...employees];

    if (filters.department !== "All") {
      result = result.filter((emp) => emp.department === filters.department);
    }

    if (filters.searchTerm) {
      const st = filters.searchTerm.toLowerCase();
      result = result.filter(
        (emp) =>
          emp.name.toLowerCase().includes(st) ||
          emp.department.toLowerCase().includes(st)
      );
    }

    return result;
  }, [employees, filters]);

  const setSearchTerm = (searchTerm: string) => {
    setFilters((prev) => ({ ...prev, searchTerm }));
  };

  const setDepartment = (department: string) => {
    setFilters((prev) => ({ ...prev, department }));
  };

  useEffect(() => {
    fetchEmployees();

  }, [...dependencies]);

  return {
    filteredEmployees,
    employees,
    error,
    updateEmployeeDepartment,
    filterOptions,
    setSearchTerm,
    setDepartment,
  };
}
