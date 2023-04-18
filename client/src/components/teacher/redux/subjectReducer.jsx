import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '/src/api'


const getSubject = createAsyncThunk(
  'user/getSubject',
  (subject_id) => {
    return api.post('/teacher/getStudents', { subject_id })
      .then((response) => response.data)
  }
)

const initialState = {
  subject: {},
  addedStudents:[],
  allStudents: [],
  loading: false,
  error: ''
}

export const studentsSlice = createSlice({
  name: 'subject',
  initialState,
  extraReducers: (builder) => {

    builder.addCase(getSubject.pending, state => {
      state.loading = true
    })

    builder.addCase(getSubject.fulfilled, (state, action) => {
      state.loading = false
      state.subject = action.payload.subject
      state.addedStudents = action.payload.addedStudents
      state.allStudents = action.payload.allStudents
      state.error = ''
    })

    builder.addCase(getSubject.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  },
})

// Action creators are generated for each case reducer function
export { getSubject }

export default studentsSlice.reducer