import axios from "axios"
import api from "../services/AxiosConfig"

export const loginUser = async (data)=> {
    const res  = await axios.post("http://localhost:9444/api/login", data);   
    return res.data;
}