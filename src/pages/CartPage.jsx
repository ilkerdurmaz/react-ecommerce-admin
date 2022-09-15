import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import ProductImg from './../components/shared/ProductImg';
import { NavLink } from 'react-router-dom'
import { MdDeleteForever } from 'react-icons/md'
import { updateCart } from '../app/store/cart';
import { placeOrder } from '../app/firebase';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
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
        cart.forEach((item, index) => {
            order.items[index] = {
                productId: item.id,
                quantity: item.quantity,
                cost: item.quantity * item.price,
            }
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
        <div className='container mt-3'>
            <div className="row">
                <div className="col-12 col-md-8 border rounded">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Image</th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Price</th>
                                    <th scope="col" className='text-center'>Quantity</th>
                                    <th scope="col">Cost</th>
                                    <th scope="col" className='text-center'>x</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cart.map((product) => {
                                        return (
                                            <tr key={product.id} >
                                                <td><ProductImg width='50px' src={product.imgUrl} /></td>
                                                <td><NavLink to={`/${product.id}`}>{product.name}</NavLink></td>
                                                <td>{product.price}</td>
                                                <td className='text-center'>{product.quantity}</td>
                                                <td>₺{product.quantity * product.price}</td>
                                                <td>
                                                    <button className='btn m-0 p-0' onClick={() => deleteFromCart(product.id)}>
                                                        <MdDeleteForever size={20} />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-12 col-md-4 px-0 px-md-3 my-3 my-md-0">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Order Summary</h5>
                        </div>
                        <div className="card-body">
                            <p className="card-text">₺{total}</p>
                            <button className="btn btn-primary" onClick={placeOrderHandler}
                                disabled={!(cart.length > 0)}>Place Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage