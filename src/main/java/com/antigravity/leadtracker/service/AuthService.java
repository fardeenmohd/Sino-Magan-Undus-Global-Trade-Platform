package com.antigravity.leadtracker.service;

import com.antigravity.leadtracker.dto.AuthResponseDTO;
import com.antigravity.leadtracker.dto.LoginRequestDTO;
import com.antigravity.leadtracker.dto.RegisterRequestDTO;

public interface AuthService {
    AuthResponseDTO login(LoginRequestDTO loginDTO);
    AuthResponseDTO register(RegisterRequestDTO registerDTO);
}
