package com.bookflight.ticket.services;

import com.bookflight.ticket.dto.request.ProfileRequest;
import com.bookflight.ticket.dto.request.SignUpRequest;
import com.bookflight.ticket.dto.response.JwtAuthenticationResponse;
import com.bookflight.ticket.dto.response.UserResponse;
import com.bookflight.ticket.models.UserEntity;

public interface AuthService {
    boolean checkLogin(String email, String password);
    void signup(SignUpRequest signUpRequest) throws Exception;
    JwtAuthenticationResponse login(String email );
    UserResponse getProfile();
    boolean updateProfile(ProfileRequest profileRequest);
}
