package com.antigravity.leadtracker.repository;

import com.antigravity.leadtracker.model.User;
import com.antigravity.leadtracker.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    List<User> findByRole(UserRole role);

    @Query("SELECT u FROM User u WHERE " +
           "(:role IS NULL OR u.role = :role) AND " +
           "(:query IS NULL OR LOWER(u.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(u.company) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<User> searchUsers(@Param("role") UserRole role, @Param("query") String query);
}
