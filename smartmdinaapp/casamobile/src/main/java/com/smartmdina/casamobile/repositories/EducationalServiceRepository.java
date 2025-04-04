package com.smartmdina.casamobile.repositories;

import com.smartmdina.casamobile.entities.EducationalService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EducationalServiceRepository extends JpaRepository<EducationalService, Long> {
    List<EducationalService> findByType(String type);

}
