import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom'
import toast from 'react-hot-toast'


function BasicExample() {

    function checkCart(e) {
        const cart = JSON.parse(localStorage.getItem('cart'))
        if (cart.length === 0) {
            e.preventDefault();
            toast.error("Cart is empty!")
        }
    }

    return (
        <Navbar bg="dark" expand="md" variant="dark" className='bg-gradient shadow-sm' sticky="top">
            <Container >
                <Navbar.Brand ><span className='fs-4'>React E-Commerce Project</span></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" >
                    <Nav className={'ms-auto'}>
                        <Nav.Item className='mx-2'>
                            <NavLink to='/'
                                className={({ isActive }) => isActive ? 'text-warning text-decoration-none' : 'text-light text-decoration-none'}
                            >Products</NavLink>
                        </Nav.Item>
                        <Nav.Item className='mx-2'>
                            <NavLink to='/my-orders' className={({ isActive }) => isActive ? 'text-warning text-decoration-none' : 'text-light text-decoration-none'}>My Orders</NavLink>
                        </Nav.Item>
                        <Nav.Item className='mx-2'>
                            <NavLink onClick={checkCart} to='/cart' className={({ isActive }) => isActive ? 'text-warning text-decoration-none' : 'text-light text-decoration-none'}>Shopping Cart </NavLink>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container >
        </Navbar >
    );
}

export default BasicExample;


