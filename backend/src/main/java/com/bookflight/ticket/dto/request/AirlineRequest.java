package com.bookflight.ticket.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class AirlineRequest {
    @NotEmpty(message = "Name cannot empty")
    private String airlineName;

    private MultipartFile logo;
}
