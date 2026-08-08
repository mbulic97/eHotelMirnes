import { useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import './ProfilePage.css'
const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                //console.log("PROFILE:", response);
               
                setUser(response.user);
                //const userPlusBookings = await ApiService.getUserBookings(response.user.id);
                //console.log(userPlusBookings);
                //setUser(userPlusBookings.user)
                
            } catch (error){
                setError(error.response?.data?.message || error.message);
            }
        };
        fetchUserProfile();
    },[]);

    const handleLogout = () => {
        const isLogout = window.confirm('Are you sure you want to logout this user?');
        if(isLogout){
            ApiService.logout();
            navigate('/home');
        }
    }

    return (
        <div className="profile-page">
            {user && <h2>Hi, {user.name}</h2>}
            <div className="profile-actions">
                <button className="edit-profile-button" >Edit Profile</button>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {user && (
                <div className="profile-details">
                    <h3>My Profile Details</h3>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                </div>
            )}
        </div>
        
    );
}
export default ProfilePage;