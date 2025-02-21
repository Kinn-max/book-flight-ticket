package com.bookflight.ticket.repositories;

import com.bookflight.ticket.dto.response.TicketBookedInfo;
import com.bookflight.ticket.models.TicketEntity;
import com.bookflight.ticket.models.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

import java.util.List;

public interface TicketRepository extends JpaRepository<TicketEntity, Long> {
    List<TicketEntity> findByUserEntity(UserEntity userEntity);
    @Query("SELECT new com.bookflight.ticket.dto.response.TicketBookedInfo" +
            "(e.id, e.price, e.seat.seatNumber, e.flightEntity.code, e.flightEntity.arrivalTime, e.flightEntity.departureTime, a.name, d.name, e.flightEntity.planeEntity.airlineEntity.name) " +
            "FROM TicketEntity e " +
            "JOIN AirportEntity a ON e.flightEntity.arrivalId = a.id " +
            "JOIN AirportEntity d ON e.flightEntity.departureId = d.id " +
            "WHERE e.userEntity.id = :userId " +
            "ORDER BY e.id DESC")
    List<TicketBookedInfo> findByUserId(Long userId);


}
