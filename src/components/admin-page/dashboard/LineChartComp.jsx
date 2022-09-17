import React, { Component } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default class LineChartComp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                {
                    "name": "Page A",
                    "sale": 8560,

                },
                {
                    "name": "Page B",
                    "sale": 10000,

                },
                {
                    "name": "Page C",
                    "sale": 2000,
                },
            ],

        }
    }
    orders = []

    updateChart() {
        let tempData = []
        if (this.props.orders.length > 0) {
            this.orders = this.props.orders.map(order => order.data)
            tempData = this.orders.map(order => {
                return {
                    totalCost: Object.values(order.items).reduce((totalCost, item) => totalCost + item.cost, 0),
                    quantity: Object.values(order.items).reduce((totalCost, item) => totalCost + item.quantity, 0),
                    timeStamp: new Date(order.timeStamp).getHours() + ":" + new Date(order.timeStamp).getMinutes()
                }
            })
        }

        this.setState({
            data: tempData.map(item => {
                return {
                    "name": item.timeStamp,
                    "sale": item.totalCost
                }
            })
        })
    }

    componentDidMount() {
        this.updateChart()
    }

    render() {
        return (
            <div style={{ width: '%100', height: '300px' }}>
                <ResponsiveContainer className={"border rounded"}>
                    <AreaChart
                        width={500}
                        height={400}
                        data={this.state.data}
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

                        <XAxis dataKey="name" />

                        <Tooltip />
                        <Area type="monotone" dataKey="sale" stroke="#8884d8" fill="url(#colorUv)" />
                    </AreaChart>
                </ResponsiveContainer>

            </div>

        )
    }
}
