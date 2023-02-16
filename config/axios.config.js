const axios = require("axios");

// AXIOS CONFIG INSTANCE
const BaseAPI = axios.create({
    baseURL: `https://${process.env.BASE_API_URL}.herokuapp.com`,
    timeout: 2500,
    headers: {
        'Accept': 'application/json',
    }
});

module.exports = BaseAPI;