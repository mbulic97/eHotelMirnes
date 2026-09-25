import ApiService from '../../service/ApiService';
import './HomePage.css'
import React, { useEffect, useState } from "react";
import RoomCarousel from './RoomCarousel';
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const isUser = ApiService.isUser();
    const isAdmin = ApiService.isAdmin();
    const [rooms, setRooms] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [roomType, setRoomType] = useState('');
    const [city, setCity] = useState('');

    const showError = (message, timeout = 5000) => {
        setError(message);
        setTimeout(() => {
            setError('');
        }, timeout);
    };
    useEffect(() => {
        const getWeather = async () => {
            try {
                const response = await fetch(
                    "https://wrd-api.fit.ba/api/Weather/Sarajevo"
                );
                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.message);
                }
                const data = await response.json();

                setWeather(data);
            } catch (error) {
                //console.error("Error fetching weather:", error);
                setError(error.message);

            };

        }
        getWeather();

    }, []);


    useEffect(() => { //Room Carousel
        const fetchRooms = async () => {
            try {
                const response = await ApiService.getAllRooms();
                setRooms(response.roomList);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRooms();
    }, []);

    const handleInternalSearch = async () => {

        if (!startDate) {
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
        const params = new URLSearchParams();
        const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : null;
        const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;
        if (formattedStartDate) params.set("checkInDate", formattedStartDate);
        if (formattedEndDate) params.set("checkOutDate", formattedEndDate);
        if (roomType) params.set("roomType", roomType);
        if (city) params.set("city", city);

        navigate(`/rooms?${params.toString()}`);
        // try {
        //     // Convert 
        //     const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : null;
        //     const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;
        //     const response = await ApiService.getAvailableRooms(formattedStartDate,formattedEndDate,roomType,city);
        //     console.log("filter rooms", response);
        //     if(response.statusCode === 200){
        //         handleSearchResult(response.roomList);

        //         if(response.roomList.length ===0 ){
        //             showError('No rooms available for the selected dates and room type.');
        //             return
        //         }
        //         else
        //         setError('');
        //     }
        // } catch(error) {
        //     showError("Unown error occured: " + error.response?.data?.message);
        // }
    };
    
    return (
        <div className="home">
            <section>
                <header className="header-banner">
                    <img src="./assets/images/hotel.webp" alt="eHotelMirnes" className="header-image" />

                    <div className="overlay"></div>
                    <div className="animated-texts overlay-content">

                        {isUser && (<><h1>Welcome back to <span className="eHotelMirnes-color">eHotelMirnes</span></h1>
                            <br />
                            <h3>Ready to find your next stay?</h3>
                        </>)}
                        {isAdmin && (<><h1>Welcome,  <span className="eHotelMirnes-color">Administrator</span></h1>

                            <h3>Manage your hotel from the admin dashboard</h3>
                        </>)}
                        {(!isAdmin && !isUser) && (<>
                            <h1>Explore,  <span className="eHotelMirnes-color">eHotelMirnes</span>
                            </h1>

                            <h3>Find your perfect stay and book your next trip</h3>

                        </>)}
                        <br />
                        <br />
                        <section>
                            <div className="search-container">
                                <div className="search-field">
                                    <DatePicker
                                        className="search-input"
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Select Check-in Date"
                                    />
                                </div>
                                <div className="search-field">
                                    <DatePicker
                                        className="search-input"
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Select Check-out Date"
                                    />
                                </div>

                                <div className="search-field">
                                    <input
                                        className="search-input"
                                        type="text"
                                        placeholder="Search room type"
                                        value={roomType}
                                        onChange={(e) => setRoomType(e.target.value)}
                                    />
                                </div>

                                <div className="search-field">
                                    <input
                                        className="search-input"
                                        type="text"
                                        placeholder="Search room city"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </div>

                                <button className="home-search-button" onClick={handleInternalSearch}>
                                    Search
                                </button>
                            </div>
                        </section>
                    </div>
                </header>
            </section>

            <h4>  <a className="view-rooms-home" href="/rooms">All Rooms</a></h4>
            <h2>Looking for the perfect stay?</h2>
            <div className="room-carousel"><RoomCarousel rooms={rooms} /></div>

            <h2 className="home-services">Services at <span className="eHotelMirnes-color">eHotelMirnes</span></h2>
            <h2>Weather</h2>
            {error && <p className="error-message">{error}</p>}
            {weather && (

                <div>

                    <div className="city">
                        <h2>City: {weather.name}</h2>
                        <img src={`https://flags.restcountries.com/v5/w640/${weather.sys.country.toLowerCase()}.png`} alt="" />
                    </div>

                    <div className="weather">

                        <div className="details-1">
                            <div className="icon-temp">
                                <img src={`https://openweathermap.org/payload/api/media/file/${weather.weather[0].icon}.png`} alt="" />
                                <h1>{Math.round(weather.main.temp - 273.15)}°C</h1>
                            </div>
                        </div>
                        <div className="details-2">
                            <div className="condition">

                                <p>Condition: {weather.weather[0].main}</p>
                            </div>

                            <div className="min-temperature">

                                <p>Min Temperature: {Math.round(weather.main.temp_min - 273.15)}°C</p>
                            </div>

                            <div className="max-temperature">

                                <p>Max Temperature: {Math.round(weather.main.temp_max - 273.15)}°C</p>
                            </div>
                            <div className="wind">
                                <p>Wind: {Math.round(weather.wind.speed * (3600 / 1000))}km/h</p>
                            </div>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}

export default HomePage;