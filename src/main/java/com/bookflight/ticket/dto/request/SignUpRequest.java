package com.bookflight.ticket.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.Date;

@Data
public class SignUpRequest {
    @NotEmpty(message = "Name cannot empty")
    private String fullName;

    @NotEmpty(message = "Password cannot empty")
    private String password;

    @NotEmpty(message = "Email cannot empty")
    @Email(message = "Invalid email")
    private String email;

    @NotEmpty(message = "Phone number cannot empty")
    private String phoneNumber;

    private String dateOfBirth;

    private String address;
}
