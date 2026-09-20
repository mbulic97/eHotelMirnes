import  {  useState } from 'react'
import ApiService from '../../service/ApiService'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker';

const RoomSearch = ({ handleSearchResult }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [error, setError] = useState('');
    const [roomType, setRoomType] = useState('');
    const [City, setCity] = useState('');

    
    const showError = (message, timeout = 5000) => {
        setError(message);
        setTimeout(() => {
            setError('');
        }, timeout);
    };
    
    const handleInternalSearch = async () => {
        if(!startDate || !endDate || !roomType || !City) {
            showError('Please select all fields');
            return false;
        }
        try {
            // Convert 
            const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : null;
            const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;
            const response = await ApiService.getAvailableRooms(formattedStartDate,formattedEndDate,roomType,City);
            console.log("filter rooms", response);
            if(response.statusCode === 200){
                if(response.roomList.length ===0){
                    showError('Room not currently available for this date range on the selected rom type.');
                    return
                }
                handleSearchResult(response.roomList);
                setError('');
            }
        } catch(error) {
            showError("Unown error occured: " + error.response?.data?.message);
        }
    };
    return (
        <section>
            <div className="search-container">
                <div className="search-field">
                    <label>Check-in Date</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select Check-in Date"
                    />
                </div>
                <div className="search-field">
                    <label>Check-out Date</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select Check-out Date"
                    />
                </div>

                <div className="search-field">
                    <label>Room Type</label>
                    <input
                        type="text"
                        placeholder="Search room type"
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                    />
                </div>
                <div className="search-field">
                    <label>City</label>
                    <input
                        type="text"
                        placeholder="Search room city"
                        value={City}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <button className="home-search-button" onClick={handleInternalSearch}>
                    Search Rooms
                </button>
            </div>
            {error && <p className="error-message">{error}</p>}
        </section>
    )
}

export default RoomSearch;
