import React, { Component } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import ProductModal from './ProductModal';
import { connect } from 'react-redux';
import ProductImg from './../../shared/ProductImg';


class ProductList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            isUpdate: false,
            selectedProduct: null
        }
    }

    handleClose = () => this.setState({ show: false })

    openModal = () => {
        this.setState({ show: true, isUpdate: false })
    }

    handleUpdate = (product) => {
        if (product !== null) {
            this.setState({ selectedProduct: product })
            this.setState({ show: true, isUpdate: true })
        }
    }

    selectedCategory = (value) => {
        console.log(value)
    }

    selectedSorting = (value) => {
        console.log(value)
    }

    render() {
        return (
            <div>
                <div className='d-flex justify-content-between'>
                    <button onClick={this.openModal} className="btn btn-dark bg-gradient">Add Product</button>
                    <div className='d-flex justify-content-between'>
                        <Dropdown onSelect={this.selectedCategory} className='mx-1'>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Category
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="cat1">Action</Dropdown.Item>
                                <Dropdown.Item eventKey="cat2">Another action</Dropdown.Item>
                                <Dropdown.Item eventKey="cat3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown onSelect={this.selectedSorting} className='mx-1'>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Sort
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="sort1">Action</Dropdown.Item>
                                <Dropdown.Item eventKey="sort2">Another action</Dropdown.Item>
                                <Dropdown.Item eventKey="sort3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </div>
                </div>

                <ProductModal
                    selectedProduct={this.state.selectedProduct}
                    show={this.state.show}
                    handleClose={this.handleClose}
                    productList={this.props.productList}
                    isUpdate={this.state.isUpdate}
                />
                <div className="container border rounded mt-2">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Image</th>
                                    <th scope="col">Product</th>
                                    <th scope="col" className='text-center'>Price</th>
                                    <th scope="col" className='text-center'>Stock</th>
                                    <th scope="col" className='text-center'>Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.productList.map((product) => {
                                        return (
                                            <tr key={product.id} onDoubleClick={() => this.handleUpdate(product)}>
                                                <td><ProductImg width='50px' src={product.imgUrl} /></td>
                                                <td><div className='d-flex flex-column small'><strong>{product.brand}</strong>{product.name}</div></td>
                                                <td className='text-center'>{product.price}</td>
                                                <td className='text-center'>{product.stock}</td>
                                                <td className='text-center'>✩✩✩✩✩</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    productList: state.product.list
});

export default connect(mapStateToProps)(ProductList);