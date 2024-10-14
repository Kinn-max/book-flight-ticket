package com.bookflight.ticket.services.impl;

import com.bookflight.ticket.dto.request.SignUpRequest;
import com.bookflight.ticket.enums.RoleType;
import com.bookflight.ticket.models.UserEntity;
import com.bookflight.ticket.repositories.UserRepository;
import com.bookflight.ticket.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public boolean checkLogin(String email, String password) {
        var user = userRepository.findByEmail(email);
        return passwordEncoder.matches(password, user.getPassword());
    }

    @Override
    public void signup(SignUpRequest signUpRequest) throws Exception {
        if (userRepository.findByEmail(signUpRequest.getEmail()) != null)
            throw new Exception("Email existed");

        UserEntity user = new UserEntity();
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setAddress(signUpRequest.getAddress());
        LocalDate localDate = LocalDate.parse(signUpRequest.getDateOfBirth(), DateTimeFormatter.ofPattern("dd-MM-yyyy"));
        user.setDateOfBirth(localDate);
        user.setPhoneNumber(signUpRequest.getPhoneNumber());
        user.setRole(RoleType.USER.name());
        userRepository.save(user);
    }
}
