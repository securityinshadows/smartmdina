package com.smartmdina.casamobile.controllers;
import com.smartmdina.casamobile.entities.CityMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.smartmdina.casamobile.services.CityMapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;

@RestController
@RequestMapping("/api/citymaps")
public class CityMapController {
    @Autowired
    private CityMapService cityMapService;
    public CityMapController(CityMapService cityMapService) {
        this.cityMapService = cityMapService;
    }
    @GetMapping
    public List<CityMap> getAllCityMaps() {
        return cityMapService.getAllCityMaps();
    }
    @PostMapping
    public CityMap createCityMap(@RequestBody CityMap cityMap) {
        return cityMapService.createCityMap(cityMap);
    }
}