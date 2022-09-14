import React from 'react'
import ShopProduct from '../components/shopping-page/ShopProduct'
import { useSelector } from 'react-redux'

const ShoppingPage = () => {
    const products = useSelector(state => state.product.list)

    return (
        <div className='container mt-3'>
            <div className='d-flex justify-content-between'>
                {
                    products.map(product => (
                        <ShopProduct key={product.id} product={product} />
                    ))
                }
            </div>
        </div >
    )
}

export default ShoppingPage