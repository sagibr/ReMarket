import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  persist: JSON.parse(localStorage.getItem("persist")) || false,
}

export const persistSlice = createSlice({
  name: "persist",
  initialState,
  reducers: {
    togglePersist: (state) => {
      state.persist = !state.persist
    },
  },
})

// Action creators are generated for each case reducer function
export const { togglePersist } = persistSlice.actions

export default persistSlice.reducer
