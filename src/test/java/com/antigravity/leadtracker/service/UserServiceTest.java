package com.antigravity.leadtracker.service;

import com.antigravity.leadtracker.dto.ProductDTO;
import com.antigravity.leadtracker.dto.UserDTO;
import com.antigravity.leadtracker.dto.UserProfileDTO;
import com.antigravity.leadtracker.model.Product;
import com.antigravity.leadtracker.model.User;
import com.antigravity.leadtracker.model.UserRole;
import com.antigravity.leadtracker.repository.ProductRepository;
import com.antigravity.leadtracker.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private UserServiceImpl userService;

    private User sampleUser;
    private Product sampleProduct;

    @BeforeEach
    public void setUp() {
        sampleUser = new User(
                "Priya Sharma",
                "priya@deccanspices.com",
                "hashed_pass",
                "Deccan Organic Spices",
                UserRole.SUPPLIER,
                "Bengaluru, India",
                BigDecimal.valueOf(5.0),
                "avatar.png"
        );
        sampleUser.setId(11L);

        sampleProduct = new Product(
                "Organic Turmeric & Spices",
                "Description",
                "Spices",
                "HS-3301",
                "India",
                "Netherlands",
                BigDecimal.valueOf(2.80),
                BigDecimal.valueOf(1800.00),
                "metric ton",
                sampleUser,
                "spices.jpg",
                "ACTIVE",
                12
        );
        sampleProduct.setId(301L);
    }

    @Test
    @DisplayName("getUserProfile: returns user profile details")
    public void testGetUserProfile() {
        when(userRepository.findById(11L)).thenReturn(Optional.of(sampleUser));

        UserDTO result = userService.getUserProfile(11L);

        assertNotNull(result);
        assertEquals(11L, result.getId());
        assertEquals("Priya Sharma", result.getName());
    }

    @Test
    @DisplayName("updateUserProfile: updates profile attributes")
    public void testUpdateUserProfile() {
        UserProfileDTO updateDTO = new UserProfileDTO(
                "Priya Sharma", "priya@deccanspices.com", "Deccan Global Spices Pvt Ltd",
                UserRole.SUPPLIER, "Bengaluru, Karnataka, India", "+91-9876543210",
                "Leading exporter of organic spices & herbs.", "IEC-IN112233", "new_avatar.jpg"
        );

        when(userRepository.findById(11L)).thenReturn(Optional.of(sampleUser));
        when(userRepository.save(any(User.class))).thenAnswer(i -> i.getArgument(0));

        UserDTO result = userService.updateUserProfile(11L, updateDTO);

        assertNotNull(result);
        assertEquals("Deccan Global Spices Pvt Ltd", result.getCompany());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    @DisplayName("getUserListings: returns products listed by user")
    public void testGetUserListings() {
        when(userRepository.existsById(11L)).thenReturn(true);
        when(productRepository.findByListedById(11L)).thenReturn(List.of(sampleProduct));

        List<ProductDTO> listings = userService.getUserListings(11L);

        assertNotNull(listings);
        assertEquals(1, listings.size());
        assertEquals("Organic Turmeric & Spices", listings.get(0).getTitle());
    }
}
