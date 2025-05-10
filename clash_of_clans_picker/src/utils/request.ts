import axios from 'axios'

const BASE_URL = 'http://localhost:3000'
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})
instance.interceptors.request.use((config) => {
  return config
})
instance.interceptors.response.use((res) => {
  return res
})
export default instance
