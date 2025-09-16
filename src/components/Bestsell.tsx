import React from "react";
import ProductList from "./ProductList";
import styles from "../styles/ProductCard.module.css";

const Bestsell: React.FC = () => {
    return (
        <div className={styles.pageContainer}>
            <h2
                style={{
                    fontSize: "2rem",
                    color: "#1f2937",
                    textAlign: "center",
                    margin: "20px 0",
                    fontWeight: 700,
                }}
            >
                Best Sellers
            </h2>
            <ProductList isBestSellers={true}/>
        </div>
    );
};

export default Bestsell;
