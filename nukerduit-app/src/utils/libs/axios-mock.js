import axios from 'axios'
import { toast } from 'react-toastify'
const baseURL = import.meta.env.VITE_API_URL

export const apiMock = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false,
})

// apiMock.interceptors.request.use(function (config) {

//     const sessionUser = localStorage.getItem('session-user')
//     const token = sessionUser ? JSON.parse(sessionUser)?.state?.sessionUser?.access_token : null

//     if (config.headers) {
//         config.headers.Authorization = token ? `Bearer ${token}` : ''
//     }
//     return config
// })

apiMock.interceptors.response.use(
    (config) => {
        return config
    },
    (error) => {
        if (error.response?.data.message) {
            toast.error(error.response.data.message)
            return Promise.reject({
                ...error,
                response: {
                    ...error.response,
                    data: {
                        ...error.response.data,
                        message:
                            typeof error.response.data.message === 'string'
                                ? error.response.data.message
                                : Object.values(error.response.data.message)[0][0] ?? 'Erro inesperado',
                    },
                },
            })
        }
        return Promise.reject(error)
    }
)

export default apiMock

export const mockQuery = async ({ queryKey }) => {
    const [url] = queryKey

    const { data } = await apiMock.get(url)
    return data
}

export const mockMutation = async ({ queryKey, data }) => {
    const [url] = queryKey

    const { data: response } = await apiMock.post(url, data)
    return response
}