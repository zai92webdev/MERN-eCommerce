import axios from 'axios'

const instance = axios.create({
    baseURL: "https://mern-app-zai-ecommerce.herokuapp.com/", 
}) 

export default instance