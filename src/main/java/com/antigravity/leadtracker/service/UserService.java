package com.antigravity.leadtracker.service;

import com.antigravity.leadtracker.dto.ProductDTO;
import com.antigravity.leadtracker.dto.UserDTO;
import com.antigravity.leadtracker.dto.UserProfileDTO;

import java.util.List;

public interface UserService {
    UserDTO getUserProfile(Long userId);
    UserDTO updateUserProfile(Long userId, UserProfileDTO profileDTO);
    List<ProductDTO> getUserListings(Long userId);
}
