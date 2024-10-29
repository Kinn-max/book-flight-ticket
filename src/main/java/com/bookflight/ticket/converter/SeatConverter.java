package com.bookflight.ticket.converter;


import com.bookflight.ticket.dto.response.SeatResponse;
import com.bookflight.ticket.models.PlaneEntity;
import com.bookflight.ticket.models.SeatEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class SeatConverter {
    @Autowired
    private ModelMapper modelMapper;
    public List<SeatResponse> toSeatResponse(List<SeatEntity> seatEntities, PlaneEntity planeEntity) {
        List<SeatResponse> seatResponses = new ArrayList<>();
        for (SeatEntity seatEntity : seatEntities) {
            SeatResponse seatResponse = modelMapper.map(seatEntity, SeatResponse.class);
//            if(seatEntity.getSeatClass().equals("Business Class")){
//                seatResponse.setPrice(planeEntity.getBusPrice());
//            }else{
//                seatResponse.setPrice(planeEntity.getEcoPrice());
//            }
            seatResponses.add(seatResponse);
        }
        return seatResponses;
    }
}
