package com.bookflight.ticket.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class LuggageRequest {
    private Long id;
    @JsonProperty("luggage_type")
    private String luggageType;
    @JsonProperty("weight")
    private double weight;
    @JsonProperty("price")
    private double price;
}
