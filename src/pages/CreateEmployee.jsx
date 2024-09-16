import { useState } from "react";
import Modal from "../components/Modal";
import "../App.css";

const CreateEmployee = () => {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: new Date(),
    startDate: new Date(),
    street: "",
    city: "",
    state: "",
    zipCode: "",
    department: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  // const handleDateChange = (name, date) => {
  //   setEmployee({ ...employee, [name]: date });
  // };

  const saveEmployee = () => {
    const employees = JSON.parse(localStorage.getItem("employees") || "[]");
    employees.push(employee);
    localStorage.setItem("employees", JSON.stringify(employees));
    setIsModalOpen(true);
  };

  return (
    <div className="container">
      <h2>Create Employee</h2>
      <form>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={employee.firstName}
          onChange={handleChange}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={employee.lastName}
          onChange={handleChange}
        />

        <label htmlFor="dateOfBirth">Date of Birth</label>
        {/* <DatePicker selected={employee.dateOfBirth} onChange={(date) => handleDateChange('dateOfBirth', date)} /> */}

        <label htmlFor="startDate">Start Date</label>
        {/* <DatePicker selected={employee.startDate} onChange={(date) => handleDateChange('startDate', date)} /> */}

        <fieldset className="address">
          <legend>Address</legend>
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            name="street"
            value={employee.street}
            onChange={handleChange}
          />

          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={employee.city}
            onChange={handleChange}
          />

          <label htmlFor="state">State</label>
          <select
            id="state"
            name="state"
            value={employee.state}
            onChange={handleChange}
          >
            {/* Add state options here */}
          </select>

          <label htmlFor="zipCode">Zip Code</label>
          <input
            type="number"
            id="zipCode"
            name="zipCode"
            value={employee.zipCode}
            onChange={handleChange}
          />
        </fieldset>

        <label htmlFor="department">Department</label>
        <select
          id="department"
          name="department"
          value={employee.department}
          onChange={handleChange}
        >
          <option>Sales</option>
          <option>Marketing</option>
          <option>Engineering</option>
          <option>Human Resources</option>
          <option>Legal</option>
        </select>
      </form>
      <button onClick={saveEmployee}>Save</button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message="Employee Created!"
      />
    </div>
  );
};

export default CreateEmployee;
