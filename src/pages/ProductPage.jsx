import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addToCart } from '../app/store/cart';
import { useDispatch } from 'react-redux';

import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import Rating from 'react-rating'
import { calculateRating } from '../app/utils';

import toast from 'react-hot-toast'

const ProductPage = () => {
    const { id } = useParams();
    const products = useSelector(state => state.product.list)
    let product = products.find(product => id === product.id)

    const dispatch = useDispatch()
    const [count, setCount] = useState(1)


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

    useEffect(() => {
        if (count < 1)
            setCount(1)
        else if (typeof count === 'string')
            setCount(1)
    }, [count])

    return (
        product ?
            <div className='container py-3 mx-auto' style={{ maxWidth: '720px' }}>
                <div className="row border rounded shadow-sm">
                    <div className="col-12 col-md-7 p-2">
                        <img src={product.imgUrl} className="img-fluid img-thumbnail" alt="..." />
                    </div>

                    <div className="col-12 col-md-5 py-2 px-3 px-md-2 d-flex flex-column justify-content-between">

                        <div>
                            <div className='d-flex justify-content-between'>
                                <h5 className="fw-bold">{product.brand}</h5>
                                <Rating
                                    emptySymbol={<AiOutlineStar size={18} />}
                                    fullSymbol={<AiFillStar size={18} />}
                                    readonly={true}
                                    initialRating={calculateRating(product.rating)}
                                />
                            </div>

                            <p className="card-title">{product.name}</p>

                            <p className="card-text"><small className="text-muted">{product.description}</small></p>
                        </div>

                        <form className='' onSubmit={addProductToCart}>

                            <div className='row'>

                                <div className="col-12 col-sm-8 col-md-12 d-flex justify-content-between align-items-center p-2">
                                    <p className="fs-5 fw-bold m-0">Price: ₺{product.price}</p>

                                    <div className="input-group input-group-sm shadow-sm" style={{ width: "6rem" }}>
                                        <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={() => setCount(count - 1)}>-</button>

                                        <input name="quantity" type="text" className="form-control form-control-sm text-center" value={count} onChange={(e) => setCount(e.target.value)} />

                                        <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={() => setCount(count + 1)}>+</button>
                                    </div>
                                </div>

                                <div className="col-12 col-sm-4 col-md-12 d-flex px-2">
                                    <button className='btn btn-dark bg-gradient w-100 p-1' type='submit'>Add To Cart</button>
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