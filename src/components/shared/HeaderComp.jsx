import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { NavLink } from 'react-router-dom'


function BasicExample() {
    return (
        <Navbar bg="dark" expand="lg" variant="dark" className='bg-gradient'>
            <Container >
                <Navbar.Brand href="#"><div className='text-white'>
                    <div className="d-block d-sm-none">xs</div>
                    <div className="d-none d-sm-block d-md-none">sm</div>
                    <div className="d-none d-md-block d-lg-none">md</div>
                    <div className="d-none d-lg-block d-xl-none">lg</div>
                    <div className="d-none d-xl-block d-xxl-none">xl</div>
                    <div className="d-none d-xxl-block">xxl</div>
                </div></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='d-flex align-items-center'>
                        <Nav.Item className='mx-1'>
                            <NavLink to='/'>Products</NavLink>
                        </Nav.Item>
                        <Nav.Item className='mx-1'>
                            <NavLink to='/my-orders'>My Orders</NavLink>
                        </Nav.Item>
                        <Nav.Item className='mx-1'>
                            <NavLink to='/cart'>Shopping Cart </NavLink>
                        </Nav.Item>
                        <Nav.Item className='mx-1'>
                            <NavLink to='/admin'>Admin </NavLink>
                        </Nav.Item>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BasicExample;


