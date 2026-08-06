package com.antigravity.leadtracker.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

/**
 * Java 21 Record for Immutable Commodity DTO Handling
 */
public record CommodityRecord(
    Long id,
    String title,
    String description,
    String category,
    String hsCode,
    String originCountry,
    String destinationCountry,
    BigDecimal tariffRate,
    BigDecimal price,
    String unit,
    String imageUrl,
    String status,
    Integer leadCount,
    OffsetDateTime createdAt
) {}
