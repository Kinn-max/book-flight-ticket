package com.bookflight.ticket.services.impl;

import com.bookflight.ticket.dto.MailBody;
import com.bookflight.ticket.dto.request.TicketRequest;
import com.bookflight.ticket.dto.response.TicketBookedInfo;
import com.bookflight.ticket.models.*;
import com.bookflight.ticket.repositories.*;
import com.bookflight.ticket.services.EmailService;
import com.bookflight.ticket.services.TicketService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class TicketServiceImpl implements TicketService {
    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AirportRepository airportRepository;

    @Override
    public List<TicketBookedInfo> getBookedTicketInfo(Long id) throws Exception {
        UserEntity user = userRepository.findById(id).orElseThrow(() -> new Exception("User not found"));
        List<TicketBookedInfo> ticketBookedInfos = new ArrayList<>();
        List<TicketEntity> ticketEntityList = ticketRepository.findByUserEntity(user);
        for(TicketEntity ticketEntity : ticketEntityList){
            TicketBookedInfo bookedInfo = new TicketBookedInfo();
            bookedInfo.setTicketId(ticketEntity.getId());
            bookedInfo.setPrice(ticketEntity.getPrice());
            bookedInfo.setSeatNumber(ticketEntity.getSeat().getSeatNumber());
            bookedInfo.setFlightCode(ticketEntity.getFlightEntity().getCode());
            bookedInfo.setDepartureTime(ticketEntity.getFlightEntity().getDepartureTime());
            bookedInfo.setArrivalTime(ticketEntity.getFlightEntity().getArrivalTime());
            bookedInfo.setArrivalAirportName(airportRepository.findById(ticketEntity.getFlightEntity().getArrivalId()).get().getName());
            bookedInfo.setDepartureAirportName(airportRepository.findById(ticketEntity.getFlightEntity().getDepartureId()).get().getName());
            bookedInfo.setAirlineName(ticketEntity.getFlightEntity().getPlaneEntity().getAirlineEntity().getName());
            if(ticketEntity.getLuggageEntity() == null){
                bookedInfo.setLuggage(0);
            }else {
                bookedInfo.setLuggage(ticketEntity.getLuggageEntity().getWeight());
            }
            ticketBookedInfos.add(bookedInfo);
        }
        return ticketBookedInfos;
    }
}
