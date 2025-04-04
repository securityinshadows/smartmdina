package com.smartmdina.casamobile.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.smartmdina.casamobile.entities.Tourism;

@Repository
public interface TourismRepository extends JpaRepository<Tourism, Long> {
}
