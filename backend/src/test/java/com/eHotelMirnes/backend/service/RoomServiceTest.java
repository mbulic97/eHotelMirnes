package com.eHotelMirnes.backend.service;

import com.eHotelMirnes.backend.dto.Response;
import com.eHotelMirnes.backend.dto.RoomRequest;
import com.eHotelMirnes.backend.entity.Room;
import com.eHotelMirnes.backend.repository.RoomRepository;
import com.eHotelMirnes.backend.service.impl.RoomService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class RoomServiceTest {
    @Mock
    private RoomRepository roomRepository;

    @InjectMocks
    private RoomService roomService;

    @Test
    @DisplayName("Should create room with facilities successfully")
    void createRoom_Success(){

        Room room = new Room();

        room.setRoomType("Double");
        room.setRoomPrice(new BigDecimal("120.00"));
        room.setRoomDescription("Modern double room");
        room.setCity("Mostar");
        room.setCountry("BA");
        room.setMaxGuests(2);

        room.setWifiAvailable(true);
        room.setParkingAvailable(true);
        room.setPrivateBathroom(true);
        room.setAirConditioning(true);
        room.setTvAvailable(true);

        assertEquals("Double", room.getRoomType());
        assertEquals(new BigDecimal("120.00"), room.getRoomPrice());
        assertEquals(2, room.getMaxGuests());
    }
    @Test
    @DisplayName("Should delete room successfully")
    void deleteRoom_Success(){

        Room room = new Room();
        room.setId(1L);

        when(roomRepository.findById(1L)).thenReturn(Optional.of(room));

        Response response = roomService.deleteRoom(1L);

        assertEquals(200, response.getStatusCode());
        assertEquals("Room deleted successfully", response.getMessage());
    }
    @Test
    @DisplayName("Should update room successfully")
    void updateRoom_Success() {

        Room room = new Room();
        room.setId(1L);
        room.setRoomType("Single");
        room.setRoomPrice(new BigDecimal("80.00"));
        room.setRoomDescription("Old description");
        room.setCity("Mostar");
        room.setCountry("BA");

        RoomRequest roomRequest = new RoomRequest();
        roomRequest.setRoomType("Deluxe");
        roomRequest.setRoomPrice(new BigDecimal("150.00"));
        roomRequest.setRoomDescription("Updated description");
        roomRequest.setCity("Sarajevo");
        roomRequest.setCountry("BA");
        roomRequest.setMaxGuests(3);
        roomRequest.setWifiAvailable(true);
        roomRequest.setParkingAvailable(true);
        roomRequest.setPrivateBathroom(true);
        roomRequest.setAirConditioning(true);
        roomRequest.setTvAvailable(true);

        when(roomRepository.findById(1L))
                .thenReturn(Optional.of(room));

        when(roomRepository.save(any(Room.class)))
                .thenReturn(room);

        Response response = roomService.updateRoom(1L, roomRequest, null);

        assertEquals(200, response.getStatusCode());
        assertEquals("Room updated successfully", response.getMessage());
        assertEquals("Deluxe", response.getRoom().getRoomType());
        assertEquals(new BigDecimal("150.00"), response.getRoom().getRoomPrice());
        assertEquals("Sarajevo", response.getRoom().getCity());
    }
}
