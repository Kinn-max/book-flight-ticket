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
@Table(name = "seat")
public class SeatEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "seat_number")
    private int seatNumber;

    @Column(name = "seat_class", length = 50)
    private String seatClass;

    //
    @ManyToOne
    @JoinColumn(name = "plane_id")
    private PlaneEntity planeEntity;
}