import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import ProductImg from './../shared/ProductImg';
import { updateProduct, updateOrder } from '../../app/firebase';
import Rating from 'react-rating'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'


const RatingModal = ({ show, handleClose, products, order }) => {
    const [ratingValue, setRatingValue] = useState(Array(products.length).fill(0))
    const [disable, setDisable] = useState(Array(products.length).fill(false))

    function closeOrder() {
        const updatedOrder = {
            ...order.data,
            status: "closed"
        }
        updateOrder(updatedOrder, order.fireId)
        handleClose();
    }

    function saveRating(product, index) {
        const updatedProduct = {
            ...product,
            rating: { ...product.rating, [ratingValue[index]]: product.rating[ratingValue[index]] + 1 }
        }
        updateProduct(updatedProduct, product.id)
        const temp = [...disable];
        temp[index] = true;
        setDisable(temp)

    }

    function onChangeHandler(index, value) {
        const temp = [...ratingValue];
        temp[index] = value;
        setRatingValue(temp)
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop={"true"}
            keyboard={false}
            centered
        >

            <Modal.Header closeButton>
                <Modal.Title>Rate Delivered Products</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-1 px-2'>
                {
                    products.map((product, index) => (

                        <div key={product.id}>
                            <div className='d-flex align-items-center justify-content-between my-1'>

                                <div className='d-flex align-items-center'>
                                    <ProductImg src={product.imgUrl} className={'rounded border p-1'} style={{ objectFit: 'contain', width: '64px' }} />
                                    <div className='d-flex flex-column ms-1 small'>
                                        <strong>{product.brand}</strong>
                                        {product.name}
                                    </div>
                                </div>

                                <div className='d-flex flex-column align-items-center'>
                                    <Rating
                                        initialRating={ratingValue[index]}
                                        emptySymbol={<AiOutlineStar size={18} />}
                                        fullSymbol={<AiFillStar size={18} />}
                                        onChange={(value) => onChangeHandler(index, value)}
                                        readonly={disable[index]}
                                    />
                                    <button className='btn btn-outline-success btn-sm mt-2' disabled={disable[index]} onClick={() => saveRating(product, index)}>apply rating</button>
                                </div>
                            </div>
                            {!(index === products.length - 1) && <hr className='my-2' />}
                        </div>
                    ))
                }
            </Modal.Body>
            <Modal.Footer className=' justify-content-between'>
                <button className="btn btn-warning ms-auto" onClick={closeOrder}>Close Order</button>
            </Modal.Footer>
        </Modal>
    )
}

export default RatingModal