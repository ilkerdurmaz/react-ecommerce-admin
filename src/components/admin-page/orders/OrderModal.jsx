import React, { Component } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProductImg from '../../shared/ProductImg';
import Modal from 'react-bootstrap/Modal';
import { updateOrder } from './../../../app/firebase';

class OrderModal extends Component {

    markDelivered = async () => {
        const deliveredOrder = { ...this.props.order.data, status: 'delivered' }
        await updateOrder(deliveredOrder, this.props.order.fireId)
        this.props.handleClose()
    }

    render() {
        return (
            <div className=''>
                <Modal
                    show={this.props.show}
                    onHide={this.props.handleClose}
                    backdrop={"true"}
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton className='p-2'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <span className='fs-5'>Order Details</span>
                        </div>
                    </Modal.Header>

                    <Modal.Body className='p-1'>
                        <div className="table-responsive">
                            {
                                this.props.productList.length > 0 ?
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col" className='px-1'>Image</th>
                                                <th scope="col" className='px-1'>Product</th>
                                                <th scope="col" className='px-1 text-center'>Piece</th>
                                                <th scope="col" className='px-1 text-center'>Cost</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                Object.values(this.props.order.data.items).map((item) => {
                                                    const product = this.props.productList.find(product => product.id === item.productId)
                                                    if (product)
                                                        return (
                                                            <tr key={product.id}>
                                                                <td className='px-1'><ProductImg src={product.imgUrl} className={'rounded border p-1'} style={{ objectFit: 'contain', width: '48px' }} /></td>

                                                                <td className='px-1'><div className='d-flex flex-column small'>
                                                                    <strong>{product.brand}</strong>
                                                                    <NavLink to={`/${product.id}`}>{product.name}</NavLink>
                                                                </div></td>
                                                                <td className='px-1 text-center'>{item.quantity}</td>
                                                                <td className='px-1 text-center'>₺{item.cost}</td>
                                                            </tr>
                                                        )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    : <div className="alert alert-warning d-flex align-items-center justify-content-center h-100 m-3">Product information not found. </div>
                            }
                        </div>
                    </Modal.Body>

                    <Modal.Footer className=' justify-content-between border-top-0'>
                        <span>Total Price: ₺{Object.values(this.props.order.data.items).reduce((totalCost, item) => totalCost + item.cost, 0)}</span>
                        <button onClick={this.markDelivered} className='btn btn-primary' disabled={this.props.order.data.status === "closed" || this.props.order.data.status === "delivered"}>Mark as Delivered</button>
                    </Modal.Footer>

                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    productList: state.product.list
});

export default connect(mapStateToProps)(OrderModal);
