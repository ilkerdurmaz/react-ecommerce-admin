import ShoppingPage from '../pages/ShoppingPage'
import MyOrdersPage from '../pages/MyOrdersPage'
import CartPage from '../pages/CartPage'
import LoginPage from '../pages/LoginPage'
import AdminPage from '../pages/AdminPage'

import Dashboard from '../components/admin-page/dashboard/Dashboard'
import Orders from '../components/admin-page/orders/OrderList'
import Products from '../components/admin-page/products/ProductList'

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


export default routes