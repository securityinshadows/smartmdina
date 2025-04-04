package com.smartmdina.casamobile.controllers;

import com.smartmdina.casamobile.entities.EducationalService;
import com.smartmdina.casamobile.entities.Rating;
import com.smartmdina.casamobile.services.EducationalServiceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/educationalservices")
public class EducationalServiceController {

    private final EducationalServiceService educationalServiceService;

    public EducationalServiceController(EducationalServiceService educationalServiceService) {
        this.educationalServiceService = educationalServiceService;
    }

    @GetMapping
    public ResponseEntity<List<EducationalService>> getAllEducationalServices(
            @RequestParam(value = "type", required = false) String type) {
        if (type != null) {
            return ResponseEntity.ok(educationalServiceService.getEducationalServicesByType(type));
        }
        return ResponseEntity.ok(educationalServiceService.getAllEducationalServices());
    }

    @PostMapping
    public ResponseEntity<EducationalService> createEducationalService(@RequestBody EducationalService educationalService) {
        return ResponseEntity.ok(educationalServiceService.createEducationalService(educationalService));
    }

    @PostMapping("/{id}/ratings")
    public ResponseEntity<Void> addRating(@PathVariable Long id, @RequestBody Rating rating) {
        educationalServiceService.addRating(id, rating);
        return ResponseEntity.ok().build();
    }
}
