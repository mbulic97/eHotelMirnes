package com.eHotelMirnes.backend.repository;

import com.eHotelMirnes.backend.entity.Room;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest(properties = {
        "spring.jpa.hibernate.ddl-auto=create-drop",
        "spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect"
})
public class RoomRepositoryTest {

    @Autowired
    private RoomRepository roomRepository;

    @Test
    @DisplayName("Should save room successfully")
    void saveRoom_Success(){
        Room room = new Room();
        room.setRoomType("Deluxe");
        room.setRoomPrice(new BigDecimal("150.00"));
        room.setRoomDescription("Nice deluxe room");
        room.setCity("Mostar");
        room.setCountry("BA");
        room.setMaxGuests(2);
        room.setWifiAvailable(true);
        room.setParkingAvailable(true);
        room.setPrivateBathroom(true);
        room.setAirConditioning(true);
        room.setTvAvailable(true);

        Room savedRoom = roomRepository.save(room);

        assertEquals("Deluxe", savedRoom.getRoomType());
        assertEquals(new BigDecimal("150.00"), savedRoom.getRoomPrice());
        assertEquals("Mostar", savedRoom.getCity());
        assertEquals(true, savedRoom.isWifiAvailable());
    }
}
