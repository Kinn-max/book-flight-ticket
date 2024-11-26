package com.bookflight.ticket.dto.response;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class LuggageResponse {
    private Long id;

    private String luggageType;

    private double weight;

    private double price;
}
