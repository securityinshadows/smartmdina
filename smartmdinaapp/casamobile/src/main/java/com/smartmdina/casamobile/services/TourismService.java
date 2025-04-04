package com.smartmdina.casamobile.services;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import com.smartmdina.casamobile.repositories.TourismRepository;
import com.smartmdina.casamobile.entities.Tourism;

@Service
public class TourismService {

    private final TourismRepository tourismRepository;

    public TourismService(TourismRepository tourismRepository) {
        this.tourismRepository = tourismRepository;
    }

    public List<Tourism> getAllTourism() {
        return tourismRepository.findAll();
    }

    public Optional<Tourism> getTourismById(Long id) {
        return tourismRepository.findById(id);
    }

    public Tourism createTourism(Tourism tourism) {
        return tourismRepository.save(tourism);
    }

    public Tourism updateTourism(Long id, Tourism updatedTourism) {
        return tourismRepository.findById(id).map(existingTourism -> {
            existingTourism.setTitle(updatedTourism.getTitle());
            existingTourism.setType(updatedTourism.getType());
            existingTourism.setImage(updatedTourism.getImage());
            existingTourism.setBody(updatedTourism.getBody());
            existingTourism.setDescription(updatedTourism.getDescription());
            existingTourism.setAddress(updatedTourism.getAddress());
            existingTourism.setTags(updatedTourism.getTags());
            existingTourism.setRating(updatedTourism.getRating());
            return tourismRepository.save(existingTourism);
        }).orElseThrow(() -> new RuntimeException("Tourism entry not found"));
    }

    public void deleteTourism(Long id) {
        tourismRepository.deleteById(id);
    }
}
