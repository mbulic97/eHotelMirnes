import axios from "axios"

export default class ApiService {
    static BASE_URL = "http://localhost:8080"
    static async registerUser(registration) {
        const response = await axios.post(`${this.BASE_URL}/auth/register`, registration) //kasnije "auth/register"
        return response.data
    }
}