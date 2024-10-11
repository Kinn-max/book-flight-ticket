package com.bookflight.ticket.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AirportDto {
    private Long id;
    @NotBlank(message = "Airport name cannot be blank! ")
    private String name;

    @NotBlank(message = "Airport location cannot be blank! ")
    private String location;

}
