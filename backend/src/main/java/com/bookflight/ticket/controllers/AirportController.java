package com.bookflight.ticket.controllers;


import com.bookflight.ticket.dto.AirportDto;
import com.bookflight.ticket.dto.response.APIResponse;
import com.bookflight.ticket.dto.response.AirportResponse;
import com.bookflight.ticket.services.AirportService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/airport")
public class AirportController {
    @Autowired
    private AirportService airportService;
    @PostMapping("/create")
    public ResponseEntity<?> createAirport (@Valid @RequestBody AirportDto airportDto,
                                         BindingResult result) {
        try {
            if (result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .collect(Collectors.toList());
                return ResponseEntity.badRequest().body(errorMessages);
            }
            airportService.createAirport(airportDto);
            return ResponseEntity.ok("Airport created !");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @DeleteMapping("/delete/{id}")
    public APIResponse<String> deleteAirport(@PathVariable("id") Long id) {
        boolean checkDelete = airportService.deleteAirport(id);
        APIResponse<String> apiResponse = new APIResponse();
        if (checkDelete) {
            apiResponse.setCode(200);
            apiResponse.setMessage("Delete successfully");
            return apiResponse;
        }
        apiResponse.setCode(400);
        apiResponse.setMessage("Delete failed");
        return apiResponse;
    }

    @GetMapping("")
    public ResponseEntity<?> getAllAirports () {
        try {
            List<AirportResponse> airportResponseList = airportService.getAllAirports();
            return ResponseEntity.ok(airportResponseList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
