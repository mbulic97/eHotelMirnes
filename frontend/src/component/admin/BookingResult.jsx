import React from 'react'
import './BookingResult.css'

const BookingResult = ({ bookings, onDeleteBooking }) => {
    // const [room, setroom] = useState([]);
    // useEffect(() => {
    //         const getRoom = async () => {
    //             try{
    //                 const response = await ApiService.getAllBookings();
    //                 console.log("ALL BOOKINGS:", response);
    //                 setBookings(response.bookingList);
    
    //             } catch (error) {
    //                 console.error('Error fetching bookings:', error.message);
    //             }
    //         };
    //         getBookings();
    //     }, []);
    
  return (
        <section className="booking-results">
            {bookings && bookings.length > 0 && (
                <div className="booking-list">
                    {bookings.map(booking => (
                        <div key={booking.id} className="booking-list-item">

                            <div className="booking-details">
                                <h3>{booking.name}</h3>

                                <p>checkInDate: {booking.checkInDate}</p>

                                <p>checkOutDate: {booking.checkOutDate}</p>


                                <p>bookingReference: {booking.bookingReference}</p>
                            </div>

                            <div className="booking-action">
                                <button
                                    className="delete-booking-button"
                                    onClick={() =>
                                        onDeleteBooking(booking.id/*, booking.roomDescription*/)
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
