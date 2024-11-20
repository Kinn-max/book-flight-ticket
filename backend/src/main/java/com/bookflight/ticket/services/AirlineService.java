package com.bookflight.ticket.services;

import com.bookflight.ticket.dto.request.AirlineRequest;
import com.bookflight.ticket.dto.response.AirlineResponse;

import java.io.IOException;
import java.util.List;

public interface AirlineService {
    void createAirline(AirlineRequest airlineRequest) throws IOException;
    boolean deleteAirline(Long id);
    List<AirlineResponse> getAllAirlines();
}
