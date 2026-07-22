package com.antigravity.leadtracker.dto;

import com.antigravity.leadtracker.model.UserRole;

public class UserProfileDTO {

    private String name;
    private String email;
    private String company;
    private UserRole role;
    private String location;
    private String phone;
    private String bio;
    private String iecCode;
    private String avatarUrl;

    public UserProfileDTO() {
    }

    public UserProfileDTO(String name, String email, String company, UserRole role, String location, String phone, String bio, String iecCode, String avatarUrl) {
        this.name = name;
        this.email = email;
        this.company = company;
        this.role = role;
        this.location = location;
        this.phone = phone;
        this.bio = bio;
        this.iecCode = iecCode;
        this.avatarUrl = avatarUrl;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getIecCode() {
        return iecCode;
    }

    public void setIecCode(String iecCode) {
        this.iecCode = iecCode;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }
}
