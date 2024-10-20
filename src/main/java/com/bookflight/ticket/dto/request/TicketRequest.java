package com.bookflight.ticket.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class TicketRequest {
    @JsonProperty("seat_id")
    @NotNull(message = "Seat not null")
    private Long seatId;

    @JsonProperty("flight_id")
    @NotNull(message = "Flight not null")
    private Long flightId;

    @JsonProperty("luggage_list")
    private List<LuggageRequest> luggageRequests;

}
