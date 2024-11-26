package com.bookflight.ticket.services;


import com.bookflight.ticket.dto.request.LuggageRequest;
import com.bookflight.ticket.models.LuggageEntity;

import java.util.List;

public interface LuggageService {
    void createLuggage(LuggageRequest luggageRequest);
    List<LuggageEntity> getAllLuggages();
}
