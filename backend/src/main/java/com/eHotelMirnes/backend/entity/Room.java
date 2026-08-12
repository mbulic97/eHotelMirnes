package com.eHotelMirnes.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "rooms")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String roomType;
    private BigDecimal roomPrice;
    private String roomPhotoUrl;
    private String roomDescription;

    private String city;

    private String country;

    @Min(value = 1, message = "Maximum guests must be at least 1")
    private int maxGuests;

    private boolean wifiAvailable;
    private boolean parkingAvailable;
    private boolean privateBathroom;
    private boolean airConditioning;
    private boolean tvAvailable;
    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Booking> bookings = new ArrayList<>();

    @Override
    public String toString() {
        return "Room{" +
                "id=" + id +
                ", roomType='" + roomType + '\'' +
                ", roomPrice=" + roomPrice +
                ", roomPhotoUrl='" + roomPhotoUrl + '\'' +
                ", roomDescription='" + roomDescription + '\'' +
                ", city='" + city + '\'' +
                ", country='" + country + '\'' +
                ", maxGuests='" + maxGuests + '\'' +
                ", wifiAvailable='" + wifiAvailable + '\'' +
                ", parkingAvailable='" + parkingAvailable + '\'' +
                ", privateBathroom='" + privateBathroom + '\'' +
                ", airConditioning='" + airConditioning + '\'' +
                ", tvAvailable='" + tvAvailable + '\'' +
                '}';
    }
}
