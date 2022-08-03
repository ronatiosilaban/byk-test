import axios from "axios";

export const API = axios.create({
    baseURL: "https://api.thecatapi.com/v1/breeds"
});

export default API