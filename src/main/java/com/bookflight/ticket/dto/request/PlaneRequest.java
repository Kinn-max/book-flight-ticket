package com.bookflight.ticket.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PlaneRequest {
    @NotNull
    private int ecoClass;

    @NotNull
    private int busClass;

    @NotEmpty(message = "Name cannot empty")
    private String name;
}
