package com.antigravity.leadtracker.dto;

import com.antigravity.leadtracker.model.UserRole;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

public class UserDTO {

    private Long id;
    private String name;
    private String email;
    private String company;
    private UserRole role;
    private String location;
    private BigDecimal rating;
    private String avatarUrl;
    private OffsetDateTime createdAt;

    public UserDTO() {
    }

    public UserDTO(Long id, String name, String email, String company, UserRole role, String location, BigDecimal rating, String avatarUrl, OffsetDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.company = company;
        this.role = role;
        this.location = location;
        this.rating = rating;
        this.avatarUrl = avatarUrl;
        this.createdAt = createdAt;
    }

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

    public BigDecimal getRating() {
        return rating;
    }

    public void setRating(BigDecimal rating) {
        this.rating = rating;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
