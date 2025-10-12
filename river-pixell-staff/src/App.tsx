
import { useState } from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router";
import { Layout } from "./components/layout/Layout";
import { EmployeesPage } from "./components/employee-list/employeeP/EmployeesPage";
import { CreateEmployee } from "./components/pages/Employees/CreateEmployee";
import { UpdateEmployee } from "./components/pages/Employees/UpdateEmployee";
import { Organization } from "./components/organization-list/Organization";
import { ToastContainer } from "react-toastify";



export default function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const onLogin = () => setLoggedIn(!loggedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout isLoggedIn={loggedIn} onLogin={onLogin} />}>
          <Route index element={<Navigate to="employees" replace />} />
          
      <Route path="employees">
          <Route index element={<EmployeesPage />} />
          <Route path="create" element={<CreateEmployee />} />
          <Route path=":id/edit" element={<UpdateEmployee />} />
      </Route>
      
          <Route path="/organization" element={<Organization />} />
        <Route path="*" element={<Navigate to="employees" replace />} />
        </Route>.
    </Routes>
    <ToastContainer />
    </BrowserRouter>
  );
}