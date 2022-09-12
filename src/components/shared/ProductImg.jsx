import React from 'react'

const ProductImg = ({ src = "https://dummyimage.com/400x400", width, alt = "product image" }) => {

    return (
        <>
            <img src={src} width={width} alt={alt} className="object-cover max-w-full h-auto border p-1" />
        </>
    )
}

export default ProductImg