import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '/src/api'


const getProfile = createAsyncThunk(
  'user/getProfile',
  () => {
    return api.post('/teacher/getProfile')
      .then((response) => response.data)
  }
)

const getSubjects = createAsyncThunk(
  'user/getSubjects',
  () => {
    return api.post('/teacher/getSubjects')
      .then((response) => response.data)
  }
)

const initialState = {
  loading: false,
  error: null,
  name: '',
  email: '',
  eno: '',
  image: '',
  course: {},
  subjects: []
}

export const studentsSlice = createSlice({
  name: 'students',
  initialState,
  extraReducers: (builder) => {
    // Get Profile
    builder.addCase(getProfile.pending, state => {
      state.loading = true
    })
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.loading = false
      state.name = action.payload.name
      state.email = action.payload.email
      state.eno = action.payload.enrollment_number
      state.image = action.payload.image
      state.course = action.payload.course
      state.error = null
    })
    builder.addCase(getProfile.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
    // Get Subjects
    builder.addCase(getSubjects.pending, state => {
      state.loading = true
    })
    builder.addCase(getSubjects.fulfilled, (state, action) => {
      state.loading = false
      state.subjects = action.payload
      state.error = null
    })
  },
})

// Action creators are generated for each case reducer function
export { getProfile, getSubjects }

export default studentsSlice.reducer