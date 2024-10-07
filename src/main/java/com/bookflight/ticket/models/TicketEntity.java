package com.bookflight.ticket.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "flight_id")
    private Long flightId;
}
