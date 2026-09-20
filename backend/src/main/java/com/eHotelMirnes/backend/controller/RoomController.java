package com.eHotelMirnes.backend.controller;

import com.eHotelMirnes.backend.dto.Response;
import com.eHotelMirnes.backend.dto.RoomRequest;
import com.eHotelMirnes.backend.service.interfac.IRoomService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
@Slf4j
@RestController
@RequestMapping("/rooms")
public class RoomController {

    @Autowired
    private IRoomService roomService;

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
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> updateRoom(
            @PathVariable Long roomId,
            @RequestPart(value = "photo", required = false) MultipartFile photo,
            //@Valid @RequestBody RoomRequest roomRequest) {
            @RequestBody RoomRequest roomRequest){

        log.info("Update - Room request: {}", roomRequest );

        Response response = roomService.updateRoom(roomId, roomRequest, photo);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/available-rooms")
    public ResponseEntity<Response> getAvailableRooms(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate,
            @RequestParam(required = false) String roomType,
            @RequestParam(required = false) String city
            ){
        if(checkInDate == null || roomType == null || roomType.isBlank() || checkOutDate == null || city == null || city.isBlank()){
            Response response = new Response();
            response.setStatusCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage("Please provide values for all fields(checkInDate, roomType, city, checkOutDate");
            return ResponseEntity.status(response.getStatusCode()).body(response);
        }
        Response response = roomService.getAvailableRooms(checkInDate,checkOutDate,roomType,city);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
