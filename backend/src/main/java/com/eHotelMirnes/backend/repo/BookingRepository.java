package com.eHotelMirnes.backend.repo;

import com.eHotelMirnes.backend.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}
