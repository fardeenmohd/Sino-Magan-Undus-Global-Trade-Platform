package com.antigravity.leadtracker.dto;

import com.antigravity.leadtracker.model.LeadStatus;

import java.math.BigDecimal;

public class LeadRequestDTO {

    private String name;
    private String email;
    private String phone;
    private String company;
    private LeadStatus status;
    private Integer score;
    private BigDecimal estimatedValue;
    private String source;
    private String notes;

    public LeadRequestDTO() {
    }

    public LeadRequestDTO(String name, String email, String phone, String company, LeadStatus status, Integer score, BigDecimal estimatedValue, String source, String notes) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.company = company;
        this.status = status;
        this.score = score;
        this.estimatedValue = estimatedValue;
        this.source = source;
        this.notes = notes;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public LeadStatus getStatus() {
        return status;
    }

    public void setStatus(LeadStatus status) {
        this.status = status;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public BigDecimal getEstimatedValue() {
        return estimatedValue;
    }

    public void setEstimatedValue(BigDecimal estimatedValue) {
        this.estimatedValue = estimatedValue;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
