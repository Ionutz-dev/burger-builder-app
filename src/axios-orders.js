import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-app-f3398-default-rtdb.firebaseio.com/',
});

export default instance;
