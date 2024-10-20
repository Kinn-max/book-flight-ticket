package com.bookflight.ticket.converter;


import com.bookflight.ticket.dto.response.FlightResponse;
import com.bookflight.ticket.dto.response.PlaneResponse;
import com.bookflight.ticket.models.AirportEntity;
import com.bookflight.ticket.models.FlightEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FlightConverter {
    @Autowired
    private PlaneConverter planeConverter;

    @Autowired
    private ModelMapper modelMapper;

    public FlightResponse toFlightResponse(FlightEntity flightEntity) {
        FlightResponse flightResponse = modelMapper.map(flightEntity, FlightResponse.class);
        List<AirportEntity> airportEntityList = flightEntity.getAirportEntityList();
        for (AirportEntity airportEntity : airportEntityList) {
            if(airportEntity.getId() == flightEntity.getArrivalId()){
                flightResponse.setArrivalAirport(airportEntity.getName());
                flightResponse.setArrivalLocation(airportEntity.getLocation());
            }else{
                flightResponse.setDepartureAirport(airportEntity.getName());
                flightResponse.setDepartureLocation(airportEntity.getLocation());
            }
        }
        PlaneResponse planeResponse = planeConverter.toPlaneResponse(flightEntity.getPlaneEntity());
        flightResponse.setPlane(planeResponse);
        return flightResponse;
    }
}
