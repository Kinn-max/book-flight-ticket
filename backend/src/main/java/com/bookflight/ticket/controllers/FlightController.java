package com.bookflight.ticket.controllers;


import com.bookflight.ticket.dto.AirportDto;
import com.bookflight.ticket.dto.FlightDto;
import com.bookflight.ticket.dto.request.FlightRequest;
import com.bookflight.ticket.dto.response.FlightResponse;
import com.bookflight.ticket.dto.response.InfoSearchResponse;
import com.bookflight.ticket.services.FlightService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/flight")
public class FlightController {
    @Autowired
    private FlightService flightService;
    @PostMapping("/create")
    public ResponseEntity<?> createFlight (@Valid @RequestBody FlightDto flightDto, BindingResult result) {
        try {
            if (result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .collect(Collectors.toList());
                return ResponseEntity.badRequest().body(errorMessages);
            }
            flightService.createFlight(flightDto);
            return ResponseEntity.ok("Flight created !");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/search")
    public ResponseEntity<?> getInfoSearch () {
        try {
            InfoSearchResponse infoSearchResponse = flightService.getInfoSearch();
            return ResponseEntity.ok(infoSearchResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/search")
    public ResponseEntity<?> searchFlight (@Valid @RequestBody FlightRequest flightRequest, BindingResult result) {
        try {
            if (result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .collect(Collectors.toList());
                return ResponseEntity.badRequest().body(errorMessages);
            }
            List<FlightResponse> flightResponses = flightService.searchFlights(flightRequest);
            return ResponseEntity.ok(flightResponses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getDetailFlight (@PathVariable Long id) {
        try {
            FlightResponse detailFlightResponse = flightService.getDetailFlight(id);
            return  ResponseEntity.ok(detailFlightResponse);
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllFlights() {
        try {
            List<FlightResponse> flightResponses = flightService.getAllFlights();
            return ResponseEntity.ok(flightResponses);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
