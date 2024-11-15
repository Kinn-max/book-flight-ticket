package com.bookflight.ticket.services;

import com.bookflight.ticket.dto.request.TicketRequest;
import com.bookflight.ticket.dto.response.TicketBookedInfo;

import java.util.List;

public interface TicketService {
    List<TicketBookedInfo>  getBookedTicketInfo(Long id) throws  Exception;
}
