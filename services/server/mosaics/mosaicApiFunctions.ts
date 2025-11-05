import axios from "axios";
import { base_url } from "../serverConfig";

export const getCurrentMosaic = () => {
    return new Promise((resolve, reject) => {
        try {
            resolve(axios.get(`${base_url}/getCurrentMosaic`))
        } catch (e) {
            reject(e);
        }
    })
}