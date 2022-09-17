import React, { Component } from 'react'
import Table from 'react-bootstrap/Table';

export default class TopSellingComp extends Component {
    render() {
        return (
            <div className='border rounded mt-2 mb-1'>
                <div className='text-center'>
                    <span className='fs-4 mb-1'>Top Selling Products</span>
                </div>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            {Array.from({ length: 3 }).map((_, index) => (
                                <th key={index}>Table heading</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            {Array.from({ length: 3 }).map((_, index) => (
                                <td key={index}>Table cell {index}</td>
                            ))}
                        </tr>
                        <tr>
                            <td>2</td>
                            {Array.from({ length: 3 }).map((_, index) => (
                                <td key={index}>Table cell {index}</td>
                            ))}
                        </tr>
                        <tr>
                            <td>3</td>
                            {Array.from({ length: 3 }).map((_, index) => (
                                <td key={index}>Table cell {index}</td>
                            ))}
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}
