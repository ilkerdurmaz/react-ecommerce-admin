import React, { Component } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import AddProductModal from './AddProductModal';


export default class ProductList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
    }


    handleClose = () => this.setState({ show: false })

    openModal = () => {
        this.setState({ show: true })
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

                <AddProductModal
                    show={this.state.show}
                    handleClose={this.handleClose}
                />
            </div>
        )
    }
}
