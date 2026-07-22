package com.antigravity.leadtracker.repository;

import com.antigravity.leadtracker.model.Lead;
import com.antigravity.leadtracker.model.LeadStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {

    List<Lead> findByStatus(LeadStatus status);

    @Query("SELECT l FROM Lead l WHERE " +
           "(:status IS NULL OR l.status = :status) AND " +
           "(:query IS NULL OR LOWER(l.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(l.email) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(l.company) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Lead> searchLeads(@Param("status") LeadStatus status, @Param("query") String query);

    @Query("SELECT COUNT(l) FROM Lead l WHERE l.status = :status")
    long countByStatus(@Param("status") LeadStatus status);

    @Query("SELECT COALESCE(SUM(l.estimatedValue), 0) FROM Lead l WHERE l.status NOT IN ('LOST')")
    BigDecimal sumTotalPipelineValue();
}
