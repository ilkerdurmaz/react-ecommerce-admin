import React from 'react'

const ProductImg = ({ src, width = '100%', height = '100%', alt = "product image" }) => {

    return (
        <>
            <img src={src ? src : 'https://dummyimage.com/400x400'} style={{ width: width, height: height }} alt={alt} className="img-fluid img-thumbnail" />
        </>
    )
}

export default ProductImg