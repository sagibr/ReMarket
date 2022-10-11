import { configureStore } from "@reduxjs/toolkit"
import persistSlice from "../slice/persistSlice"
import userSlice from "../slice/userSlice"

export const store = configureStore({
  reducer: {
    user: userSlice,
    persist: persistSlice,
  },
})
