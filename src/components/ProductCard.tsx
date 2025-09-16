import React from "react";
import {Link} from "react-router-dom";
import styles from "../styles/ProductCard.module.css";
import {Product} from "../models/Product.tsx";
import AddToFavorite from "../hooks/AddToFavorite.tsx";
import AddToCart from "../hooks/AddToCart";
import {FaHeart, FaShoppingCart} from "react-icons/fa";

const ProductCard: React.FC<{ product: Product; category?: string }> = ({product, category}) => {
    const {id, name, price, imageUrl} = product;
    const productDetail = category ? `/shop/${category}/${id}` : `/shop/${id}`;

    const {inCart, toggleCart} = AddToCart({productId: id});
    const {isFavorite, toggleFavorite} = AddToFavorite({productId: id});

    return (
        <div className={styles.productCard}>
            <Link to={productDetail} className={styles.link}>
                <div className={styles.productContainer}>
                    <img src={imageUrl} alt={name} className={styles.productImage}/>
                    <div className={styles.divider}></div>
                    <div className={styles.cardContent}>
                        <h3 className={styles.productName}>{name}</h3>
                        <p className={styles.productPrice}>£{price.toFixed(2)}</p>
                    </div>
                </div>
                <div>
                    <button onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite();
                    }} className={styles.favoriteButton}>

                        <FaHeart className={`${styles.favoriteIcon} ${isFavorite ? styles.red : ''}`}/>
                    </button>
                    <button onClick={(e) => {
                        e.preventDefault();
                        toggleCart();
                    }} className={styles.cartButton}>
                        <FaShoppingCart className={`${styles.cartIcon} ${inCart ? styles.red : ''}`}/>
                    </button>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
