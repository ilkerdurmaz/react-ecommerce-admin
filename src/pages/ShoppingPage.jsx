import React from 'react'
import ShopProduct from '../components/shopping-page/ShopProduct'
import { useSelector } from 'react-redux'


const ShoppingPage = () => {
    const products = useSelector(state => state.product.list)
    return (
        <div className='mx-auto mt-3 p-0' style={{ maxWidth: '1080px' }}>
            <div className='d-flex flex-wrap justify-content-center'>
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