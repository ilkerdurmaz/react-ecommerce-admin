import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addToCart } from '../app/store/cart';
import { useDispatch } from 'react-redux';

import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import Rating from 'react-rating'
import { calculateRating } from '../app/utils';
import toast from 'react-hot-toast'
import ProductImg from './../components/shared/ProductImg';

const ProductPage = () => {
    const { id } = useParams();
    const products = useSelector(state => state.product.list)
    let product = products.find(product => id === product.id)
    const dispatch = useDispatch()
    const [count, setCount] = useState(1)

    const cart = useSelector(state => state.cart.cart)

    function addProductToCart(e) {
        e.preventDefault()

        dispatch(addToCart({
            id: product.id,
            name: product.name,
            brand: product.brand,
            quantity: count,
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

    useEffect(() => {
        if (count < 1)
            setCount(1)
        else if (typeof count === 'string')
            setCount(1)
        else if (count > 1 && count > product.stock)
            setCount(product.stock)
    }, [count])

    return (
        product ?
            <div className='container mx-auto py-md-3' style={{ maxWidth: '720px', maxHeight: '500px' }}>
                <div className="row border rounded shadow-sm p-1">
                    <div className="col-12 col-md-7 p-0 d-flex justify-content-center border rounded">
                        <ProductImg src={product.imgUrl} className={''} style={{ objectFit: 'contain', maxWidth: 'inherit', height: 'inherit' }} />
                    </div>

                    <div className="col-12 col-md-5 p-0 d-flex flex-column justify-content-between p-3">

                        <div>
                            <h5 className="fw-bold text-wrap text-break">{product.brand}</h5>
                            <p className="card-title text-wrap text-break">{product.name}</p>
                            <div className='my-2'>
                                <span>Rating: </span>
                                <Rating
                                    emptySymbol={<AiOutlineStar size={18} />}
                                    fullSymbol={<AiFillStar size={18} />}
                                    readonly={true}
                                    initialRating={calculateRating(product.rating)}
                                />
                            </div>

                            <p className="fs-5 fw-bold my-2">Price: ₺{product.price}</p>

                            <div className='my-2'>
                                <span>Description:</span>
                                <p className="card-text"><small className="text-muted">{product.description}</small></p>
                            </div>
                        </div>

                        <form className='' onSubmit={addProductToCart}>

                            <div className='row'>

                                <div className="col-12 col-sm-8 col-md-12 d-flex justify-content-between align-items-center p-2">

                                    <span className='fw-bold'>Stock: <span className='fw-normal'>{product.stock}</span></span>

                                    <div className="input-group input-group-sm shadow-sm" style={{ width: "6rem" }}>
                                        <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={() => setCount(prev => prev - 1)}>-</button>

                                        <input name="quantity" type="text" className="form-control form-control-sm text-center" value={count} onChange={(e) => setCount(e.target.value)} />

                                        <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={() => { setCount(prev => prev + 1) }}>+</button>
                                    </div>
                                </div>

                                <div className="col-12 col-sm-4 col-md-12 d-flex px-2">

                                    <button className='btn btn-dark bg-gradient w-100 p-1' type='submit' disabled={isItSoldOut()}>{product.stock > 0 ? "Add To Cart" : "Out of Stock"}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            : <div className='d-flex justify-content-center'>
                <div className="spinner-grow" style={{ width: "10rem", height: "10rem" }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
    )
}

export default ProductPage