import React, { useEffect, useState } from 'react'
import ApiService from '../../service/ApiService';
import {  useNavigate } from 'react-router-dom';
import RoomResult from '../room/RoomResult';
import Pagination from '../common/Pagination';

const ManageRoomsPage = () => {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(5);
    const [error, setError] = useState('');  
    
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await ApiService.getAllRooms();


                const allRooms = response.roomList;
                setRooms(allRooms);
                setFilteredRooms(allRooms);
            } catch (error) {
                setError(error.response?.data?.message || error.message);

            }
        };
        const fetchRoomTypes = async () => {
            try {
                const types = await ApiService.getRoomTypes();
                setRoomTypes(types);
            } catch (error) {
                setError(error.response?.data?.message || error.message);

            }
        };
        fetchRooms();
        fetchRoomTypes();

    }, []);

    const handleRoomTypeChange = (e) => {
        setSelectedRoomType(e.target.value);
        filterRooms(e.target.value);
    };

    const filterRooms = (type) => {
        if (type === '') {
            setFilteredRooms(rooms);
        } else {
            const filtered = rooms.filter((room) => room.roomType === type);
            setFilteredRooms(filtered);
        }
        setCurrentPage(1); // Reset to first page after filtering
    };

    // Pagination
    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (error) {
        return (
            <div className="all-rooms">
                <p className="error-message">{error}</p>
            </div>
        );
    }

    return (
        <div className='all-rooms'>
            <h2>Manage Rooms</h2>
            <div className='all-room-filter-div' >
                <div className='filter-select-div'>
                    <label>Filter by Room Type:</label>
                    <select value={selectedRoomType} onChange={handleRoomTypeChange}>
                        <option value="">All</option>
                        {roomTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    <button className="update-button" onClick={() => navigate('/admin/add-room')}>
                        Add Room
                    </button>
                </div>
            </div>

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

export default ManageRoomsPage
