package com.bookflight.ticket.repositories;

import com.bookflight.ticket.models.TicketEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<TicketEntity, Long> {
}
