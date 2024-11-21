package com.bookflight.ticket.services.impl;

import com.bookflight.ticket.converter.FlightConverter;
import com.bookflight.ticket.dto.AirportDto;
import com.bookflight.ticket.dto.FlightDto;
import com.bookflight.ticket.dto.request.FlightRequest;
import com.bookflight.ticket.dto.response.AirportResponse;
import com.bookflight.ticket.dto.response.FlightResponse;
import com.bookflight.ticket.models.AirportEntity;
import com.bookflight.ticket.models.FlightEntity;
import com.bookflight.ticket.models.PlaneEntity;
import com.bookflight.ticket.models.SeatEntity;
import com.bookflight.ticket.repositories.AirportRepository;
import com.bookflight.ticket.repositories.FlightRepository;
import com.bookflight.ticket.repositories.PlaneRepository;
import com.bookflight.ticket.repositories.SeatRepository;
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
    @Autowired
    private AirportRepository airportRepository;
    @Autowired
    private SeatRepository seatRepository;
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
                    .id(flightDto.getId())
                    .departureTime(departureTime)
                    .arrivalTime(arrivalTime)
                    .code(flightDto.getCode())
                    .departureId(flightDto.getDepartureId())
                    .arrivalId(flightDto.getArrivalId())
                    .planeEntity(planeEntity)
                    .busPrice(flightDto.getBusPrice())
                    .ecoPrice(flightDto.getEcoPrice())
                    .airportEntityList(airportEntityList)
                    .status(true)
                    .build();
            flightRepository.save(flightEntity);

            int ecoClass = flightEntity.getPlaneEntity().getEcoClass();
            int busClass = flightEntity.getPlaneEntity().getBusClass();
            for (int i = 0; i < busClass / 3; i++) {
                for(char c = 'A'; c <= 'C'; c++) {
                    SeatEntity seatEntity = new SeatEntity();
                    seatEntity.setSeatClass("Business Class");
                    seatEntity.setSeatNumber(c + String.valueOf(i+1));
                    seatEntity.setFlightEntity(flightEntity);
                    seatRepository.save(seatEntity);
                }
            }

            for (int i = 0; i < ecoClass / 9; i++) {
                for(char c = 'A'; c <= 'I'; c++) {
                    SeatEntity seatEntity = new SeatEntity();
                    seatEntity.setSeatClass("Economy Class");
                    seatEntity.setSeatNumber(c + String.valueOf(i+1));
                    seatEntity.setFlightEntity(flightEntity);
                    seatRepository.save(seatEntity);
                }
            }

        } catch (ParseException e) {
            throw new RuntimeException("Error parsing date: " + e.getMessage());
        }
    }

    @Override
    public FlightResponse getDetailFlight(Long id) throws Exception {
        FlightEntity flightEntity = flightRepository.findById(id).orElseThrow(() -> new Exception("Flight not found !"));
        FlightResponse  flightResponse = flightConverter.toFlightResponse(flightEntity,true);
        return flightResponse;
    }


    @Override
    public List<FlightResponse> searchFlights(FlightRequest flightRequest) throws Exception {
        try{
            if(flightRequest.getArrivalAirport().equals(flightRequest.getDepartureAirport())){
                throw new Exception("Departure airport and arrival airport cannot be the same");
            }
            List<FlightResponse> flightResponseList = new ArrayList<>();

            SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
            Date departureTime = formatter.parse(flightRequest.getDepartureTime());

            List<FlightEntity> flightEntityList = flightRepository.searchFlight(flightRequest.getDepartureAirport(), flightRequest.getArrivalAirport(), departureTime);
            flightEntityList.forEach((flightEntity) -> {
                FlightResponse flightResponse = flightConverter.toFlightResponse(flightEntity,false);
                flightResponseList.add(flightResponse);
            });
            return flightResponseList;
        } catch (ParseException e) {
            throw new RuntimeException("Error parsing date: " + e.getMessage());
        } catch (Exception ex){
            throw new RuntimeException("Error searching flights: " + ex.getMessage());
        }
    }

    @Override
    public List<FlightResponse> getAllFlightsByUser() throws Exception {
        List<FlightResponse> flightResponseList = new ArrayList<>();
        List<FlightEntity> flightEntityList = flightRepository.findAllByStatus(true);
        flightEntityList.forEach((flightEntity) -> {
            FlightResponse flightResponse = flightConverter.toFlightResponse(flightEntity,false);
            flightResponseList.add(flightResponse);
        });
        return flightResponseList;
    }

    @Override
    public List<FlightResponse> getAllFlightsByAdmin() throws Exception {
        List<FlightResponse> flightResponseList = new ArrayList<>();
        List<FlightEntity> flightEntityList = flightRepository.findAll();
        flightEntityList.forEach((flightEntity) -> {
            FlightResponse flightResponse = flightConverter.toFlightResponse(flightEntity,false);
            flightResponseList.add(flightResponse);
        });
        return flightResponseList;
    }

}