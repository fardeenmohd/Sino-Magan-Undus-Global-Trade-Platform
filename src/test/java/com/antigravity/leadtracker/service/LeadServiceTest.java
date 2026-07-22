package com.antigravity.leadtracker.service;

import com.antigravity.leadtracker.dto.LeadDTO;
import com.antigravity.leadtracker.dto.LeadRequestDTO;
import com.antigravity.leadtracker.dto.LeadStatsDTO;
import com.antigravity.leadtracker.model.Lead;
import com.antigravity.leadtracker.model.LeadStatus;
import com.antigravity.leadtracker.repository.LeadRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class LeadServiceTest {

    @Mock
    private LeadRepository leadRepository;

    @InjectMocks
    private LeadServiceImpl leadService;

    private Lead sampleLead;

    @BeforeEach
    public void setUp() {
        sampleLead = new Lead(
                "Acme Corp",
                "john@acme.com",
                "+1-555-0199",
                "Acme Industries",
                LeadStatus.NEW,
                75,
                BigDecimal.valueOf(50000),
                "Inbound Call",
                "Interested in enterprise license"
        );
        sampleLead.setId(1L);
    }

    @Test
    @DisplayName("createLead: successfully creates and saves lead")
    public void testCreateLeadSuccess() {
        LeadRequestDTO requestDTO = new LeadRequestDTO(
                "Acme Corp", "john@acme.com", "+1-555-0199", "Acme Industries",
                LeadStatus.NEW, 75, BigDecimal.valueOf(50000), "Inbound Call", "Notes"
        );

        when(leadRepository.save(any(Lead.class))).thenReturn(sampleLead);

        LeadDTO result = leadService.createLead(requestDTO);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Acme Corp", result.getName());
        assertEquals("john@acme.com", result.getEmail());
        verify(leadRepository, times(1)).save(any(Lead.class));
    }

    @Test
    @DisplayName("createLead: throws IllegalArgumentException when name is missing")
    public void testCreateLeadMissingNameThrowsException() {
        LeadRequestDTO requestDTO = new LeadRequestDTO(
                "", "john@acme.com", "+1-555-0199", "Acme Industries",
                LeadStatus.NEW, 75, BigDecimal.valueOf(50000), "Inbound Call", "Notes"
        );

        assertThrows(IllegalArgumentException.class, () -> leadService.createLead(requestDTO));
        verify(leadRepository, never()).save(any());
    }

    @Test
    @DisplayName("getLeadById: returns lead when found")
    public void testGetLeadByIdFound() {
        when(leadRepository.findById(1L)).thenReturn(Optional.of(sampleLead));

        LeadDTO result = leadService.getLeadById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals(LeadStatus.NEW, result.getStatus());
    }

    @Test
    @DisplayName("getLeadById: throws exception when not found")
    public void testGetLeadByIdNotFound() {
        when(leadRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> leadService.getLeadById(99L));
    }

    @Test
    @DisplayName("updateLeadStatus: updates status successfully")
    public void testUpdateLeadStatusSuccess() {
        when(leadRepository.findById(1L)).thenReturn(Optional.of(sampleLead));
        when(leadRepository.save(any(Lead.class))).thenAnswer(invocation -> invocation.getArgument(0));

        LeadDTO result = leadService.updateLeadStatus(1L, LeadStatus.QUALIFIED);

        assertNotNull(result);
        assertEquals(LeadStatus.QUALIFIED, result.getStatus());
        verify(leadRepository, times(1)).save(sampleLead);
    }

    @Test
    @DisplayName("getLeadStats: aggregates metric counters accurately")
    public void testGetLeadStats() {
        when(leadRepository.count()).thenReturn(10L);
        when(leadRepository.countByStatus(LeadStatus.QUALIFIED)).thenReturn(3L);
        when(leadRepository.countByStatus(LeadStatus.WON)).thenReturn(2L);
        when(leadRepository.sumTotalPipelineValue()).thenReturn(BigDecimal.valueOf(250000));

        LeadStatsDTO stats = leadService.getLeadStats();

        assertNotNull(stats);
        assertEquals(10L, stats.getTotalLeads());
        assertEquals(3L, stats.getQualifiedLeads());
        assertEquals(BigDecimal.valueOf(250000), stats.getTotalPipelineValue());
        assertEquals(20.0, stats.getConversionRatePercentage());
    }
}
