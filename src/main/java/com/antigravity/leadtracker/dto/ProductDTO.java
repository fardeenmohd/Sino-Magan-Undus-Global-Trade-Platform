package com.antigravity.leadtracker.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

public class ProductDTO {

    private Long id;
    private String title;
    private String description;
    private String category;
    private BigDecimal price;
    private String unit;
    private UserDTO listedBy;
    private String imageUrl;
    private String status;
    private Integer leadCount;
    private OffsetDateTime createdAt;

    public ProductDTO() {
    }

    public ProductDTO(Long id, String title, String description, String category, BigDecimal price, String unit, UserDTO listedBy, String imageUrl, String status, Integer leadCount, OffsetDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.price = price;
        this.unit = unit;
        this.listedBy = listedBy;
        this.imageUrl = imageUrl;
        this.status = status;
        this.leadCount = leadCount;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public UserDTO getListedBy() {
        return listedBy;
    }

    public void setListedBy(UserDTO listedBy) {
        this.listedBy = listedBy;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getLeadCount() {
        return leadCount;
    }

    public void setLeadCount(Integer leadCount) {
        this.leadCount = leadCount;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
