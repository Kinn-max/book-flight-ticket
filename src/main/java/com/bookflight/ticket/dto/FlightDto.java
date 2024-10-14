package com.bookflight.ticket.dto;


import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FlightDto {
    private Long id;

    @NotBlank(message = "Code flight cannot be blank! ")
    private String code;

    @NotNull(message = "Arrival time cannot be null")
    private String arrivalTime;

    @NotNull(message = "Departure time cannot be null")
    private String departureTime;

    private Long arrivalId;

    private Long departureId;
    private Long planeId;
    private List<AirportDto> airportDtoList;
}
