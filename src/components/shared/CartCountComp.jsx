import React from 'react'
import { BsCart } from 'react-icons/bs'

const CartCountComp = ({ count }) => {

    const btnStyle = {
        paddingRight: '12px',
        paddingLeft: '12px',
    }
    return (
        <button type="button" className="btn btn-sm btn-outline-warning position-relative" style={btnStyle}>
            <BsCart size={30} />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {count}
            </span>
        </button>




    )
}

export default CartCountComp