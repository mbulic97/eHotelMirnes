package com.eHotelMirnes.backend.service;

import com.eHotelMirnes.backend.dto.LoginRequest;
import com.eHotelMirnes.backend.dto.Response;
import com.eHotelMirnes.backend.entity.User;
import com.eHotelMirnes.backend.repository.UserRepository;
import com.eHotelMirnes.backend.service.impl.UserService;
import com.eHotelMirnes.backend.utils.JWTUtils;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @Mock
    private EmailService emailService;
    @Mock
    private JWTUtils jwtUtils;

    @Mock
    private AuthenticationManager authenticationManager;
    @Test
    @DisplayName("Should create a new user successfully")
    void createUser_Success(){
        User user = new User();
        user.setEmail("fikret@gmail.com");
        user.setPassword("123456789");

        User savedUser = new User();
        savedUser.setEmail("fikret@gmail.com");
        savedUser.setPassword("encode123456789");
        savedUser.setName("Fikret Hodzic");
        savedUser.setPhoneNumber("025165448");
        savedUser.setRole("USER");

        when(userRepository.existsByEmail(user.getEmail())).thenReturn(false);
        when(passwordEncoder.encode("123456789")).thenReturn("encode123456789");

        when(userRepository.save(user)).thenReturn(savedUser);

        Response response = userService.register(user);
        assertEquals("USER", user.getRole());
        assertEquals("fikret@gmail.com", user.getUsername());
        assertEquals(200, response.getStatusCode());
        assertEquals("User registered successfully", response.getMessage());
    }
    @Test
    @DisplayName("Should create a new user fail")
    void createUser_Fail(){
        User user = new User();
        user.setEmail("fikret@gmail.com");
        user.setPassword("123456789");

        when(userRepository.existsByEmail(user.getEmail())).thenReturn(true);


        Response response = userService.register(user);
        assertEquals(400, response.getStatusCode());
        assertEquals("User with email " + user.getEmail() + " already exists", response.getMessage());

    }

    @Test
    @DisplayName("Should login user successfully")
    void login_Success(){
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("fikret@gmail.com");
        loginRequest.setPassword("123456789");

        User user = new User();
        user.setEmail("fikret@gmail.com");
        user.setPassword("encodedPassword");
        user.setRole("USER");

        when(userRepository.findByEmail("fikret@gmail.com"))
                .thenReturn(Optional.of(user));

        when(jwtUtils.generateToken(user))
                .thenReturn("fake-jwt-token");

        Response response = userService.login(loginRequest);

        assertEquals(200, response.getStatusCode());
        assertEquals("Login successful", response.getMessage());
        assertEquals("fake-jwt-token", response.getToken());
    }


}
