package com.bookflight.ticket.services;


import com.bookflight.ticket.dto.request.LuggageRequest;

public interface LuggageService {
    void createLuggage(LuggageRequest luggageRequest);
}
