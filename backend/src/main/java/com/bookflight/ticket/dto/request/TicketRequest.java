package com.bookflight.ticket.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class TicketRequest {
    @NotNull(message = "Seat class not null")
    private String seatCLass;

    @NotNull(message = "Flight not null")
    private Long flightId;

    private Long luggageId;

    @NotNull(message = "Name not null")
    private String name;

    @NotNull(message = "Phone not null")
    private String phone;

    @NotNull(message = "Email not null")
    private String email;

}
