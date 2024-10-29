// api.ts
import axios from 'axios'

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true
})

// You might want to add an interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const logout = async()=> {
    try {
        const response = await api.get("/auth/logout")
        return response.data
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
}