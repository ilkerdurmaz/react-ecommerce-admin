import React, { useEffect, useState } from 'react'
import { getMyOrders } from '../app/firebase'
import MyOrder from './../components/shopping-page/MyOrder';
import { useSelector } from 'react-redux';

const MyOrdersPage = () => {
    const myOrders = useSelector(state => state.orders.orders)
    let sortedOrders = [...myOrders]
    sortedOrders.sort((a, b) => b.data.timeStamp - a.data.timeStamp)

    useEffect(() => {
        getMyOrders(localStorage.getItem('orderOwnerId'))
    }, [])
    return (
        myOrders.length > 0 ?
            <div className="container px-1 px-sm-auto mt-3">
                {
                    sortedOrders.map(order => (<MyOrder
                        key={order.fireId}
                        order={order}
                    />))
                }
            </div>
            : <div className="spinner-grow" style={{ width: "10rem", height: "10rem" }} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
    )
}

export default MyOrdersPage