import axios from 'axios';


const api = axios.create({
    baseURL: 'https://192.168.1.11:5000',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'authtoken': localStorage.getItem("authtoken")
    }
});

api.interceptors.response.use(
  response => {
    if (response.data.alert) {
      alert(response.data.alert)
    }
    if (response.data.alerts){
      const alerts = response.data.alerts.map(alert=>alert.msg)
      alert(alerts.join('\n'))
    }
    return response
  },
  error => {
    // Handle error
    console.log("error while fetching");
  }
);
export default api