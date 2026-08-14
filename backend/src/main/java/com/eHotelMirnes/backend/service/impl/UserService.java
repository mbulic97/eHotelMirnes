package com.eHotelMirnes.backend.service.impl;

import com.eHotelMirnes.backend.dto.LoginRequest;
import com.eHotelMirnes.backend.dto.Response;
import com.eHotelMirnes.backend.dto.UserDTO;
import com.eHotelMirnes.backend.entity.User;
import com.eHotelMirnes.backend.exception.OurException;
import com.eHotelMirnes.backend.repository.UserRepository;
import com.eHotelMirnes.backend.service.EmailService;
import com.eHotelMirnes.backend.service.interfac.IUserService;
import com.eHotelMirnes.backend.utils.JWTUtils;
import com.eHotelMirnes.backend.utils.Utils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class UserService implements IUserService{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Override
    public Response register(User user) {
        Response response = new Response();
        try {
            if (user.getRole() == null || user.getRole().isBlank()) {
                user.setRole("USER");
            }
            if (userRepository.existsByEmail(user.getEmail())) {
                throw new OurException("User with email " + user.getEmail() + " already exists");
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User savedUser = userRepository.save(user);
            emailService.sendWelcomeEmail(savedUser);
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(savedUser);

            response.setStatusCode(HttpStatus.OK.value());
            response.setMessage("User registered successfully");
            response.setUser(userDTO);
        } catch (OurException e) {
            response.setStatusCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(e.getMessage());
            log.debug("Status code: 400: - " + e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.setMessage("Failed to register user: " + e.getMessage());
            log.debug("Status code: 500: -  User registration: " + e.getMessage());
        }
        return response;
    }
    @Override
    public Response login(LoginRequest loginRequest){
        Response response = new Response();

        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),loginRequest.getPassword()));
            var user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(() -> new OurException("User not found"));

            var token = jwtUtils.generateToken(user);
            response.setStatusCode(HttpStatus.OK.value());
            response.setToken(token);
            response.setRole(user.getRole());
            response.setExpirationTime("7 Days");
            response.setMessage("Login successful");
            log.info("User login successful: " + loginRequest.getEmail());
        } catch(BadCredentialsException e){
            response.setStatusCode(HttpStatus.UNAUTHORIZED.value());
            response.setMessage("Invalid email or password");
        } catch (OurException e) {
            response.setStatusCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(e.getMessage());
        } catch (Exception e){
            log.info("Status code: 500 - User login: " + loginRequest.getEmail());
            response.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.setMessage("Failed to login. Please try again.");
        }
        return response;
    }

    @Override
    public Response getMyInfo(String email){

        Response response = new Response();

        try{
            User user = userRepository.findByEmail(email).orElseThrow(() -> new OurException("User Not Found"));
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);
            response.setStatusCode(HttpStatus.OK.value());
            response.setMessage("User information retrieved successfully");
            response.setUser(userDTO);
        } catch (OurException e) {
            response.setStatusCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(e.getMessage());
        } catch (Exception e){
            response.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.setMessage("Failed to retrieve user information: " + e.getMessage());
        }
        return response;
    }
    @Override
    public Response getUserById(String userId) {

        Response response = new Response();

        try {
            User user = userRepository.findById(Long.valueOf(userId)).orElseThrow(() -> new OurException("User Not Found"));
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);
            response.setStatusCode(HttpStatus.OK.value());
            response.setMessage("User retrieved successfully");
            response.setUser(userDTO);

        } catch (OurException e) {
            response.setStatusCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(e.getMessage());

        } catch (Exception e) {
            response.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.setMessage("Failed to retrieve user: " + e.getMessage());
        }
        return response;
    }
    public Response deleteUser(String userId) {
        Response response = new Response();
        try {
            userRepository.findById(Long.valueOf(userId)).orElseThrow(() -> new OurException("User Not Found"));
            userRepository.deleteById(Long.valueOf(userId));
            response.setStatusCode(HttpStatus.OK.value());
            response.setMessage("User deleted successfully");
        } catch (OurException e) {
            response.setStatusCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(e.getMessage());
        } catch (Exception e){
            response.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.setMessage("Failed to delete user: " + e.getMessage());
        }
        return response;
    }
    public Response getAllUsers() {
        Response response = new Response();
        try {
            List<User> userList = userRepository.findAll();
            List<UserDTO> userDTOList = Utils.mapUserListEntityToUserListDTO(userList);
            response.setStatusCode(HttpStatus.OK.value());
            response.setMessage("Users retrieved successfully");
            response.setUserList(userDTOList);
        } catch (Exception e) {
            response.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.setMessage("Failed to retrieve users: " + e.getMessage());
        }
        return response;
    }
    @Override
    public  Response updateUser(User user){
        Response response = new Response();

        try {
            User existingUser = userRepository.findById(user.getId()).orElseThrow(()-> new OurException("User Not Found"));

            if (user.getName() != null && !user.getName().isBlank()) {
                existingUser.setName(user.getName());
            }
            if (user.getEmail() != null && !user.getEmail().isBlank()) {
                existingUser.setEmail(user.getEmail());
            }
            if (user.getPhoneNumber() != null && !user.getPhoneNumber().isBlank()) {
                existingUser.setPhoneNumber(user.getPhoneNumber());
            }

            User updatedUser = userRepository.save(existingUser);
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(updatedUser);

            response.setStatusCode(HttpStatus.OK.value());
            response.setMessage("User updated successfully");
            response.setUser(userDTO);
        } catch (OurException e) {
            response.setStatusCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.setMessage("Failed to update user: " + e.getMessage());
        }
        return response;
    }

}
