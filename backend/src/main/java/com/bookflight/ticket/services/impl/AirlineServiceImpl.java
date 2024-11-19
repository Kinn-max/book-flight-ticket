package com.bookflight.ticket.services.impl;

import com.bookflight.ticket.dto.request.AirlineRequest;
import com.bookflight.ticket.models.AirlineEntity;
import com.bookflight.ticket.repositories.AirlineRepository;
import com.bookflight.ticket.services.AirlineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class AirlineServiceImpl implements AirlineService {
    @Autowired
    private AirlineRepository airlineRepository;

    @Override
    public void createAirline(AirlineRequest airlineRequest) throws IOException {
        String UPLOAD_DIRECTORY = System.getProperty("user.dir") + "/uploads";

        System.out.println(UPLOAD_DIRECTORY);

        StringBuilder fileNames = new StringBuilder();
        String name = UUID.randomUUID() + airlineRequest.getLogo().getOriginalFilename();
        Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY, name);
        fileNames.append(name);
        Files.write(fileNameAndPath, airlineRequest.getLogo().getBytes());

        AirlineEntity airlineEntity = new AirlineEntity();
        airlineEntity.setName(airlineRequest.getAirlineName());
        airlineEntity.setLogo(fileNames.toString());
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
