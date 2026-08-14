package com.eHotelMirnes.backend.repository;

import com.eHotelMirnes.backend.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}
