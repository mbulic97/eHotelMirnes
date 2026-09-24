import React from 'react'
import './BookingResult.css'

const BookingResult = ({ bookings, onDeleteBooking }) => {
    
    
  return (
        <section className="booking-results">
            {bookings && bookings.length > 0 && (
                <div className="booking-list">
                    {bookings.map(booking => (
                        <div key={booking.id} className="booking-list-item">

                            <div className="booking-details">
                                <h3>{booking.room.roomDescription}</h3>

                                <p>Booking ID: {booking.id}</p>
                                <p>booking reference: {booking.bookingReference}</p>
                                <p>Check-in:: {booking.checkInDate}</p>
                                <p>Check-out: {booking.checkOutDate}</p>

                                <p>Booked by: {booking.user.name}</p>
                                <p>User ID: {booking.user.id}</p>
                                <p>Room ID: {booking.room.id}</p>
                            </div>

                            <div className="booking-action">
                                <button
                                    className="delete-booking-button"
                                    onClick={() =>
                                        onDeleteBooking(booking.id, booking.room.roomDescription)
                                    }
                                >
                                    Delete Booking
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default BookingResult
