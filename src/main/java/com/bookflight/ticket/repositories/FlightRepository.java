package com.bookflight.ticket.repositories;

import com.bookflight.ticket.models.FlightEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightRepository extends JpaRepository<FlightEntity,Long> {
}
