package com.bookflight.ticket.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class InfoSearchResponse {
    private List<AirportResponse> departureAirports;
    private List<AirportResponse> arrivalAirports;
}
