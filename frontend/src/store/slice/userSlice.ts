import type { UserType } from '@/types/userType'
import { createSlice } from '@reduxjs/toolkit'

const initialState: { user: UserType | null } = {
    user: null
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload
        },
        removeUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { addUser, removeUser } = userSlice.actions
export default userSlice.reducer