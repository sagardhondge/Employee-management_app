import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [editId, setEditId] = useState(null);
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem("darkMode") === "true"
  );
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const employeesPerPage = 10;

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const result = employees.filter((emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.role.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredEmployees(result);
    setCurrentPage(1);
  }, [search, employees]);

  const fetchEmployees = () => {
    axios.get("http://localhost:8080/api/employees")
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, role };
    const request = editId
      ? axios.put(`http://localhost:8080/api/employees/${editId}`, data)
      : axios.post("http://localhost:8080/api/employees", data);

    request.then(() => {
      setEditId(null);
      setName('');
      setRole('');
      fetchEmployees();
    }).catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      axios.delete(`http://localhost:8080/api/employees/${id}`)
        .then(fetchEmployees)
        .catch(err => console.error(err));
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const indexOfLast = currentPage * employeesPerPage;
  const indexOfFirst = indexOfLast - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  return (
    <div className={darkMode ? 'dark-mode app-container' : 'app-container'}>
      <div className="header">
        <h2>Employee Management</h2>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {!isLoggedIn ? (
        <form onSubmit={handleLogin} className="login-form">
          <h3>Login</h3>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">Login</button>
        </form>
      ) : (
        <div className="logged-in-container">
          <div className="content-area">
            <input
              type="text"
              placeholder="Search by name or role"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-box"
            />

            <form onSubmit={handleSubmit} className="employee-form">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
              <button type="submit" className="btn">
                {editId ? "Update" : "Add"} Employee
              </button>
            </form>

            <ul className="employee-list">
              {currentEmployees.map(emp => (
                <li key={emp.id} className="employee-item">
                  <span>{emp.name} - {emp.role}</span>
                  <div className="actions">
                    <button onClick={() => {
                      setEditId(emp.id);
                      setName(emp.name);
                      setRole(emp.role);
                    }}>Edit</button>
                    <button onClick={() => handleDelete(emp.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>

            {totalPages > 1 && (
              <div className="pagination">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={currentPage === i + 1 ? 'active' : ''}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => setIsLoggedIn(false)} className="logout-btn bottom-logout">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
