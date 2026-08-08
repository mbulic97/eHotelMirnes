import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './component/auth/RegisterPage';
import LoginPage from './component/auth/LoginPage';
import Navbar from './component/common/Navbar';
import HomePage from './component/home/HomePage';
import Footer from './component/common/Footer';
import ProfilePage from './component/profile/ProfilePage';
import AllRoomsPage from './component/booking_rooms/AllRoomsPage';
import AdminPage from './component/admin/AdminPage';
import ManageUsersPage from './component/admin/ManageUsersPage';
import ManageRoomsPage from './component/admin/ManageRoomsPage';
import AddRoomPage from './component/admin/AddRoomPage';
import { ProtectedRoute } from './service/guard';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className='content'>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path='/register' element={<RegisterPage />}></Route>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/rooms' element={<AllRoomsPage />}></Route>

            {/* Protected Routes */}
            <Route path='/profile' element={<ProtectedRoute element={<ProfilePage />} />}></Route>

            {/* Admin Routes */}

            <Route path='/admin' element={<ProtectedRoute element={<AdminPage />} />}></Route>
            <Route path='/admin/manage-users' element={<ProtectedRoute element={<ManageUsersPage />} />}></Route>
            <Route path='/admin/manage-rooms' element={<ProtectedRoute element={<ManageRoomsPage />} />}></Route>
            <Route path='/admin/add-room' element={<ProtectedRoute element={<AddRoomPage />} />}></Route>

          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
