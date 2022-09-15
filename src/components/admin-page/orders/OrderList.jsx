import React, { Component } from 'react'
import { getAllOrders } from '../../../app/firebase'
import OrderModal from './OrderModal';

export default class OrderList extends Component {
    constructor() {
        super()
        this.state = {
            sortedOrders: [],
            showModal: false,
            selectedOrder: false
        }
    }

    getOrders = async () => {
        const orders = await getAllOrders().then(res => res)
        const temp = [...orders]
        temp.sort((a, b) => b.data.timeStamp - a.data.timeStamp)
        this.setState({ sortedOrders: temp })
    }

    componentDidMount() {
        this.getOrders();
    }

    openOrderModal = (order) => {
        this.setState({ showModal: true })
        this.setState({ selectedOrder: order })
    }
    handleClose = () => {
        this.setState({ showModal: false })
        this.getOrders()
    }

    render() {
        return (
            this.state.sortedOrders.length > 0 ?
                <div className="container border rounded">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col" className='px-0 px-sm-auto'>Date</th>
                                    <th scope="col" >Order Id</th>
                                    <th scope="col" className='text-center'>Status</th>
                                    <th scope="col" >Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.sortedOrders.map(order => (
                                        <tr key={order.fireId} onClick={() => this.openOrderModal(order)}>
                                            <td className='px-0 px-sm-auto'>{new Date(order.data.timeStamp).toLocaleDateString('tr-TR')}</td>
                                            <td ><small>{order.fireId}</small></td>
                                            <td className='text-center'><span className={`badge ${order.data.status === "new" ? "text-bg-warning" : "text-bg-success"
                                                } fs-6`}>
                                                {order.data.status.toUpperCase()}</span></td>

                                            <td>₺{Object.values(order.data.items).reduce((totalCost, item) => totalCost + item.cost, 0)}</td>

                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    {
                        this.state.selectedOrder && <OrderModal show={this.state.showModal} handleClose={this.handleClose} order={this.state.selectedOrder} />
                    }
                </div>
                : <div className="spinner-grow" style={{ width: "10rem", height: "10rem" }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
        )
    }
}

//<OrderModal key={order.fireId} items={Object.values(order.data.items)} orderId={order.fireId} />