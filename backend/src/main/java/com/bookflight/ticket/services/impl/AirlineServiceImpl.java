package com.bookflight.ticket.services.impl;

import com.bookflight.ticket.dto.request.AirlineRequest;
import com.bookflight.ticket.models.AirlineEntity;
import com.bookflight.ticket.repositories.AirlineRepository;
import com.bookflight.ticket.services.AirlineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AirlineServiceImpl implements AirlineService {
    @Autowired
    private AirlineRepository airlineRepository;

    @Override
    public void createAirline(AirlineRequest airlineRequest) {
        AirlineEntity airlineEntity = new AirlineEntity();
        airlineEntity.setName(airlineRequest.getAirlineName());
        airlineRepository.save(airlineEntity);
    }

    @Override
    public boolean deleteAirline(Long id) {
        if (airlineRepository.existsById(id)) {
            airlineRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
