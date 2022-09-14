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
                <div className='d-flex justify-content-between bg-dark bg-gradient text-white rounded-top p-2'>
                    <h3>Admin Panel</h3>
                    <Button variant="danger" className='mx-1' onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </div>

            <div className='row'>
                <div className='col-12 col-md-3 col-xl-2  p-2'>
                    <ul className=" bg-dark bg-gradient text-white rounded">
                        <li className="py-2"><NavLink to="/admin-page">Dashboard</NavLink></li>
                        <li className="py-2"><NavLink to="/admin-page/orders">Orders</NavLink></li>
                        <li className="py-2"><NavLink to="/admin-page/products">Products</NavLink></li>
                    </ul>
                </div>

                <div className='col p-2'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminPage
