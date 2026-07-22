package com.antigravity.leadtracker.controller;

import com.antigravity.leadtracker.dto.AuthResponseDTO;
import com.antigravity.leadtracker.dto.UserDTO;
import com.antigravity.leadtracker.model.UserRole;
import com.antigravity.leadtracker.service.AuthService;
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

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthService authService;

    private AuthResponseDTO sampleResponse;

    @BeforeEach
    public void setUp() {
        UserDTO user = new UserDTO(
                101L, "Sarah Connor", "sarah@resistance.org", "Resistance Tech",
                UserRole.BUYER, "Los Angeles", BigDecimal.valueOf(5.0), "avatar.png", OffsetDateTime.now()
        );
        sampleResponse = new AuthResponseDTO("ag_token_123", user, "Authentication successful");
    }

    @Test
    @DisplayName("POST /api/auth/login: authenticates and returns HTTP 200")
    public void testLogin() throws Exception {
        when(authService.login(any())).thenReturn(sampleResponse);

        String payload = """
                {
                    "email": "sarah@resistance.org",
                    "password": "SecretPassword123"
                }
                """;

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("ag_token_123"))
                .andExpect(jsonPath("$.user.name").value("Sarah Connor"));
    }

    @Test
    @DisplayName("POST /api/auth/register: registers and returns HTTP 201")
    public void testRegister() throws Exception {
        when(authService.register(any())).thenReturn(sampleResponse);

        String payload = """
                {
                    "name": "Sarah Connor",
                    "email": "sarah@resistance.org",
                    "password": "SecretPassword123",
                    "company": "Resistance Tech",
                    "role": "BUYER",
                    "location": "Los Angeles"
                }
                """;

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.token").value("ag_token_123"));
    }
}
