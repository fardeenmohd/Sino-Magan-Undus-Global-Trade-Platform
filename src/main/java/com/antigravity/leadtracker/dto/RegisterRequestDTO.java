package com.antigravity.leadtracker.dto;

import com.antigravity.leadtracker.model.UserRole;

public class RegisterRequestDTO {

    private String name;
    private String email;
    private String password;
    private String company;
    private UserRole role;
    private String location;

    public RegisterRequestDTO() {
    }

    public RegisterRequestDTO(String name, String email, String password, String company, UserRole role, String location) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.company = company;
        this.role = role;
        this.location = location;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
