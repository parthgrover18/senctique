import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {CART_URL, getCartItems, getLoggedInUser} from "../utils/api";
import styles from "../styles/Cart.module.css";
import {CartItem} from "../models/CartItem";
import {IoIosArrowDropleftCircle, IoIosArrowDroprightCircle} from "react-icons/io";

const Cart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartProducts = async () => {
            try {
                const response = await getCartItems();
                console.log("Raw cart API response:", response);

                if (Array.isArray(response)) {
                    setCartItems(response);
                } else {
                    console.error("Unexpected cart items format:", response);
                }
            } catch (error) {
                console.error("Failed to fetch cart items:", error);
            }
        };
        fetchCartProducts();
    }, []);

    const updateQuantity =
        async (productId: number, quantity: number) => {
            if (quantity < 1) return;
            try {
                await fetch(`${CART_URL}/quantity/${productId}?quantity=${quantity}`, {
                    method: "PUT",
                    credentials: "include",
                });
                try {
                    const items = await getCartItems();
                    setCartItems(items);
                } catch (error) {
                    console.error("Error fetching updated cart items:", error);
                }
            } catch (error) {
                console.error("Error updating quantity:", error);
            }
        };
    const removeItem = async (productId: number) => {
        try {
            await fetch(`${CART_URL}/${productId}`, {
                method: "DELETE",
                credentials: "include",
            });
            try {
                const items = await getCartItems();
                setCartItems(items);
            } catch (error) {
                console.error("Error fetching updated cart items after removal:", error);
            }
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };
    const handleProceedToCheckout = async () => {
        try {
            const user = await getLoggedInUser();
            navigate(user && user.id ? "/checkOut" : "/account");
        } catch (error) {
            console.error("Error checking user login status:", error);
            navigate("/account");
        }
    };
    return (
        <div className={styles.cartContainer}>
            <h2 className={styles.name}>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p className={styles.emptyCart}>No products in the cart.</p>
            ) : (
                <div className={styles.cartList}>
                    {cartItems.map((item) => (
                        <Link
                            to={`/shop/${item.product.category}/${item.product.id}`}
                            key={item.product.id}
                            className={styles.cartItem}
                        >
                            <div className={styles.productContainer}>
                                <img
                                    src={item.product.imageUrl}
                                    alt={item.product.name}
                                    className={styles.productImage}
                                />
                                <div className={styles.productInfo}>
                                    <h3 className={styles.productName}>{item.product.name}</h3>
                                    <p className={styles.productBrand}>{item.product.brand}</p>
                                    <p className={styles.productPrice}>£{item.product.price.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className={styles.actionsContainer}>
                                <div className={styles.quantityContainer}>
                                    <button
                                        className={styles.buttonchange}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            updateQuantity(item.product.id, item.quantity - 1);
                                        }}
                                    >
                                        <IoIosArrowDropleftCircle size={24}/>
                                    </button>
                                    <span className={styles.quantity_value}>{item.quantity}</span>
                                    <button
                                        className={styles.buttonchange}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            updateQuantity(item.product.id, item.quantity + 1);
                                        }}
                                    >
                                        <IoIosArrowDroprightCircle size={24}/>
                                    </button>
                                </div>
                                <button
                                    className={styles.removeButton}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        removeItem(item.product.id);
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            <div className={styles.cartSummary}>
                <div className={styles.total}>
                    Total: £
                    {cartItems
                        .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
                        .toFixed(2)}
                </div>
                {cartItems.length > 0 && (
                    <button className={styles.checkoutButton} onClick={handleProceedToCheckout}>
                        Proceed to Checkout
                    </button>
                )}
            </div>
        </div>
    );
}

export default Cart;
