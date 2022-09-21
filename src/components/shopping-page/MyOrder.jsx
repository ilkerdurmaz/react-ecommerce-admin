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
        <div className='card my-2 mx-1 shadow-sm'>

            <div className='card-header d-flex justify-content-between px-2-'>
                <span><span className='fw-bold'>Order Date:</span> {orderTime.toLocaleDateString('tr-TR')}</span>
                <span><span className='fw-bold'>Total Cost:</span> ₺{totalCost}</span>
            </div>

            <div className='card-body p-0'>
                <div className="table-responsive">
                    {
                        products.length > 0 ?
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
                                            if (product) {
                                                productList.push(product);
                                                return (
                                                    <tr key={item.productId}>
                                                        <td>
                                                            <ProductImg src={product.imgUrl} className={'rounded border p-1'} style={{ objectFit: 'contain', width: '64px' }} />
                                                        </td>

                                                        <td className='px-0'>
                                                            <div className='d-flex flex-column'>
                                                                <strong>{product.brand}</strong>
                                                                <NavLink className={'text-decoration-none'} to={`/${product.id}`}>{product.name}</NavLink>
                                                            </div>
                                                        </td>

                                                        <td className='text-center'>{item.quantity}</td>

                                                        <td className='text-center'>₺{item.cost}</td>

                                                    </tr>
                                                )
                                            }
                                        })
                                    }
                                </tbody>
                            </table> :
                            <div className="alert alert-warning d-flex align-items-center justify-content-center h-100 m-3">Product information not found. </div>
                    }
                </div>
            </div>

            <div className="card-footer d-flex justify-content-between align-items-center px-2">
                <span>
                    <span className='fw-bold me-1'>Order Status:</span>
                    <span className={order.data.status === "closed" ? 'text-success' : 'text-primary'}>
                        {order.data.status.toUpperCase()}</span>
                </span>
                <button
                    onClick={() => setShow(true)}
                    className={`btn ${order.data.status === "closed" ? 'btn-outline-secondary' : 'btn-warning'} `}
                    disabled={order.data.status === "closed" || order.data.status === "new"}>Rate Products</button>
            </div>

            <RatingModal show={show} handleClose={handleClose} products={productList} order={order} />
        </div>
    )
}

export default MyOrder