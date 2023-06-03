import axios from 'axios';
import { toast } from 'react-toastify';


const api = axios.create({
    baseURL: 'https://192.168.1.7:5000',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'authtoken': localStorage.getItem("authtoken")
    }
});

api.interceptors.response.use(
  response => {
    if (response.data.alert) {
      toast(response.data.alert)
    }
    if (response.data.alerts){
      const alerts = response.data.alerts.map(alert=>alert.msg)
      toast(alerts.join('\n'))
    }
    return response
  },
  error => {
    // Handle error
    console.log("Network Error!")
  }
);

export default api