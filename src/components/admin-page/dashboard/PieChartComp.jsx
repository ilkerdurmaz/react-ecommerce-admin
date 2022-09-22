import React, { Component } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';


export default class PieChartComp extends Component {
    data = [
        { name: 'Group A', value: 400 },

    ];

    COLORS = ['#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600', 'black'];

    categories = {}
    totalSale = 0;

    salesByCategories() {
        const orders = this.props.orders.map(order => order.data)
        this.categories = {
            "Electronics": 0,
            "Clothing": 0,
            "Toys": 0,
            "Food": 0,
            "Sport": 0,
            "Accessories": 0,
            "Furniture": 0,
            "Hobby and DIY": 0,
            "Health & Beauty": 0,
        }

        for (let i = 0; i < orders.length; i++) {
            for (let j = 0; j < Object.values(orders[i].items).length; j++) {
                const product = Object.values(orders[i].items)[j]
                this.categories[product.category] += product.quantity
            }
        }

        const sorted = Object.keys(this.categories).sort((a, b) => { return this.categories[b] - this.categories[a] })

        this.totalSale = 0;

        this.data = [
            ...sorted.map(cat => {
                this.totalSale += this.categories[cat] || 0;
                return {
                    name: cat,
                    value: this.categories[cat]
                }
            })
        ]
    }

    render() {
        this.salesByCategories()
        return (
            <div className='d-flex flex-column justify-content-center border rounded shadow-sm '>
                <div className='text-center'>
                    <span className='fs-4'>Sales By Categories</span>
                    <hr className='mx-3 my-1' />
                </div>
                <div style={{ width: '100%', height: '240px' }}>
                    <ResponsiveContainer width='100%' height="100%">
                        <PieChart>
                            <Pie
                                data={this.data}
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={2}
                                dataKey="value"
                                label
                            >
                                {this.data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={this.COLORS[index % this.COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col">⨀</th>
                            <th scope="col">Category</th>
                            <th scope="col" className='text-center'>Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.data.map((category, index) => {
                                return (
                                    <tr key={index}>
                                        <th style={{ color: this.COLORS[index] }}>⬤</th>
                                        <td>{category.name}</td>
                                        <td className='text-center'>%{((100 * category.value) / this.totalSale).toFixed(2)}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
