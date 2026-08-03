import React from 'react'
import ApiService from '../../service/ApiService'

const RoomSearch = () => {

    useEffect(() => {
        const testRooms = async () => {
            try {
                const rooms = await ApiService.getAllRooms();
                console.log("Rooms from MySQL:", rooms);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        testRooms();
    }, []);
    return (
        <div>

        </div>
    )
}

export default RoomSearch;
