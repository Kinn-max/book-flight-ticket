package com.bookflight.ticket.repositories;

import com.bookflight.ticket.models.PlaneEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaneRepository extends JpaRepository<PlaneEntity, Long> {
}
