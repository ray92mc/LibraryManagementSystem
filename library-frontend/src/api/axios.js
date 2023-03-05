import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1';
const token = localStorage.getItem('token');

axios.defaults.headers.common['Access-Control-Request-Headers'] = 'Authorization';


export default axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

