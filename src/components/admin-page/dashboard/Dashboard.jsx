import React, { Component } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import LineChartComp from './LineChartComp';
import PieChartComp from './PieChartComp';
import TopSellingComp from './TopSellingComp';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 'home'
        }
    }


    render() {
        return (
            <div className="container fluid border rounded">
                <div className="row">
                    <div className='p-2'>
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={this.key}
                            onSelect={(k) => this.setState({ key: k })}
                            className="mb-3"
                        >
                            <Tab eventKey="home" title="Home">
                                Günlük
                            </Tab>
                            <Tab eventKey="profile" title="Profile">
                                Haftalık
                            </Tab>
                            <Tab eventKey="contact" title="Contact">
                                Aylık
                            </Tab>
                        </Tabs>
                    </div>
                </div>
                <div className="row">
                    <LineChartComp />
                </div>
                <div className='row'>
                    <div className="col-12 col-lg-7">
                        <TopSellingComp />
                    </div>
                    <div className="col-12 col-lg-5">
                        <PieChartComp />
                    </div>
                </div>
            </div>
        )
    }
}
