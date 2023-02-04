import axios from 'axios'

import Points from './points'


export default class API {

    constructor() {
        const axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_API_BASE_URL,
            headers: {
                accept: 'application/json',
                // 'X-CSRFToken': import.meta.env.VITE_CSRF_TOKEN,
            }
        })

        this.points = new Points(axiosInstance)
    }

}
