import React, { useEffect, useState } from 'react'
import ApiService from '../../service/ApiService'
import BookingResult from './BookingResult';

const ManageBookingsPage = () => {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const getBookings = async () => {
            try{
                const response = await ApiService.getAllBookings();
                console.log("ALL BOOKINGS:", response);
                setBookings(response.bookingList);

            } catch (error) {
                console.error('Error fetching bookings:', error.message);
            }
        };
        getBookings();
    }, []);
    const handleDeleteBooking = async (bookingId, roomDescription) =>{
        const isDelete = window.confirm(
            `Are you sure you want to delete ${roomDescription}?`
        );

        if(!isDelete) return;

        try {
            await ApiService.cancelBooking(bookingId);

            setBookings(prevBookings => 
                prevBookings.filter(booking => booking.id !== bookingId)
            );
        } catch (error) {
            console.error("Error deleting booking:", error);
        }
    };
  return (
    <div>
      <h2>Manage Bookings</h2>
      <BookingResult bookings={bookings}
      onDeleteBooking={handleDeleteBooking}/>
    </div>
  )
}

export default ManageBookingsPage
