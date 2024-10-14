package com.bookflight.ticket.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class AirlineRequest {
    @NotEmpty(message = "Name cannot empty")
    private String airlineName;
}
