package com.sagar.employee_management.repository;

import com.sagar.employee_management.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // You can define custom methods if needed (optional)
}
