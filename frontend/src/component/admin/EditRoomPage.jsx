import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import './EditRoomPage.css'
const EditRoomPage = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [roomDetails, setRoomDetails] = useState({
        roomPhotoUrl: '',
        roomType: '',
        roomPrice: '',
        roomDescription: '',
        wifiAvailable: false,
        parkingAvailable: false,
        privateBathroom: false,
        airConditioning: false,
        tvAvailable: false
    })
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await ApiService.getRoomById(roomId);
                setRoomDetails({
                    roomPhotoUrl: response.room.roomPhotoUrl,
                    roomType: response.room.roomType,
                    roomPrice: response.room.roomPrice,
                    roomDescription: response.room.roomDescription,
                    wifiAvailable: response.room.wifiAvailable,
                    parkingAvailable: response.room.parkingAvailable,
                    privateBathroom: response.room.privateBathroom,
                    airConditioning: response.room.airConditioning,
                    tvAvailable: response.room.tvAvailable
                });
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };
        fetchRoomDetails();
    },[roomId]);
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setRoomDetails(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
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

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            const roomRequest = {
                roomType: roomDetails.roomType,
                roomPrice: roomDetails.roomPrice,
                roomDescription: roomDetails.roomDescription,
                wifiAvailable: roomDetails.wifiAvailable,
                parkingAvailable: roomDetails.parkingAvailable,
                privateBathroom: roomDetails.privateBathroom,
                airConditioning: roomDetails.airConditioning,
                tvAvailable: roomDetails.tvAvailable
            };
            formData.append(

                'roomRequest',
                new Blob([JSON.stringify(roomRequest)], {
                    type: 'application/json',
                })
            );
            if (file) {
                formData.append('photo', file);
            }
            const result = await ApiService.updateRoom(roomId, formData);
            if (result.statusCode === 200) {
                setSuccess('Room updated successfully.');
                
                setTimeout(() => {
                    setSuccess('');
                    setLoading(false);
                    navigate('/admin/manage-rooms');
                }, 3000);
            }
            setTimeout(() => setSuccess(''), 5000);
        } catch (error) {
            setLoading(false)
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        } 
        //finally {
        //     setLoading(false);
        // }
    };

    const handleDelete = async () => {
        if (window.confirm('Do you want to delete this room?')) {
            try {
                const result = await ApiService.deleteRoom(roomId);
                if (result.statusCode === 200) {
                    setSuccess('Room Deleted successfully.');
                    
                    setTimeout(() => {
                        setSuccess('');
                        navigate('/admin/manage-rooms');
                    }, 3000);
                }
            } catch (error) {
                setError(error.response?.data?.message || error.message);
                setTimeout(() => setError(''), 5000);
            }
        }
    };
  return (
    <div className="edit-room-container">
            <h2>Edit Room</h2>
            
            <div className="edit-room-form">
                <div className="form-group">
                    {preview ? (
                        <img src={preview} alt="Room Preview" className="room-photo-preview" />
                    ) : (
                        roomDetails.roomPhotoUrl && (
                            <img src={roomDetails.roomPhotoUrl} alt="Room" className="room-photo" />
                        )
                    )}
                    <input
                        type="file"
                        name="roomPhoto"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="form-group">
                    <p>Room Type</p>
                    <input
                        type="text"
                        name="roomType"
                        value={roomDetails.roomType}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <p>Room Price</p>
                    <input
                        type="text"
                        name="roomPrice"
                        value={roomDetails.roomPrice}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <p>Room Description</p>
                    <textarea
                        name="roomDescription"
                        value={roomDetails.roomDescription}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="form-group">

                  <p>Room Facilities</p>
                  <label>
                      <input
                          type="checkbox"
                          name="wifiAvailable"
                          checked={roomDetails.wifiAvailable}
                          onChange={handleChange}
                      />
                      WiFi
                  </label>
                  <label>
                      <input
                          type="checkbox"
                          name="parkingAvailable"
                          checked={roomDetails.parkingAvailable}
                          onChange={handleChange}
                      />
                      Parking
                  </label>

                  <label>
                      <input
                          type="checkbox"
                          name="privateBathroom"
                          checked={roomDetails.privateBathroom}
                          onChange={handleChange}
                      />
                      Private Bathroom
                  </label>

                  <label>
                      <input
                          type="checkbox"
                          name="airConditioning"
                          checked={roomDetails.airConditioning}
                          onChange={handleChange}
                      />
                      Air Conditioning
                  </label>

                  <label>
                      <input
                          type="checkbox"
                          name="tvAvailable"
                          checked={roomDetails.tvAvailable}
                          onChange={handleChange}
                      />
                      TV
                  </label>
                </div>
                
                
                <div className='buttons'>
                    <button 
                        className="update-button" 
                        onClick={handleUpdate}
                        style={{cursor: loading ? 'not-allowed' : 'pointer'}}
                        disabled={loading}
                        >
                           {loading ? 'Updating...' : 'Update Room'}</button>
                    <button className="delete-button" onClick={handleDelete}>Delete Room</button>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                </div>
                
            </div>
        </div>
  )
}

export default EditRoomPage
