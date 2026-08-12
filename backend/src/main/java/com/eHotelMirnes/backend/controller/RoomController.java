package com.eHotelMirnes.backend.controller;

import com.eHotelMirnes.backend.dto.Response;
import com.eHotelMirnes.backend.dto.RoomRequest;
import com.eHotelMirnes.backend.service.interfac.IRoomService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;
@Slf4j
@RestController
@RequestMapping("/rooms")
public class RoomController {

    @Autowired
    private IRoomService roomService;
    @GetMapping("/test")
    public Object test(Authentication authentication){
        return authentication.getAuthorities();
    }

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> addNewRoom(
            @RequestParam(value = "photo", required = false) MultipartFile photo,
            @Valid @ModelAttribute RoomRequest roomRequest
    ) {
        log.info("PHOTO: {}", photo);
        log.info("addNewRoom - Room request: {}", roomRequest );

        Response response =  roomService.addNewRoom(photo,roomRequest);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/all")
    public ResponseEntity<Response> getAllRooms() {
        Response response = roomService.getAllRooms();
        return ResponseEntity.status(response.getStatusCode()).body(response);

    }

    @GetMapping("/types")
    public List<String> getRoomTypes() {
        return roomService.getAllRoomTypes();
    }

    @DeleteMapping("/delete/{roomId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> deleteRoom(@PathVariable Long roomId){
        Response response = roomService.deleteRoom(roomId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
    @PutMapping("/update/{roomId}")
    @PreAuthorize("hasAuthority('ADMIN')")// only RoomRequest
    public ResponseEntity<Response> updateRoom(
            @PathVariable Long roomId,
            //@RequestPart(value = "photo", required = false) MultipartFile photo,
            @Valid @RequestBody RoomRequest roomRequest) {

        log.info("Update - Room request: {}", roomRequest );

        Response response = roomService.updateRoom(roomId, roomRequest);
        response.setStatusCode(200);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

}
