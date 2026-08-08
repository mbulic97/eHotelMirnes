import React from 'react';
import './RoomCarousel.css'

const RoomCarousel = ({ rooms }) => {
    

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

                </div>
            ))}
        </div>
    );
};

export default RoomCarousel;