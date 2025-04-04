package com.smartmdina.casamobile.controllers;

import com.smartmdina.casamobile.entities.Application;
import com.smartmdina.casamobile.services.ApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:5173")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    // Endpoint to get all applications
    @GetMapping
    public ResponseEntity<List<Application>> getAllApplications() {
        return ResponseEntity.ok(applicationService.getAllApplications());
    }

    // Endpoint to create a new application
    @PostMapping("/apply")
    public ResponseEntity<Application> createApplication(
            @RequestParam("email") String email, // Email field
            @RequestParam("jobId") Long jobId // Job ID from the frontend
    ) {
        try {
            // Call the service method to create the application
            Application createdApplication = applicationService.createApplication(email, jobId);
            return ResponseEntity.ok(createdApplication);
        } catch (RuntimeException e) {
            // Handle job not found or other business logic errors
            return ResponseEntity.status(404).body(null);
        }
    }
}


