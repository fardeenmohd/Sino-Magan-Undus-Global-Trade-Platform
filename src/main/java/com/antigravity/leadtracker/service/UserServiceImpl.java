package com.antigravity.leadtracker.service;

import com.antigravity.leadtracker.dto.ProductDTO;
import com.antigravity.leadtracker.dto.UserDTO;
import com.antigravity.leadtracker.dto.UserProfileDTO;
import com.antigravity.leadtracker.model.Product;
import com.antigravity.leadtracker.model.User;
import com.antigravity.leadtracker.repository.ProductRepository;
import com.antigravity.leadtracker.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public UserServiceImpl(UserRepository userRepository, ProductRepository productRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDTO getUserProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));
        return mapToUserDTO(user);
    }

    @Override
    public UserDTO updateUserProfile(Long userId, UserProfileDTO profileDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        if (profileDTO.getName() != null && !profileDTO.getName().isBlank()) {
            user.setName(profileDTO.getName());
        }
        if (profileDTO.getCompany() != null && !profileDTO.getCompany().isBlank()) {
            user.setCompany(profileDTO.getCompany());
        }
        if (profileDTO.getLocation() != null) {
            user.setLocation(profileDTO.getLocation());
        }
        if (profileDTO.getPhone() != null) {
            user.setPhone(profileDTO.getPhone());
        }
        if (profileDTO.getBio() != null) {
            user.setBio(profileDTO.getBio());
        }
        if (profileDTO.getIecCode() != null) {
            user.setIecCode(profileDTO.getIecCode());
        }
        if (profileDTO.getAvatarUrl() != null) {
            user.setAvatarUrl(profileDTO.getAvatarUrl());
        }
        if (profileDTO.getRole() != null) {
            user.setRole(profileDTO.getRole());
        }

        User updatedUser = userRepository.save(user);
        return mapToUserDTO(updatedUser);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductDTO> getUserListings(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new IllegalArgumentException("User not found with id: " + userId);
        }
        List<Product> products = productRepository.findByListedById(userId);
        return products.stream().map(this::mapToProductDTO).toList();
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

    private ProductDTO mapToProductDTO(Product product) {
        return new ProductDTO(
                product.getId(),
                product.getTitle(),
                product.getDescription(),
                product.getCategory(),
                product.getHsCode(),
                product.getOriginCountry(),
                product.getDestinationCountry(),
                product.getTariffRate(),
                product.getPrice(),
                product.getUnit(),
                mapToUserDTO(product.getListedBy()),
                product.getImageUrl(),
                product.getStatus(),
                product.getLeadCount(),
                product.getCreatedAt()
        );
    }
}
