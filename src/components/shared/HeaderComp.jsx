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
        <Navbar bg="dark" expand="md" variant="dark" className='bg-gradient' sticky="top">
            <Container >
                <Navbar.Brand >
                    <div className='text-white'>
                        <div className="d-block d-sm-none">xs</div>
                        <div className="d-none d-sm-block d-md-none">sm</div>
                        <div className="d-none d-md-block d-lg-none">md</div>
                        <div className="d-none d-lg-block d-xl-none">lg</div>
                        <div className="d-none d-xl-block d-xxl-none">xl</div>
                        <div className="d-none d-xxl-block">xxl</div>
                    </div></Navbar.Brand>
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


{/* <Nav.Item className='mx-2'>
<NavLink to='/admin' className={({ isActive }) => isActive ? 'text-warning text-decoration-none' : 'text-light text-decoration-none'}>Admin </NavLink>
</Nav.Item> */}


