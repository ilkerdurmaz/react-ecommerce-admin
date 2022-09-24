import React, { useState } from 'react'
import { BsFillCartPlusFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../app/store/cart'
import { NavLink } from 'react-router-dom'
import Rating from 'react-rating'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { calculateRating } from '../../app/utils';
import toast from 'react-hot-toast'
import ProductImg from './../shared/ProductImg';

const ShopProduct = ({ product }) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart)

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

    function isItSoldOut() {
        const tempProduct = cart.find(item => item.id === product.id) || false
        if (product.stock <= 0) { return true }
        else if (tempProduct && tempProduct.quantity >= product.stock)
            return true
        else return false
    }

    return (
        <div className="d-flex flex-column border rounded m-2 shadow-sm" style={{ width: "162px" }}>

            <div className='d-flex flex-column'>
                <ProductImg src={product.imgUrl} className={'rounded'} style={{ objectFit: 'contain', height: '162px' }} />

                <div className="d-flex justify-content-between px-2 border-top">
                    <span className='fw-bold text-wrap text-break'>{product.brand}</span>
                </div>
                <NavLink to={`/${product.id}`} className={"text-decoration-none mx-2"}><small className='text-wrap text-break'>{product.name}</small></NavLink>
                <span className='px-2'><Rating
                    emptySymbol={<AiOutlineStar size={14} />}
                    fullSymbol={<AiFillStar size={14} />}
                    readonly={true}
                    initialRating={calculateRating(product.rating)}
                /></span>
            </div>

            <div className="d-flex justify-content-between align-items-center p-2 mt-auto">
                <small><span className='fw-bold'>Price:</span> ₺{product.price}</small>
                <button className='btn btn-outline-success p-1' disabled={isItSoldOut()} onClick={addProductToCart}>
                    <BsFillCartPlusFill size={28} /></button>
            </div>
        </div>

    )
}

export default ShopProduct