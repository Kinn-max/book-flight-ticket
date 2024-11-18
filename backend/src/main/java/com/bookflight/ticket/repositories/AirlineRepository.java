package com.bookflight.ticket.repositories;

import com.bookflight.ticket.models.AirlineEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AirlineRepository extends JpaRepository<AirlineEntity, Long> {
}
