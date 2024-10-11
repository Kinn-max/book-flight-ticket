package com.bookflight.ticket.repositories;

import com.bookflight.ticket.models.AirportEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AirportRepository extends JpaRepository<AirportEntity, Long> {
}
