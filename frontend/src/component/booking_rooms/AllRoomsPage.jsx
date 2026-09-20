import React, { useEffect, useState } from 'react'
import ApiService from '../../service/ApiService'
import Pagination from '../common/Pagination';
import RoomResult from '../common/RoomResult';
import RoomSearch from '../common/RoomSearch';

const AllRoomsPage = () => {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    //const [selectedRoomType, setSelectedRoomType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(5);
    const [error, setError] = useState(null);

    const handleSearchResult = (results) => {
        setFilteredRooms(results)
        setCurrentPage(1);

    }

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await ApiService.getAllRooms();

                console.log("ALL ROOMS:", response);

                const allRooms = response.roomList;
                setRooms(allRooms);
                setFilteredRooms(allRooms);
            } catch (error) {
                console.error("ERROR:", error);
                setError(error.response?.data?.message || error.message);

            }
        };
        
        fetchRooms();

    }, []);

    

    // Pagination
    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (


        <div>
            <h2>All Rooms</h2>
            {/*<div className='all-room-filter-div'>
                <label>Filter by Room Type:</label>
                <select value={selectedRoomType} onChange={handleRoomTypeChange}>
                    <option value="">All</option>
                    {roomTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>*/}
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
