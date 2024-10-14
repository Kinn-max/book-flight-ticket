package com.bookflight.ticket.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "plane")
public class PlaneEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "eco_class")
    private int ecoClass;

    @Column(name = "bus_class")
    private int busClass;

    @Column(name = "name")
    private String name;
    //
    @OneToMany(mappedBy = "planeEntity", fetch = FetchType.LAZY)
    private List<SeatEntity> seatEntityList = new ArrayList<>();

    @ManyToMany(mappedBy = "planeEntityList", fetch = FetchType.LAZY)
    private List<AirlineEntity> airlineEntityList = new ArrayList<>();

    @OneToMany(mappedBy = "planeEntity", fetch = FetchType.LAZY)
    private List<FlightEntity> flightEntityList = new ArrayList<>();
}
