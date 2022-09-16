import React, { useState } from 'react'
import ProductImg from './../shared/ProductImg';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import RatingModal from './RatingModal';


const MyOrder = ({ order }) => {
    const products = useSelector(state => state.product.list)
    const items = Object.values(order.data.items)
    const totalCost = items.reduce((totalCost, item) => totalCost + item.cost, 0)
    const orderTime = new Date(order.data.timeStamp)
    const [show, setShow] = useState(false)
    const productList = []

    function handleClose() {
        setShow(false)
    }

    return (
        <div className='card my-2'>
            <div className='card-header d-flex justify-content-between'>
                <small>Order Date: {orderTime.toLocaleDateString('tr-TR')}</small>
                <small>Total Cost: ₺{totalCost}</small>
            </div>
            <div className='card-body p-0'>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col" className='px-0'>Product</th>
                                <th scope="col" className='text-center'>Pieces</th>
                                <th scope="col" className='text-center'>Cost</th>

                            </tr>
                        </thead>
                        <tbody>
                            {

                                items.map((item) => {
                                    const product = products.find(product => product.id === item.productId)
                                    productList.push(product);
                                    return (
                                        <tr key={item.productId}>
                                            <td><ProductImg src={product.imgUrl} width={"64px"} /></td>

                                            <td className='px-0'>
                                                <div className='d-flex flex-column'>
                                                    <strong>{product.brand}</strong>
                                                    <NavLink to={`/${product.id}`}>{product.name}</NavLink>
                                                </div>
                                            </td>

                                            <td className='text-center'>{item.quantity}</td>

                                            <td className='text-center'>₺{item.cost}</td>

                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="card-footer d-flex ">
                <button onClick={() => setShow(true)} className='btn btn-secondary ms-auto' disabled={order.data.status === "closed" || order.data.status === "new"}>rate products</button>
            </div>
            <RatingModal show={show} handleClose={handleClose} products={productList} order={order} />
        </div>
    )
}

export default MyOrder