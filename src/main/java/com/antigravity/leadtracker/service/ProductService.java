package com.antigravity.leadtracker.service;

import com.antigravity.leadtracker.dto.ProductDTO;
import com.antigravity.leadtracker.dto.ProductRequestDTO;
import com.antigravity.leadtracker.dto.UserDTO;

import java.util.List;

public interface ProductService {
    List<ProductDTO> getCatalog(String category, String query);
    ProductDTO getProductById(Long id);
    ProductDTO createProduct(ProductRequestDTO requestDTO);
    List<UserDTO> getLeadsForProduct(Long productId);
}
