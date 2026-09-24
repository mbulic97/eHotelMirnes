import React, { useEffect, useState } from 'react'
import ApiService from '../../service/ApiService';
import UserResult from './UserResult';
import Pagination from '../common/Pagination';

const ManageUsersPage = () => {

    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await ApiService.getAllUsers();
                console.log("GetAllUsers from MySQL:", response);
                setUsers(response.userList);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        getUsers();
    }, []);
    const handleDeleteUser = async (userId, userName) => {
        const isDelete = window.confirm(
            `Are you sure you want to delete ${userName}?`
        );

        if (!isDelete) return;

        try {
            await ApiService.deleteUser(userId);

            setUsers(prevUsers =>
                prevUsers.filter(user => user.id !== userId)
            );

        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <h2>Manage Users</h2>
            <UserResult 
                users={currentUsers}
                onDeleteUser={handleDeleteUser} 
            />
            <Pagination
                roomsPerPage={usersPerPage}
                totalRooms={users.length}
                currentPage={currentPage}
                paginate={paginate}
            />

        </div>
    );
};


export default ManageUsersPage;
