package com.antigravity.leadtracker.service;

import com.antigravity.leadtracker.dto.ProductDTO;
import com.antigravity.leadtracker.dto.ProductRequestDTO;
import com.antigravity.leadtracker.dto.UserDTO;
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
    private Product sampleProduct;

    @BeforeEach
    public void setUp() {
        sampleSupplier = new User(
                "Rajesh Exports",
                "rajesh@exim.in",
                "hashed_pass",
                "Rajesh Global Trade",
                UserRole.SUPPLIER,
                "Mumbai, India",
                BigDecimal.valueOf(4.9),
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
        );
        sampleSupplier.setId(10L);

        sampleProduct = new Product(
                "Premium Organic Basmati Rice",
                "100% Export Grade Long Grain Basmati Rice",
                "Agri & Food",
                "HS-1006",
                "India",
                "Oman",
                BigDecimal.valueOf(5.00),
                BigDecimal.valueOf(1250.00),
                "metric ton",
                sampleSupplier,
                "https://images.unsplash.com/photo-1586201375761-83865001e31c",
                "ACTIVE",
                12
        );
        sampleProduct.setId(100L);
    }

    @Test
    @DisplayName("getCatalog: returns mapped cross-border trade product list")
    public void testGetCatalogSuccess() {
        when(productRepository.searchCatalog(null, null, null)).thenReturn(List.of(sampleProduct));

        List<ProductDTO> result = productService.getCatalog(null, null, null);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Premium Organic Basmati Rice", result.get(0).getTitle());
        assertEquals("India", result.get(0).getOriginCountry());
        assertEquals("Oman", result.get(0).getDestinationCountry());
    }

    @Test
    @DisplayName("createProduct: successfully creates and saves cross-border product")
    public void testCreateProductSuccess() {
        ProductRequestDTO requestDTO = new ProductRequestDTO(
                "Premium Organic Basmati Rice",
                "Description",
                "Agri & Food",
                "HS-1006",
                "India",
                "Oman",
                BigDecimal.valueOf(5.00),
                BigDecimal.valueOf(1250.00),
                "metric ton",
                10L,
                "image.png"
        );

        when(userRepository.findById(10L)).thenReturn(Optional.of(sampleSupplier));
        when(productRepository.save(any(Product.class))).thenReturn(sampleProduct);

        ProductDTO result = productService.createProduct(requestDTO);

        assertNotNull(result);
        assertEquals(100L, result.getId());
        assertEquals("HS-1006", result.getHsCode());
        verify(productRepository, times(1)).save(any(Product.class));
    }
}
