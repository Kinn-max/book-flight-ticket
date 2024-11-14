package com.bookflight.ticket.controllers;

import com.bookflight.ticket.configuration.JWTHelper;
import com.bookflight.ticket.dto.FlightDto;
import com.bookflight.ticket.dto.request.TicketRequest;
import com.bookflight.ticket.dto.response.TicketBookedInfo;
import com.bookflight.ticket.models.UserEntity;
import com.bookflight.ticket.services.TicketService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/ticket")
public class TicketController {
    @Autowired
    private JWTHelper jwtHelper;
    @Autowired
    private TicketService ticketService;
    @PostMapping("/book")
    public ResponseEntity<?> bookFlight(@Valid @RequestBody TicketRequest ticketRequest, BindingResult result, HttpServletRequest request) {
        try {
            if (result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .collect(Collectors.toList());
                return ResponseEntity.badRequest().body(errorMessages);
            }
            String token = request.getHeader("Authorization").substring(7);
            Long userId = jwtHelper.extractUserId(token);
            if(userId == null){
                return ResponseEntity.badRequest().body("You need to log in first!");
            }
            ticketService.bookTicket(ticketRequest, userId);
            return ResponseEntity.ok().body("Booking flight successful");
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/by-user")
    public ResponseEntity<?> getAllTickedByUserId( HttpServletRequest request) {
        try {
            String token = request.getHeader("Authorization").substring(7);
            Long userId = jwtHelper.extractUserId(token);
            if(userId == null){
                return ResponseEntity.badRequest().body("You need to log in first!");
            }
            List<TicketBookedInfo> bookedInfoList = ticketService.getBookedTicketInfo(userId);
            return ResponseEntity.ok().body(bookedInfoList);
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
