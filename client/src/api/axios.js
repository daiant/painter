import axios from 'axios';

export default axios.create({
    baseURL: "https://193.122.52.96:8443",
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*'
    }
})