package com.bookflight.ticket.dto.response;

import lombok.Data;

@Data
public class SeatResponse {
    private Long id;
    private String seatNumber;
    private String seatClass;
    private boolean available;

}
