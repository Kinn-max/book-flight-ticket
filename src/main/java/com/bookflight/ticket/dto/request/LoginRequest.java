package com.bookflight.ticket.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class LoginRequest {
    @NotEmpty(message = "Email cannot empty")
    private String email;

    @NotEmpty(message = "Email cannot empty")
    private String password;
}
