import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
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
        console.log(temp);
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
                <Modal.Title>Rate</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    products.map((product, index) => (
                        <div key={product.id} className='d-flex align-items-center'>
                            <ProductImg src={product.imgUrl} width={"64px"} />
                            <div className='d-flex flex-column'>
                                <strong>{product.brand}</strong>
                                {product.name}
                            </div>
                            <Rating
                                initialRating={ratingValue[index]}
                                emptySymbol={<AiOutlineStar />}
                                fullSymbol={<AiFillStar />}
                                onChange={(value) => onChangeHandler(index, value)}
                                readonly={disable[index]}
                            />
                            <button disabled={disable[index]} onClick={() => saveRating(product, index)}>+</button>
                        </div>
                    ))
                }
            </Modal.Body>
            <Modal.Footer className=' justify-content-between'>
                <button className="btn btn-secondary ms-auto" onClick={closeOrder}>Close Order</button>
            </Modal.Footer>
        </Modal>
    )
}

export default RatingModal