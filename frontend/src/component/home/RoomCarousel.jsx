import React from 'react';
import './RoomCarousel.css'
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const RoomCarousel = ({ rooms }) => {
    const navigate = useNavigate();
    const isAdmin = ApiService.isAdmin();
    

    return (
        <div className="room-carousel">
            {rooms.map((room) => (
                <div className="room-carousel-item" key={room.id}>
                    <img
                        src={room.roomPhotoUrl}
                        alt={room.roomType}
                    />

                    <h3>{room.roomType}</h3>
                    <p>Price: ${room.roomPrice}/night</p>
                    <div className='book-now-div'>
                                {isAdmin ? (
                                    <button
                                        className="edit-room-button"
                                        onClick={() => navigate(`/admin/edit-room/${room.id}`)} //isAdmin Navigate to edit room with room ID
                                    >
                                        Edit Room
                                    </button>
                                ) : (
                                    <button
                                        className="book-now-button"
                                        onClick={() => navigate(`/room-details-book/${room.id}`)} //isUser Navigate to book room with room ID
                                    >
                                        View/Book Now
                                    </button>
                                )}
                            </div>
                </div>
            ))}
        </div>
    );
};

export default RoomCarousel;