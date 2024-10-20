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
@Table(name = "luggage")

public class LuggageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "luggage_type", length = 50)
    private String luggageType;

    @Column(name = "weight")
    private double weight;

    @Column(name = "price")
    private double price;

//
    @ManyToOne
    @JoinColumn(name = "ticket_id")
    private TicketEntity ticketEntity;
}
