import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import {
    FaWifi,
    FaTv,
    FaParking,
    FaSnowflake,
    FaBath
}from 'react-icons/fa';
const AddRoomPage = () => {

    const navigate = useNavigate();
    const [roomDetails, setRoomDetails] = useState({
        roomPhotoUrl: '',
        roomType: '',
        roomPrice: '',
        roomDescription: '',
        city: '',
        country: '',
        maxGuests: 0,
        wifiAvailable: false,
        parkingAvailable: false,
        privateBathroom: false,
        airConditioning: false,
        tvAvailable: false
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [roomTypes, setRoomTypes] = useState([]);
    const [newRoomType, setNewRoomType] = useState(false);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const types = await ApiService.getRoomTypes();
                setRoomTypes(types);
            } catch (error) {
                console.error('Error fetching room types:', error.message);
            }
        };
        fetchRoomTypes();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setRoomDetails(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked 
            : type === 'number'
            ? Number(value)
            : value,
        }));
    };

    const handleRoomTypeChange = (e) => {
        if (e.target.value === 'new') {
            setNewRoomType(true);
            setRoomDetails(prevState => ({ ...prevState, roomType: '' }));
        } else {
            setNewRoomType(false);
            setRoomDetails(prevState => ({ ...prevState, roomType: e.target.value }));
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            setFile(null);
            setPreview(null);
        }
    };

    const addRoom = async () => {
        
        if (!roomDetails.roomType ||
            !roomDetails.roomPrice ||
            !roomDetails.roomDescription ||
            !roomDetails.city ||
            !roomDetails.country ||
            roomDetails.maxGuests < 1    
        ) {
            setError('All room details must be provided.');
            setTimeout(() => setError(''), 5000);
            return;
        }

        if (!window.confirm('Do you want to add this room?')) {
            return
        }
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('roomType', roomDetails.roomType);
            formData.append('roomPrice', roomDetails.roomPrice);
            formData.append('roomDescription', roomDetails.roomDescription);
            formData.append('city', roomDetails.city);
            formData.append('country', roomDetails.country);
            formData.append('maxGuests', roomDetails.maxGuests);
            formData.append('wifiAvailable', roomDetails.wifiAvailable);
            formData.append('parkingAvailable', roomDetails.parkingAvailable);
            formData.append('privateBathroom', roomDetails.privateBathroom);
            formData.append('airConditioning',roomDetails.airConditioning);
            formData.append('tvAvailable',roomDetails.tvAvailable);
            if (file) {
                formData.append('photo', file);
            }

            const result = await ApiService.addRoom(formData);
            if (result.statusCode === 200) {
                setSuccess('Room Added successfully.');
                
                setTimeout(() => {
                    setSuccess('');
                    setLoading(false);
                    navigate('/admin/manage-rooms');
                }, 3000);
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => {  
                setError('');
                setLoading(false);
            }, 5000);
        } 
    };
    return (
        <div className="edit-room-container">
            <h2>Add New Room</h2>
            
            <div className="edit-room-form">
                <div className="form-group">
                    {preview && (
                        <img src={preview} alt="Room Preview" className="room-photo-preview" />
                    )}
                    <input
                        type="file"
                        name="roomPhoto"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="form-group">
                    <label>Room Type</label>
                    <select value={roomDetails.roomType} onChange={handleRoomTypeChange}>
                        <option value="">Select a room type</option>
                        {roomTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                        <option value="new">Other (please specify)</option>
                    </select>
                    {newRoomType && (
                        <input
                            type="text"
                            name="roomType"
                            placeholder="Enter new room type"
                            value={roomDetails.roomType}
                            onChange={handleChange}
                        />
                    )}
                </div>

                <div className="form-group">
                    <label>Room Price</label>
                    <input
                        type="text"
                        name="roomPrice"
                        value={roomDetails.roomPrice}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Room Description</label>
                    <textarea
                        name="roomDescription"
                        value={roomDetails.roomDescription}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="form-group">
                    <label>City</label>
                    <input
                        type="text"
                        name="city"
                        value={roomDetails.city}
                        onChange={handleChange}
                    ></input>
                </div>

                <div className="form-group">
                    <label>Country</label>
                    <input
                        type="text"
                        name="country"
                        value={roomDetails.country}
                        onChange={handleChange}
                    ></input>
                </div>

                <div className="form-group">
                    <label>Max Guests</label>
                    <input
                        type="number"
                        name="maxGuests"
                        value={roomDetails.maxGuests}
                        onChange={handleChange}
                        min = "1"
                    ></input>
                </div>

                <div className="form-group">
                  <legend>Room Facilities</legend>
                  <label>
                      <FaWifi/> Wifi
                      <input
                          type="checkbox"
                          name="wifiAvailable"
                          checked={roomDetails.wifiAvailable}
                          onChange={handleChange}
                      />
                      
                  </label>
                  <label>
                      <FaParking/> Parking
                      <input
                          type="checkbox"
                          name="parkingAvailable"
                          checked={roomDetails.parkingAvailable}
                          onChange={handleChange}
                      />
                      
                  </label>

                  <label>
                      <FaBath/> Private Bathroom
                      <input
                          type="checkbox"
                          name="privateBathroom"
                          checked={roomDetails.privateBathroom}
                          onChange={handleChange}
                      />
                  </label>

                  <label>
                      <span><FaSnowflake/> Air Conditioning </span>
                      <input
                          type="checkbox"
                          name="airConditioning"
                          checked={roomDetails.airConditioning}
                          onChange={handleChange}
                      />
                  </label>

                  <label>
                      <span><FaTv/> TV</span>
                      <input
                          type="checkbox"
                          name="tvAvailable"
                          checked={roomDetails.tvAvailable}
                          onChange={handleChange}
                      />
                  </label>
                </div>
                 <div className='buttons'>
                    {/* <button className="update-button" onClick={addRoom}>Add Room</button> */}
                    <button 
                        className="update-button" 
                        onClick={addRoom}
                        style={{cursor: loading ? 'not-allowed' : 'pointer'}}
                        disabled={loading}
                        >
                           {loading ? 'Adding Room...' : 'Add Room'}</button>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                 </div>
            </div>
        </div>
    )
}

export default AddRoomPage
