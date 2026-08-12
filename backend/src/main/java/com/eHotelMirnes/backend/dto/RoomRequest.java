package com.eHotelMirnes.backend.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class RoomRequest {
    @NotBlank(message = "Room type is required")
    private String roomType;
    @NotNull(message = "Room price is required")
    @DecimalMin(value = "0.0", message = "Room price must not be negative")
    private BigDecimal roomPrice;
    @NotBlank(message = "Room description is required")
    private String roomDescription;
    @NotBlank(message = "City is required")
    private String city;
    @NotBlank(message = "Country is required")
    private String country;
    @NotNull(message = "Maximum guests is required")
    @Min(value = 1, message = "Maximum guests must be at least 1")
    private Integer maxGuests ;

    private Boolean wifiAvailable = false;
    private Boolean parkingAvailable = false;
    private Boolean privateBathroom = false;
    private Boolean airConditioning = false;
    private Boolean tvAvailable = false;
}