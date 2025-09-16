import React from 'react';
import {Link} from 'react-router-dom';
import ProductList from '../components/ProductList';
import styles from '../styles/ProductPage.module.css';
import {Category, Gender} from '../models/Product';


const Men: React.FC = () => {

    return (

        <div className={styles.container}>
            <nav className={styles.breadcrumb}>
                <Link className={styles.homeIcon} to="/">Home</Link>
                <span className={styles.separator}>›</span>
                <Link className={styles.homeIcon} to="/shop">Shop</Link>
                <span className={styles.separator}>›</span>
                <span className={styles.current}>Men</span>
            </nav>
            <ProductList category={[Category.Men, Category.Luxury]} gender={[Gender.Men]}/>
        </div>
    );
};

export default Men;
