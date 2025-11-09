import { useEffect, useMemo, useState } from "react";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { Select } from "../../ui/Select";
import { useEmployees } from "../../../hooks/useEmployees";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import * as EmployeeService from "../../../services/employeeService";
import type { Employee } from "../../../types/Employee";
import { validateEmployee } from "../../../services/employeeValidation";


interface EmployeeFormProps {
  formMode: "edit" | "create";
  employeeId?: string;
}

const DEFAULT_EMPLOYEE: Employee = {
  id: "0",
  name: "", 
  department: "",
};


export function EmployeeForm({ formMode, employeeId }: EmployeeFormProps) {
  const { employees } = useEmployees([], null);
  const [employeeData, setEmployeeData] = useState<Employee>(DEFAULT_EMPLOYEE);
  const [errors, setErrors] = useState<Map<string, string>>(new Map());
  const navigate = useNavigate();

    const departmentOptions = useMemo(
    () => Array.from(new Set(employees.map(e => e.department))).sort(),
    [employees]
  );

  

  useEffect(() => {
    if (formMode === "edit" && employeeId) {
      const editedEmployee = employees.find((e) => e.id === employeeId);
      if (editedEmployee) {
        setEmployeeData(editedEmployee);
      }
    }
  }, [employees, formMode, employeeId]);

  const clearFieldError = (field: string) => {
    setErrors((prev) => {
      const next = new Map(prev);
      next.delete(field);
      return next;
    });
  };

  const clearAllErrors = () => setErrors(new Map());

  const handleFormChange = (field: keyof Employee, value: any) => {
    clearFieldError(field);
    setEmployeeData((prev) => ({ ...prev, [field]: value }));
  };

  const onReset = () => {
    setEmployeeData(DEFAULT_EMPLOYEE);
    clearAllErrors();
  };

  const onSubmit = async () => {
      const employeeErrors = await validateEmployee(employeeData);
  setErrors(employeeErrors);

    if (employeeErrors.size > 0) return; {
      let toastMessage = `Successfully created new employee ${employeeData.name}!`;
      let employeeId = employeeData.id;

      if (formMode == "create") {
        const newEmployee = await EmployeeService.createNewEmployee({

            name: employeeData.name.trim(),
            department: employeeData.department,
            roleId:(employeeData as any).roleId ?? null,
          } as Employee);
        } else {
          toastMessage = "Successfully updated employee!";
          await EmployeeService.updateEmployee(employeeData);
        }

      toast(toastMessage, {
        position: "bottom-center",
        theme: "light",
        hideProgressBar: true,
        closeButton: false,
        autoClose: 2500,
      });

      navigate(`/employees`);
      onReset();
    }
  };

  return (
    <section className="formWrap">
      <span className="Title">
        {formMode === "create" ? "Create" : "Edit"} Employee
      </span>

      <form id="form" className="form">
        <div className="column">
          <div className="label">
            <span>Employee Name</span>
            <Input
              placeholder="Employee Name"
              name="employeeName"
              value={employeeData.name}
              onChange={(e) => handleFormChange("name", e.target.value)}
            />
            {errors.has("name") && (
              <span className="error">
                {errors.get("name")}
              </span>
            )}
          </div>


          <div className="column">
            <span>Department</span>
            <Select
              name="department"
              value={employeeData.department}
              onChange={(e) => handleFormChange("department", e.target.value)}
            >
              <option value="" disabled>
                Select a department
              </option>
              {departmentOptions.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </Select>
            {errors.has("department") && (
              <span className="error">
                {errors.get("department")}
              </span>
            )}
          </div>

          <div className="actions">
            <Button
              type="button"
              onClick={onSubmit}
              variant="green"
              className="bg-emerald-600 text-stone-100 w-50"
            >
              {formMode === "create" ? "Create" : "Update"}
            </Button>
            <Button
              type="button"
              onClick={onReset}
              variant="red"
              className="bg-red-600 text-stone-100 w-50"
            >
              Reset
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
