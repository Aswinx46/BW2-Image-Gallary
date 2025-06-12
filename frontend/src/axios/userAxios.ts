import axios, { AxiosError, type AxiosRequestConfig, type InternalAxiosRequestConfig } from 'axios'
import store from '@/store/store'
import { addToken } from '@/store/slice/tokenSlice'
export const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASEURL,
    withCredentials: true
})

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = store.getState().token.token
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}

instance.interceptors.response.use(response => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig
        if (error.response?.status == 401 && !originalRequest._retry) {
            originalRequest._retry = true
            try {
                const refreshResponse = await instance.post('/refreshToken', {}, { withCredentials: true })
                const newAccessToken = refreshResponse.data.newAccessToken
                store.dispatch(addToken(newAccessToken))
                originalRequest.headers = {
                    ...originalRequest.headers,
                    Authorization: `Bearer ${newAccessToken}`
                }
                return instance(originalRequest)
            } catch (error) {
                window.location.href = '/'
                return Promise.reject(error)
            }
        }
        return Promise.reject(error)
    }
)

export default instance