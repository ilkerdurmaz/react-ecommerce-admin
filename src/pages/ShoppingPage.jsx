import React, { useState, useEffect } from 'react'
import ShopProduct from '../components/shopping-page/ShopProduct'
import { useSelector } from 'react-redux'
import { calculateRating } from './../app/utils';




const ShoppingPage = () => {
    const products = useSelector(state => state.product.list)
    const [filteredProducts, setFilteredProducts] = useState([])
    const [selectedSort, setSelectedSort] = useState()
    const categories = [
        "All",
        "Electronics",
        "Clothing",
        "Toys",
        "Food",
        "Sport",
        "Accessories",
        "Furniture",
        "Hobby and DIY",
        "Health & Beauty"
    ]

    function filter(e) {
        const selectedCategory = e.target.value
        if (selectedCategory !== "All") {
            setFilteredProducts([...products.filter(product => product.category === selectedCategory)])
        }
        else {
            setFilteredProducts([...products])
        }
        sort("Nothing")
    }


    function sort(value) {
        setSelectedSort(value)
        const sortType = value
        const sortedProducts = structuredClone(filteredProducts);

        if (sortType === "priceLow")
            sortedProducts.sort((a, b) => a.price - b.price)
        else if (sortType === "priceHigh")
            sortedProducts.sort((a, b) => b.price - a.price)
        else if (sortType === "Rating")
            sortedProducts.sort((a, b) => calculateRating(b.rating) - calculateRating(a.rating))
        else
            return
        setFilteredProducts([...sortedProducts])
    }

    useEffect(() => {
        setFilteredProducts([...products])
    }, [products])

    return (
        <div className='mx-auto mt-2 mt-md-3' style={{ maxWidth: '960px' }}>

            <div className='container border rounded shadow-sm'>

                <div className="row py-2">
                    <div className="col-12 col-md-4 px-2 d-flex justify-content-center justify-content-md-start">
                        <span className='fs-3 d-none d-md-block'>Shopping Page</span>
                    </div>

                    <div className='col-12 col-md-8 px-2 d-flex justify-content-end'>

                        <div className='d-flex'>
                            <small>Filter By Category:</small>
                            <select className="form-select" onChange={filter}>
                                {
                                    categories.map((category, index) => (
                                        <option value={category} key={index}>{category}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className='d-flex ms-4'>
                            <small>Sort By :</small>
                            <select className="form-select" value={selectedSort} onChange={(e) => sort(e.target.value)}>
                                <option value="Nothing">Nothing</option>
                                <option value="Rating">Rating</option>
                                <option value="priceLow">Price: Low to High</option>
                                <option value="priceHigh">Price: High to low</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            {
                filteredProducts.length > 0 ?
                    <div className='d-flex flex-wrap justify-content-center mt-2'>
                        {
                            filteredProducts.map(product => (
                                <ShopProduct key={product.id} product={product} />
                            ))
                        }
                    </div> :
                    <div className="alert alert-warning d-flex align-items-center justify-content-center h-100 m-3">No products found in this category.</div>
            }
        </div >
    )
}

export default ShoppingPage



