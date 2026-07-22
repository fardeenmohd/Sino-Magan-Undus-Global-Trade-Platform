package com.antigravity.leadtracker.controller;

import com.antigravity.leadtracker.dto.LeadDTO;
import com.antigravity.leadtracker.dto.LeadStatsDTO;
import com.antigravity.leadtracker.model.LeadStatus;
import com.antigravity.leadtracker.service.LeadService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.HashMap;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(LeadController.class)
public class LeadControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LeadService leadService;

    private LeadDTO sampleLeadDTO;

    @BeforeEach
    public void setUp() {
        sampleLeadDTO = new LeadDTO(
                1L,
                "Cyberdyne Systems",
                "sarah@cyberdyne.com",
                "+1-800-555-0100",
                "Cyberdyne Inc",
                LeadStatus.PROPOSAL,
                88,
                BigDecimal.valueOf(120000),
                "Website",
                "High priority prospect",
                OffsetDateTime.now(),
                OffsetDateTime.now()
        );
    }

    @Test
    @DisplayName("GET /api/leads: returns list of leads with HTTP 200")
    public void testGetAllLeads() throws Exception {
        when(leadService.getAllLeads(null, null)).thenReturn(List.of(sampleLeadDTO));

        mockMvc.perform(get("/api/leads")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].name").value("Cyberdyne Systems"))
                .andExpect(jsonPath("$[0].status").value("PROPOSAL"));
    }

    @Test
    @DisplayName("GET /api/leads/{id}: returns lead details")
    public void testGetLeadById() throws Exception {
        when(leadService.getLeadById(1L)).thenReturn(sampleLeadDTO);

        mockMvc.perform(get("/api/leads/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.email").value("sarah@cyberdyne.com"));
    }

    @Test
    @DisplayName("POST /api/leads: creates a new lead and returns HTTP 201")
    public void testCreateLead() throws Exception {
        when(leadService.createLead(any())).thenReturn(sampleLeadDTO);

        String payload = """
                {
                    "name": "Cyberdyne Systems",
                    "email": "sarah@cyberdyne.com",
                    "company": "Cyberdyne Inc",
                    "status": "PROPOSAL",
                    "score": 88,
                    "estimatedValue": 120000,
                    "source": "Website"
                }
                """;

        mockMvc.perform(post("/api/leads")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    @DisplayName("GET /api/leads/stats: returns aggregated metrics")
    public void testGetLeadStats() throws Exception {
        LeadStatsDTO stats = new LeadStatsDTO(15, 5, BigDecimal.valueOf(450000), 26.67, new HashMap<>());
        when(leadService.getLeadStats()).thenReturn(stats);

        mockMvc.perform(get("/api/leads/stats")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalLeads").value(15))
                .andExpect(jsonPath("$.qualifiedLeads").value(5))
                .andExpect(jsonPath("$.conversionRatePercentage").value(26.67));
    }
}
