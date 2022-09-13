import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom'

const PrivateRoute = ({ children }) => {

    const user = useSelector(state => state.auth.user);
    const location = useLocation();

    if (!user) {
        return <Navigate to='/admin' replace={true}
            state={{
                return_url: location.pathname
            }} />
    }
    return children
}

export default PrivateRoute