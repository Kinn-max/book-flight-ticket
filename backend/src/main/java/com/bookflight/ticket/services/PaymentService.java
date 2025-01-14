package com.bookflight.ticket.services;

import com.bookflight.ticket.dto.request.TicketBookingRequest;
import com.bookflight.ticket.dto.request.TicketRequest;
import com.bookflight.ticket.dto.response.InfoBookingResponse;

public interface PaymentService {
    String createPayment(TicketRequest ticketRequest) throws Exception;
    void bookTicket(TicketBookingRequest ticketRequest, Long id, Float vnp_Amount) throws  Exception;
}
