import { useState } from "react";
import Modal from "../components/Modal";
import DatePicker from "../components/DatePicker";
import "../App.css";
import CustomSelect from "../components/CustomSelect";
import { departments, states } from "../data/data";

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
    if (name === "dateOfBirth" || name === "startDate") {
      setEmployee({ ...employee, [name]: new Date(value) });
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  };

  const saveEmployee = () => {
    const employees = JSON.parse(localStorage.getItem("employees") || "[]");
    employees.push(employee);
    localStorage.setItem("employees", JSON.stringify(employees));
    setIsModalOpen(true);
  };

  return (
    <div className="container">
      <h2 className="title">Create Employee</h2>
      <form>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={employee.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={employee.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <DatePicker
              id="dateOfBirth"
              name="dateOfBirth"
              value={employee.dateOfBirth}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <DatePicker
              id="startDate"
              name="startDate"
              value={employee.startDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <fieldset className="address">
          <legend>Address</legend>
          <div className="form-group">
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              name="street"
              value={employee.street}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={employee.city}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <CustomSelect
                label="State"
                options={states}
                value={employee.state}
                onChange={handleChange}
                name="state"
                position="bottom"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="zipCode">Zip Code</label>
            <input
              type="number"
              id="zipCode"
              name="zipCode"
              value={employee.zipCode}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        <CustomSelect
          label="Department"
          options={departments}
          value={employee.department}
          onChange={handleChange}
          name="department"
          position="top"
        />
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
