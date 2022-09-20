import React from 'react'
import { BsFillCartPlusFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../app/store/cart'
import { NavLink } from 'react-router-dom'
import Rating from 'react-rating'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { calculateRating } from '../../app/utils';
import toast from 'react-hot-toast'

const ShopProduct = ({ product }) => {
    const dispatch = useDispatch();

    function addProductToCart() {
        dispatch(addToCart({
            id: product.id,
            name: product.name,
            brand: product.brand,
            quantity: 1,
            price: product.price,
            imgUrl: product.imgUrl,
            category: product.category
        }))
        toast.success("Product has been added to your cart")
    }

    return (
        <div className="d-flex flex-column justify-content-between border rounded m-2 shadow-sm bg-light" style={{ width: "170px" }}>

            <img src={product.imgUrl} className="img-fluid rounded p-1" alt={product.name} />

            <div className='d-flex flex-column p-2 border-top'>
                <span className='fw-bold'>{product.brand}</span>

                <NavLink to={`/${product.id}`} className={"text-decoration-none text-se"}><small>{product.name}</small></NavLink>

                <Rating
                    emptySymbol={<AiOutlineStar size={18} />}
                    fullSymbol={<AiFillStar size={18} />}
                    readonly={true}
                    initialRating={calculateRating(product.rating)}
                />
            </div>

            <div className="d-flex p-2 justify-content-between align-items-center">
                <small><span className='fw-bold'>Price:</span> ₺{product.price}</small>

                <button className='btn btn-outline-success p-1' onClick={addProductToCart}>
                    <BsFillCartPlusFill size={28} /></button>
            </div>

        </div>

    )
}

export default ShopProduct