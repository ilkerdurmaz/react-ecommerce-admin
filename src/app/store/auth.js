import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:localStorage.getItem('user')||false
}

const auth=createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginHandle:(state,action)=>{
            localStorage.setItem("user",action.payload)
            state.user=action.payload
        },
        logoutHandle:(state)=>{
            localStorage.removeItem("user")
            state.user=false
        }
    }
})

export const {loginHandle, logoutHandle} = auth.actions
export default auth.reducer