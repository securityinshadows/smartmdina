package com.smartmdina.casamobile.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.smartmdina.casamobile.entities.News;

public interface NewsRepository extends JpaRepository<News, Long> {
}
