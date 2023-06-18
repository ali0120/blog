import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_URL}`,
    headers: {
        'Accept': 'application/json',
        "Content-Type": "multipart/form-data"
    },
});

export default AxiosInstance;
