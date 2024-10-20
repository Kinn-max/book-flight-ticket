package com.bookflight.ticket.dto.request;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Data
public class FlightRequest {
    @NotNull
    @JsonProperty("departure_airport_name")
    private String departureAirportName;

    @JsonProperty("arrival_airport_name")
    private String arrivalAirportName;

    @JsonProperty("departure_time")
    private Date departureTime;

    private String airline;

}
