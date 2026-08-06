package com.antigravity.leadtracker.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

/**
 * Java 21 Record for Immutable Lead Prospect DTO Handling
 */
public record LeadProspectRecord(
    Long id,
    String title,
    String category,
    String name,
    String company,
    String email,
    String destinationCountry,
    BigDecimal confidenceScore,
    String verificationBadge,
    String registrationId,
    String status,
    OffsetDateTime createdAt
) {}
