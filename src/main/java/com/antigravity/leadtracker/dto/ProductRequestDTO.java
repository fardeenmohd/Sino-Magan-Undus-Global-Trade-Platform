package com.antigravity.leadtracker.dto;

import java.math.BigDecimal;

public class ProductRequestDTO {

    private String title;
    private String description;
    private String category;
    private BigDecimal price;
    private String unit;
    private Long listedByUserId;
    private String imageUrl;

    public ProductRequestDTO() {
    }

    public ProductRequestDTO(String title, String description, String category, BigDecimal price, String unit, Long listedByUserId, String imageUrl) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.price = price;
        this.unit = unit;
        this.listedByUserId = listedByUserId;
        this.imageUrl = imageUrl;
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

    public Long getListedByUserId() {
        return listedByUserId;
    }

    public void setListedByUserId(Long listedByUserId) {
        this.listedByUserId = listedByUserId;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
