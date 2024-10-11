package com.bookflight.ticket.controllers;

import com.bookflight.ticket.configuration.JWTHelper;
import com.bookflight.ticket.dto.response.APIResponse;
import com.bookflight.ticket.services.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class LoginController {
    @Autowired
    LoginService loginService;

    @Autowired
    private JWTHelper jwtHelper;

    @PostMapping("/login")
    public APIResponse<String> login(@RequestParam String email, @RequestParam String password) {
        APIResponse<String> response = new APIResponse<>();

        if(loginService.checkLogin(email, password)) {
            String token = jwtHelper.generateToken(email);
            response.setResult(token);
            response.setMessage("Login successful");
            response.setCode(200);
        } else{
            response.setCode(400);
            response.setMessage("Invalid email or password");
        }
        return response;
    }

    @GetMapping("/get")
    public APIResponse<String> getToken() {
        APIResponse<String> response = new APIResponse<>();
        response.setCode(200);
        response.setMessage("Login successful");
        return response;
    }
    @GetMapping("")
    public void hello(){
        System.out.println("test");
    }
}
