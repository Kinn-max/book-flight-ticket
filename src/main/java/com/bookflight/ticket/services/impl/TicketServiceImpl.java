package com.bookflight.ticket.services.impl;

import com.bookflight.ticket.dto.request.TicketRequest;
import com.bookflight.ticket.models.FlightEntity;
import com.bookflight.ticket.models.TicketEntity;
import com.bookflight.ticket.models.UserEntity;
import com.bookflight.ticket.repositories.FlightRepository;
import com.bookflight.ticket.repositories.TicketRepository;
import com.bookflight.ticket.repositories.UserRepository;
import com.bookflight.ticket.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TicketServiceImpl implements TicketService {
    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private FlightRepository flightRepository;
    @Autowired
    private UserRepository userRepository;
    @Override
    public void bookTicket(TicketRequest ticketRequest, Long id) throws  Exception{
        UserEntity user = userRepository.findById(id).get();
        FlightEntity flight = flightRepository.findById(ticketRequest.getFlightId()).orElseThrow( ()-> new Exception("Flight not found") );
        TicketEntity ticketEntity = TicketEntity.builder()
                .flightEntity(flight)
                .userEntity(user)
                .seatId(ticketRequest.getSeatId())
                .build();
        ticketRepository.save(ticketEntity);

    }
}
