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
                <div className="container border rounded px-0 shadow-sm" >
                    <div className='d-flex justify-content-center'>
                        <span className='px-2 pb-0 small text-muted'>Click order to see it's details and mark as "delivered".</span>
                    </div>
                    <div className="table-responsive overflow-auto " style={{ maxHeight: '654px' }}>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col" className='pe-0 px-sm-auto'>Date</th>
                                    <th scope="col" >Order Id</th>
                                    <th scope="col" className=''>Status</th>
                                    <th scope="col" >Price</th>
                                </tr>
                            </thead>
                            <tbody >
                                {
                                    this.state.sortedOrders.map(order => (
                                        <tr key={order.fireId} onClick={() => this.openOrderModal(order)}>
                                            <td className='pe-0 px-sm-auto'>{new Date(order.data.timeStamp).toLocaleDateString('tr-TR')}</td>
                                            <td ><small>{order.fireId}</small></td>
                                            <td className=''><span className={`badge ${order.data.status === "new" ? "text-bg-warning" : "text-bg-success"
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
                : <div className='d-flex justify-content-center'>
                    <div className="spinner-grow" style={{ width: "10rem", height: "10rem" }} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
        )
    }
}

