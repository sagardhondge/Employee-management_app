import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const fetchEmployees = () => {
    axios.get('http://localhost:8080/api/employees')
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error('Error fetching employees:', error));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEditClick = (employee) => {
    setEditingEmployee(employee);
    setName(employee.name);
    setRole(employee.role);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/api/employees/${editingEmployee.id}`, {
      name,
      role,
    })
      .then(() => {
        fetchEmployees();
        setEditingEmployee(null); // hide form
        setName('');
        setRole('');
      })
      .catch((error) => console.error('Error updating employee:', error));
  };

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            {emp.name} - {emp.role}
            <button onClick={() => handleEditClick(emp)}>Edit</button>
          </li>
        ))}
      </ul>

      {editingEmployee && (
        <form onSubmit={handleUpdate}>
          <h3>Edit Employee</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role"
            required
          />
          <button type="submit">Update</button>
          <button type="button" onClick={() => setEditingEmployee(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default EmployeeList;
