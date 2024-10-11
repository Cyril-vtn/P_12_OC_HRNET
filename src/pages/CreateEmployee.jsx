import { useState } from "react";
import DatePicker from "../components/DatePicker";
import "../App.css";
import { departments, states } from "../data/data";
import Modal from "@cyril-vtn/react-modal";
import "../styles/Modal.css";
import Select from "@cyril-vtn/select";

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

    console.log(name, value);
    setEmployee({ ...employee, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSelectChange = (value, name) => {
    console.log(value, name);
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
              <label htmlFor="state">State</label>
              <Select
                id="state"
                name="state"
                options={states}
                value={employee.state}
                onChange={(value) => handleSelectChange(value, "state")}
                placeholder="Select a state"
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
        <div className="form-group">
          <label htmlFor="department">Department</label>
          <Select
            id="department"
            name="department"
            options={departments}
            value={employee.department}
            onChange={(value) => handleSelectChange(value, "department")}
            placeholder="Select a department"
          />
          {errors.department && (
            <div className="error-container">
              <span className="error">{errors.department}</span>
            </div>
          )}
        </div>
        <button className="save-button" type="submit">
          Save
        </button>
      </form>
      <Modal
        isOpen={isModalOpen}
        contentLabel="Employee Created"
        className="modal-content"
        overlayClassName="modal-background"
        modalBackgroundColor="#161616"
        showCloseButton={false}
        closeOnEscape={true}
        onClose={() => setIsModalOpen(false)}
      >
        <h2>Employee Created</h2>
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default CreateEmployee;
