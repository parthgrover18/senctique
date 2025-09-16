import {User} from "../models/User.tsx";

const API_URL = "http://192.168.1.104:8080";
export const PRODUCT_URL = `${API_URL}/product`;
export const PRODUCT_DETAIL_URL = `${PRODUCT_URL}/findById`;
export const FAVORITE_URL = `${API_URL}/favorite`;
export const USER_URL = `${API_URL}/user`;
export const ADDRESS_URL = `${API_URL}/address`;
export const LOGGED_IN_USER_URL = `${API_URL}/user/loggedInUser`
export const CONTACT_US_URL = `${API_URL}/contact`;
export const CART_URL = `${API_URL}/cart`;
export const ORDER_URL = `${API_URL}/order`;
export const SUBSCRIPTION_URL = `${API_URL}/subscription`;
export const FACEBOOK_URL = "https://www.facebook.com";
export const TWITTER_URL = "https://www.twitter.com";
export const INSTAGRAM_URL = "https://www.instagram.com";
export const PINTEREST_URL = "https://www.pinterest.com";

export const getLoggedInUser = async (): Promise<User | null> => {
    const response = await fetch(LOGGED_IN_USER_URL, {
        credentials: "include",
    });
    return response.ok ? await response.json() : null;
};

export const getFavorites = async (userId: number) => {
    const response = await fetch(`${FAVORITE_URL}/${userId}`, {
        credentials: "include",
    });
    if (response.ok) {
        const favoriteProducts = await response.json();
        return favoriteProducts;
    }
    return [];
};

export const getCartItems = async () => {
    const response = await fetch(`${CART_URL}/get`, {
        credentials: "include",
    });
    const cartItem = await response.json();
    return cartItem.orderItems || [];
};








