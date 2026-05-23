import './HomePage.css'
import React from "react";

const HomePage = () => {
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


            <section>

            </section>
        </div>
    );
}

export default HomePage;