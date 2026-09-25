import  {  useState } from 'react'
import ApiService from '../../service/ApiService'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker';
import '../common/RoomSearch.css'
import { useSearchParams } from 'react-router-dom';

const RoomSearch = ({ handleSearchResult }) => {
    const [searchParams] = useSearchParams();

    const [startDate, setStartDate] = useState(
        searchParams.get('checkInDate')
        ? new Date(searchParams.get('checkInDate'))
        : null
    );
    const [endDate, setEndDate] = useState(
        searchParams.get('checkOutDate')
            ? new Date(searchParams.get('checkOutDate'))
            : null
    );
    const [error, setError] = useState('');
    const [roomType, setRoomType] = useState(
        searchParams.get('roomType') || ''
    );
    const [city, setCity] = useState(
        searchParams.get('city') || ''
    );

    
    const showError = (message, timeout = 5000) => {
        setError(message);
        setTimeout(() => {
            setError('');
        }, timeout);
    };
    
    const handleInternalSearch = async () => {

        if(!startDate) {
            showError('Please select a check-in date.');
            return false;
        }

        if (!endDate) {
            showError('Please select a check-out date.');
            return false;
        }

        if (!roomType) {
            showError('Please select a room type.');
            return false;
        }

        if (!city) {
            showError('Please select a city.');
            return false;
        }

        try {
            // Convert 
            const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : null;
            const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;
            const response = await ApiService.getAvailableRooms(formattedStartDate,formattedEndDate,roomType,city);
            console.log("filter rooms", response);
            if(response.statusCode === 200){
                handleSearchResult(response.roomList);

                if(response.roomList.length ===0 ){
                    showError('No rooms available for the selected dates and room type.');
                    return
                }
                else
                setError('');
            }
        } catch(error) {
            showError("Unown error occured: " + error.response?.data?.message);
        }
    };
    return (
        <section >
            <div className="room-search-container">
                <div className="room-search-field">
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="room-search-input"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select Check-in Date"
                    />
                </div>
                <div className="room-search-field">
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        className="room-search-input"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select Check-out Date"
                    />
                </div>

                <div className="room-search-field">
                    <input
                        type="text"
                        placeholder="Search room type"
                        className="room-search-input"
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                    />
                </div>
                <div className="room-search-field">
                    <input
                        type="text"
                        placeholder="Search room city"
                        className="room-search-input"

                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <button className="room-home-search-button" onClick={handleInternalSearch}>
                    Search
                </button>
            </div>
            {error && <p className="error-message">{error}</p>}
        </section>
    )
}

export default RoomSearch;
