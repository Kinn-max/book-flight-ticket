package com.bookflight.ticket.dto.response;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class FlightResponse {
    private Long id;
    private String codeFlight;
    private Date departureTime;
    private Date arrivalTime;
    private String departureAirport;
    private String departureLocation;
    private String arrivalLocation;
    private String arrivalAirport;
    private String airline;
    private PlaneResponse plane;
    private double ecoPrice;
    private double busPrice;
    List<SeatResponse> seats;

}
