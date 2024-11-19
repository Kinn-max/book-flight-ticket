package com.bookflight.ticket.services;

import com.bookflight.ticket.dto.request.AirlineRequest;

import java.io.IOException;

public interface AirlineService {
    void createAirline(AirlineRequest airlineRequest) throws IOException;
    boolean deleteAirline(Long id);
}
