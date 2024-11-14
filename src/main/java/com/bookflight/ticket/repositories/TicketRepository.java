package com.bookflight.ticket.repositories;

import com.bookflight.ticket.models.TicketEntity;
import com.bookflight.ticket.models.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<TicketEntity, Long> {
    List<TicketEntity> findByUserEntity(UserEntity userEntity);
}
