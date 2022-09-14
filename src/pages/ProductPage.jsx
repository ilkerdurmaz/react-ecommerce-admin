import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addToCart } from '../app/store/cart';
import { useDispatch } from 'react-redux';

import { BsFillCartPlusFill } from 'react-icons/bs'

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
            imgUrl: product.imgUrl
        }))
    }

    useEffect(() => {
        if (count < 1)
            setCount(1)
        else if (typeof count === 'string')
            setCount(1)
    }, [count])

    return (
        product ? <div className="card m-auto" style={{ maxWidth: '540px' }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={product.imgUrl} className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{product.brand}</h5>
                        <p className="card-text">{product.name}</p>
                        <p className="card-text"><small className="text-muted">{product.description}</small></p>
                        <p className="card-text">₺ {product.price}</p>
                    </div>
                    <form className='d-flex justify-content-between p-2' onSubmit={addProductToCart}>
                        <div className="input-group input-group-sm m-1" style={{ width: "6rem" }}>
                            <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={() => setCount(count - 1)}>-</button>

                            <input name="quantity" type="text" className="form-control form-control-sm" value={count} onChange={(e) => setCount(e.target.value)} />

                            <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={() => setCount(count + 1)}>+</button>
                        </div>
                        <button className='btn btn-dark p-1 m-1' type='submit'>
                            <BsFillCartPlusFill size={28} /></button>
                    </form>
                </div>
            </div>
        </div> : <div className="spinner-grow" style={{ width: "10rem", height: "10rem" }} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}

export default ProductPage