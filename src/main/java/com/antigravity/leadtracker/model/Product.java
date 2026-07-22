package com.antigravity.leadtracker.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(nullable = false)
    private String category;

    @Column(name = "hs_code", nullable = false)
    private String hsCode = "HS-8471";

    @Column(name = "origin_country", nullable = false)
    private String originCountry = "India";

    @Column(name = "destination_country", nullable = false)
    private String destinationCountry = "United States";

    @Column(name = "tariff_rate", nullable = false, precision = 5, scale = 2)
    private BigDecimal tariffRate = BigDecimal.valueOf(4.50);

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal price = BigDecimal.ZERO;

    @Column(nullable = false)
    private String unit = "unit";

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "listed_by_user_id", nullable = false)
    private User listedBy;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(nullable = false)
    private String status = "ACTIVE";

    @Column(name = "lead_count", nullable = false)
    private Integer leadCount = 0;

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    public Product() {
    }

    public Product(String title, String description, String category, String hsCode, String originCountry, String destinationCountry, BigDecimal tariffRate, BigDecimal price, String unit, User listedBy, String imageUrl, String status, Integer leadCount) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.hsCode = hsCode != null ? hsCode : "HS-8471";
        this.originCountry = originCountry != null ? originCountry : "India";
        this.destinationCountry = destinationCountry != null ? destinationCountry : "United States";
        this.tariffRate = tariffRate != null ? tariffRate : BigDecimal.valueOf(4.50);
        this.price = price != null ? price : BigDecimal.ZERO;
        this.unit = unit != null ? unit : "unit";
        this.listedBy = listedBy;
        this.imageUrl = imageUrl;
        this.status = status != null ? status : "ACTIVE";
        this.leadCount = leadCount != null ? leadCount : 0;
    }

    @PrePersist
    protected void onCreate() {
        OffsetDateTime now = OffsetDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = OffsetDateTime.now();
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

    public String getHsCode() {
        return hsCode;
    }

    public void setHsCode(String hsCode) {
        this.hsCode = hsCode;
    }

    public String getOriginCountry() {
        return originCountry;
    }

    public void setOriginCountry(String originCountry) {
        this.originCountry = originCountry;
    }

    public String getDestinationCountry() {
        return destinationCountry;
    }

    public void setDestinationCountry(String destinationCountry) {
        this.destinationCountry = destinationCountry;
    }

    public BigDecimal getTariffRate() {
        return tariffRate;
    }

    public void setTariffRate(BigDecimal tariffRate) {
        this.tariffRate = tariffRate;
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

    public User getListedBy() {
        return listedBy;
    }

    public void setListedBy(User listedBy) {
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

    public OffsetDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(OffsetDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
