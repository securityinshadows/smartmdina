package com.smartmdina.casamobile.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "citymaps")
public class CityMap {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mapId;

    @Column(nullable = false)
    private String mapName;

    @Lob
    @Column(nullable = false)
    private String mapData;

    
}
