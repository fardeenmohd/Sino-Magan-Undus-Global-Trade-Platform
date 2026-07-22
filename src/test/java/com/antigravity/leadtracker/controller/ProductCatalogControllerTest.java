package com.antigravity.leadtracker.controller;

import com.antigravity.leadtracker.dto.ProductDTO;
import com.antigravity.leadtracker.dto.UserDTO;
import com.antigravity.leadtracker.model.UserRole;
import com.antigravity.leadtracker.service.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductCatalogController.class)
public class ProductCatalogControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    private ProductDTO sampleProductDTO;

    @BeforeEach
    public void setUp() {
        UserDTO supplier = new UserDTO(
                10L, "Rajesh Exports", "rajesh@exim.in", "Rajesh Global Trade",
                UserRole.SUPPLIER, "Mumbai, India", BigDecimal.valueOf(4.9), "avatar.png", OffsetDateTime.now()
        );

        sampleProductDTO = new ProductDTO(
                100L,
                "Pharmaceutical Active Ingredients",
                "API grade active pharmaceutical raw materials",
                "Pharmaceuticals",
                "HS-3004",
                "India",
                "Poland",
                BigDecimal.valueOf(3.20),
                BigDecimal.valueOf(4500.00),
                "kg batch",
                supplier,
                "pharma.jpg",
                "ACTIVE",
                15,
                OffsetDateTime.now()
        );
    }

    @Test
    @DisplayName("GET /api/products: returns trade catalog product list with HTTP 200")
    public void testGetCatalog() throws Exception {
        when(productService.getCatalog(null, null, null)).thenReturn(List.of(sampleProductDTO));

        mockMvc.perform(get("/api/products")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(100))
                .andExpect(jsonPath("$[0].title").value("Pharmaceutical Active Ingredients"))
                .andExpect(jsonPath("$[0].destinationCountry").value("Poland"));
    }
}
