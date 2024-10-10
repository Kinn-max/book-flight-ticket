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
@Table(name = "ticket")
public class TicketEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "seat_class", length = 50)
    private String seatClass;

    @Column(name = "seat_number")
    private int seatNumber;

    @Column(name = "price")
    private double price;

    @Column(name = "flight_id")
    private Long flightId;

    //
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    @OneToMany(mappedBy = "ticketEntity", fetch = FetchType.LAZY)
    private List<LuggageEntity> luggageEntityList = new ArrayList<>();



}
