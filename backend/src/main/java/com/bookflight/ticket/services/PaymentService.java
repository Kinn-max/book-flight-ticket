package com.bookflight.ticket.services;

import com.bookflight.ticket.dto.request.TicketRequest;

public interface PaymentService {
    String createPayment(TicketRequest ticketRequest) throws Exception;
    void bookTicket(TicketRequest ticketRequest, Long id, Float vnp_Amount) throws  Exception;
}
