package com.bookflight.ticket.services;

import com.bookflight.ticket.dto.request.TicketRequest;

public interface TicketService {
    void bookTicket(TicketRequest ticketRequest, Long id) throws  Exception ;
}
