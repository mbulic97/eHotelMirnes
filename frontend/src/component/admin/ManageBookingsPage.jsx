import React, { useEffect, useState } from 'react'
import ApiService from '../../service/ApiService'
import BookingResult from './BookingResult';
import Pagination from '../common/Pagination';

const ManageBookingsPage = () => {

    const [bookings, setBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingsPerPage] = useState(5);

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

    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
      <h2>Manage Bookings</h2>
      <BookingResult 
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

export default ManageBookingsPage
