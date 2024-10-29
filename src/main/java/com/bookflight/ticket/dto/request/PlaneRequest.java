package com.bookflight.ticket.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class PlaneRequest {
    @NotNull
    @JsonProperty("eco_class")
    private int ecoClass;

    @NotNull
    @JsonProperty("bus_class")
    private int busClass;

    @NotEmpty(message = "Name cannot empty")
    private String name;

    @NotEmpty(message = "Cannot empty")
    private List<Long> airlineIds;
}
