import EmployeeTable from "../components/EmployeeTable";

const EmployeeList = () => {
  const employees = JSON.parse(localStorage.getItem("employees")) || [];

  return (
    <div className="employee-list-container">
      <h2>Current Employees</h2>
      <EmployeeTable employees={employees} />
    </div>
  );
};

export default EmployeeList;
