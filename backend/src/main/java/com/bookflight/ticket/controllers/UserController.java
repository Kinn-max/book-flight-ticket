package com.bookflight.ticket.controllers;

import com.bookflight.ticket.dto.request.ProfileRequest;
import com.bookflight.ticket.dto.response.UserResponse;
import com.bookflight.ticket.services.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private AuthService authService;

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile() {
        try {
            UserResponse userResponse = authService.getProfile();
            return ResponseEntity.ok().body(userResponse);
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody @Valid ProfileRequest profileRequest) {
        try {
            boolean result = authService.updateProfile(profileRequest);
            if (result) {
                return ResponseEntity.ok("Update successful");
            }
            return ResponseEntity.badRequest().body("Update failed");
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/update-password")
    public ResponseEntity<?> updatePassword(
            @RequestParam String oldPassword,
            @RequestParam String newPassword) {
        try {
            boolean result = authService.updatePassword(oldPassword, newPassword);
            if (result) {
                return ResponseEntity.ok("Update successful");
            }
            return ResponseEntity.badRequest().body("Update failed");
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
