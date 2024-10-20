package com.bookflight.ticket.services.impl;

import com.bookflight.ticket.converter.FlightConverter;
import com.bookflight.ticket.dto.AirportDto;
import com.bookflight.ticket.dto.FlightDto;
import com.bookflight.ticket.dto.request.FlightRequest;
import com.bookflight.ticket.dto.response.FlightResponse;
import com.bookflight.ticket.models.AirportEntity;
import com.bookflight.ticket.models.FlightEntity;
import com.bookflight.ticket.models.PlaneEntity;
import com.bookflight.ticket.repositories.FlightRepository;
import com.bookflight.ticket.repositories.PlaneRepository;
import com.bookflight.ticket.services.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class FlightServiceImpl implements FlightService {
    @Autowired
    private PlaneRepository planeRepository;
    @Autowired
    private FlightRepository flightRepository;
    @Autowired
    private FlightConverter flightConverter;
    @Override
    public void createFlight(FlightDto flightDto) throws Exception {
        PlaneEntity planeEntity = planeRepository.findById(flightDto.getPlaneId())
                .orElseThrow(() -> new RuntimeException("Plane not found"));

        List<AirportEntity> airportEntityList = new ArrayList<>();
        List<AirportDto> airportDtoList = flightDto.getAirportDtoList();

        if (airportDtoList != null) {
            for (AirportDto airportDto : airportDtoList) {
                AirportEntity airportEntity = new AirportEntity();
                airportEntity.setId(airportDto.getId());
                airportEntity.setName(airportDto.getName());
                airportEntity.setLocation(airportDto.getLocation());
                airportEntityList.add(airportEntity);
            }
        }

        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
        try {
            Date departureTime = formatter.parse(flightDto.getDepartureTime());
            Date arrivalTime = formatter.parse(flightDto.getArrivalTime());

            FlightEntity flightEntity = FlightEntity.builder()
                    .departureTime(departureTime)
                    .arrivalTime(arrivalTime)
                    .code(flightDto.getCode())
                    .departureId(flightDto.getDepartureId())
                    .arrivalId(flightDto.getArrivalId())
                    .planeEntity(planeEntity)
                    .airportEntityList(airportEntityList)
                    .build();
            flightRepository.save(flightEntity);

        } catch (ParseException e) {
            throw new RuntimeException("Error parsing date: " + e.getMessage());
        }
    }

    @Override
    public List<FlightDto> searchFlight(FlightRequest flightRequest) throws Exception {
        return null;
    }

    @Override
    public FlightResponse getDetailFlight(Long id) throws Exception {
        FlightEntity flightEntity = flightRepository.findById(id).orElseThrow(() -> new Exception("Flight not found !"));
        FlightResponse  flightResponse = flightConverter.toFlightResponse(flightEntity);
        return flightResponse;
    }

}