package com.smartmdina.casamobile.services;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

import com.smartmdina.casamobile.entities.Application;
import com.smartmdina.casamobile.entities.Job;
import com.smartmdina.casamobile.repositories.ApplicationRepository;
import com.smartmdina.casamobile.repositories.JobRepository;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository; // Inject JobRepository

    // Constructor for dependency injection
    public ApplicationService(ApplicationRepository applicationRepository, JobRepository jobRepository) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository; // Assign the JobRepository
    }

    // Method to fetch all applications
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    // Method to create an application
    public Application createApplication(String email, Long jobId) {
        // Retrieve the job using the injected jobRepository
        Job job = jobRepository.findById(jobId)
            .orElseThrow(() -> new RuntimeException("Job not found"));

        // Create a new application instance
        Application application = new Application();
        application.setEmail(email); // Set email instead of phone
        application.setJob(job); // Set the job object in the application
        application.setStatus("Pending");
        application.setCreatedAt(LocalDateTime.now());

        // Save the application to the database
        return applicationRepository.save(application);
    }
}

