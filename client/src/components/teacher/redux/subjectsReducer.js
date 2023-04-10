import { createAsyncThunk,createSlice } from '@reduxjs/toolkit'
const backendurl = require('../../../config').backend.url


const getSubjects = createAsyncThunk(
  'user/getSubjects',
  () => {
    return fetch(backendurl+'/teacher/getSubjects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authtoken': localStorage.getItem('authtoken')
      }
    }).then((response) => response.json())
  }
)

const initialState = {
  data: [],
  loading: false,
  error: ''
}

export const subjectsSlice = createSlice({
  name: 'subjects',
  initialState,
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getSubjects.pending, state =>{
      state.loading = true
    })
    builder.addCase(getSubjects.fulfilled, (state, action) => {
      // Add user to the state array
      console.log(action.payload)
      state.loading = false
      state.data = (action.payload)
      state.error = ''
    })
    builder.addCase(getSubjects.rejected, (state,action)=>{
      state.loading = false
      state.error = action.error.message
    })
  },
})

// Action creators are generated for each case reducer function
export { getSubjects }

export default subjectsSlice.reducer