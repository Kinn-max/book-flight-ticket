package com.bookflight.ticket.services.impl;


import com.bookflight.ticket.dto.AirportDto;
import com.bookflight.ticket.models.AirportEntity;
import com.bookflight.ticket.repositories.AirportRepository;
import com.bookflight.ticket.services.AirportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AirportServiceImpl implements AirportService {
    @Autowired
    private AirportRepository airportRepository;

    @Override
    public void createAirport(AirportDto airportDto) {
        AirportEntity airportEntity = AirportEntity.builder()
                .name(airportDto.getName())
                .location(airportDto.getLocation())
                .build();
        airportRepository.save(airportEntity);
    }

    @Override
    public boolean deleteAirport(Long id)   {
        try {
            AirportEntity airportEntity = airportRepository.findById(id).
                    orElseThrow(()-> new Exception("Airport not found"));
              airportRepository.delete(airportEntity);
              return  true;
        }catch (Exception e){
            return false;
        }
    }

}
