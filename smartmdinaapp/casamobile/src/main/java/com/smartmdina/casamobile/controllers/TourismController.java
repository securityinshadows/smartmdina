package com.smartmdina.casamobile.controllers;

import com.smartmdina.casamobile.entities.Tourism;
import org.springframework.web.bind.annotation.*;
import com.smartmdina.casamobile.services.TourismService;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tourism")
@CrossOrigin(origins = "http://localhost:5173")
public class TourismController {

    @Autowired
    private final TourismService tourismService;

    public TourismController(TourismService tourismService) {
        this.tourismService = tourismService;
    }

    @GetMapping(produces = "application/json")
public List<Tourism> getAllTourism() {
    return tourismService.getAllTourism();
}

    @GetMapping("/{id}")
    public Optional<Tourism> getTourismById(@PathVariable Long id) {
        return tourismService.getTourismById(id);
    }

    @PostMapping
    public Tourism createTourism(@RequestBody Tourism tourism) {
        return tourismService.createTourism(tourism);
    }

    @PutMapping("/{id}")
    public Tourism updateTourism(@PathVariable Long id, @RequestBody Tourism updatedTourism) {
        return tourismService.updateTourism(id, updatedTourism);
    }

    @DeleteMapping("/{id}")
    public void deleteTourism(@PathVariable Long id) {
        tourismService.deleteTourism(id);
    }
}
