import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

export default class AddProductModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: ["Others", "Category-2", "Category-3", "Category-4", "Category-5"],
            productData: {
                brand: '',
                name: '',
                description: '',
                category: '',
                price: 0,
                stock: 0,
                rating: 0,
                imgUrl: ''
            },
        }
    }

    onFormChange = (e, changedValue) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            productData: { ...this.state.productData, [name]: value }
        })
    }

    submitHandler = (e) => {
        e.preventDefault();


        console.log(this.state.productData);

        this.props.handleClose();
    }

    render() {
        return (
            <div>
                <Modal
                    show={this.props.show}
                    onHide={this.props.handleClose}
                    backdrop="static"
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
                                        <Form.Control type="text" placeholder="Brand" name='brand' onChange={this.onFormChange} required />
                                    </FloatingLabel>

                                    <FloatingLabel controlId="floatingInput" label="Name" className='my-2'>
                                        <Form.Control type="text" placeholder="Name" size="sm" name='name' onChange={this.onFormChange} required />
                                    </FloatingLabel>

                                    <FloatingLabel controlId="floatingTextarea" label="Description" className='my-2'>
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Leave a comment here"
                                            style={{ height: '100px' }}
                                            size="sm"
                                            name='description'
                                            onChange={this.onFormChange}
                                            required
                                        />
                                    </FloatingLabel>

                                    <FloatingLabel controlId="floatingInput" label="Image URL" className='my-2'>
                                        <Form.Control type="text" placeholder="url" size="sm" name='imgUrl' onChange={this.onFormChange} />
                                    </FloatingLabel>

                                    <div className='row'>

                                        <div className="col-12 col-sm-5">
                                            <FloatingLabel controlId="floatingSelect" label="Category" className=''>
                                                <Form.Select size="sm" name='category' onChange={this.onFormChange}>
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
                                                <Form.Control type="number" placeholder="0" size="sm" name='stock' onChange={this.onFormChange} required />
                                            </FloatingLabel>

                                            <FloatingLabel controlId="floatingInput" label="Price" className='ms-1 w-100'>
                                                <Form.Control type="number" placeholder="0" size="sm" name='price' onChange={this.onFormChange} required />
                                            </FloatingLabel>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" type='submit'>
                                Add Product
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        )
    }
}



