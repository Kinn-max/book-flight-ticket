package com.bookflight.ticket.services;

import com.bookflight.ticket.dto.request.SignUpRequest;
import com.bookflight.ticket.models.UserEntity;

public interface AuthService {
    boolean checkLogin(String email, String password);
    void signup(SignUpRequest signUpRequest) throws Exception;
    UserEntity login(String email )  ;
}
