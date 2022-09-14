import React from 'react'
import { useSelector } from 'react-redux';

const CartPage = () => {
    const cart = useSelector(state => state.cart.cart)
    return (
        <div className='d-flex flex-column'>
            {
                cart.map((cartItem, index) =>
                    (<small key={index}>{cartItem.name}--{cartItem.quantity}</small>)
                )
            }

        </div>
    )
}

export default CartPage