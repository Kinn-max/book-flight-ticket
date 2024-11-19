package com.bookflight.ticket.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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
@Table(name = "ticket")
public class TicketEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "price")
    private double price;

    @Column(name = "name")
    private String name;

    @Column(name = "phone")
    private String phone;

    @Column(name = "email")
    private String email;

    //
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    @ManyToOne
    @JoinColumn(name = "luggage_id")
    private LuggageEntity luggageEntity;

    @ManyToOne
    @JoinColumn(name = "flight_id")
    private FlightEntity flightEntity;

    @ManyToOne
    @JoinColumn(name = "seat_id")
    private SeatEntity seat;
}