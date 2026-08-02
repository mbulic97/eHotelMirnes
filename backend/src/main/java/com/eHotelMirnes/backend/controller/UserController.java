package com.eHotelMirnes.backend.controller;

import com.eHotelMirnes.backend.dto.Response;
import com.eHotelMirnes.backend.entity.User;
import com.eHotelMirnes.backend.service.interfac.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private IUserService userService;

    @GetMapping("/get-by-id/{userId}")
    public ResponseEntity<Response> getUserById(@PathVariable("userId") String userId) {
        Response response = userService.getUserById(userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
    @GetMapping("/get-logged-in-profile-info")
    public ResponseEntity<Response> getLoggedInUserProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Response response = userService.getMyInfo(email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/delete/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> deleteUser(@PathVariable("userId") String userId){
        Response response = userService.deleteUser(userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> getAllUsers() {
        Response response = userService.getAllUsers();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PutMapping("update/{userId}")
    public ResponseEntity<Response> updateUser(
            @PathVariable Long userId,
            @RequestParam(value = "name",required = false) String name,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String phoneNumber
    ) {
        User user = new User();
        user.setId(userId);
        user.setName(name);
        user.setEmail(email);
        user.setPhoneNumber(phoneNumber);

        Response response = userService.updateUser(user);

        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
