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
        PlaneEntity planeEntity = new PlaneEntity();
        planeEntity.setName(planeRequest.getName());
        planeEntity.setBusClass(planeRequest.getBusClass());
        planeEntity.setEcoClass(planeRequest.getEcoClass());
        planeRepository.save(planeEntity);

        for (int i = 0; i < planeRequest.getBusClass(); i++) {
            for(char c = 'A'; c <= 'C'; c++) {
                SeatEntity seatEntity = new SeatEntity();
                seatEntity.setSeatClass("Business Class");
                seatEntity.setSeatNumber(c + String.valueOf(i+1));
                seatEntity.setPlaneEntity(planeEntity);
                seatRepository.save(seatEntity);
            }
        }

        for (int i = 0; i < planeRequest.getEcoClass(); i++) {
            for(char c = 'A'; c <= 'I'; c++) {
                SeatEntity seatEntity = new SeatEntity();
                seatEntity.setSeatClass("Economy Class");
                seatEntity.setSeatNumber(c + String.valueOf(i+1));
                seatEntity.setPlaneEntity(planeEntity);
                seatRepository.save(seatEntity);
            }
        }
    }
}
