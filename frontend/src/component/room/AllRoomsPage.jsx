import React, { useEffect, useState } from 'react'
import ApiService from '../../service/ApiService'
import Pagination from '../common/Pagination';
import RoomResult from './RoomResult';
import RoomSearch from './RoomSearch';
import { useSearchParams } from 'react-router-dom';

const AllRoomsPage = () => {
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(5);
    const [error, setError] = useState(null);

    const [searchParams] = useSearchParams();

    const handleSearchResult = (results) => {
        setFilteredRooms(results)
        setCurrentPage(1);

    }

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const checkInDate = searchParams.get('checkInDate');
                const checkOutDate = searchParams.get('checkOutDate');
                const roomType = searchParams.get('roomType');
                const city = searchParams.get('city');
            
                let response
                if (checkInDate && checkOutDate && roomType && city) {

                    response = await ApiService.getAvailableRooms(
                        checkInDate,
                        checkOutDate,
                        roomType,
                        city
                    );

                } else{
                    response = await ApiService.getAllRooms();
                }
                
                const allRooms = response.roomList;
                setFilteredRooms(allRooms);
            } catch (error) {
                setError(error.response?.data?.message || error.message);

            }
        };
        
        fetchRooms();

    }, [searchParams]);

    

    // Pagination
    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (


        <div>
            <h2>All Rooms</h2>
            
            {error && <p className="error-message">{error}</p>}
            {
            <RoomSearch
                handleSearchResult={handleSearchResult}
            />}
            
            <RoomResult roomSearchResults={currentRooms} />

            <Pagination
                roomsPerPage={roomsPerPage}
                totalRooms={filteredRooms.length}
                currentPage={currentPage}
                paginate={paginate}
            />
        </div>
    )
}

export default AllRoomsPage
