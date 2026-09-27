import React from 'react'

const MyBookingsResult = ({ bookings, onDeleteBooking }) => {
    return (
        <section className="booking-results">
            {bookings && bookings.length > 0 && (
                <div className="booking-list">
                    {bookings.map(booking => (
                        <div className="booking-list-item" key={booking.id}>

                            <div className="booking-details">
                                <p>
                                    Booking reference: {booking.bookingReference}
                                </p>

                                <p>
                                    Check-in: {booking.checkInDate}
                                </p>

                                <p>
                                    Check-out: {booking.checkOutDate}
                                </p>

                                <p>
                                    Total Guests: {booking.totalNumOfGuest}
                                </p>

                                <p>
                                    Room Type: {booking.room.roomType}
                                </p>
                                <img className='room-list-item-image' src={booking.room.roomPhotoUrl}></img>

                            </div>

                            <div className="booking-action">
                                <button
                                    className="delete-booking-button"
                                    onClick={() =>
                                        onDeleteBooking(
                                            booking.id,
                                            booking.room.roomDescription
                                        )
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
};

export default MyBookingsResult
