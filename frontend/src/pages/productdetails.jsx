import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaStar, FaHeart, FaShareAlt, FaShoppingCart } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { MdLocalShipping, MdSupportAgent } from "react-icons/md";
import "./styles/productdetailsstyle.css";
import axios from "axios";
import { useEmail } from "../emailcontext.jsx";
import { useLogin } from "../logincontext.jsx";
import { toast } from 'react-toastify';
import ProductCard from "./productcard.jsx";

const ProductDetails = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state || {};
    console.log(product);
    // Safely destructure with defaults
    const {
        _id = '',
        name = '',
        price = '',
        selling = '',
        image = '',
        description = '',
        category = '',
        stocks = ''
    } = product;

    console.log(product.stocks);
    const { login } = useLogin();
    const { email } = useEmail();
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Calculate rating
    const logPrice = Math.min(Math.max((price / 500) * 5, 3.8), 4.7);
    const stars = Array(5).fill(false).map((_, index) => index < logPrice);

    // Fetch related products
    useEffect(() => {
        const fetchRelatedProducts = async () => {
            if (!category || category === 'uncategorized') {
                setRelatedProducts([]);
                return;
            }

            try {
                setLoading(true);
                const response = await axios.get(
                    `https://e-commerse-greenhaven.onrender.com/api/v1/related/${encodeURIComponent(category)}`
                    // `http://localhost:5000/api/v1/related/${encodeURIComponent(category)}`
                );

                // Handle the response properly
                if (response.data && Array.isArray(response.data)) {
                    const filteredRelated = response.data.filter(p => p._id !== _id);
                    setRelatedProducts(filteredRelated.slice(0, 4));
                } else {
                    setRelatedProducts([]);
                }
            } catch (error) {
                console.error("Fetch error:", error);
                toast.error("Couldn't load related products");
                setRelatedProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRelatedProducts();
    }, [category, _id]);


    //buy
    const handleBuyNow = () => {
        navigate("/order-confirmation", { state: product });
    };
   


    const handleAddToCart = async () => {
        if (!login) {
            toast.warning("Please login to add items to the cart!");
            return;
        }

        try {
            const response = await axios.post("https://e-commerse-greenhaven.onrender.com/api/cart/add", {
            // const response = await axios.post("http://localhost:5000/api/cart/add", {
                email,
                name,
                price,
                image
            });

            response.data.success
                ? toast.success("Added to Cart Successfully!")
                : toast.error("Failed to add to cart.");
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("Error adding to cart. Please try again.");
        }
    };

    const handleAddToWishlist = async () => {
        if (!login) {
            toast.warning("Please login to add items to your wishlist!");
            return;
        }

        try {
            const response = await axios.post("https://e-commerse-greenhaven.onrender.com/api/wishlist/add", {
            // const response = await axios.post("http://localhost:5000/api/wishlist/add", {
                email,
                name,
                price,
                image
            });

            response.data.success
                ? toast.success("Added to Wishlist Successfully!")
                : toast.error("Failed to add to wishlist.");
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            toast.error("Error adding to wishlist. Please try again.");
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: name,
                text: description,
                url: window.location.href,
            }).catch(error => console.log('Error sharing:', error));
        } else {
            toast.info("Share this product: " + window.location.href);
        }
    };

    const handleRelatedProductClick = (product) => {
        navigate('/product', { state: product });
        window.scrollTo(0, 0);
    };

    return (
        <div className="product-details-container">
            <div className="product-card">
                <div className="product-image-section">
                    <img
                        src={image}
                        alt={name}
                        className="main-product-image"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/300';
                        }}
                    />
                    <div className="product-actions">
                        <button
                            onClick={handleAddToWishlist}
                            className="wishlist-button"
                        >
                            <FaHeart /> Wishlist
                        </button>
                        <button
                            onClick={handleShare}
                            className="share-button"
                        >
                            <FaShareAlt /> Share
                        </button>
                    </div>
                </div>

                <div className="product-info-section">
                    <div className="product-header">
                        <h1>{name}</h1>
                        <div className="category-badge">{category}</div>
                        <div className={`stocks-status ${stocks > 0 ? 'in-stocks' : 'out-of-stocks'}`}>
                            {stocks > 0 ? `${stocks} available` : 'Out of stocks'}
                        </div>
                    </div>

                    <div className="rating-section">
                        {stars.map((filled, i) => (
                            <FaStar key={i} color={filled ? "#FFD700" : "#CCCCCC"} />
                        ))}
                        <span>{logPrice.toFixed(1)}</span>
                        <span className="review-count">(128 reviews)</span>
                    </div>

                    <div className="price-section">
                        <div className="original-price">₹{selling}</div>
                        <div className="current-price">₹{price}</div>
                        <div className="discount-badge">
                            {selling > price ? `${Math.round(((selling - price) / selling) * 100)}% OFF` : "Deal Price"}
                        </div>


                        <div className="tax-info">Inclusive of all taxes</div>
                    </div>

                    <div className="action-buttons">
                        <button
                            className="buy-now-btn"
                            disabled={stocks <= 0}
                            onClick={handleBuyNow}
                        >
                            BUY NOW
                        </button>
                        <button
                            className="add-to-cart-btn"
                            onClick={handleAddToCart}
                            disabled={stocks <= 0}
                        >
                            <FaShoppingCart /> ADD TO CART
                        </button>
                    </div>

                    <div className="delivery-section">
                        <h3>Delivery Options</h3>
                        <div className="pincode-checker">
                            <input
                                type="text"
                                placeholder="Enter pincode"
                                maxLength="6"
                            />
                            <button>Check</button>
                        </div>
                        <p>Delivery within 3-5 days | Free shipping on orders over ₹350</p>
                    </div>

                    <div className="highlights-section">
                        <h3>Product Highlights</h3>
                        <ul>
                            <li>Premium quality materials</li>
                            <li>Eco-friendly packaging</li>
                            <li>1-year manufacturer warranty</li>
                            <li>Easy returns within 15 days</li>
                        </ul>
                    </div>

                    <div className="description-section">
                        <h3>Description</h3>
                        <p>{description}</p>
                    </div>

                    <div className="benefits-section">
                        <div className="benefit-card">
                            <MdLocalShipping className="benefit-icon" />
                            <div>
                                <h4>Free Shipping</h4>
                                <p>On orders over ₹350</p>
                            </div>
                        </div>
                        <div className="benefit-card">
                            <GiReturnArrow className="benefit-icon" />
                            <div>
                                <h4>Easy Returns</h4>
                                <p>15-day return policy</p>
                            </div>
                        </div>
                        <div className="benefit-card">
                            <MdSupportAgent className="benefit-icon" />
                            <div>
                                <h4>24/7 Support</h4>
                                <p>Dedicated customer care</p>
                            </div>
                        </div>
                    </div>

                    <div className="specifications-section">
                        <h3>Specifications</h3>
                        <div className="specs-grid">
                            <div className="spec-row">
                                <span>Brand</span>
                                <span>GreenHaven</span>
                            </div>
                            <div className="spec-row">
                                <span>Material</span>
                                <span>Eco-friendly Organic</span>
                            </div>
                            <div className="spec-row">
                                <span>Dimensions</span>
                                <span>10 x 5 x 3 inches</span>
                            </div>
                            <div className="spec-row">
                                <span>Weight</span>
                                <span>500 grams</span>
                            </div>
                            <div className="spec-row">
                                <span>Country of Origin</span>
                                <span>India</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="loading-section">
                    <div className="loading-spinner"></div>
                    <p>Loading similar products...</p>
                </div>
            ) : relatedProducts.length > 0 ? (
                <div className="related-products-section">
                    <h2>More in {category}</h2>
                    <div className="related-products-grid">
                        {relatedProducts.map((product) => (
                            <div
                                key={product._id}
                                className="related-product-card"
                                onClick={() => handleRelatedProductClick(product)}
                            >

                                <ProductCard products={product} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="no-related-products">
                    <p>No similar products found</p>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;