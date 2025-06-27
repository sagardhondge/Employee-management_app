import React, { useState } from "react";
import axios from "axios";

const AddEmployee = ({ onEmployeeAdded }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEmployee = { name, role };

    try {
      await axios.post("http://localhost:8080/api/employees", newEmployee);
      onEmployeeAdded(); // refresh employee list
      setName("");
      setRole("");
    } catch (error) {
      console.error("Error adding employee", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Role"
        value={role}
        required
        onChange={(e) => setRole(e.target.value)}
      />
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default AddEmployee;
