import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '/src/api'


const getProfile = createAsyncThunk(
  'user/getProfile',
  () => {
    return api.post('/getProfile')
      .then((response) => response.data)
  }
)

const getMyclasses = createAsyncThunk(
  'user/getMyclasses',
  () => {
    return api.post('/getMyclasses')
      .then((response) => response.data)
  }
)

const initialState = {
  loading: false,
  error: null,
  name: '',
  email: '',
  image: '',
  classes: [],
  myclasses: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    // Get Profile
    builder.addCase(getProfile.pending, state => {
      state.loading = true
    })
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.loading = false
      state.name = action.payload.firstName+" "+action.payload.lastName
      state.email = action.payload.email
      state.image = action.payload.profilePicture
      state.error = null
    })
    builder.addCase(getProfile.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
    // Get Subjects
    builder.addCase(getMyclasses.pending, state => {
      state.loading = true
    })
    builder.addCase(getMyclasses.fulfilled, (state, action) => {
      state.loading = false
      state.myclasses = action.payload
      state.error = null
    })
  },
})

// Action creators are generated for each case reducer function
export { getProfile, getMyclasses }

export default userSlice.reducer