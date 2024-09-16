import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import "../styles/EmployeeTable.css";
import CustomSelect from "./CustomSelect";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString("fr-FR", options);
};

const EmployeeTable = ({ employees }) => {
  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  useEffect(() => {
    const filtered = employees.filter((employee) =>
      Object.values(employee).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredEmployees(filtered);
    setCurrentPage(1);
  }, [searchTerm, employees]);

  const sortedEmployees = useMemo(() => {
    let sortableEmployees = [...filteredEmployees];
    if (sortConfig.key !== null) {
      sortableEmployees.sort((a, b) => {
        if (
          sortConfig.key === "startDate" ||
          sortConfig.key === "dateOfBirth"
        ) {
          // Pour les dates, comparons les objets Date directement
          return sortConfig.direction === "ascending"
            ? new Date(a[sortConfig.key]) - new Date(b[sortConfig.key])
            : new Date(b[sortConfig.key]) - new Date(a[sortConfig.key]);
        }
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableEmployees;
  }, [filteredEmployees, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const indexOfLastEmployee = currentPage * entriesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - entriesPerPage;
  const currentEmployees = sortedEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? " ▲" : " ▼";
    }
    return " ⇅";
  };

  return (
    <div className="employee-table-container">
      <div className="table-controls">
        <div className="entries-control">
          Show
          <CustomSelect
            options={[
              { value: 10, label: "10" },
              { value: 25, label: "25" },
              { value: 50, label: "50" },
              { value: 100, label: "100" },
            ]}
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            name="entriesPerPage"
            position="bottom"
          />
          entries
        </div>
        <div className="search-control">
          Search:
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <table className="employee-table">
        <thead>
          <tr>
            <th
              onClick={() => requestSort("firstName")}
              data-sort={getSortIndicator("firstName")}
            >
              First Name
            </th>
            <th
              onClick={() => requestSort("lastName")}
              data-sort={getSortIndicator("lastName")}
            >
              Last Name
            </th>
            <th
              onClick={() => requestSort("startDate")}
              data-sort={getSortIndicator("startDate")}
            >
              Start Date
            </th>
            <th
              onClick={() => requestSort("department")}
              data-sort={getSortIndicator("department")}
            >
              Department
            </th>
            <th
              onClick={() => requestSort("dateOfBirth")}
              data-sort={getSortIndicator("dateOfBirth")}
            >
              Date of Birth
            </th>
            <th
              onClick={() => requestSort("street")}
              data-sort={getSortIndicator("street")}
            >
              Street
            </th>
            <th
              onClick={() => requestSort("city")}
              data-sort={getSortIndicator("city")}
            >
              City
            </th>
            <th
              onClick={() => requestSort("state")}
              data-sort={getSortIndicator("state")}
            >
              State
            </th>
            <th
              onClick={() => requestSort("zipCode")}
              data-sort={getSortIndicator("zipCode")}
            >
              Zip Code
            </th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{formatDate(employee.startDate)}</td>
              <td>{employee.department}</td>
              <td>{formatDate(employee.dateOfBirth)}</td>
              <td>{employee.street}</td>
              <td>{employee.city}</td>
              <td>{employee.state}</td>
              <td>{employee.zipCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <span>
          Showing {indexOfFirstEmployee + 1} to{" "}
          {Math.min(indexOfLastEmployee, sortedEmployees.length)} of{" "}
          {sortedEmployees.length} entries
        </span>
        <div className="pagination-buttons">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>{currentPage}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastEmployee >= sortedEmployees.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

EmployeeTable.propTypes = {
  employees: PropTypes.array.isRequired,
};

export default EmployeeTable;
