package com.sagar.employee_management.model;

import jakarta.persistence.*;

@Entity                // Marks this class as a JPA entity (table)
@Table(name = "employee")   // Optional: customize the table name
public class Employee {

    @Id    // Primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-increment
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String role;

    // Constructors
    public Employee() {}

    public Employee(String name, String role) {
        this.name = name;
        this.role = role;
    }

    // Getters and Setters (for accessing fields)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
