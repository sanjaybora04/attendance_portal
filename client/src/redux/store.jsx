import {configureStore} from '@reduxjs/toolkit'
import profileReducer from './profileReducer'
import classReducer from './classReducer'


export default configureStore({
    reducer: {
        profile: profileReducer,
        class: classReducer
    }
})