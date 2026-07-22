package com.antigravity.leadtracker.service;

import com.antigravity.leadtracker.dto.AuthResponseDTO;
import com.antigravity.leadtracker.dto.LoginRequestDTO;
import com.antigravity.leadtracker.dto.RegisterRequestDTO;
import com.antigravity.leadtracker.dto.UserDTO;
import com.antigravity.leadtracker.model.User;
import com.antigravity.leadtracker.model.UserRole;
import com.antigravity.leadtracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.UUID;

@Service
@Transactional
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    @Value("${app.jwt.secret:env_secret_key_antigravity_v2}")
    private String jwtSecret;

    public AuthServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public AuthResponseDTO login(LoginRequestDTO loginDTO) {
        if (loginDTO.getEmail() == null || loginDTO.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email address is required");
        }
        if (loginDTO.getPassword() == null || loginDTO.getPassword().isBlank()) {
            throw new IllegalArgumentException("Password is required");
        }

        User user = userRepository.findByEmail(loginDTO.getEmail().trim().toLowerCase())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password credentials"));

        String hashedInput = hashPassword(loginDTO.getPassword());
        if (user.getPasswordHash() != null && !user.getPasswordHash().equals(hashedInput)) {
            throw new IllegalArgumentException("Invalid email or password credentials");
        }

        String token = generateToken(user);
        return new AuthResponseDTO(token, mapToUserDTO(user), "Authentication successful");
    }

    @Override
    public AuthResponseDTO register(RegisterRequestDTO registerDTO) {
        if (registerDTO.getName() == null || registerDTO.getName().isBlank()) {
            throw new IllegalArgumentException("Full name is required");
        }
        if (registerDTO.getEmail() == null || registerDTO.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email address is required");
        }
        if (registerDTO.getPassword() == null || registerDTO.getPassword().length() < 6) {
            throw new IllegalArgumentException("Password must be at least 6 characters in length");
        }
        if (registerDTO.getCompany() == null || registerDTO.getCompany().isBlank()) {
            throw new IllegalArgumentException("Company name is required");
        }

        String emailClean = registerDTO.getEmail().trim().toLowerCase();
        if (userRepository.findByEmail(emailClean).isPresent()) {
            throw new IllegalArgumentException("An account with this email address already exists");
        }

        String hashed = hashPassword(registerDTO.getPassword());
        User newUser = new User(
                registerDTO.getName().trim(),
                emailClean,
                hashed,
                registerDTO.getCompany().trim(),
                registerDTO.getRole() != null ? registerDTO.getRole() : UserRole.BUYER,
                registerDTO.getLocation() != null ? registerDTO.getLocation().trim() : "Global",
                BigDecimal.valueOf(5.00),
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
        );

        User savedUser = userRepository.save(newUser);
        String token = generateToken(savedUser);

        return new AuthResponseDTO(token, mapToUserDTO(savedUser), "User account registered successfully");
    }

    private String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest((password + jwtSecret).getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }

    private String generateToken(User user) {
        return "ag_token_" + UUID.randomUUID().toString().replace("-", "") + "_" + user.getId();
    }

    private UserDTO mapToUserDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getCompany(),
                user.getRole(),
                user.getLocation(),
                user.getRating(),
                user.getAvatarUrl(),
                user.getCreatedAt()
        );
    }
}
