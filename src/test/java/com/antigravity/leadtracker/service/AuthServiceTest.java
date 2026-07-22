package com.antigravity.leadtracker.service;

import com.antigravity.leadtracker.dto.AuthResponseDTO;
import com.antigravity.leadtracker.dto.LoginRequestDTO;
import com.antigravity.leadtracker.dto.RegisterRequestDTO;
import com.antigravity.leadtracker.model.User;
import com.antigravity.leadtracker.model.UserRole;
import com.antigravity.leadtracker.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AuthServiceImpl authService;

    private User sampleUser;

    @BeforeEach
    public void setUp() {
        ReflectionTestUtils.setField(authService, "jwtSecret", "test_secret_key");
        sampleUser = new User(
                "Sarah Connor",
                "sarah@resistance.org",
                "hashed_pass",
                "Resistance Tech",
                UserRole.BUYER,
                "Los Angeles, USA",
                BigDecimal.valueOf(5.0),
                "avatar.png"
        );
        sampleUser.setId(101L);
    }

    @Test
    @DisplayName("register: creates user successfully and returns token")
    public void testRegisterSuccess() {
        RegisterRequestDTO registerDTO = new RegisterRequestDTO(
                "Sarah Connor",
                "sarah@resistance.org",
                "SecretP@ss123",
                "Resistance Tech",
                UserRole.BUYER,
                "Los Angeles, USA"
        );

        when(userRepository.findByEmail("sarah@resistance.org")).thenReturn(Optional.empty());
        when(userRepository.save(any(User.class))).thenReturn(sampleUser);

        AuthResponseDTO response = authService.register(registerDTO);

        assertNotNull(response);
        assertNotNull(response.getToken());
        assertEquals("Sarah Connor", response.getUser().getName());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    @DisplayName("register: throws exception if email already registered")
    public void testRegisterDuplicateEmailThrowsException() {
        RegisterRequestDTO registerDTO = new RegisterRequestDTO(
                "Sarah Connor",
                "sarah@resistance.org",
                "SecretP@ss123",
                "Resistance Tech",
                UserRole.BUYER,
                "Los Angeles, USA"
        );

        when(userRepository.findByEmail("sarah@resistance.org")).thenReturn(Optional.of(sampleUser));

        assertThrows(IllegalArgumentException.class, () -> authService.register(registerDTO));
        verify(userRepository, never()).save(any());
    }

    @Test
    @DisplayName("login: throws exception on invalid email")
    public void testLoginInvalidEmailThrowsException() {
        LoginRequestDTO loginDTO = new LoginRequestDTO("unknown@domain.com", "Password123");
        when(userRepository.findByEmail("unknown@domain.com")).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> authService.login(loginDTO));
    }
}
