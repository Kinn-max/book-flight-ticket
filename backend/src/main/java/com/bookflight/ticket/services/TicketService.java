package com.bookflight.ticket.services;

import com.bookflight.ticket.dto.request.TicketRequest;
import com.bookflight.ticket.dto.response.TicketBookedInfo;
import com.bookflight.ticket.dto.response.TicketBookedInfoAdmin;

import java.util.List;

public interface TicketService {
    List<TicketBookedInfo>  getBookedTicketInfo(Long id) throws  Exception;
    TicketBookedInfoAdmin getTicketBookedById(Long id);
    TicketBookedInfo getDetailTicketById(Long id);
}
