package com.bookflight.ticket.services.impl;

import com.bookflight.ticket.dto.request.PlaneRequest;
import com.bookflight.ticket.models.AirlineEntity;
import com.bookflight.ticket.models.PlaneEntity;
import com.bookflight.ticket.models.SeatEntity;
import com.bookflight.ticket.repositories.AirlineRepository;
import com.bookflight.ticket.repositories.PlaneRepository;
import com.bookflight.ticket.repositories.SeatRepository;
import com.bookflight.ticket.services.PlaneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlaneServiceImpl implements PlaneService {
    @Autowired
    private PlaneRepository planeRepository;

    @Autowired
    private AirlineRepository airlineRepository;

    @Override
    public void createPlane(PlaneRequest planeRequest) {
        List<AirlineEntity> airlines = planeRequest.getAirlineIds().stream().map(id -> airlineRepository.getById(id)).collect(Collectors.toList());
        PlaneEntity planeEntity = PlaneEntity.builder()
                .name(planeRequest.getName())
                .busClass(planeRequest.getBusClass())
                .ecoClass(planeRequest.getEcoClass())
                .airlineEntityList(airlines)
                .build();
        planeRepository.save(planeEntity);

    }
}
