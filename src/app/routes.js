import ShoppingPage from '../pages/ShoppingPage'
import MyOrdersPage from '../pages/MyOrdersPage'
import CartPage from '../pages/CartPage'
import LoginPage from '../pages/LoginPage'
import AdminPage from '../pages/AdminPage'

import ProductPage from '../pages/ProductPage'

import Dashboard from '../components/admin-page/dashboard/Dashboard'
import Orders from '../components/admin-page/orders/OrderList'
import Products from '../components/admin-page/products/ProductList'

import PrivateRoute from './../components/shared/PrivateRoute';

const routes=[
    {
        path: '/',
        element:<ShoppingPage />,
    },
    {
        path: '/my-orders',
        element:<MyOrdersPage />,
    },
    {
        path: '/cart',
        element:<CartPage />,
    },
    {
        path: '/admin',
        element:<LoginPage />,
    },
    {
        path: '/:id',
        element:<ProductPage />,
    },
    {
        path: '/admin-page',
        element:<AdminPage />,
        auth:true,
        children:[
            {
                index:true,
                element:<Dashboard />,
            },
            {
                path: 'orders',
                element:<Orders />,
            },
            {
                path: 'products',
                element:<Products />,
            },
        ]
    },
]

const authCheck = routes => routes.map(route => {
	if (route?.auth) {
		route.element = <PrivateRoute>{route.element}</PrivateRoute>
	}
	if (route?.children) {
		route.children = authCheck(route.children)
	}
	return route
})


export default authCheck(routes)