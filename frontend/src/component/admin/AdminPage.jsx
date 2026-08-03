import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import '../admin/AdminPage.css'


const AdminPage = () => {
    const [adminName, setAdminName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminName = async () => {
            try {
                const response = await ApiService.getUserProfile();
                setAdminName(response.user.name);
            } catch (error) {
                console.error('Error fetching admin details:', error.message);
            }
        };

        fetchAdminName();

    }, []);

    return (
        <div className="admin-page">
            <h2 className="welcome-message">Welcome, {adminName}</h2>

            <p className="page-description">Manage your hotel from the admin dashboard.</p>
            <div className="admin-actions">
                <button className="admin-button" onClick={() => navigate('/admin/manage-rooms')}>
                    Manage Rooms
                </button>
                <button className="admin-button" onClick={() => navigate('/admin/manage-bookings')}>
                    Manage Bookings
                </button>
            </div>
        </div>
    )
}

export default AdminPage
