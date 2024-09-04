const EmployeeList = () => {
  const employees = JSON.parse(localStorage.getItem("employees")) || [];

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.map((employee, index) => (
          <li key={index}>
            {employee.firstName} {employee.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
