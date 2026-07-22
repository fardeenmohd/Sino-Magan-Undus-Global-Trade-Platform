package com.antigravity.leadtracker.service;

import com.antigravity.leadtracker.dto.ProductDTO;
import com.antigravity.leadtracker.dto.ProductRequestDTO;
import com.antigravity.leadtracker.dto.UserDTO;
import com.antigravity.leadtracker.model.Product;
import com.antigravity.leadtracker.model.User;
import com.antigravity.leadtracker.model.UserRole;
import com.antigravity.leadtracker.repository.ProductRepository;
import com.antigravity.leadtracker.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ProductServiceImpl(ProductRepository productRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductDTO> getCatalog(String category, String query) {
        String cleanCategory = (category != null && !category.isBlank() && !category.equalsIgnoreCase("ALL")) ? category.trim() : null;
        String cleanQuery = (query != null && !query.isBlank()) ? query.trim() : null;

        List<Product> products = productRepository.searchCatalog(cleanCategory, cleanQuery);
        return products.stream().map(this::mapToProductDTO).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + id));
        return mapToProductDTO(product);
    }

    @Override
    public ProductDTO createProduct(ProductRequestDTO requestDTO) {
        if (requestDTO.getTitle() == null || requestDTO.getTitle().isBlank()) {
            throw new IllegalArgumentException("Product title is required");
        }
        if (requestDTO.getCategory() == null || requestDTO.getCategory().isBlank()) {
            throw new IllegalArgumentException("Product category is required");
        }
        if (requestDTO.getListedByUserId() == null) {
            throw new IllegalArgumentException("Supplier User ID is required");
        }

        User supplier = userRepository.findById(requestDTO.getListedByUserId())
                .orElseThrow(() -> new IllegalArgumentException("Supplier User not found with id: " + requestDTO.getListedByUserId()));

        Product product = new Product(
                requestDTO.getTitle(),
                requestDTO.getDescription() != null ? requestDTO.getDescription() : "",
                requestDTO.getCategory(),
                requestDTO.getPrice() != null ? requestDTO.getPrice() : BigDecimal.ZERO,
                requestDTO.getUnit() != null ? requestDTO.getUnit() : "unit",
                supplier,
                requestDTO.getImageUrl(),
                "ACTIVE",
                0
        );

        Product savedProduct = productRepository.save(product);
        return mapToProductDTO(savedProduct);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDTO> getLeadsForProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + productId));

        // Retrieve matched lead prospects (sharing the same User structure)
        List<User> prospectLeads = userRepository.findByRole(UserRole.LEAD_PROSPECT);
        return prospectLeads.stream().map(this::mapToUserDTO).toList();
    }

    private ProductDTO mapToProductDTO(Product product) {
        return new ProductDTO(
                product.getId(),
                product.getTitle(),
                product.getDescription(),
                product.getCategory(),
                product.getPrice(),
                product.getUnit(),
                mapToUserDTO(product.getListedBy()),
                product.getImageUrl(),
                product.getStatus(),
                product.getLeadCount(),
                product.getCreatedAt()
        );
    }

    private UserDTO mapToUserDTO(User user) {
        if (user == null) return null;
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
