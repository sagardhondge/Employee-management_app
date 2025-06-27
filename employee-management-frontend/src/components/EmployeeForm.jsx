import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ initialData, onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setRole(initialData.role);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, role });
    setName('');
    setRole('');
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <h3>{initialData ? 'Edit Employee' : 'Add Employee'}</h3>
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
      <button type="submit">{initialData ? 'Update' : 'Add'}</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EmployeeForm;
