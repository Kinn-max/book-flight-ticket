package com.bookflight.ticket.repositories;

import com.bookflight.ticket.models.AirportEntity;
import com.bookflight.ticket.models.FlightEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface FlightRepository extends JpaRepository<FlightEntity,Long> {
    @Query("SELECT f FROM  FlightEntity f WHERE f.departureId = :departureAirport AND f.arrivalId = :arrivalAirport AND FUNCTION('DATE', f.departureTime) = :date AND f.departureTime > CURRENT_TIMESTAMP")
    List<FlightEntity> searchFlight(Long departureAirport, Long arrivalAirport, Date date);
    List<FlightEntity> findAllByStatus(Boolean status);
 }
