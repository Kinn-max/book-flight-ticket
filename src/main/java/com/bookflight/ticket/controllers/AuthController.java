package com.bookflight.ticket.controllers;

import com.bookflight.ticket.configuration.JWTHelper;
import com.bookflight.ticket.dto.request.SignUpRequest;
import com.bookflight.ticket.dto.response.APIResponse;
import com.bookflight.ticket.models.UserEntity;
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
    @Autowired
    private JWTHelper jwtHelper;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String email, @RequestParam String password) {
        if(authService.checkLogin(email, password)) {
            UserEntity user = authService.login(email);
            String token = jwtHelper.generateToken(user);
            return ResponseEntity.ok(token);
        } else{
            return ResponseEntity.badRequest().body("Invalid email or password");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody @Valid SignUpRequest signUpRequest) throws Exception {
        authService.signup(signUpRequest);
        return ResponseEntity.ok().body("Sign up successful");
    }
}
