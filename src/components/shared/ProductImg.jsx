import React from 'react'

const ProductImg = ({ src, width = '100%', alt = "product image" }) => {

    return (
        <>
            <img src={src ? src : 'https://dummyimage.com/400x400'} style={{ width: width }} alt={alt} className="object-cover max-w-full border" />
        </>
    )
}

export default ProductImg