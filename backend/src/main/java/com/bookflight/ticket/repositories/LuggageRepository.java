package com.bookflight.ticket.repositories;

import com.bookflight.ticket.models.LuggageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LuggageRepository extends JpaRepository<LuggageEntity, Long> {
}
