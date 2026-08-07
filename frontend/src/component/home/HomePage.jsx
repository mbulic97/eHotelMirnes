import './HomePage.css'
import React, { useEffect, useState } from "react";

const HomePage = () => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const getWeather = async () => {
            const response = await fetch(
                "https://wrd-api.fit.ba/api/Weather/sarajevo"
            );

            const data = await response.json();

            setWeather(data);
        };

        getWeather();
    }, []);
    return (
        <div className="home">
            <section>
                <header className="header-banner">
                    <img src="./assets/images/hotel.webp" alt="eHotelMirnes" className="header-image" />

                    <div className="overlay"></div>
                    <div className="animated-texts overlay-content">
                        <h1>
                            Welcome to <span className="eHotelMirnes-color">eHotelMirnes</span>
                        </h1><br />
                        <h3>Find Your Ideal Room — Book Now, Pay Less</h3>
                    </div>
                </header>
            </section>

            <h4>  <a className="view-rooms-home" href="/rooms">All Rooms</a></h4>
            <h2 className="home-services">Services at <span className="eHotelMirnes-color">eHotelMirnes</span></h2>
            {weather && (

                <div>
                    <h2>Weather</h2>
                    <div className="city">
                        <h2>City: {weather.name}</h2>
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



                    </div></div>

            )}
            <section>

            </section>
        </div>
    );
}

export default HomePage;