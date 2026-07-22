package com.antigravity.leadtracker.controller;

import com.antigravity.leadtracker.dto.ProductDTO;
import com.antigravity.leadtracker.dto.ProductRequestDTO;
import com.antigravity.leadtracker.dto.UserDTO;
import com.antigravity.leadtracker.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:3000}", allowCredentials = "true")
public class ProductCatalogController {

    private final ProductService productService;

    public ProductCatalogController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getCatalog(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String destination,
            @RequestParam(required = false) String query) {
        List<ProductDTO> products = productService.getCatalog(category, destination, query);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        ProductDTO product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductRequestDTO requestDTO) {
        ProductDTO createdProduct = productService.createProduct(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    @GetMapping("/{id}/leads")
    public ResponseEntity<List<UserDTO>> getLeadsForProduct(@PathVariable Long id) {
        List<UserDTO> leads = productService.getLeadsForProduct(id);
        return ResponseEntity.ok(leads);
    }
}
