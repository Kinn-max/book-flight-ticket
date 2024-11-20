package com.bookflight.ticket.services;

import com.bookflight.ticket.dto.AirportDto;
import com.bookflight.ticket.dto.response.AirportResponse;

import java.util.List;

public interface AirportService {
    void createAirport(AirportDto airportDto);
    boolean deleteAirport(Long id);
    List<AirportResponse> getAllAirports();
    AirportResponse getAirportById(Long id) throws Exception;
}
