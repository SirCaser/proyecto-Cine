import { createSlice } from '@reduxjs/toolkit'

export const filmsSlice = createSlice({
  name: 'films',
  initialState: {
    films: [],
  },
  reducers: {
    startLoadingFilms: (state) => {
      state.isLoading = true;
    },
    setFilms: (state, action) => {
      //state.films = state.films
      console.log(action)
      console.log(state)
      
      state.films = action.payload.films
    },
    otherAction: (state) => {
      console.log("TODO")
    }
  },
})

// Action creators are generated for each case reducer function
export const {startLoadingFilms, setFilms, otherAction } = filmsSlice.actions

//export default filmsSlice.reducer