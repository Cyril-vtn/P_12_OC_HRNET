import { NavLink } from "react-router-dom";
import "../styles/nav.css";

const Nav = () => {
  return (
    <>
      <h1 className="title">HRnet</h1>
      <nav className="nav-container">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Create Employee
        </NavLink>
        <NavLink
          to="/employee-list"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Employee List
        </NavLink>
      </nav>
    </>
  );
};

export default Nav;
