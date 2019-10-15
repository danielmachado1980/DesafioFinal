import axios from 'axios';
import { HOST_URL } from 'react-native-dotenv';

const api = axios.create({
  baseURL: `http://${HOST_URL}:3333`,
});

export default api;
