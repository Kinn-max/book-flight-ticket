package com.bookflight.ticket.services;

import com.bookflight.ticket.dto.FlightDto;
import com.bookflight.ticket.dto.request.FlightRequest;
import com.bookflight.ticket.dto.response.FlightResponse;

import java.util.List;

public interface FlightService {
    void createFlight(FlightDto flightDto) throws Exception;
    List<FlightDto> searchFlight(FlightRequest flightRequest) throws Exception;
    FlightResponse getDetailFlight(Long id) throws Exception;
}
