import { createSlice } from "@reduxjs/toolkit";

const initialState={
    orders:[]
}

const adminDashboard=createSlice({
    name: "adminDashboard",
    initialState,
    reducers: {
        setAllOrders:(state,action)=>{
            state.orders=action.payload;
        },
        clearAllOrders:(state)=>{
            state.orders=[]
        }
    }
})

export const {setAllOrders,clearAllOrders} = adminDashboard.actions
export default adminDashboard.reducer