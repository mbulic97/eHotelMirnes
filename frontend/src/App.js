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
            <Route path='/rooms' element={<AllRoomsPage/>}></Route>
            <Route path='/profile' element={<ProfilePage />}></Route>
            <Route path='/admin' element={<AdminPage/>}></Route>
            <Route path='/admin/manage-users' element={<ManageUsersPage/>}></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
