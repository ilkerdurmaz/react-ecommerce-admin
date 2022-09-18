import React, { Component } from 'react'
import Table from 'react-bootstrap/Table';

export default class TopSellingComp extends Component {


    productSellingCounts = []


    countSales() {
        if (this.props.products.length > 0) {
            this.productSellingCounts = this.props.products.map(product => {
                return {
                    id: product.id,
                    count: 0,
                    name: product.name,
                    category: product.category,
                    imgUrl: product.imgUrl,
                    brand: product.brand
                }
            })

            const orders = this.props.orders.map(order => order.data)

            for (let i = 0; i < orders.length; i++) {
                for (let j = 0; j < Object.values(orders[i].items).length; j++) {
                    const product = Object.values(orders[i].items)[j]
                    const index = this.productSellingCounts.findIndex(item => item.id === product.productId)
                    this.productSellingCounts[index].count += product.quantity
                }
            }
            this.productSellingCounts.sort((a, b) => b.count - a.count)
        }
    }

    render() {
        this.countSales()
        return (
            <div className='border rounded mt-2 mb-1 overflow-auto shadow-sm' style={{ maxHeight: "357px" }}>
                <div className='text-center'>
                    <span className='fs-4'>Top Selling Products</span>
                    <hr className='mx-3 my-1' />
                </div>
                <div className="table-responsive">
                    {
                        this.productSellingCounts.length > 0 ?
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Category</th>
                                        <th scope="col" className='text-center'>Sales</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.productSellingCounts.map((product, index) => {
                                            if (product.count > 0)
                                                return (
                                                    <tr key={product.id}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{product.name}</td>
                                                        <td>{product.category}</td>
                                                        <td className='text-center'>{product.count}</td>
                                                    </tr>
                                                )
                                        })
                                    }
                                </tbody>
                            </table> : <div className="alert alert-warning d-flex align-items-center justify-content-center h-100 m-3">There is no product.</div>
                    }
                </div>

            </div>
        )
    }
}
