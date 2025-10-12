import { useNavigate } from "react-router";
import type { Employee } from "../../../types/Employee";

interface EmployeeItemProps { 
  employee: Employee;
  onMoveEmployee?: (id: string, toDept: string) => void;
}


const DEPARTMENTS = [
  "Administration",
  "Audit",
  "BankingOperations",
  "Communications",
  "CorporateServices",
  "Facilities",
  "FinancialServices",
  "HumanResources", 
  "InformationTechnology",
  "ItTechnician",
];

export function EmployeeItem({employee, onMoveEmployee } : EmployeeItemProps) {
   const navigate = useNavigate();

  return (
    <div className="employeeRow">
      <span className="employeeName">{employee.name} — {employee.department}</span>

      <button
        className="btnGhost"
        onClick={() => navigate(`/employees/${employee.id}/edit`)}
      >
        Edit
      </button>

      {onMoveEmployee && (
        <select
          className="deptSelect"
          defaultValue={employee.department}
          onChange={(ev) => onMoveEmployee(employee.id, ev.target.value)}
          >
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

