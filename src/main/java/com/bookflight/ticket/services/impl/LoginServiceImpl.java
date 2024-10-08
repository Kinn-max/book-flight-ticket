package com.bookflight.ticket.services.impl;

import com.bookflight.ticket.repositories.UserRepository;
import com.bookflight.ticket.services.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public boolean checkLogin(String email, String password) {
        var user = userRepository.findByEmail(email);
        return passwordEncoder.matches(password, user.getPassword());
    }
}
