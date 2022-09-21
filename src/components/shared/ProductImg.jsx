import React from 'react'

const ProductImg = ({ src, alt = "product image", className, style }) => {

    return (
        <>
            <img src={src ? src : 'https://dummyimage.com/400x400'} alt={alt} className={className} style={style} />
        </>
    )
}

export default ProductImg