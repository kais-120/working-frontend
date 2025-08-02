import axios from "axios";
import Cookies from "universal-cookie";

const cookie = new Cookies();
const token = cookie.get("auth")
export const API_URL = "http://localhost:5000/api/v1";
export const  Axios = axios.create({baseURL:API_URL,
    headers:{
        "x_api_key":import.meta.env.VITE_API_KEY
    }
})
export const  AxiosToken = axios.create({baseURL:API_URL,
    headers:{
        "x_api_key":import.meta.env.VITE_API_KEY,
        Authorization: `Bearer ${token}`,
    }
})