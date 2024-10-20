package com.bookflight.ticket.repositories;

import com.bookflight.ticket.models.AirportEntity;
import com.bookflight.ticket.models.FlightEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface FlightRepository extends JpaRepository<FlightEntity,Long> {

}
