package com.bookflight.ticket.dto.response;

import lombok.Data;

@Data
public class JwtAuthenticationResponse {
    private String token;
    private UserSignInRepose user;
}
