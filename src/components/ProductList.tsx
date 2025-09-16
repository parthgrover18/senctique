import React, {useEffect, useState} from "react";
import styles from "../styles/ProductCard.module.css";
import ProductCard from "./ProductCard";
import {Product, ProductListProps} from "../models/Product";
import {PRODUCT_URL} from "../utils/api";

interface ExtendedProductListProps extends ProductListProps {
    searchQuery?: string;
    isBestSellers?: boolean;
    products?: Product[] | null; // Injected from filter
}

const ProductList: React.FC<ExtendedProductListProps> = ({
                                                             category,
                                                             gender,
                                                             searchQuery,
                                                             isBestSellers = false,
                                                             products
                                                         }) => {
    const [defaultProducts, setDefaultProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (products) {
            setLoading(false);
            return;
        }

        setLoading(true);
        let url = "";

        if (isBestSellers) {
            url = `${PRODUCT_URL}/random`;
        } else if (searchQuery) {
            url = `${PRODUCT_URL}/search?search=${encodeURIComponent(searchQuery)}`;
        } else if (category?.length || gender) {
            url = `${PRODUCT_URL}/findBYCategoryAndGender?${
                category ? `categories=${category.join(",")}&` : ""
            }${gender ? `gender=${gender}` : ""}`;
        } else {
            url = `${PRODUCT_URL}/findAll`;
        }

        fetch(url, {
            method: "GET",
            credentials: "include"
        })
            .then((response) => response.json())
            .then((data) => setDefaultProducts(data))
            .catch((error) => console.error("Error fetching products:", error))
            .finally(() => setLoading(false));
    }, [category, gender, searchQuery, isBestSellers, products]);


    const displayProducts = products || defaultProducts;

    return loading ? (
        <div>Loading...</div>
    ) : (
        <div className={styles.pageContainer}>
            <div className={styles.productGrid}>
                {displayProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        category={
                            Array.isArray(category) && category.length > 0
                                ? category[0].toLowerCase()
                                : ""
                        }
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
