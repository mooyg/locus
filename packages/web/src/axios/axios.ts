import axios from 'axios';

export default axios.create({
  baseURL: process.env.NODE_ENV
    ? process.env.SERVER_URL
    : 'http://localhost:4000',
});
