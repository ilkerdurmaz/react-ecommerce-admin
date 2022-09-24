import React, { Component } from 'react'
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default class LineChartComp extends Component {

    data = [
        {
            "name": "a",
            "sale": 1000,

        },
        {
            "name": "b",
            "sale": 2000,

        },
        {
            "name": "c",
            "sale": 1000,
        },
    ]


    orders = []

    updateChart() {
        let tempData = []
        if (this.props.orders.length > 0) {
            this.orders = this.props.orders.map(order => order.data)
            tempData = this.orders.map(order => {
                return {
                    totalCost: Object.values(order.items).reduce((totalCost, item) => totalCost + item.cost, 0),
                    quantity: Object.values(order.items).reduce((totalCost, item) => totalCost + item.quantity, 0),
                    timeStamp: this.props.type === "today" ? (String(new Date(order.timeStamp).getHours()).padStart(2, '0') + ":" + String(new Date(order.timeStamp).getMinutes()).padStart(2, '0')) : (String(new Date(order.timeStamp).getDate()).padStart(2, '0') + "-" + String(new Date(order.timeStamp).getMonth()).padStart(2, '0')) + "-" + new Date(order.timeStamp).getFullYear()
                }
            })
        }

        this.data = tempData.map((item, index) => {
            return {
                "name": item.timeStamp,
                "sale": item.totalCost
            }
        })
    }

    render() {
        this.updateChart()
        return (
            <div className='border rounded shadow-sm'>
                <div className='text-center'>
                    <span className='fs-4'>Sales</span>
                    <hr className='mx-3 my-1' />
                </div>
                <div style={{ width: '100%', height: '200px' }}>
                    <ResponsiveContainer>
                        <AreaChart
                            width={500}
                            height={400}
                            data={this.data}
                            margin={{
                                top: 10,
                                right: 0,
                                left: -10,
                                bottom: 0,
                            }}
                        >
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="50%" stopColor="#8884d8" stopOpacity={1} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2} />
                                </linearGradient>

                            </defs>

                            <XAxis dataKey="name" interval={2} padding={{ left: 48, right: 32 }}  style={{fontSize:'10px'}}/>

                            <Tooltip />
                            <Area type="monotone" dataKey="sale" stroke="#8884d8" fill="url(#colorUv)" />
                        </AreaChart>
                    </ResponsiveContainer>

                </div>
            </div>

        )
    }
}
