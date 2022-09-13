import React from 'react'

const ProductImg = ({ src = "https://dummyimage.com/400x400", width = '100%', alt = "product image" }) => {

    return (
        <>
            <img src={src} style={{ width: width }} alt={alt} className="object-cover max-w-full border p-1" />
        </>
    )
}

export default ProductImg