package com.bookflight.ticket.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "flight")

public class FlightEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "arrival_time")
    private Date arrivalTime;

    @Column(name = "departure_time")
    private Date departureTime;

    @Column(name = "arrival_id")
    private Long arrivalId;

    @Column(name = "departure_id")
    private Long departureId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "plane_id", referencedColumnName = "id")
    private PlaneEntity planeEntity;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ticket_id", referencedColumnName = "id")
    private TicketEntity ticketEntity;
    //
    @ManyToMany(mappedBy = "flightEntityList", fetch = FetchType.LAZY)
    private List<AirportEntity> airportEntityList = new ArrayList<>();



}
