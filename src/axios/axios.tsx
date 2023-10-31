import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.punkapi.com/v2', 
    headers: {
      "Access-Control-Allow-Origin" : "*",
      'Content-Type': 'application/json',
    },
    // withCredentials: true, 
  });
  
export default instance;