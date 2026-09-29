package com.eHotelMirnes.backend.service;

import com.eHotelMirnes.backend.dto.Response;
import com.eHotelMirnes.backend.entity.Booking;
import com.eHotelMirnes.backend.entity.Room;
import com.eHotelMirnes.backend.entity.User;
import com.eHotelMirnes.backend.repository.BookingRepository;
import com.eHotelMirnes.backend.repository.RoomRepository;
import com.eHotelMirnes.backend.repository.UserRepository;
import com.eHotelMirnes.backend.service.impl.BookingService;
import com.eHotelMirnes.backend.service.interfac.IRoomService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class BookingServiceTest {

    @Mock
    private BookingRepository bookingRepository;

    @Mock
    private IRoomService roomService;

    @Mock
    private RoomRepository roomRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private BookingService bookingService;

    @Test
    void saveBooking_shouldCreateBookingSuccessfully(){

        Long roomId = 1L;
        Long userId = 1L;

        Room room = new Room();
        room.setId(roomId);
        room.setBookings(new ArrayList<>());

        User user = new User();
        user.setId(userId);

        Booking booking = new Booking();
        booking.setCheckInDate(LocalDate.of(2026, 10, 10));
        booking.setCheckOutDate(LocalDate.of(2026, 10, 15));

        when(roomRepository.findById(roomId))
                .thenReturn(Optional.of(room));

        when(userRepository.findById(userId))
                .thenReturn(Optional.of(user));

        when(bookingRepository.save(any(Booking.class)))
                .thenReturn(booking);

        Response response = bookingService.saveBooking(roomId, userId, booking);

        assertEquals(200, response.getStatusCode());
        assertEquals("Booking created successfully", response.getMessage());
        assertNotNull(response.getBookingReference());

        assertEquals(room, booking.getRoom());
        assertEquals(user, booking.getUser());
        assertNotNull(booking.getBookingReference());

    }

}
