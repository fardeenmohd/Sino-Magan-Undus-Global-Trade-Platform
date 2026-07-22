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
                10L, "Apex Supplier", "supplier@apex.com", "Apex Inc",
                UserRole.SUPPLIER, "San Francisco", BigDecimal.valueOf(4.9), "avatar.png", OffsetDateTime.now()
        );

        sampleProductDTO = new ProductDTO(
                100L,
                "AI Agent Compute Cluster",
                "Scalable Python FastAPI compute node cluster",
                "AI & Compute",
                BigDecimal.valueOf(299.00),
                "month",
                supplier,
                "cluster.jpg",
                "ACTIVE",
                8,
                OffsetDateTime.now()
        );
    }

    @Test
    @DisplayName("GET /api/products: returns catalog product list with HTTP 200")
    public void testGetCatalog() throws Exception {
        when(productService.getCatalog(null, null)).thenReturn(List.of(sampleProductDTO));

        mockMvc.perform(get("/api/products")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(100))
                .andExpect(jsonPath("$[0].title").value("AI Agent Compute Cluster"))
                .andExpect(jsonPath("$[0].category").value("AI & Compute"));
    }

    @Test
    @DisplayName("POST /api/products: creates product and returns HTTP 201")
    public void testCreateProduct() throws Exception {
        when(productService.createProduct(any())).thenReturn(sampleProductDTO);

        String payload = """
                {
                    "title": "AI Agent Compute Cluster",
                    "description": "Scalable Python FastAPI compute node cluster",
                    "category": "AI & Compute",
                    "price": 299.00,
                    "unit": "month",
                    "listedByUserId": 10
                }
                """;

        mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(100));
    }
}
