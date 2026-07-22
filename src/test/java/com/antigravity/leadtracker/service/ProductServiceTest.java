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
                "Apex Tech Supplier",
                "supplier@apex.com",
                "Apex Systems",
                UserRole.SUPPLIER,
                "San Francisco, USA",
                BigDecimal.valueOf(4.9),
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
        );
        sampleSupplier.setId(10L);

        sampleProduct = new Product(
                "Cloud Compute Engine API",
                "High performance GPU & CPU compute nodes",
                "Compute & Cloud",
                BigDecimal.valueOf(199.00),
                "month",
                sampleSupplier,
                "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
                "ACTIVE",
                5
        );
        sampleProduct.setId(100L);
    }

    @Test
    @DisplayName("getCatalog: returns mapped product list")
    public void testGetCatalogSuccess() {
        when(productRepository.searchCatalog(null, null)).thenReturn(List.of(sampleProduct));

        List<ProductDTO> result = productService.getCatalog(null, null);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Cloud Compute Engine API", result.get(0).getTitle());
        assertEquals("Apex Tech Supplier", result.get(0).getListedBy().getName());
    }

    @Test
    @DisplayName("createProduct: successfully creates and saves product")
    public void testCreateProductSuccess() {
        ProductRequestDTO requestDTO = new ProductRequestDTO(
                "Cloud Compute Engine API",
                "Description",
                "Compute & Cloud",
                BigDecimal.valueOf(199.00),
                "month",
                10L,
                "image.png"
        );

        when(userRepository.findById(10L)).thenReturn(Optional.of(sampleSupplier));
        when(productRepository.save(any(Product.class))).thenReturn(sampleProduct);

        ProductDTO result = productService.createProduct(requestDTO);

        assertNotNull(result);
        assertEquals(100L, result.getId());
        assertEquals("Cloud Compute Engine API", result.getTitle());
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    @DisplayName("createProduct: throws exception when supplier user not found")
    public void testCreateProductSupplierNotFound() {
        ProductRequestDTO requestDTO = new ProductRequestDTO(
                "Cloud Compute Engine API",
                "Description",
                "Compute & Cloud",
                BigDecimal.valueOf(199.00),
                "month",
                99L,
                "image.png"
        );

        when(userRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> productService.createProduct(requestDTO));
        verify(productRepository, never()).save(any());
    }

    @Test
    @DisplayName("getLeadsForProduct: returns lead prospects sharing user structure")
    public void testGetLeadsForProduct() {
        User leadProspect = new User("John Lead", "lead@company.com", "Prospect Co", UserRole.LEAD_PROSPECT, "London", BigDecimal.valueOf(4.5), null);
        leadProspect.setId(201L);

        when(productRepository.findById(100L)).thenReturn(Optional.of(sampleProduct));
        when(userRepository.findByRole(UserRole.LEAD_PROSPECT)).thenReturn(List.of(leadProspect));

        List<UserDTO> leads = productService.getLeadsForProduct(100L);

        assertNotNull(leads);
        assertEquals(1, leads.size());
        assertEquals("John Lead", leads.get(0).getName());
        assertEquals(UserRole.LEAD_PROSPECT, leads.get(0).getRole());
    }
}
