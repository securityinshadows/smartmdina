package com.smartmdina.casamobile.services;
import org.springframework.stereotype.Service;
import java.util.List;
import com.smartmdina.casamobile.repositories.CityMapRepository;
import com.smartmdina.casamobile.entities.CityMap;

@Service
public class CityMapService {
    private final CityMapRepository cityMapRepository;

    public CityMapService(CityMapRepository cityMapRepository) {
        this.cityMapRepository = cityMapRepository;
    }

    public List<CityMap> getAllCityMaps() {
        return cityMapRepository.findAll();
    }

    public CityMap createCityMap(CityMap cityMap) {
        return cityMapRepository.save(cityMap);
    }
}