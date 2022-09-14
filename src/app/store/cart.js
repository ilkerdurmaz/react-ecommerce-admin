import { createSlice } from '@reduxjs/toolkit';

const initialState={
    cart:JSON.parse(localStorage.getItem("cart"))||[]
}

export const cart = createSlice({
    name:'cart',
    initialState,
    reducers: {
            addToCart:(state,action)=>{
                const index=state.cart.findIndex(item=>item.id===action.payload.id)
                if(index>-1)
                {
                    state.cart[index].quantity+=action.payload.quantity
                }
                else
                state.cart.push(action.payload);
                localStorage.setItem("cart",JSON.stringify(state.cart));
            },
            updateCart:(state,action)=>{
                state.cart=action.payload;
                localStorage.setItem("cart",JSON.stringify(state.cart));
            },
            clearCart:(state)=>{
                state.cart=[]
                localStorage.setItem("cart",JSON.stringify(state.cart))
            }
        },  
    }
)

export const {addToCart,updateCart,clearCart} = cart.actions
export default cart.reducer