import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {IoIosArrowDown, IoIosArrowDropleftCircle, IoIosArrowDroprightCircle} from "react-icons/io";
import {BsInfoCircle} from "react-icons/bs";
import {TbTestPipe} from "react-icons/tb";
import {GiDelicatePerfume} from "react-icons/gi";
import styles from "../styles/ProductDetail.module.css";
import {Product} from "../models/Product";
import {CART_URL, PRODUCT_DETAIL_URL} from "../utils/api.tsx";
import AddToFavorite from "../hooks/AddToFavorite.tsx";
import AddToCart from "../hooks/AddToCart";
import Bestsell from "../components/Bestsell.tsx";

const ProductDetail: React.FC = () => {
    const {category, id} = useParams<{ category?: string; id?: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
    const {isFavorite, toggleFavorite} = AddToFavorite({productId: Number(id)});
    const {inCart, toggleCart} = AddToCart({productId: Number(id)});

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`${PRODUCT_DETAIL_URL}/${id}`, {
                credentials: "include",
            });
            if (!response.ok) throw new Error("Error fetching product details");
            const data: Product = await response.json();
            setProduct(data);
        };

        const fetchCart = async () => {
            const response = await fetch(`${CART_URL}/get`, {credentials: "include"});
            if (!response.ok) throw new Error("Error fetching cart details");
            const cart = await response.json();
            const cartItem = cart.orderItems.find((item: any) => item.product.id === Number(id));
            if (cartItem) {
                setQuantity(cartItem.quantity);
            } else {
                setQuantity(1);
            }
        };

        fetchProduct();
        fetchCart();
    }, [id]);

    const updateQuantity = async (newQuantity: number) => {
        if (newQuantity < 1) return;
        try {
            await fetch(`${CART_URL}/quantity/${id}?quantity=${newQuantity}`, {
                method: "PUT",
                credentials: "include",
            });
            setQuantity(newQuantity);
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const toggleDropdown = (index: number) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    if (!product)
        return (
            <p className={styles.notFound}>
                Product not found in {category ? `${category} category` : "the shop"}.
            </p>
        );

    return (
        <div>
            <nav className={styles.breadcrumb}>
                <Link className={styles.homeIcon} to="/">Home</Link>
                <span className={styles.separator}>›</span>
                <Link className={styles.homeIcon} to="/shop">Shop</Link>
                <span className={styles.separator}>›</span>
                {category && (
                    <>
                        <Link className={styles.homeIcon} to={`/shop/${category}`}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </Link>

                        <span className={styles.separator}>›</span>
                    </>
                )}
                <span className={styles.current}>{product.name}</span>
            </nav>

            <div className={styles.productDetails}>
                <div>
                    <img src={product.imageUrl} alt={product.name} className={styles.productImage}/>
                </div>

                <div>
                    <h2>{product.name}</h2>
                    <h3>{product.brand}</h3>
                    <h4>£{product.price.toFixed(2)}</h4>
                    <p>Gender: {product.gender}</p>
                    <p>Size: {product.size}</p>
                    <p>Rating: {product.rating} ★</p>
                    <br/>
                    <p>
                        Stock:{' '}
                        <span
                            className={
                                product.stock === 0
                                    ? styles.outOfStock
                                    : product.stock < 10
                                        ? styles.lowStock
                                        : styles.inStock
                            }
                        >
                        {product.stock === 0
                            ? 'Out of stock'
                            : product.stock < 10
                                ? `Only ${product.stock} left`
                                : `${product.stock} available`}
                        </span>
                    </p>
                    
                    <div className={styles.quantity_container}>
                        <span className={styles.quantity_label}>Quantity: </span>
                        <button className={styles.quantity_btn} onClick={() => updateQuantity(quantity - 1)}>
                            <IoIosArrowDropleftCircle size={24}/>
                        </button>
                        <span className={styles.quantity_value}>{quantity}</span>
                        <button className={styles.quantity_btn} onClick={() => updateQuantity(quantity + 1)}>
                            <IoIosArrowDroprightCircle size={24}/>
                        </button>
                    </div>

                    <div className={styles.button_container}>
                        <button className={styles.buttonadd} onClick={toggleCart}>
                            {inCart ? "Remove from Cart" : "Add to Cart"}
                        </button>
                        <button className={styles.buttonadd} onClick={toggleFavorite}>
                            {isFavorite ? "Remove from Favorite" : "Add to Favorite"}
                        </button>
                    </div>

                    <p>{product.description}</p>
                    <p>Sillage: {product.sillage}</p>

                    <hr/>

                    <div className={styles.dropdown} onClick={() => toggleDropdown(1)}>
                        <GiDelicatePerfume className={styles.icon}/>
                        <p>Fragrance Notes</p>
                        <IoIosArrowDown className={`${styles.arrow} ${activeDropdown === 1 ? styles.rotated : ""}`}/>
                    </div>
                    <div className={`${styles.dropdownContent} ${activeDropdown === 1 ? "" : styles.hidden}`}>
                        <p><strong>Top Notes:</strong> {product.topNotes}</p>
                        <p><strong>Middle Notes:</strong> {product.middleNotes}</p>
                        <p><strong>Base Notes:</strong> {product.baseNotes}</p>
                    </div>

                    <hr/>

                    <div className={styles.dropdown} onClick={() => toggleDropdown(2)}>
                        <TbTestPipe className={styles.icon}/>
                        <p>Ingredients</p>
                        <IoIosArrowDown className={`${styles.arrow} ${activeDropdown === 2 ? styles.rotated : ""}`}/>
                    </div>
                    <div className={`${styles.dropdownContent} ${activeDropdown === 2 ? "" : styles.hidden}`}>
                        <p>{product.ingredients}</p>
                    </div>

                    <hr/>

                    <div className={styles.dropdown} onClick={() => toggleDropdown(3)}>
                        <BsInfoCircle className={styles.icon}/>
                        <p>Additional Information</p>
                        <IoIosArrowDown className={`${styles.arrow} ${activeDropdown === 3 ? styles.rotated : ""}`}/>
                    </div>
                    <div className={`${styles.dropdownContent} ${activeDropdown === 3 ? "" : styles.hidden}`}>
                        <p><strong>Concentration:</strong> {product.concentration}</p>
                        <p><strong>Longevity:</strong> {product.longevity}</p>
                        <p><strong>Fragrance Type:</strong> {product.fragranceType}</p>
                        <p><strong>Usage:</strong> {product.usage}</p>
                        <p><strong>Packaging:</strong> {product.packaging}</p>
                    </div>

                    <hr/>
                </div>
            </div>
            <Bestsell/>
        </div>
    );
};

export default ProductDetail;
