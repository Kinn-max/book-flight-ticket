package com.bookflight.ticket.services.impl;

import com.bookflight.ticket.dto.response.AirportResponse;
import com.bookflight.ticket.dto.response.HomeResponse;
import com.bookflight.ticket.models.AirportEntity;
import com.bookflight.ticket.repositories.AirportRepository;
import com.bookflight.ticket.repositories.SeatRepository;
import com.bookflight.ticket.services.AirportService;
import com.bookflight.ticket.services.HomeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HomeServiceImpl implements HomeService {
    @Autowired
    private AirportRepository airportRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public HomeResponse getHomeInfo() {
        List<AirportEntity> airportEntities = airportRepository.findAll();
        List<AirportResponse> airportResponses = new ArrayList<>();
        for (AirportEntity airportEntity : airportEntities) {
            AirportResponse airportResponse = modelMapper.map(airportEntity, AirportResponse.class);
            airportResponses.add(airportResponse);
        }
        HomeResponse homeResponse = new HomeResponse();
        homeResponse.setAirportResponses(airportResponses);
        homeResponse.setSeatClasses(seatRepository.getAllSeatClass());

        return homeResponse;
    }
}
