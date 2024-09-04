import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EmployeeList from "./pages/EmployeeList";
import CreateEmployee from "./pages/CreateEmployee";

function App() {
  return (
    <Router>
      <>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/employee-list">Employee List</Link>
        </nav>
        <Routes>
          <Route path="/" element={<CreateEmployee />} />
          <Route path="/employee-list" element={<EmployeeList />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
