import React, {useEffect, useState} from "react";
import {FAVORITE_URL, getFavorites, getLoggedInUser} from "../utils/api.tsx";
import styles from "../styles/Favorite.module.css";
import {Product} from "../models/Product.tsx";
import {Link} from "react-router-dom"; // Importing Link for navigation

const Favorite: React.FC = () => {
    const [favorites, setFavorites] = useState<Product[]>([]);
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const fetchFavorites = async () => {
            const user = await getLoggedInUser();
            if (user) {
                setUserId(user.id);
                const favoriteProducts = await getFavorites(user.id);
                setFavorites(favoriteProducts);
            }
        };
        fetchFavorites();
    }, []);

    const handleRemove = async (productId: number) => {
        if (!userId) return;

        const response = await fetch(`${FAVORITE_URL}/${userId}/${productId}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (response.ok) {
            setFavorites((prevFavorites) =>
                prevFavorites.filter((product) => product.id !== productId)
            );
        }
    };

    return (
        <div>
            <h1 className={styles.name}>Your Favourite Products</h1>
            {favorites.length > 0 ? (
                <ul className={styles.favoriteList}>
                    {favorites.map((product) => (
                        <li key={product.id} className={styles.favoriteItem}>
                            <Link to={`/shop/${product.category}/${product.id}`} className={styles.link}>
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className={styles.productImage}
                                />
                                <div className={styles.productInfo}>
                                    <h3>{product.name}</h3>
                                    <p>{product.brand}</p>
                                    <p>£{product.price.toFixed(2)}</p>
                                </div>

                                <button
                                    className={styles.removeButton}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleRemove(product.id)
                                    }
                                    }
                                >
                                    Remove
                                </button>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={styles.noFavoritesText}>No favorite products found.</p>
            )}
        </div>
    );
};

export default Favorite;
