import React from 'react'
import { NavLink } from 'react-router-dom'
import toast from 'react-hot-toast'
import CartCountComp from './CartCountComp';
import { useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';




function Header() {
    const cart = useSelector(state => state.cart.cart)

    function check(e) {
        if (cart.length === 0) {
            e.preventDefault();
            toast.error("Cart is empty!")
        }
    }

    return (
        <Navbar bg="dark" expand="md" variant="dark" className='shadow-sm bg-gradient' sticky="top">
            <Container className='p-0' style={{ maxWidth: '960px' }}>
                <Navbar.Brand className='ms-1 me-auto'>React E-Commerce Project</Navbar.Brand>

                <div className='d-flex align-items-center'>

                    <div className='d-md-none ms-auto me-2'>
                        <NavLink onClick={check} to='/cart' className={'text-decoration-none'}>
                            <CartCountComp count={cart.length} />
                        </NavLink>
                    </div>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" className='border-warning me-1' />
                </div>


                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='ms-auto'>

                        <Nav.Item className='m-2'>
                            <NavLink to='/'
                                className={({ isActive }) => isActive ? 'text-warning text-decoration-none' : 'text-light text-decoration-none'}
                            >Products</NavLink>
                        </Nav.Item>

                        <Nav.Item className='m-2'>
                            <NavLink to='/my-orders' className={({ isActive }) => isActive ? 'text-warning text-decoration-none' : 'text-light text-decoration-none'}>My Orders</NavLink>
                        </Nav.Item>

                        <Nav.Item className='m-2'>
                            <NavLink onClick={check} to='/cart' className={({ isActive }) => isActive ? 'text-warning text-decoration-none' : 'text-light text-decoration-none'}>Shopping Cart </NavLink>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
                <div className='text-warning d-none d-md-block me-md-3 me-lg-0'>
                    <NavLink onClick={check} to='/cart' className={'text-decoration-none'}>
                        <CartCountComp count={cart.length} />
                    </NavLink>
                </div>
            </Container >
        </Navbar >
    );
}

export default Header;


