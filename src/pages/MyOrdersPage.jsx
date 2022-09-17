import React, { useEffect } from 'react'
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
            <div style={{ maxWidth: '720px', margin: "auto" }}>
                <div className="container px-1 px-sm-auto mt-3">
                    {
                        sortedOrders.map(order => (<MyOrder
                            key={order.fireId}
                            order={order}
                        />))
                    }
                </div>
            </div>
            : <div className="alert alert-warning d-flex align-items-center justify-content-center h-100">You have no order.</div>
    )
}

export default MyOrdersPage