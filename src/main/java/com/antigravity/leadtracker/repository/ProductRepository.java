package com.antigravity.leadtracker.repository;

import com.antigravity.leadtracker.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE " +
           "(:category IS NULL OR LOWER(p.category) = LOWER(:category)) AND " +
           "(:destination IS NULL OR LOWER(p.destinationCountry) LIKE LOWER(CONCAT('%', :destination, '%'))) AND " +
           "(:query IS NULL OR LOWER(p.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.hsCode) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.listedBy.company) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Product> searchCatalog(
            @Param("category") String category,
            @Param("destination") String destination,
            @Param("query") String query
    );

    List<Product> findByListedById(Long userId);
}
