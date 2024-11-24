package com.bookflight.ticket.dto.response;


import lombok.Data;

@Data
public class TicketBookedInfoAdmin {
    private String clientName;
    private String clientEmail;
    private String clientPhone;
    private Double ticketPrice;
    private String luggageType;
}
