import axios from 'axios';

const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use(
  async config => {
    const token = JSON.parse(localStorage.getItem('token'));
    config.headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json;charset=UTF-8'
    }
    return config;
  },
  error => {
    Promise.reject(error)
  });

export {
  axiosApiInstance
}
