package com.bookflight.ticket.dto.response;

import lombok.Data;

@Data
public class UserSignInRepose {
    private String name;
    private String email;
    private String role;
}
