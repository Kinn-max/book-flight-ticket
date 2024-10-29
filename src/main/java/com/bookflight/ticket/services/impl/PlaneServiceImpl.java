package com.bookflight.ticket.services.impl;

import com.bookflight.ticket.dto.request.PlaneRequest;
import com.bookflight.ticket.models.PlaneEntity;
import com.bookflight.ticket.models.SeatEntity;
import com.bookflight.ticket.repositories.PlaneRepository;
import com.bookflight.ticket.repositories.SeatRepository;
import com.bookflight.ticket.services.PlaneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlaneServiceImpl implements PlaneService {
    @Autowired
    private PlaneRepository planeRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Override
    public void createPlane(PlaneRequest planeRequest) {
        PlaneEntity planeEntity = PlaneEntity.builder()
                .name(planeRequest.getName())
                .busClass(planeRequest.getBusClass())
                .ecoClass(planeRequest.getEcoClass())
                .busPrice(planeRequest.getBusPrice())
                .ecoPrice(planeRequest.getEcoPrice())
                .build();
        planeRepository.save(planeEntity);

    }
}
