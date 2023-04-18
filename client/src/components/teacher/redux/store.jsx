import {configureStore} from '@reduxjs/toolkit'
import profileReducer from './profileReducer'
import subjectReducer from './subjectReducer'


export default configureStore({
    reducer: {
        profile: profileReducer,
        subject: subjectReducer
    }
})