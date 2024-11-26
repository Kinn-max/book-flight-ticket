package com.bookflight.ticket.services.impl;

import com.bookflight.ticket.dto.request.LuggageRequest;
import com.bookflight.ticket.models.LuggageEntity;
import com.bookflight.ticket.repositories.LuggageRepository;
import com.bookflight.ticket.services.LuggageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LuggageServiceImpl implements LuggageService {
    @Autowired
    private LuggageRepository luggageRepository;

    @Override
    public void createLuggage(LuggageRequest luggageRequest) {
        LuggageEntity luggageEntity = LuggageEntity.builder()
                .luggageType(luggageRequest.getLuggageType())
                .weight(luggageRequest.getWeight())
                .price(luggageRequest.getPrice())
                .build();
        luggageRepository.save(luggageEntity);
    }

    @Override
    public List<LuggageEntity> getAllLuggages() {
        return luggageRepository.findAll();
    }
}
