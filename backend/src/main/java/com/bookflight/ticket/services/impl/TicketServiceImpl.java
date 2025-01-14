package com.bookflight.ticket.services.impl;

import com.bookflight.ticket.converter.TicketConverter;
import com.bookflight.ticket.dto.MailBody;
import com.bookflight.ticket.dto.request.TicketRequest;
import com.bookflight.ticket.dto.response.TicketBookedInfo;
import com.bookflight.ticket.dto.response.TicketBookedInfoAdmin;
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
    private SeatRepository seatRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TicketConverter ticketConverter;
    @Override
    public List<TicketBookedInfo> getBookedTicketInfo(Long id) throws Exception {
        UserEntity user = userRepository.findById(id).orElseThrow(() -> new Exception("User not found"));
        List<TicketBookedInfo> ticketBookedInfos = new ArrayList<>();
        List<TicketEntity> ticketEntityList = ticketRepository.findByUserEntity(user);
        for(TicketEntity ticketEntity : ticketEntityList){
            TicketBookedInfo bookedInfo = ticketConverter.toTicketBookedInfo(ticketEntity);
            ticketBookedInfos.add(bookedInfo);
        }
        return ticketBookedInfos;
    }

    @Override
    public TicketBookedInfoAdmin getTicketBookedById(Long id) {
        SeatEntity seatEntity = seatRepository.findById(id).get();
        TicketEntity ticketEntity = seatEntity.getTicketEntity();
        TicketBookedInfoAdmin ticketBookedInfoAdmin = new TicketBookedInfoAdmin();
        ticketBookedInfoAdmin.setTicketPrice(ticketEntity.getPrice());
        ticketBookedInfoAdmin.setClientEmail(ticketEntity.getEmail());
        ticketBookedInfoAdmin.setClientPhone(ticketEntity.getPhone());
        ticketBookedInfoAdmin.setClientName(ticketEntity.getName());
        if(ticketEntity.getLuggageEntity() != null){
            ticketBookedInfoAdmin.setLuggageType(ticketEntity.getLuggageEntity().getLuggageType());
        } else {
            ticketBookedInfoAdmin.setLuggageType("Không có");
        }
        ticketBookedInfoAdmin.setCreateAt(ticketEntity.getCreateAt());
        return ticketBookedInfoAdmin;
    }

    @Override
    public TicketBookedInfo getDetailTicketById(Long id) {
        TicketEntity ticketEntity = ticketRepository.findById(id).get();
        TicketBookedInfo ticketBookedInfo = ticketConverter.toTicketBookedInfo(ticketEntity);
        return ticketBookedInfo;
    }
}
