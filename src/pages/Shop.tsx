import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import ProductList from '../components/ProductList';
import styles from '../styles/Shop.module.css';
import Filter from "../components/Filter";
import {Product} from "../models/Product";

const Shop: React.FC = () => {
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get("query");

    const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(null);

    return (
        <div className={styles.container}>
            <nav className={styles.breadcrumb}>
                <Link className={styles.homeIcon} to="/">Home </Link>
                <span className={styles.separator}>›</span>
                <span className={styles.current}>Shop</span>
            </nav>

            <div className={styles.shopLayout}>
                <div className={styles.filterContainer}>
                    <Filter setFilteredProducts={setFilteredProducts}/>
                </div>

                <div className={styles.productContainer}>
                    <ProductList
                        searchQuery={!filteredProducts ? searchQuery || undefined : undefined}
                        products={filteredProducts}
                    />
                </div>
            </div>
        </div>
    );
};

export default Shop;
