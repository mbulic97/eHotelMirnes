import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const EditProfilePage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        email: '',
        name: '',
        phoneNumber: ''
    })
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await ApiService.getUserProfile(userId);
                console.log(response);
                setUserDetails({
                    email: response.user.email,
                    name: response.user.name,
                    phoneNumber: response.user.phoneNumber
                 
                });
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };
        fetchUserDetails();
    },[userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('email', userDetails.email);
            formData.append('name', userDetails.name);
            formData.append('phoneNumber', userDetails.phoneNumber);
            
            const result = await ApiService.updateUser(userId, formData);
            if (result.statusCode === 200) {
                setSuccess('User updated successfully.');
                
                setTimeout(() => {
                    setSuccess('');
                    setLoading(false);
                    navigate('/profile');
                }, 3000);
            }
            setTimeout(() => setSuccess(''), 5000);
        } catch (error) {
            setLoading(false);
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };
    return (
        <div className="edit-room-container">
            <h2>Edit Profile</h2>
            
            <div className="edit-room-form">
                
                <div className="form-group">
                    <p>Email</p>
                    <input
                        type="text"
                        name="email"
                        value={userDetails.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <p>Name</p>
                    <input
                        type="text"
                        name="name"
                        value={userDetails.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <p>Phone</p>
                    <input
                        type='tel'
                        name="phoneNumber"
                        value={userDetails.phoneNumber}
                        onChange={handleChange}
                    ></input>
                </div>
                <div className='buttons'>
                    <button 
                        className="update-button" 
                        onClick={handleUpdate}
                        style={{cursor: loading ? 'not-allowed' : 'pointer'}}
                        disabled={loading}
                        >
                           {loading ? 'Updating...' : 'Update Profile'}</button>
                    {/* <button className="delete-button" onClick={handleDelete}>Delete Room</button> */}
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                </div>
                
            </div>
        </div>
  )
}

export default EditProfilePage
