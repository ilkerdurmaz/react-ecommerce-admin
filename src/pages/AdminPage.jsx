import React from 'react'
import Button from 'react-bootstrap/Button';

import { logout } from '../app/firebase'
import { useNavigate, NavLink, Outlet } from 'react-router-dom';

const AdminPage = () => {
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout();
        navigate('/admin', {
            replace: true,
        })
    }

    return (
        <div className='container mt-3 border rounded shadow'>

            <div className='row'>
                <div className='d-flex justify-content-between align-items-center bg-dark bg-gradient text-white rounded-top px-3 py-2'>
                    <h3 className='mb-1'>Admin Panel</h3>
                    <Button variant="danger" className='mx-1' onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </div>

            <div className='row'>
                <div className='col-12 col-xl-2 px-2 pt-2 pe-xl-0'>
                    <div className='bg-dark bg-gradient border rounded pb-auto d-flex flex-xl-column justify-content-between p-2'>


                        <NavLink to="/admin-page" className={"text-decoration-none text-light fs-4"}>Dashboard</NavLink>


                        <NavLink to="/admin-page/orders" className={"text-decoration-none text-light fs-4"}>Orders</NavLink>

                        <NavLink to="/admin-page/products" className={"text-decoration-none text-light fs-4"}>Products</NavLink>

                    </div>
                </div>

                <div className='col p-2'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminPage
