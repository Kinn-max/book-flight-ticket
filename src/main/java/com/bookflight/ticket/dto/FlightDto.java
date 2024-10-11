package com.bookflight.ticket.dto;


import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FlightDto {
    private Long id;
    private String code;
    private Date arrivalTime;
    private Date departureTime;
    private Long arrivalId;
    private Long departureId;
}
