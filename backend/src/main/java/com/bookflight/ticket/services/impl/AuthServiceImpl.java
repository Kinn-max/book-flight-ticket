package com.bookflight.ticket.services.impl;

import com.bookflight.ticket.configuration.JWTHelper;
import com.bookflight.ticket.dto.request.ProfileRequest;
import com.bookflight.ticket.dto.request.SignUpRequest;
import com.bookflight.ticket.dto.response.JwtAuthenticationResponse;
import com.bookflight.ticket.dto.response.UserResponse;
import com.bookflight.ticket.dto.response.UserSignInRepose;
import com.bookflight.ticket.enums.RoleType;
import com.bookflight.ticket.models.UserEntity;
import com.bookflight.ticket.repositories.TicketRepository;
import com.bookflight.ticket.repositories.UserRepository;
import com.bookflight.ticket.services.AuthService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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
    private TicketRepository ticketRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTHelper jwtHelper;

    @Autowired
    private ModelMapper modelMapper;

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
        user.setFullName(signUpRequest.getFullName());
        userRepository.save(user);
    }

    @Override
    public JwtAuthenticationResponse login(String email) {
       UserEntity user = userRepository.findByEmail(email);
       if (user == null) return null;

        UserSignInRepose userSignInRepose = new UserSignInRepose();
        userSignInRepose.setEmail(user.getEmail());
        userSignInRepose.setName(user.getFullName());
        userSignInRepose.setRole(user.getRole());

       String token = jwtHelper.generateToken(user);
       JwtAuthenticationResponse response = new JwtAuthenticationResponse();
       response.setToken(token);
       response.setUser(userSignInRepose);

       return response;
    }

    @Override
    public UserResponse getProfile() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        UserEntity user = userRepository.findByEmail(userDetails.getUsername());
        if (user == null) return null;
        UserResponse userResponse = new UserResponse();
        userResponse.setBookingList(ticketRepository.findByUserId(user.getId()));
        modelMapper.map(user, userResponse);

        return userResponse;
    }

    @Override
    public boolean updateProfile(ProfileRequest profileRequest) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        UserEntity user = userRepository.findByEmail(userDetails.getUsername());
        if (user == null) return false;

        LocalDate localDate = LocalDate.parse(profileRequest.getDateOfBirth(), DateTimeFormatter.ofPattern("dd-MM-yyyy"));
        user.setDateOfBirth(localDate);

        modelMapper.map(profileRequest, user);
        userRepository.save(user);
        return true;
    }
}
