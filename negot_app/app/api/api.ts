// api.ts
import axios from 'axios'

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        // Ensure cookies are handled properly across domains
        'Access-Control-Allow-Credentials': 'true'
    }
})

// Enhanced error interceptor with more detailed logging
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error('Response Error:', {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers
            });
        } else if (error.request) {
            console.error('Request Error:', error.request);
        } else {
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

// Add request interceptor to ensure headers are set for each request
api.interceptors.request.use(
    (config) => {
        // Ensure withCredentials is always true
        config.withCredentials = true;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const logout = async () => {
    try {
        const response = await api.get("/auth/logout")
        return response.data
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
}