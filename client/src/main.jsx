import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import Store from './redux/store'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>
      <GoogleOAuthProvider clientId="201530491082-14ndn4glajk847bfm3s6pdtf50c0d8dq.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>,
)
