package com.eHotelMirnes.backend.service.impl;

import com.eHotelMirnes.backend.dto.Response;
import com.eHotelMirnes.backend.dto.RoomDTO;
import com.eHotelMirnes.backend.dto.RoomRequest;
import com.eHotelMirnes.backend.entity.Room;
import com.eHotelMirnes.backend.exception.OurException;
import com.eHotelMirnes.backend.repository.RoomRepository;
import com.eHotelMirnes.backend.service.AwsS3Service;
import com.eHotelMirnes.backend.service.interfac.IRoomService;
import com.eHotelMirnes.backend.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
@Service
public class RoomService implements IRoomService {
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private AwsS3Service awsS3Service;
    @Override
    public Response addNewRoom(MultipartFile photo, RoomRequest roomRequest){
    //public Response addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice, String description) {
        Response response = new Response();

        try {
            String imageUrl = awsS3Service.saveImageToS3(photo);
            Room room = new Room();
            room.setRoomPhotoUrl(imageUrl);
            room.setRoomType(roomRequest.getRoomType());
            room.setRoomPrice(roomRequest.getRoomPrice());
            room.setRoomDescription(roomRequest.getRoomDescription());
            room.setCity(roomRequest.getCity());
            room.setCountry(roomRequest.getCountry());
            room.setMaxGuests(roomRequest.getMaxGuests());
            room.setWifiAvailable(roomRequest.getWifiAvailable());
            room.setParkingAvailable(roomRequest.getParkingAvailable());
            room.setPrivateBathroom(roomRequest.getPrivateBathroom());
            room.setAirConditioning(roomRequest.getAirConditioning());
            room.setTvAvailable(roomRequest.getTvAvailable());
            //room.setRoomType(roomType);
            //room.setRoomPrice(roomPrice);
            //room.setRoomDescription(description);
            Room savedRoom = roomRepository.save(room);
            RoomDTO roomDTO = Utils.mapRoomEntityToRoomDTO(savedRoom);
            response.setStatusCode(HttpStatus.OK.value());
            response.setMessage("Room added successfully");
            response.setRoom(roomDTO);
        } catch (Exception e){
            response.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.setMessage("Failed to add room: " + e.getMessage());
        }
        return response;
    }

    @Override
    public List<String> getAllRoomTypes() {
        return roomRepository.findDistinctRoomTypes();
    }

    @Override
    public Response getAllRooms() {
        Response response = new Response();

        try {
            List<Room> roomList = roomRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
            List<RoomDTO> roomDTOList = Utils.mapRoomListEntityToRoomListDTO(roomList);
            response.setStatusCode(HttpStatus.OK.value());
            response.setMessage("Rooms retrieved successfully");
            response.setRoomList(roomDTOList);
        } catch (Exception e) {
            response.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.setMessage("Error getting all rooms " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response deleteRoom(Long roomId) {
        Response response = new Response();

        try {
            roomRepository.findById(roomId).orElseThrow(() -> new OurException("Room Not Found"));
            roomRepository.deleteById(roomId);
            response.setStatusCode(HttpStatus.OK.value());
            response.setMessage("Room deleted successfully");
        } catch (OurException e){
            response.setStatusCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.setMessage("Failed to delete room: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response updateRoom(Long roomId, RoomRequest roomRequest, MultipartFile photo) {

        //public Response updateRoom(Long roomId, String description, String roomType, BigDecimal roomPrice, MultipartFile photo) {
        Response response = new Response();

        try {
            Room room = roomRepository.findById(roomId).orElseThrow(() -> new OurException("Room Not Found"));
            /*if(roomType != null) room.setRoomType(roomType);
            if(roomPrice != null) room.setRoomPrice(roomPrice);
            if(description != null) room.setRoomDescription(description);*/


            if (roomRequest.getRoomType() != null )
            room.setRoomType(roomRequest.getRoomType());
            if (roomRequest.getRoomPrice() != null )
            room.setRoomPrice(roomRequest.getRoomPrice());
            if(photo != null && !photo.isEmpty()){
                String imageUrl = awsS3Service.saveImageToS3(photo);
                room.setRoomPhotoUrl(imageUrl);
            }
            if (roomRequest.getRoomDescription() != null )
            room.setRoomDescription(roomRequest.getRoomDescription());

            if (roomRequest.getCity() != null )
            room.setCity(roomRequest.getCity());
            if (roomRequest.getCountry() != null )
            room.setCountry(roomRequest.getCountry());

            if (roomRequest.getMaxGuests() != null )
            room.setMaxGuests(roomRequest.getMaxGuests());

            if (roomRequest.getWifiAvailable() != null )
            room.setWifiAvailable(roomRequest.getWifiAvailable());
            if (roomRequest.getParkingAvailable() != null )
            room.setParkingAvailable(roomRequest.getParkingAvailable());
            if (roomRequest.getPrivateBathroom() != null )
            room.setPrivateBathroom(roomRequest.getPrivateBathroom());
            if (roomRequest.getAirConditioning() != null )
            room.setAirConditioning(roomRequest.getAirConditioning());
            if (roomRequest.getTvAvailable() != null )
            room.setTvAvailable(roomRequest.getTvAvailable());

            Room updatedRoom = roomRepository.save(room);
            RoomDTO roomDTO = Utils.mapRoomEntityToRoomDTO(updatedRoom);

            response.setStatusCode(HttpStatus.OK.value());
            response.setMessage("Room updated successfully");
            response.setRoom(roomDTO);
        } catch (OurException e) {
            response.setStatusCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.setMessage("Failed to update room " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getRoomById(Long roomId) {
        return null;
    }

    @Override
    public Response getAvailableRoomsByDataAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType) {
        return null;
    }
}
