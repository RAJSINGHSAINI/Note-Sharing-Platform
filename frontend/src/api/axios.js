import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.process.env.BASE_URL || 'http://localhost:8080/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
})
export default api;