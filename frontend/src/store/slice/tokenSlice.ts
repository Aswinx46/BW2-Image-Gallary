import { createSlice } from "@reduxjs/toolkit";

const initialState: { token: string | null } = {
    token: null
}

export const tokenSlice = createSlice({
    name: "tokenSlice",
    initialState,
    reducers: {
        addToken: (state, action) => {
            state.token = action.payload
        },
        removeToken: (state, action) => {
            state.token = action.payload
        }
    }
})

export const { addToken, removeToken } = tokenSlice.actions
export default tokenSlice.reducer