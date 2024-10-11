package com.bookflight.ticket.services;

import com.bookflight.ticket.dto.AirportDto;

public interface AirportService {
    void createAirport(AirportDto airportDto);
    boolean deleteAirport(Long id);
}
