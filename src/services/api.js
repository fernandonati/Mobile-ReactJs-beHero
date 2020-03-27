import axios from 'axios';

const api = axios.create( {
    baseURL: 'http://192.168.1.114:3333' //modify for host/ip of you server
});

export default api;

