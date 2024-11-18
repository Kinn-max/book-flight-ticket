package com.bookflight.ticket.services;

import com.bookflight.ticket.dto.request.AirlineRequest;

public interface AirlineService {
    void createAirline(AirlineRequest airlineRequest);
    boolean deleteAirline(Long id);
}
