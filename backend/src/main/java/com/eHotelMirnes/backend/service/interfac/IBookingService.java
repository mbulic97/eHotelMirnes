package com.eHotelMirnes.backend.service.interfac;

import com.eHotelMirnes.backend.dto.Response;
import com.eHotelMirnes.backend.entity.Booking;

public interface IBookingService {
    Response saveBooking(Long roomId, Long userId, Booking bookingRequest);
    Response findBookingByReference(String reference);
    Response getAllBookings();
    Response cancelBooking(Long bookingId);
}
