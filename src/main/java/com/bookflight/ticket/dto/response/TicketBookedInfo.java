package com.bookflight.ticket.dto.response;

import lombok.Data;

import java.util.Date;

@Data
public class TicketBookedInfo {
    private Long ticketId;
    private double price;
    private String seatNumber;
    private String flightCode;
    private Date arrivalTime;
    private Date departureTime;
    private String arrivalAirportName;
    private String departureAirportName;
    private String airlineName;
    private double luggage;
}
