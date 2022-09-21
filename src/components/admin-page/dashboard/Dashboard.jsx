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
            key: 'today',
            filteredOrders: []
        }
    }

    getOrderData = async () => {
        await getAllOrders()
        this.filterOrders("today")
    }



    componentDidMount() {
        this.getOrderData()
    }

    filterOrders(k) {
        this.setState({ key: k })

        if (k === "today") {
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const yyyy = today.getFullYear();
            const todaysMiliseconds = new Date(`${yyyy}-${mm}-${dd}`).getTime() - 60 * 60 * 1000 * 3
            let todaysOrders = this.props.orderList.filter(o => o.data.timeStamp >= todaysMiliseconds)
            todaysOrders.sort((a, b) => a.data.timeStamp - b.data.timeStamp)
            this.setState({
                filteredOrders: [...todaysOrders]
            })
        }
        else {
            this.setState({
                filteredOrders: structuredClone(this.props.orderList).sort((a, b) => a.data.timeStamp - b.data.timeStamp)
            })
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col px-1">
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={this.state.key}
                            onSelect={(k) => this.filterOrders(k)}
                            className="mb-2"
                        >
                            <Tab eventKey="today" title="Today">

                            </Tab>
                            <Tab eventKey="all" title="All">

                            </Tab>
                        </Tabs>
                    </div>
                </div>

                <div className="row">

                    <div className="col-12 col-lg-8 px-1 py-2 py-lg-0">
                        <LineChartComp orders={this.state.filteredOrders || []} type={this.state.key} />
                        <TopSellingComp orders={this.state.filteredOrders || []} products={this.props.productList} />
                    </div>

                    <div className=" col-12 col-lg-4 px-1">
                        <PieChartComp orders={this.state.filteredOrders || []} />
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