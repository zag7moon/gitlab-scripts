const axios = require('axios')
const { baseURL, PRIVATE_TOKEN } = require('./config')

module.exports = axios.create({
  baseURL,
  headers: {
    'Private-Token': PRIVATE_TOKEN
  }
});