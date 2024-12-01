
import axios from 'axios';
import { API_URL } from './constants';
import Cookies from 'js-cookie';

const getAuthToken = () => {
  return Cookies.get('auth-token');
}

// Default config options
const defaultOptions = {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}

// Create instance
let instance = axios.create(defaultOptions);

// Set the AUTH token for any request
instance.interceptors.request.use(function (config) {
  const token = getAuthToken();
  config.headers.Authorization = token ? `${token}` : ''
  return config;
})

export default instance;
