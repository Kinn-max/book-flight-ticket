package com.bookflight.ticket.services;

import com.bookflight.ticket.dto.FlightDto;

public interface FlightService {
    void createFlight(FlightDto flightDto) throws Exception;
}
