package com.antigravity.leadtracker.controller;

import com.antigravity.leadtracker.dto.LeadDTO;
import com.antigravity.leadtracker.dto.LeadRequestDTO;
import com.antigravity.leadtracker.dto.LeadStatsDTO;
import com.antigravity.leadtracker.model.LeadStatus;
import com.antigravity.leadtracker.service.LeadService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/leads")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:3000}", allowCredentials = "true")
public class LeadController {

    private final LeadService leadService;

    public LeadController(LeadService leadService) {
        this.leadService = leadService;
    }

    @GetMapping
    public ResponseEntity<List<LeadDTO>> getAllLeads(
            @RequestParam(required = false) LeadStatus status,
            @RequestParam(required = false) String search) {
        List<LeadDTO> leads = leadService.getAllLeads(status, search);
        return ResponseEntity.ok(leads);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LeadDTO> getLeadById(@PathVariable Long id) {
        LeadDTO lead = leadService.getLeadById(id);
        return ResponseEntity.ok(lead);
    }

    @PostMapping
    public ResponseEntity<LeadDTO> createLead(@RequestBody LeadRequestDTO requestDTO) {
        LeadDTO createdLead = leadService.createLead(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdLead);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LeadDTO> updateLead(
            @PathVariable Long id,
            @RequestBody LeadRequestDTO requestDTO) {
        LeadDTO updatedLead = leadService.updateLead(id, requestDTO);
        return ResponseEntity.ok(updatedLead);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<LeadDTO> updateLeadStatus(
            @PathVariable Long id,
            @RequestParam LeadStatus status) {
        LeadDTO updatedLead = leadService.updateLeadStatus(id, status);
        return ResponseEntity.ok(updatedLead);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLead(@PathVariable Long id) {
        leadService.deleteLead(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/stats")
    public ResponseEntity<LeadStatsDTO> getLeadStats() {
        LeadStatsDTO stats = leadService.getLeadStats();
        return ResponseEntity.ok(stats);
    }
}
