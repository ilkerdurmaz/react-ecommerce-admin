import { createSlice } from '@reduxjs/toolkit';

const initialState={
    list:[]
}

export const product = createSlice({
    name:'product',
    initialState,
    reducers: {
            setProducts:(state,action)=>{
                state.list=action.payload
            }
        },  
    }
)

export const {add,setProducts} = product.actions
export default product.reducer