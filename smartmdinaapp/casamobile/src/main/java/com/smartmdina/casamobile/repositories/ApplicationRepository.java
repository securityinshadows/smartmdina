package com.smartmdina.casamobile.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smartmdina.casamobile.entities.Application;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {}

