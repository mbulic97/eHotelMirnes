import React from 'react'
import './UserResult.css'

const UserResult = ({ users, onDeleteUser }) => {
    return (
        <section className="user-results">
            {users && users.length > 0 && (
                <div className="user-list">
                    {users.map(user => (
                        <div key={user.id} className="user-list-item">

                            <div className="user-details">
                                <h3>{user.name}</h3>

                                <p>Email: {user.email}</p>

                                <p>Phone Number: {user.phoneNumber}</p>

                                <p>Role: {user.role}</p>
                            </div>

                            <div className="user-action">
                                <button
                                    className="delete-user-button"
                                    onClick={() =>
                                        onDeleteUser(user.id, user.name)
                                    }
                                >
                                    Delete User
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default UserResult;