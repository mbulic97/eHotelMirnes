import React, { useEffect, useState } from 'react'
import MyBookingsResult from './MyBookingsResult';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';

const MyBookingsPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingsPerPage] = useState(5);
    const [error, setError] = useState(null);
    const [bookings, setBookings] = useState([]);

    
    useEffect(() => {
        const fetchMyBookings = async () => {

            try {
                const response = await ApiService.getUserProfile();
                const userPlusBookings = await ApiService.getUserBookings(response.user.id);
                console.log(userPlusBookings);
                setBookings(userPlusBookings.user.bookings);
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };

        fetchMyBookings();
    }, []);
    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      <h2>My Booking History</h2>
      {error && <p className="error-message">{error}</p>}

      <MyBookingsResult
        bookings={currentBookings}
        onDeleteBooking={handleDeleteBooking}
        />
        <Pagination
            roomsPerPage={bookingsPerPage}
            totalRooms={bookings.length}
            currentPage={currentPage}
            paginate={paginate}
        />
    </div>
  )
}

export default MyBookingsPage
