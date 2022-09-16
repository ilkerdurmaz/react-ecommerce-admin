import React from 'react'
import { BsFillCartPlusFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../app/store/cart'
import { NavLink } from 'react-router-dom'
import Rating from 'react-rating'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { calculateRating } from '../../app/utils';

const ShopProduct = ({ product }) => {
    const dispatch = useDispatch();

    function addProductToCart() {
        dispatch(addToCart({
            id: product.id,
            name: product.name,
            brand: product.brand,
            quantity: 1,
            price: product.price,
            imgUrl: product.imgUrl
        }))
    }

    return (
        <div className="d-flex flex-column justify-content-between border rounded" style={{ width: "10rem" }}>
            <img src={product.imgUrl} className="img-fluid rounded img-thunb" alt={product.name} />
            <div className='p-2 mt-auto border-top border-'>
                <h5>{product.brand}</h5>

                <NavLink to={`/${product.id}`}><small>{product.name}</small></NavLink>
                <Rating
                    emptySymbol={<AiOutlineStar size={18} />}
                    fullSymbol={<AiFillStar size={18} />}
                    readonly={true}
                    initialRating={calculateRating(product.rating)}
                />
            </div>
            <div className="d-flex p-2 justify-content-between align-items-center">
                <small>₺ {product.price}</small>
                <button className='btn btn-dark p-1' onClick={addProductToCart}>
                    <BsFillCartPlusFill size={28} /></button>
            </div>
        </div>

    )
}

export default ShopProduct