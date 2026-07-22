package com.antigravity.leadtracker.service;

import com.antigravity.leadtracker.dto.ProductDTO;
import com.antigravity.leadtracker.dto.ProductRequestDTO;
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
public class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ProductServiceImpl productService;

    private User sampleSupplier;
    private Product makhanaProduct;

    @BeforeEach
    public void setUp() {
        sampleSupplier = new User(
                "Bihar Exim Foods",
                "makhana@bihar-exim.in",
                "hashed_pass",
                "Bihar Organic Superfoods",
                UserRole.SUPPLIER,
                "Patna, India",
                BigDecimal.valueOf(4.9),
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
        );
        sampleSupplier.setId(10L);

        makhanaProduct = new Product(
                "Bihar Premium Organic Foxnuts (Makhana HS 1904)",
                "Export grade popped gorgon nuts for superfood distributors.",
                "Makhana & Superfoods",
                "HS-1904",
                "India",
                "United States",
                BigDecimal.valueOf(3.50),
                BigDecimal.valueOf(14.50),
                "kg",
                sampleSupplier,
                "makhana.jpg",
                "ACTIVE",
                28
        );
        makhanaProduct.setId(201L);
    }

    @Test
    @DisplayName("getCatalog: returns mapped Makhana superfood product list")
    public void testGetCatalogSuccess() {
        when(productRepository.searchCatalog(null, null, null)).thenReturn(List.of(makhanaProduct));

        List<ProductDTO> result = productService.getCatalog(null, null, null);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Bihar Premium Organic Foxnuts (Makhana HS 1904)", result.get(0).getTitle());
        assertEquals("HS-1904", result.get(0).getHsCode());
        assertEquals("Makhana & Superfoods", result.get(0).getCategory());
    }

    @Test
    @DisplayName("createProduct: successfully creates and saves Makhana product")
    public void testCreateProductSuccess() {
        ProductRequestDTO requestDTO = new ProductRequestDTO(
                "Bihar Premium Organic Foxnuts (Makhana HS 1904)",
                "Description",
                "Makhana & Superfoods",
                "HS-1904",
                "India",
                "United States",
                BigDecimal.valueOf(3.50),
                BigDecimal.valueOf(14.50),
                "kg",
                10L,
                "makhana.jpg"
        );

        when(userRepository.findById(10L)).thenReturn(Optional.of(sampleSupplier));
        when(productRepository.save(any(Product.class))).thenReturn(makhanaProduct);

        ProductDTO result = productService.createProduct(requestDTO);

        assertNotNull(result);
        assertEquals(201L, result.getId());
        assertEquals("HS-1904", result.getHsCode());
        verify(productRepository, times(1)).save(any(Product.class));
    }
}
