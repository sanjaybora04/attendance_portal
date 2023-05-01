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
    console.log("Network Error!")
  }
);

const alert = (alert)=>{
  const alertDiv = document.createElement('div')
  alertDiv.classList.add('fixed','text-center','left-1/2','-translate-x-1/2','bottom-0','bg-gray-800','text-white','p-2','mb-5','rounded-md','transition-opacity','duration-500','opacity-100')
  alertDiv.innerText=alert
  
  document.body.appendChild(alertDiv)

  setTimeout(()=>{
    alertDiv.classList.remove('opacity-100')
    alertDiv.classList.add('opacity-0')
    setTimeout(()=>{
      alertDiv.remove()
    },500)
  },3000)
}

export default api