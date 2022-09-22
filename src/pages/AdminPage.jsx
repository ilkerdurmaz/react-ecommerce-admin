import React from 'react'
import Button from 'react-bootstrap/Button';

import { logout } from '../app/firebase'
import { useNavigate, NavLink, Outlet, useLocation } from 'react-router-dom';

const AdminPage = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = async () => {
        await logout();
        navigate('/admin', {
            replace: true,
        })
    }

    return (
        <div className='container mt-3 border rounded shadow' style={{ maxWidth: '960px', margin: "auto" }}>

            <div className='row'>
                <div className='d-flex justify-content-between justify-content-sm-end align-items-center bg-dark bg-gradient text-white rounded-top px-2 py-2 ms-sm-auto'>

                    <span className='d-sm-none'>Admin</span>
                    <span className='d-none d-sm-block me-auto fs-4'>Admin Panel</span>
                    <div>
                        <button className='btn btn-outline-danger btn-sm px-2 mx-1' onClick={handleLogout}>
                            Log-out
                        </button>

                        <Button variant="outline-primary" size="sm" active={location.pathname === "/admin-page"} className="mx-0">
                            <NavLink to="/admin-page" className={"text-decoration-none text-light"}>Dashboard</NavLink>
                        </Button>

                        <Button variant="outline-primary" size="sm" active={location.pathname === "/admin-page/orders"} className="mx-1">
                            <NavLink to="/admin-page/orders" className={"text-decoration-none text-light"}>Orders</NavLink>
                        </Button>

                        <Button variant="outline-primary" size="sm" active={location.pathname === "/admin-page/products"} className="mx-0">
                            <NavLink to="/admin-page/products" className={"text-decoration-none text-light"}>Products</NavLink>
                        </Button>
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='col px-1 py-2'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminPage