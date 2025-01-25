import EmployeeTable from "../components/EmployeeTable";
import useEmployeeStore from "../store/employeeStore";

const EmployeeList = () => {
  const employees = useEmployeeStore((state) => state.employees);

  return (
    <div className="employee-list-container">
      <h2>Current Employees</h2>
      <EmployeeTable employees={employees} />
    </div>
  );
};

export default EmployeeList;
