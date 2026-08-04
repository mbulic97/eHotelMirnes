import React, { useEffect, useState } from 'react'
import ApiService from '../../service/ApiService';
import UserResult from './UserResult';

const ManageUsersPage = () => {

    const [users, setUsers] = useState([]);

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

    return (
        <div>
            <h2>Manage Users</h2>
            <UserResult users={users}
                onDeleteUser={handleDeleteUser} />
        </div>
    );
};


export default ManageUsersPage;
