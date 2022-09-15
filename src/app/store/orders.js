import { createSlice } from '@reduxjs/toolkit';

const initialState={
    orders:[],
}

export const orders = createSlice({
    name:'orders',
    initialState,
    reducers: {
            setOrders:(state,action)=>{
                state.orders=action.payload;
            },
            clearOrders:(state)=>{
                state.orders=[]
            }
        },  
    }
)

export const {setOrders,clearOrders} = orders.actions
export default orders.reducer