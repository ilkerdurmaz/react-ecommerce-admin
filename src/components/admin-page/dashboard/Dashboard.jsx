import React, { Component } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import LineChartComp from './LineChartComp';
import PieChartComp from './PieChartComp';
import TopSellingComp from './TopSellingComp';
import { connect } from 'react-redux';
import { getAllOrders } from '../../../app/firebase'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 'home',
        }
    }

    getOrderData = async () => {
        await getAllOrders()
    }

    componentDidMount() {
        this.getOrderData()
    }

    render() {
        return (
            <div className="container">

                <div className="row">
                    <div className="col px-1">
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={this.key}
                            onSelect={(k) => this.setState({ key: k })}
                            className="mb-2"
                        >
                            <Tab eventKey="home" title="Today">

                            </Tab>
                            <Tab eventKey="profile" title="This Week">

                            </Tab>
                            <Tab eventKey="contact" title="This Month">

                            </Tab>
                        </Tabs>
                    </div>
                </div>

                <div className="row">

                    <div className="col-12 col-lg-8 px-1 py-2 py-lg-0">
                        <LineChartComp orders={this.props.orderList} />
                        <TopSellingComp orders={this.props.orderList} products={this.props.productList} />
                    </div>

                    <div className=" col-12 col-lg-4 px-1">
                        <PieChartComp orders={this.props.orderList} />
                    </div>

                </div>
            </div >
        )
    }
}

const mapStateToProps = (state) => ({
    orderList: state.adminDashboard.orders,
    productList: state.product.list
});

export default connect(mapStateToProps)(Dashboard);