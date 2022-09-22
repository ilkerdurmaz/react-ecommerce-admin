import React, { Component } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import ProductModal from './ProductModal';
import { connect } from 'react-redux';
import ProductImg from './../../shared/ProductImg';
import Rating from 'react-rating'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { calculateRating } from './../../../app/utils';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            isUpdate: false,
            selectedProduct: null,
            selectedCategory: "All"

        }
    }
    filtered = [...this.props.productList]
    categories = [
        "All",
        "Electronics",
        "Clothing",
        "Toys",
        "Food",
        "Sport",
        "Accessories",
        "Furniture",
        "Hobby and DIY",
        "Healt & Beauty"
    ]
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

    handleFilter() {
        let filteredProducts = []
        if (this.state.selectedCategory !== "All")
            filteredProducts = [...this.props.productList.filter(product => product.category === this.state.selectedCategory)]
        else
            filteredProducts = [...this.props.productList]

        this.filtered = [...filteredProducts]
    }

    render() {
        this.handleFilter()
        return (
            <div>
                <div className='container d-flex justify-content-between border rounded p-2 shadow-sm align-items-center'>
                    <button onClick={this.openModal} className="btn btn-dark bg-gradient">Add Product</button>
                    <small className='text-muted d-none d-md-block'>Double click product to edit it's properties.</small>
                    <div className='d-flex justify-content-between'>
                        <Dropdown onSelect={(value) => this.setState({ selectedCategory: value })} className='mx-1'>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                {this.state.selectedCategory}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {this.categories.map((category) => (
                                    <Dropdown.Item key={category} eventKey={category}>{category}</Dropdown.Item>))
                                }
                            </Dropdown.Menu>
                        </Dropdown>

                    </div>
                </div>

                {
                    this.state.show && <ProductModal
                        selectedProduct={this.state.selectedProduct}
                        show={this.state.show}
                        handleClose={this.handleClose}
                        productList={this.props.productList}
                        isUpdate={this.state.isUpdate}
                    />
                }
                <div className="container border rounded mt-2 px-0 px-sm-2 shadow-sm ">
                    <div className="table-responsive" style={{ maxHeight: '620px' }}>
                        <div className='text-center text-muted'>
                            <small className='d-md-none'>Double click product to edit it's properties.</small>
                        </div>
                        {
                            this.props.productList.length > 0 ? <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col" className='px-1 px-sm-2'>Image</th>
                                        <th scope="col" className='px-1 px-sm-2'>Product</th>
                                        <th scope="col" className='text-center px-1 px-sm-2'>Price</th>
                                        <th scope="col" className='text-center px-1px-sm-2'>Stock</th>
                                        <th scope="col" className='text-center px-1 px-sm-2'>Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.filtered.map((product) => {
                                            return (
                                                <tr key={product.id} onDoubleClick={() => this.handleUpdate(product)}>
                                                    <td className='px-0 px-sm-2'><ProductImg src={product.imgUrl} className={'rounded border p-1'} style={{ objectFit: 'contain', width: '50px' }} /></td>
                                                    <td className='px-0 px-sm-2'><div className='d-flex flex-column small'><strong>{product.brand}</strong>{product.name}</div></td>
                                                    <td className='text-center px-1 px-sm-2'>{product.price}</td>
                                                    <td className='text-center px-1 px-sm-2'>{product.stock}</td>
                                                    <td className=' text-center px-1 px-sm-2'>
                                                        <Rating
                                                            emptySymbol={<AiOutlineStar size={18} />}
                                                            fullSymbol={<AiFillStar size={18} />}
                                                            readonly={true}
                                                            initialRating={calculateRating(product.rating)}
                                                        />
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table> : <div className="alert alert-warning d-flex align-items-center justify-content-center h-100 m-3">There is no product.</div>
                        }
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


