package com.antigravity.leadtracker.controller;

import com.antigravity.leadtracker.dto.ProductDTO;
import com.antigravity.leadtracker.dto.UserDTO;
import com.antigravity.leadtracker.dto.UserProfileDTO;
import com.antigravity.leadtracker.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:3000}", allowCredentials = "true")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserProfile(@PathVariable Long id) {
        UserDTO user = userService.getUserProfile(id);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUserProfile(
            @PathVariable Long id,
            @RequestBody UserProfileDTO profileDTO) {
        UserDTO updatedUser = userService.updateUserProfile(id, profileDTO);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/{id}/listings")
    public ResponseEntity<List<ProductDTO>> getUserListings(@PathVariable Long id) {
        List<ProductDTO> listings = userService.getUserListings(id);
        return ResponseEntity.ok(listings);
    }
}
