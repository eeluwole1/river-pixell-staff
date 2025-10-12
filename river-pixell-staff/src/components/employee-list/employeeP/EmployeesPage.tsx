import { Input } from "../../ui/Input";
import { Select } from "../../ui/Select";
import { EmployeeList } from "../EmployeeList";
import { useEmployees } from "../../../hooks/useEmployees";
import { Link } from "react-router";


export function EmployeesPage() {
  const {
    filteredEmployees,
    filterOptions,
    setSearchTerm,
    setDepartment,
    updateEmployeeDepartment, 
  } = useEmployees([], null);

  return (
    <div className="pageWrap">
      <div className="toolbar">
        <Input
          className="toolGrow"
          onChange={(eEmployee) => setSearchTerm(eEmployee.target.value)}
          placeholder="Search by name or department"
        />
        <Select className="toolSelect" onChange={(eEmployee) => setDepartment(eEmployee.target.value)}>
          {filterOptions.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </Select>
      </div>

        <Link to="/employees/create" className="createLink">
          + New Employee
        </Link>

        
     <div className="resultsLine">{filteredEmployees.length} results</div>
     <section className="employeeGrid"></section>
      <EmployeeList
        employees={filteredEmployees}           
        onMoveEmployee={updateEmployeeDepartment} 
      />
    </div>
  );
}
