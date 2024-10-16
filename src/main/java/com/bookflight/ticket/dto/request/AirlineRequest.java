package com.bookflight.ticket.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class AirlineRequest {
    @NotEmpty(message = "Name cannot empty")
    @JsonProperty("airline_name")
    private String airlineName;
}
