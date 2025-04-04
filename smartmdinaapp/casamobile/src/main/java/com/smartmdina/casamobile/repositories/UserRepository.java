package com.smartmdina.casamobile.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import com.smartmdina.casamobile.entities.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional <User> findByUsername(String username);
    User findByEmail(String email);
}
