import axios from 'axios';

export const fetchAllUsers = () => {
    return axios.get("http://localhost:8080/api/v1/user")
}