package com.eHotelMirnes.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

import java.math.BigDecimal;

import java.util.List;
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RoomDTO {
    private Long id;
    private String roomType;
    private BigDecimal roomPrice;
    private String roomPhotoUrl;
    private String roomDescription;

    private String city;
    private String country;

    private int maxGuests;

    private boolean wifiAvailable;
    private boolean parkingAvailable;
    private boolean privateBathroom;
    private boolean airConditioning;
    private boolean tvAvailable;

    private List<BookingDTO> bookings;
}
