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
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

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
                .phone(ticketRequest.getPhone())
                .email(ticketRequest.getEmail())
                .name(ticketRequest.getName())
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
            sendEmail(bookedInfo, ticketRequest);
        }
    }

    public void sendEmail(TicketBookedInfo ticketBookedInfo, TicketRequest ticket) throws MessagingException {
        Map<String, Object> placeholders = new HashMap<>();
        placeholders.put("name", ticket.getName());
        placeholders.put("ticketId", ticketBookedInfo.getTicketId());
        placeholders.put("price", ticketBookedInfo.getPrice());
        placeholders.put("seatNumber", ticketBookedInfo.getSeatNumber());
        placeholders.put("flightCode", ticketBookedInfo.getFlightCode());
        placeholders.put("arrivalTime", ticketBookedInfo.getArrivalTime());
        placeholders.put("departureTime", ticketBookedInfo.getDepartureTime());
        placeholders.put("arrivalAirportName", ticketBookedInfo.getArrivalAirportName());
        placeholders.put("departureAirportName", ticketBookedInfo.getDepartureAirportName());
        placeholders.put("airlineName", ticketBookedInfo.getAirlineName());

        MailBody mailBody = MailBody.builder()
                .to(ticket.getEmail())
                .subject("Your Ticket Purchase Confirmation")
                .props(placeholders)
                .build();
        emailService.sendHtmlMail(mailBody, "email_template_ticketpurchase");
    }
}
