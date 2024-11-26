package com.bookflight.ticket.repositories;

import com.bookflight.ticket.models.SeatEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SeatRepository extends JpaRepository<SeatEntity, Long> {
    @Query("SELECT s.seatClass FROM SeatEntity s group by s.seatClass")
    List<String> getAllSeatClass();

    @Query("SELECT s FROM SeatEntity s WHERE s.flightEntity.id = :flightId AND s.seatClass = :seatClass AND s.available = true")
    List<SeatEntity> findByFlightId(long flightId, String seatClass);
}
