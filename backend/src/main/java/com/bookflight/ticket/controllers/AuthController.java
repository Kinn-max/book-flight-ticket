package com.bookflight.ticket.controllers;

import com.bookflight.ticket.dto.request.LoginRequest;
import com.bookflight.ticket.dto.request.SignUpRequest;
import com.bookflight.ticket.dto.response.JwtAuthenticationResponse;
import com.bookflight.ticket.services.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest loginRequest) {
        try {
            if(authService.checkLogin(loginRequest.getEmail(), loginRequest.getPassword())) {
                JwtAuthenticationResponse user = authService.login(loginRequest.getEmail());
                return ResponseEntity.ok(user);
            } else{
                return ResponseEntity.badRequest().body("Invalid email or password");
            }
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody @Valid SignUpRequest signUpRequest) throws Exception {
        authService.signup(signUpRequest);
        return ResponseEntity.ok().body("Sign up successful");
    }
}
