package com.bookflight.ticket.converter;

import com.bookflight.ticket.dto.response.PlaneResponse;
import com.bookflight.ticket.dto.response.SeatResponse;
import com.bookflight.ticket.models.PlaneEntity;
import com.bookflight.ticket.models.SeatEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class PlaneConverter {
    @Autowired
    private ModelMapper modelMapper;
    public PlaneResponse toPlaneResponse(PlaneEntity planeEntity) {
        PlaneResponse planeResponse = modelMapper.map(planeEntity, PlaneResponse.class);
        List<SeatEntity> seatEntityList = planeEntity.getSeatEntityList();
        List<SeatResponse> seatResponseList = new ArrayList<>();
        for (SeatEntity seatEntity : seatEntityList) {
            SeatResponse seatResponse = modelMapper.map(seatEntity, SeatResponse.class);
            seatResponseList.add(seatResponse);
        }
        planeResponse.setSeats(seatResponseList);
        return planeResponse;
    }
}
