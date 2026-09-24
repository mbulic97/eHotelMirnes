package com.eHotelMirnes.backend.service.impl;

import com.eHotelMirnes.backend.dto.BookingDTO;
import com.eHotelMirnes.backend.dto.Response;
import com.eHotelMirnes.backend.entity.Booking;
import com.eHotelMirnes.backend.entity.Room;
import com.eHotelMirnes.backend.entity.User;
import com.eHotelMirnes.backend.exception.OurException;
import com.eHotelMirnes.backend.repository.BookingRepository;
import com.eHotelMirnes.backend.repository.RoomRepository;
import com.eHotelMirnes.backend.repository.UserRepository;
import com.eHotelMirnes.backend.service.interfac.IBookingService;
import com.eHotelMirnes.backend.service.interfac.IRoomService;
import com.eHotelMirnes.backend.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService implements IBookingService {
    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private IRoomService roomService;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Response saveBooking(Long roomId, Long userId, Booking bookingRequest) {

        Response response = new Response();

        try {
            if (bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())){
                throw new IllegalArgumentException("Invalid check-in/check-out dates");
            }
            Room room = roomRepository.findById(roomId).orElseThrow(()-> new OurException("Room Not Found"));
            User user = userRepository.findById(userId).orElseThrow(()-> new OurException("User Not Found"));

            List<Booking> existingBookings = room.getBookings();

            if (!roomIsAvailable(bookingRequest, existingBookings)){
                throw new OurException("Room not Available for selected date range");
            }

            bookingRequest.setRoom(room);
            bookingRequest.setUser(user);
            String bookingReference = Utils.generateRandomReference(10);
            bookingRequest.setBookingReference(bookingReference);
            bookingRepository.save(bookingRequest);
            response.setStatusCode(HttpStatus.OK.value());
            response.setMessage("Booking created successfully");
            response.setBookingReference("Booking created successfully. Reference: " + bookingReference);

        } catch (OurException e) {
            response.setStatusCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(e.getMessage());
        } catch (Exception e){
            response.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.setMessage("Failed to save booking: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response findBookingByReference(String reference) {
        Response response = new Response();

        try {
            Booking booking = bookingRepository.findByBookingReference(reference).orElseThrow(() -> new OurException("Booking Not Found"));
            BookingDTO bookingDTO = Utils.mapBookingEntityToBookingDTOPlusBookedRooms(booking,true);
            response.setStatusCode(HttpStatus.OK.value());
            response.setMessage("Booking found successfully");
            response.setBooking(bookingDTO);
        } catch (OurException e) {
            response.setStatusCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.setMessage("Failed to find booking: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAllBookings() {
        Response response = new Response();

        try {
            List<Booking> bookingList = bookingRepository.findAll(Sort.by(Sort.Direction.DESC,"id"));
            List<BookingDTO> bookingDTOList = Utils.mapBookingListEntityToBookingListDTO(bookingList);
            response.setStatusCode(HttpStatus.OK.value());
            response.setMessage("Bookings retrieved successfully");
            response.setBookingList(bookingDTOList);
        } catch (OurException e) {
            response.setStatusCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.setMessage("Failed to retrieve bookings: " + e.getMessage());
        }
        return response;
    }
    @Override
    public Response getAllBookingsPlusUserRoom() {
        Response response = new Response();

        try {
            List<Booking> bookingList = bookingRepository.findAll(Sort.by(Sort.Direction.DESC,"id"));
            List<BookingDTO> bookingDTOList = Utils.mapBookingListEntityToBookingDTOPlusBookedRooms(bookingList);
            response.setStatusCode(HttpStatus.OK.value());
            response.setMessage("Booking found successfully");
            response.setBookingList(bookingDTOList);
        } catch (OurException e) {
            response.setStatusCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.setMessage("Failed to find booking: " + e.getMessage());
        }
        return response;
    }
    @Override
    public Response cancelBooking(Long bookingId) {

        Response response = new Response();

        try{
            bookingRepository.findById(bookingId).orElseThrow(() -> new OurException("Booking Does Not Exist"));
            bookingRepository.deleteById(bookingId);
            response.setStatusCode(HttpStatus.OK.value());
            response.setMessage("Booking cancelled successfully");
        } catch (OurException e){
            response.setStatusCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.setMessage("Failed to cancel booking");
        }
        return response;
    }

    private boolean roomIsAvailable(Booking bookingRequest, List<Booking> existingBookings){
        return existingBookings.stream()
                .noneMatch(existingBooking ->
                        bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())
                                || bookingRequest.getCheckOutDate().isBefore(existingBooking.getCheckOutDate())
                                || (bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate())
                                && bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()))
                                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate()))
                                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                                && bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckOutDate()))

                                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate()))

                                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(bookingRequest.getCheckInDate()))
                );

    }
}

