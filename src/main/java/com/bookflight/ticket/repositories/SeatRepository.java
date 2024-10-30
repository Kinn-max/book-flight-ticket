package com.bookflight.ticket.repositories;

import com.bookflight.ticket.models.SeatEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SeatRepository extends JpaRepository<SeatEntity, Long> {

}
