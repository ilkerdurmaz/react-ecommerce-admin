import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import ProductImg from './../components/shared/ProductImg';
import { NavLink } from 'react-router-dom'
import { BsFillCartDashFill } from 'react-icons/bs'
import { updateCart } from '../app/store/cart';
import { placeOrder, updateProduct } from '../app/firebase';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const products = useSelector(state => state.product.list)
    const cart = useSelector(state => state.cart.cart)
    const dispatch = useDispatch();
    const [total, setTotal] = useState(0)
    const navigate = useNavigate()

    function getOwnerId() {
        let id = localStorage.getItem('orderOwnerId')
        if (!id) {
            id = Date.now() + '-' + Math.random()
            localStorage.setItem('orderOwnerId', id)
        }
        return id
    }

    const placeOrderHandler = async () => {
        const order = {
            id: getOwnerId(),
            timeStamp: Date.now(),
            status: "new",
            items: {}
        }
        cart.forEach(async (item, index) => {
            order.items[index] = {
                productId: item.id,
                quantity: item.quantity,
                cost: item.quantity * item.price,
                category: item.category
            }
            const tempProduct = products.find(product => product.id === item.id)
            await updateProduct({ ...tempProduct, stock: tempProduct.stock - item.quantity }, tempProduct.id)
        })

        await placeOrder(order);
        navigate('/my-orders', {
            replace: true,
        })

    }

    const deleteFromCart = (id) => {
        const updatedCart = cart.filter(product => product.id !== id)
        dispatch(updateCart(updatedCart))
    }

    useEffect(() => {
        if (cart.length > 0)
            setTotal(cart.reduce((acc, current) => acc + (current.price * current.quantity), 0))
        else
            setTotal(0)
    }, [cart])

    return (
        <div style={{ maxWidth: '960px', margin: "auto" }}>
            <div className='container mt-3'>
                <div className="row flex-row-reverse">

                    <div className="col-12 col-md-4 px-0 px-md-3 my-3 my-md-0">
                        <div className="card shadow-sm">
                            <div className="card-header text-center">
                                <h5 className="card-title">Order Summary</h5>
                            </div>
                            <div className="card-body">
                                <p className="card-text"><span className='fw-bold'>Total Cost:</span> ₺{total}</p>
                                <button className="btn w-100 btn-dark bg-gradient" onClick={placeOrderHandler}
                                    disabled={!(cart.length > 0)}>Place Order</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-8 border rounded px-0 p-sm-2 shadow-sm">
                        {
                            cart.length > 0 ?
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col" className='px-1 p-sm-2'>Image</th>
                                                <th scope="col" className='px-1 p-sm-2'>Product</th>
                                                <th scope="col" className='px-1 p-sm-2'>Price</th>
                                                <th scope="col" className='text-center px-1 p-sm-2'>Quantity</th>
                                                <th scope="col" className='text-center px-1 p-sm-2'>Cost</th>
                                                <th scope="col" className='text-center text-danger px-1 p-sm-2'>✘</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cart.map((product) => {
                                                    return (
                                                        <tr key={product.id} >

                                                            <td className='px-1 p-sm-2'><ProductImg src={product.imgUrl} className={'rounded border p-1'} style={{ objectFit: 'contain', width: '64px' }} /></td>

                                                            <td className='px-1 p-sm-2'><div className='d-flex flex-column small'>
                                                                <strong>{product.brand}</strong>
                                                                <NavLink to={`/${product.id}`} className={'text-decoration-none'}>{product.name}</NavLink>
                                                            </div></td>
                                                            <td className='px-1 p-sm-2'>{product.price}</td>
                                                            <td className='text-center px-1 p-sm-2'>{product.quantity}</td>
                                                            <td className='text-center px-1 p-sm-2'>₺{product.quantity * product.price}</td>
                                                            <td className='text-center px-1 p-sm-2'>
                                                                <button className='btn m-0 p-0' onClick={() => deleteFromCart(product.id)}>
                                                                    <BsFillCartDashFill size={24} />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div> : <div className="alert alert-warning d-flex align-items-center justify-content-center h-100 shadow-sm">Your shopping cart is empty.</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage