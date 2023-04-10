import { createAsyncThunk,createSlice } from '@reduxjs/toolkit'
const backendurl = require('../../../config').backend.url


const getStudents = createAsyncThunk(
  'user/getStudents',
  (subject_id) => {
    return fetch(backendurl+'/teacher/getAddedStudents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authtoken': localStorage.getItem('authtoken')
      },
      body: JSON.stringify({
        subject_id
      })
    }).then((response) => response.json())
  }
)

const initialState = {
  data: [],
  loading: false,
  error: ''
}

export const studentsSlice = createSlice({
  name: 'students',
  initialState,
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getStudents.pending, state =>{
      state.loading = true
    })
    builder.addCase(getStudents.fulfilled, (state, action) => {
      // Add user to the state array
      console.log(action.payload)
      state.loading = false
      state.data = (action.payload)
      state.error = ''
    })
    builder.addCase(getStudents.rejected, (state,action)=>{
      state.loading = false
      state.error = action.error.message
    })
  },
})

// Action creators are generated for each case reducer function
export { getStudents }

export default studentsSlice.reducer