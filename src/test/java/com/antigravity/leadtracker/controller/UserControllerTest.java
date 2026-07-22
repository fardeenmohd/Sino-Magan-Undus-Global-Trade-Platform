package com.antigravity.leadtracker.controller;

import com.antigravity.leadtracker.dto.ProductDTO;
import com.antigravity.leadtracker.dto.UserDTO;
import com.antigravity.leadtracker.model.UserRole;
import com.antigravity.leadtracker.service.UserService;
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
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    private UserDTO sampleUserDTO;
    private ProductDTO sampleProductDTO;

    @BeforeEach
    public void setUp() {
        sampleUserDTO = new UserDTO(
                11L, "Priya Sharma", "priya@deccanspices.com", "Deccan Organic Spices",
                UserRole.SUPPLIER, "Bengaluru, India", BigDecimal.valueOf(5.0), "avatar.png", OffsetDateTime.now()
        );

        sampleProductDTO = new ProductDTO(
                301L, "Organic Turmeric & Spices", "Description", "Spices", "HS-3301",
                "India", "Netherlands", BigDecimal.valueOf(2.80), BigDecimal.valueOf(1800.00),
                "metric ton", sampleUserDTO, "spices.jpg", "ACTIVE", 12, OffsetDateTime.now()
        );
    }

    @Test
    @DisplayName("GET /api/users/{id}: returns user profile")
    public void testGetUserProfile() throws Exception {
        when(userService.getUserProfile(11L)).thenReturn(sampleUserDTO);

        mockMvc.perform(get("/api/users/11")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(11))
                .andExpect(jsonPath("$.name").value("Priya Sharma"));
    }

    @Test
    @DisplayName("GET /api/users/{id}/listings: returns user product listings")
    public void testGetUserListings() throws Exception {
        when(userService.getUserListings(11L)).thenReturn(List.of(sampleProductDTO));

        mockMvc.perform(get("/api/users/11/listings")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(301))
                .andExpect(jsonPath("$[0].title").value("Organic Turmeric & Spices"));
    }
}
