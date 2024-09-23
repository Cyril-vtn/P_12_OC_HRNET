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
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!employee.firstName) newErrors.firstName = "First Name is required";
    if (!employee.lastName) newErrors.lastName = "Last Name is required";
    if (!employee.dateOfBirth)
      newErrors.dateOfBirth = "Date of Birth is required";
    if (!employee.startDate) newErrors.startDate = "Start Date is required";
    if (!employee.street) newErrors.street = "Street is required";
    if (!employee.city) newErrors.city = "City is required";
    if (!employee.state) newErrors.state = "State is required";
    if (!employee.zipCode) newErrors.zipCode = "Zip Code is required";
    if (!employee.department) newErrors.department = "Department is required";
    return newErrors;
  };

  const saveEmployee = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const employees = JSON.parse(localStorage.getItem("employees") || "[]");
    employees.push(employee);
    localStorage.setItem("employees", JSON.stringify(employees));
    setIsModalOpen(true);
    setEmployee({
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
  };

  return (
    <div className="container">
      <h2 className="title">Create Employee</h2>
      <form onSubmit={saveEmployee}>
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
            {errors.firstName && (
              <div className="error-container">
                <span className="error">{errors.firstName}</span>
              </div>
            )}
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
            {errors.lastName && (
              <div className="error-container">
                <span className="error">{errors.lastName}</span>
              </div>
            )}
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
            {errors.dateOfBirth && (
              <div className="error-container">
                <span className="error">{errors.dateOfBirth}</span>
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <DatePicker
              id="startDate"
              name="startDate"
              value={employee.startDate}
              onChange={handleChange}
            />
            {errors.startDate && (
              <div className="error-container">
                <span className="error">{errors.startDate}</span>
              </div>
            )}
          </div>
        </div>
        <fieldset className="address">
          <legend>Address</legend>
          <div className="form-group">
            <label className="street-label" htmlFor="street">
              Street
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={employee.street}
              onChange={handleChange}
            />
            {errors.street && (
              <div className="error-container">
                <span className="error">{errors.street}</span>
              </div>
            )}
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
              {errors.city && (
                <div className="error-container">
                  <span className="error">{errors.city}</span>
                </div>
              )}
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
              {errors.state && (
                <div className="error-container">
                  <span className="error">{errors.state}</span>
                </div>
              )}
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
            {errors.zipCode && (
              <div className="error-container">
                <span className="error">{errors.zipCode}</span>
              </div>
            )}
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
        {errors.department && (
          <div className="error-container">
            <span className="error">{errors.department}</span>
          </div>
        )}
        <button className="save-button" type="submit">
          Save
        </button>
      </form>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message="Employee Created!"
      />
    </div>
  );
};

export default CreateEmployee;
