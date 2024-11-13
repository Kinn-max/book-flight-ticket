package com.bookflight.ticket.dto.response;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UserResponse {
    private String fullName;

    private String email;

    private String phoneNumber;

    private String address;

    private LocalDate dateOfBirth;
}
