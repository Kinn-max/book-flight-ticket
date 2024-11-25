package com.bookflight.ticket.dto.response;


import jakarta.persistence.Column;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TicketBookedInfoAdmin {
    private String clientName;
    private String clientEmail;
    private String clientPhone;
    private Double ticketPrice;
    private String luggageType;
    private LocalDate createAt;
}
