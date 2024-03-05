import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const initialState = {
    value: Cookies.get('token'),
}

export const tokenSlice = createSlice({
    name: 'isToken',
    initialState,
    reducers: {
        isToken: (state) => {
            if (state.value && window.location.pathname !== "/dashboard") {
                window.location.replace("/dashboard")
            }
    },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { isToken, decrement, incrementByAmount } = tokenSlice.actions

export default tokenSlice.reducer