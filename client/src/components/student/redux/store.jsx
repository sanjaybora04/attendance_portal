import {configureStore} from '@reduxjs/toolkit'
import profileReducer from './profileReducer'


export default configureStore({
    reducer: {
        profile: profileReducer
    }
})