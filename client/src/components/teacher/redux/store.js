import {configureStore} from '@reduxjs/toolkit'
import subjectsReducer from './subjectsReducer'
import studentsReducer from './studentsReducer'


export default configureStore({
    reducer: {
        subjects: subjectsReducer,
        students: studentsReducer
    }
})