package com.eHotelMirnes.backend.repository;

import com.eHotelMirnes.backend.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    @Query("SELECT DISTINCT r.roomType FROM Room r")
    List<String> findDistinctRoomTypes();

    @Query("SELECT r FROM Room r " +
            "WHERE r.roomType LIKE %:roomType% " +
            "AND r.city LIKE %:city% " +
            "AND r.id NOT IN (SELECT bk.room.id FROM Booking bk " +
            "WHERE (bk.checkInDate <= :checkOutDate) AND (bk.checkOutDate >= :checkInDate))")
    List<Room> findAvailableRooms(LocalDate checkInDate,
                                  LocalDate checkOutDate,
                                  String roomType,
                                  String city);
}
