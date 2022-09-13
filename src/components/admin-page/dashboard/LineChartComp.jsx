import React, { Component } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class LineChartComp extends Component {
    data = [
        {
            name: 'Mon',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Tue',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Wed',
            uv: 2000,
            pv: 8000,
            amt: 2290,
        },
        {
            name: 'Thu',
            uv: 2780,
            pv: 2500,
            amt: 2000,
        },
        {
            name: 'Fri',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Sat',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Sun',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

    render() {
        return (
            <div style={{ width: '1080px', height: '300px' }}>
                <ResponsiveContainer width='100%' height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={this.data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

        )
    }
}
