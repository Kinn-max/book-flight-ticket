package com.bookflight.ticket.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class InfoBookingResponse {
    List<SeatResponse> seatList;
    List<LuggageResponse> luggageList;
}
