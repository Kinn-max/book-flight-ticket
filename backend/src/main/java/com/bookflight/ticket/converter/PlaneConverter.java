package com.bookflight.ticket.converter;

import com.bookflight.ticket.dto.response.PlaneResponse;
import com.bookflight.ticket.models.PlaneEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class PlaneConverter {
    @Autowired
    private ModelMapper modelMapper;
    public PlaneResponse toPlaneResponse(PlaneEntity planeEntity) {
        PlaneResponse planeResponse = modelMapper.map(planeEntity, PlaneResponse.class);
        return planeResponse;
    }
}
