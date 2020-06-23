import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://pollsrender.herokuapp.com/'
});

export default instance;