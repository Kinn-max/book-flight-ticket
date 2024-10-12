package com.bookflight.ticket.services;

import com.bookflight.ticket.dto.request.SignUpRequest;

public interface AuthService {
    boolean checkLogin(String email, String password);
    void signup(SignUpRequest signUpRequest) throws Exception;
}
