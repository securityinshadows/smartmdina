package com.smartmdina.casamobile.services;

import com.smartmdina.casamobile.entities.EducationalService;
import com.smartmdina.casamobile.entities.Rating;
import com.smartmdina.casamobile.repositories.EducationalServiceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EducationalServiceService {

    private final EducationalServiceRepository educationalServiceRepository;

    public EducationalServiceService(EducationalServiceRepository educationalServiceRepository) {
        this.educationalServiceRepository = educationalServiceRepository;
    }

    public List<EducationalService> getAllEducationalServices() {
        return educationalServiceRepository.findAll();
    }

    public List<EducationalService> getEducationalServicesByType(String type) {
        return educationalServiceRepository.findByType(type);
    }

    public EducationalService createEducationalService(EducationalService educationalService) {
        return educationalServiceRepository.save(educationalService);
    }

    public void addRating(Long serviceId, Rating rating) {
        EducationalService service = educationalServiceRepository.findById(serviceId)
                .orElseThrow(() -> new IllegalArgumentException("Service not found"));
        service.addRating(rating);
        educationalServiceRepository.save(service);
    }
}
