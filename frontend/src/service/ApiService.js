import axios from "axios"

export default class ApiService {

    static BASE_URL = "http://localhost:8080"

    static getHeader() {
        const token = localStorage.getItem("token");
        console.log("Token exists:", !!token);

        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    }

    static async registerUser(registration) {
        const response = await axios.post(`${this.BASE_URL}/auth/register`, registration)
        return response.data
    }

    static async loginUser(loginDetails) {
        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails)
        return response.data
    }

    static logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }
    static isAuthenticated() {
        const token = localStorage.getItem('role')
        return !!token
    }

    static isUser() {
        const role = localStorage.getItem('role')
        return role === 'USER'
    }

    static isAdmin() {
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    static async getUserProfile() {
        const response = await axios.get(`${this.BASE_URL}/users/get-logged-in-profile-info`, {
            headers: this.getHeader()
        })
        return response.data
    }

    static async getUserBookings(userId) {
        const response = await axios.get(`${this.BASE_URL}/users/get-user-bookings/${userId}`, {
            headers: this.getHeader()
        })
        return response.data
    }

    static async getAllRooms() {
        const result = await axios.get(`${this.BASE_URL}/rooms/all`)
        return result.data
    }
    static async getRoomTypes() {
        const response = await axios.get(`${this.BASE_URL}/rooms/types`)
        return response.data
    }
    static async getAllUsers() {
        const response = await axios.get(`${this.BASE_URL}/users/all`,
            {
                headers: this.getHeader()
            }
        );
        return response.data;
    }
    static async deleteUser(userId) {
        const response = await axios.delete(
            `${this.BASE_URL}/users/delete/${userId}`,
            {
                headers: this.getHeader()
            }
        );

        return response.data;
    }

}