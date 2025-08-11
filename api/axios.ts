import axios, { CreateAxiosDefaults } from "axios"

const options: CreateAxiosDefaults = {
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
}

const axiosInstance = axios.create(options)

export default axiosInstance
