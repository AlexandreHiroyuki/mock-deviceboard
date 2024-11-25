import axios from 'axios'

const API_URL: string = import.meta.env.VITE_API_URL || process.env.VITE_API_URL

export const api = axios.create({
  baseURL: API_URL
})
