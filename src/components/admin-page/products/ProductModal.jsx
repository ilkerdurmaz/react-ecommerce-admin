import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import { addProduct, updateProduct, deleteProduct } from '../../../app/firebase'

export default class AddProductModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: ["Others", "Category-2", "Category-3", "Category-4", "Category-5"],
        }
    }

    submitHandler = async (e) => {
        e.preventDefault();
        const productData = {
            brand: e.target[1].value,
            name: e.target[2].value,
            description: e.target[3].value,
            imgUrl: e.target[4].value,
            category: e.target[5].value,
            stock: e.target[6].value,
            price: e.target[7].value,
            rating: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        }
        if (this.props.isUpdate)
            await updateProduct(productData, this.props.selectedProduct.id)
        else
            await addProduct(productData)
        this.props.handleClose();
    }

    deleteHandler = async () => {
        await deleteProduct(this.props.selectedProduct.id)
        this.props.handleClose()
    }

    render() {
        return (
            <div>
                <Modal
                    show={this.props.show}
                    onHide={this.props.handleClose}
                    backdrop={this.props.isUpdate ? "true" : "static"}
                    keyboard={false}
                    centered
                >
                    <Form onSubmit={this.submitHandler}>
                        <Modal.Header closeButton>
                            <Modal.Title>Product Features</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">

                                <div className="col-12">

                                    <FloatingLabel controlId="floatingInput" label="Brand" className='my-2'>
                                        <Form.Control type="text" placeholder="Brand" name='brand' required defaultValue={this.props.isUpdate ? this.props.selectedProduct.brand : ""} />
                                    </FloatingLabel>

                                    <FloatingLabel controlId="floatingInput" label="Name" className='my-2'>
                                        <Form.Control type="text" placeholder="Name" size="sm" name='name' required defaultValue={this.props.isUpdate ? this.props.selectedProduct.name : ""} />
                                    </FloatingLabel>

                                    <FloatingLabel controlId="floatingTextarea" label="Description" className='my-2'>
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Leave a comment here"
                                            style={{ height: '100px' }}
                                            size="sm"
                                            name='description'
                                            required
                                            defaultValue={this.props.isUpdate ? this.props.selectedProduct.description : ""}
                                        />
                                    </FloatingLabel>

                                    <FloatingLabel controlId="floatingInput" label="Image URL" className='my-2'>
                                        <Form.Control type="text" placeholder="url" size="sm" name='imgUrl' defaultValue={this.props.isUpdate ? this.props.selectedProduct.imgUrl : ""} />
                                    </FloatingLabel>

                                    <div className='row'>
                                        <div className="col-12 col-sm-5">
                                            <FloatingLabel controlId="floatingSelect" label="Category" className=''>
                                                <Form.Select size="sm" name='category' defaultValue={this.props.isUpdate ? this.props.selectedProduct.category : ""}>
                                                    {
                                                        this.state.categories.map((category, index) => {
                                                            return <option value={category} key={index}>{category}</option>
                                                        })
                                                    }
                                                </Form.Select>
                                            </FloatingLabel>
                                        </div>

                                        <div className="col-12 col-sm-7 d-flex my-2 my-sm-0 ">
                                            <FloatingLabel controlId="floatingInput" label="Stock" className='me-1 '>
                                                <Form.Control type="number" placeholder="0" size="sm" name='stock' required defaultValue={this.props.isUpdate ? this.props.selectedProduct.stock : ""} />
                                            </FloatingLabel>

                                            <FloatingLabel controlId="floatingInput" label="Price" className='ms-1 w-100'>
                                                <Form.Control type="number" placeholder="0" size="sm" name='price' required defaultValue={this.props.isUpdate ? this.props.selectedProduct.price : ""} />
                                            </FloatingLabel>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer className=' justify-content-between'>
                            {
                                this.props.isUpdate && <Button variant="danger" onClick={this.deleteHandler}>
                                    Delete Product
                                </Button>
                            }
                            <Button variant={this.props.isUpdate ? 'warning' : 'primary'} type='submit'>
                                {this.props.isUpdate ? 'Update Product' : 'Add Product'}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        )
    }
}



