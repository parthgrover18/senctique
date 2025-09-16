import {FAVORITE_URL, getFavorites, getLoggedInUser} from "../utils/api.tsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const AddToFavorite = ({productId}: { productId: number }) => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState<number | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchUserAndFavorites = async () => {
            const user = await getLoggedInUser();
            if (user?.id) {
                setUserId(Number(user.id));
                const favoriteProducts = await getFavorites(Number(user.id));
                setIsFavorite(favoriteProducts.some((product: { id: number }) => product.id === productId));
            }
        };
        fetchUserAndFavorites();
    }, [productId]);

    const toggleFavorite = async () => {
        if (!userId) {
            navigate("/account");
            return;
        }
        const url = `${FAVORITE_URL}/${userId}/${productId}`;
        await fetch(url, {
            method: isFavorite ? "DELETE" : "POST",
            credentials: "include",
        });
        setIsFavorite(!isFavorite);
    };
    return {isFavorite, toggleFavorite};
};
export default AddToFavorite;
