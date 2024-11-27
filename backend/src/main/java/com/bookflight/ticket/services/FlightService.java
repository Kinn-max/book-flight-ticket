package com.bookflight.ticket.services;

import com.bookflight.ticket.dto.FlightDto;
import com.bookflight.ticket.dto.request.FlightRequest;
import com.bookflight.ticket.dto.response.FlightResponse;
import com.bookflight.ticket.dto.response.InfoBookingResponse;

import java.util.List;

public interface FlightService {
    void createFlight(FlightDto flightDto) throws Exception;
    FlightResponse getDetailFlight(Long id) throws Exception;
    List<FlightResponse> searchFlights(FlightRequest flightRequest) throws Exception;
    List<FlightResponse> getAllFlightsByUser() throws Exception;
    List<FlightResponse> getAllFlightsByAdmin() throws Exception;
    void setStatusFlight(Long id) throws Exception;
    List<FlightResponse> getAllFlightByCode(String code);
    InfoBookingResponse getInfoFlight(String flightId, String seatClass);
}
