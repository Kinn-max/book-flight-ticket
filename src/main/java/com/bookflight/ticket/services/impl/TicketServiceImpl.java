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
    private FlightRepository flightRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private LuggageRepository luggageRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private AirportRepository airportRepository;

    @Override
    public void bookTicket(TicketRequest ticketRequest, Long id) throws  Exception{
        UserEntity user = userRepository.findById(id).get();
        FlightEntity flight = flightRepository.findById(ticketRequest.getFlightId()).orElseThrow( ()-> new Exception("Flight not found") );

        SeatEntity seat = seatRepository.findById(ticketRequest.getSeatId()).orElseThrow(() -> new Exception("Seat not found or unavailable"));

        double price = 0;
        if(seat.isAvailable()){
            price = seat.getSeatClass().equals("Economy Class") ? flight.getEcoPrice() : flight.getBusPrice();
        } else {
            throw new Exception("Seat not available");
        }

        LuggageEntity luggageEntity = null;
        if(ticketRequest.getLuggageId() != null){
            luggageEntity = luggageRepository.findById(ticketRequest.getLuggageId()).orElseThrow(() -> new Exception("Luggage not found"));
            price += luggageEntity.getPrice();
        }

        TicketEntity ticketEntity = TicketEntity.builder()
                .flightEntity(flight)
                .userEntity(user)
                .seatId(ticketRequest.getSeatId())
                .price(price)
                .luggageEntity(luggageEntity)
                .build();
        TicketEntity result = ticketRepository.save(ticketEntity);
        if(result.getId() != null){
            seat.setAvailable(false);
            seatRepository.save(seat);

            TicketBookedInfo bookedInfo = new TicketBookedInfo();
            bookedInfo.setTicketId(result.getId());
            bookedInfo.setPrice(result.getPrice());
            bookedInfo.setSeatNumber(seatRepository.findById(ticketRequest.getSeatId()).get().getSeatNumber());
            bookedInfo.setFlightCode(result.getFlightEntity().getCode());
            bookedInfo.setDepartureTime(result.getFlightEntity().getDepartureTime());
            bookedInfo.setArrivalTime(result.getFlightEntity().getArrivalTime());
            bookedInfo.setArrivalAirportName(airportRepository.findById(result.getFlightEntity().getArrivalId()).get().getName());
            bookedInfo.setDepartureAirportName(airportRepository.findById(result.getFlightEntity().getDepartureId()).get().getName());
            bookedInfo.setAirlineName(result.getFlightEntity().getPlaneEntity().getAirlineEntity().getName());
            if(result.getLuggageEntity() == null){
                bookedInfo.setLuggage(0);
            }else {
                bookedInfo.setLuggage(luggageEntity.getWeight());
            }
            sendEmail(bookedInfo, user);
        }
    }

    @Override
    public List<TicketBookedInfo> getBookedTicketInfo(Long id) throws Exception {
        UserEntity user = userRepository.findById(id).orElseThrow(() -> new Exception("User not found"));
        List<TicketBookedInfo> ticketBookedInfos = new ArrayList<>();
        List<TicketEntity> ticketEntityList = ticketRepository.findByUserEntity(user);
        for(TicketEntity ticketEntity : ticketEntityList){
            TicketBookedInfo bookedInfo = new TicketBookedInfo();
            bookedInfo.setTicketId(ticketEntity.getId());
            bookedInfo.setPrice(ticketEntity.getPrice());
            bookedInfo.setSeatNumber(seatRepository.findById(ticketEntity.getSeatId()).get().getSeatNumber());
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


    public void sendEmail(TicketBookedInfo ticketBookedInfo, UserEntity user) throws MessagingException {
        Map<String, Object> placeholders = new HashMap<>();
        placeholders.put("name", user.getFullName());
        placeholders.put("ticketId", ticketBookedInfo.getTicketId());
        placeholders.put("price", ticketBookedInfo.getPrice());
        placeholders.put("seatNumber", ticketBookedInfo.getSeatNumber());
        placeholders.put("flightCode", ticketBookedInfo.getFlightCode());
        placeholders.put("arrivalTime", ticketBookedInfo.getArrivalTime());
        placeholders.put("departureTime", ticketBookedInfo.getDepartureTime());
        placeholders.put("arrivalAirportName", ticketBookedInfo.getArrivalAirportName());
        placeholders.put("departureAirportName", ticketBookedInfo.getDepartureAirportName());
        placeholders.put("airlineName", ticketBookedInfo.getAirlineName());
        placeholders.put("luggage", ticketBookedInfo.getLuggage());

        MailBody mailBody = MailBody.builder()
                .to(user.getEmail())
                .subject("Your Ticket Purchase Confirmation")
                .props(placeholders)
                .build();
        emailService.sendHtmlMail(mailBody, "email_template_ticketpurchase");
    }
}
