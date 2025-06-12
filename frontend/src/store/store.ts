import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './slice/userSlice'
import tokenSlice from './slice/tokenSlice'
const store = configureStore({
    reducer: {
        user: UserSlice,
        token: tokenSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export default store