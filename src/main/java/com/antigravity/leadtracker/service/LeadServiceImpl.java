package com.antigravity.leadtracker.service;

import com.antigravity.leadtracker.dto.LeadDTO;
import com.antigravity.leadtracker.dto.LeadRequestDTO;
import com.antigravity.leadtracker.dto.LeadStatsDTO;
import com.antigravity.leadtracker.model.Lead;
import com.antigravity.leadtracker.model.LeadStatus;
import com.antigravity.leadtracker.repository.LeadRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class LeadServiceImpl implements LeadService {

    private final LeadRepository leadRepository;

    public LeadServiceImpl(LeadRepository leadRepository) {
        this.leadRepository = leadRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<LeadDTO> getAllLeads(LeadStatus status, String search) {
        List<Lead> leads = leadRepository.searchLeads(status, (search != null && !search.isBlank()) ? search.trim() : null);
        return leads.stream().map(this::mapToDTO).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public LeadDTO getLeadById(Long id) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Lead not found with id: " + id));
        return mapToDTO(lead);
    }

    @Override
    public LeadDTO createLead(LeadRequestDTO requestDTO) {
        if (requestDTO.getName() == null || requestDTO.getName().isBlank()) {
            throw new IllegalArgumentException("Lead name is required");
        }
        if (requestDTO.getEmail() == null || requestDTO.getEmail().isBlank()) {
            throw new IllegalArgumentException("Lead email is required");
        }
        if (requestDTO.getCompany() == null || requestDTO.getCompany().isBlank()) {
            throw new IllegalArgumentException("Company name is required");
        }

        Lead lead = new Lead(
                requestDTO.getName(),
                requestDTO.getEmail(),
                requestDTO.getPhone(),
                requestDTO.getCompany(),
                requestDTO.getStatus() != null ? requestDTO.getStatus() : LeadStatus.NEW,
                requestDTO.getScore() != null ? requestDTO.getScore() : 50,
                requestDTO.getEstimatedValue() != null ? requestDTO.getEstimatedValue() : BigDecimal.ZERO,
                requestDTO.getSource() != null ? requestDTO.getSource() : "Direct",
                requestDTO.getNotes()
        );

        Lead savedLead = leadRepository.save(lead);
        return mapToDTO(savedLead);
    }

    @Override
    public LeadDTO updateLead(Long id, LeadRequestDTO requestDTO) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Lead not found with id: " + id));

        if (requestDTO.getName() != null && !requestDTO.getName().isBlank()) {
            lead.setName(requestDTO.getName());
        }
        if (requestDTO.getEmail() != null && !requestDTO.getEmail().isBlank()) {
            lead.setEmail(requestDTO.getEmail());
        }
        if (requestDTO.getPhone() != null) {
            lead.setPhone(requestDTO.getPhone());
        }
        if (requestDTO.getCompany() != null && !requestDTO.getCompany().isBlank()) {
            lead.setCompany(requestDTO.getCompany());
        }
        if (requestDTO.getStatus() != null) {
            lead.setStatus(requestDTO.getStatus());
        }
        if (requestDTO.getScore() != null) {
            lead.setScore(requestDTO.getScore());
        }
        if (requestDTO.getEstimatedValue() != null) {
            lead.setEstimatedValue(requestDTO.getEstimatedValue());
        }
        if (requestDTO.getSource() != null) {
            lead.setSource(requestDTO.getSource());
        }
        if (requestDTO.getNotes() != null) {
            lead.setNotes(requestDTO.getNotes());
        }

        Lead updatedLead = leadRepository.save(lead);
        return mapToDTO(updatedLead);
    }

    @Override
    public LeadDTO updateLeadStatus(Long id, LeadStatus newStatus) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Lead not found with id: " + id));

        lead.setStatus(newStatus);
        Lead updatedLead = leadRepository.save(lead);
        return mapToDTO(updatedLead);
    }

    @Override
    public void deleteLead(Long id) {
        if (!leadRepository.existsById(id)) {
            throw new IllegalArgumentException("Lead not found with id: " + id);
        }
        leadRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public LeadStatsDTO getLeadStats() {
        long totalLeads = leadRepository.count();
        long qualifiedCount = leadRepository.countByStatus(LeadStatus.QUALIFIED);
        long wonCount = leadRepository.countByStatus(LeadStatus.WON);
        BigDecimal totalValue = leadRepository.sumTotalPipelineValue();

        double conversionRate = totalLeads > 0
                ? BigDecimal.valueOf((double) wonCount / totalLeads * 100).setScale(2, RoundingMode.HALF_UP).doubleValue()
                : 0.0;

        Map<String, Long> breakdown = new HashMap<>();
        for (LeadStatus status : LeadStatus.values()) {
            breakdown.put(status.name(), leadRepository.countByStatus(status));
        }

        return new LeadStatsDTO(totalLeads, qualifiedCount, totalValue, conversionRate, breakdown);
    }

    private LeadDTO mapToDTO(Lead lead) {
        return new LeadDTO(
                lead.getId(),
                lead.getName(),
                lead.getEmail(),
                lead.getPhone(),
                lead.getCompany(),
                lead.getStatus(),
                lead.getScore(),
                lead.getEstimatedValue(),
                lead.getSource(),
                lead.getNotes(),
                lead.getCreatedAt(),
                lead.getUpdatedAt()
        );
    }
}
