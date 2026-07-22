package com.antigravity.leadtracker.controller;

import com.antigravity.leadtracker.dto.AuthResponseDTO;
import com.antigravity.leadtracker.dto.LoginRequestDTO;
import com.antigravity.leadtracker.dto.RegisterRequestDTO;
import com.antigravity.leadtracker.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:3000}", allowCredentials = "true")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginRequestDTO loginDTO) {
        AuthResponseDTO response = authService.login(loginDTO);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@RequestBody RegisterRequestDTO registerDTO) {
        AuthResponseDTO response = authService.register(registerDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
