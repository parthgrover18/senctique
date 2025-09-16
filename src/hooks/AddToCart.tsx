import {useEffect, useState} from "react";
import {CART_URL, getCartItems} from "../utils/api.tsx";
import {CartItem} from "../models/CartItem.tsx";

const AddToCart = ({productId}:
                   { productId: number }) => {
    const [inCart, setInCart] = useState<boolean>(false);

    useEffect(() => {
        const checkIfProductInCart = async () => {
            try {
                const cartItems: CartItem[] = await getCartItems();
                setInCart(cartItems.some((item) =>
                    item.product.id === productId));
            } catch {
                setInCart(false);
            }
        };

        checkIfProductInCart();
    }, [productId]);

    const toggleCart = async () => {
        const method = inCart ? "DELETE" : "POST";
        const response: Response = await fetch(`${CART_URL}/${productId}`, {
            method,
            credentials: "include",
        });
        if (!response.ok) {
            const errorText = await response.text();
            alert(`${errorText}`);
        } else {
            setInCart(!inCart);
        }
    };

    return {inCart, toggleCart};
};

export default AddToCart;
