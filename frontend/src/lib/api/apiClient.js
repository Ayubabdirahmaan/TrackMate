import axios from "axios"


const API_URL = 'http://localhost:5000/api'

const api =axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type' : 'application/json'
    }
})

    // Interceptors to add the authorization header
    api.interceptors.request.use(config => {
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    })

export default api