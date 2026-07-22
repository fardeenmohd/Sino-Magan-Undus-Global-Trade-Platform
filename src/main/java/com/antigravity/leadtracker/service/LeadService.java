package com.antigravity.leadtracker.service;

import com.antigravity.leadtracker.dto.LeadDTO;
import com.antigravity.leadtracker.dto.LeadRequestDTO;
import com.antigravity.leadtracker.dto.LeadStatsDTO;
import com.antigravity.leadtracker.model.LeadStatus;

import java.util.List;

public interface LeadService {
    List<LeadDTO> getAllLeads(LeadStatus status, String search);
    LeadDTO getLeadById(Long id);
    LeadDTO createLead(LeadRequestDTO requestDTO);
    LeadDTO updateLead(Long id, LeadRequestDTO requestDTO);
    LeadDTO updateLeadStatus(Long id, LeadStatus newStatus);
    void deleteLead(Long id);
    LeadStatsDTO getLeadStats();
}
