package com.antigravity.leadtracker.dto;

import java.math.BigDecimal;
import java.util.Map;

public class LeadStatsDTO {

    private long totalLeads;
    private long qualifiedLeads;
    private BigDecimal totalPipelineValue;
    private double conversionRatePercentage;
    private Map<String, Long> statusBreakdown;

    public LeadStatsDTO() {
    }

    public LeadStatsDTO(long totalLeads, long qualifiedLeads, BigDecimal totalPipelineValue, double conversionRatePercentage, Map<String, Long> statusBreakdown) {
        this.totalLeads = totalLeads;
        this.qualifiedLeads = qualifiedLeads;
        this.totalPipelineValue = totalPipelineValue;
        this.conversionRatePercentage = conversionRatePercentage;
        this.statusBreakdown = statusBreakdown;
    }

    public long getTotalLeads() {
        return totalLeads;
    }

    public void setTotalLeads(long totalLeads) {
        this.totalLeads = totalLeads;
    }

    public long getQualifiedLeads() {
        return qualifiedLeads;
    }

    public void setQualifiedLeads(long qualifiedLeads) {
        this.qualifiedLeads = qualifiedLeads;
    }

    public BigDecimal getTotalPipelineValue() {
        return totalPipelineValue;
    }

    public void setTotalPipelineValue(BigDecimal totalPipelineValue) {
        this.totalPipelineValue = totalPipelineValue;
    }

    public double getConversionRatePercentage() {
        return conversionRatePercentage;
    }

    public void setConversionRatePercentage(double conversionRatePercentage) {
        this.conversionRatePercentage = conversionRatePercentage;
    }

    public Map<String, Long> getStatusBreakdown() {
        return statusBreakdown;
    }

    public void setStatusBreakdown(Map<String, Long> statusBreakdown) {
        this.statusBreakdown = statusBreakdown;
    }
}
