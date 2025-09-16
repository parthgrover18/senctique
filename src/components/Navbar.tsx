import React, {useState} from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {FaBars, FaHeart, FaShoppingCart, FaTimes, FaUser} from "react-icons/fa";
import styles from "../styles/Navbar.module.css";
import {PRODUCT_URL} from "../utils/api.tsx";

const ActiveLink = ({to, children}: { to: string; children: React.ReactNode }) => (
    <NavLink to={to} className={({isActive}) => `${styles.navItem} ${isActive ? styles.active : ""}`}>
        {children}
    </NavLink>
);

const Navbar: React.FC = () => {
    const [dropdown, setDropdown] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        const response = await fetch(`${PRODUCT_URL}/search?search=${searchQuery}`, {credentials: "include"});
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            navigate(`/shop?query=${searchQuery}`);
        }

    };

    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.logo}>Senctique</Link>

            <div className={styles.mobileMenuIcon} onClick={() => setMobileMenu(!mobileMenu)}>
                {mobileMenu ? <FaTimes/> : <FaBars/>}
            </div>

            <ul className={`${styles.navLinks} ${mobileMenu ? styles.active : ""}`}>
                <li><ActiveLink to="/">Home</ActiveLink></li>

                <li
                    className={`${styles.dropdown} ${window.location.pathname.includes("/shop") ? styles.active : ""}`}
                    onMouseEnter={() => setDropdown(true)}
                    onMouseLeave={() => setDropdown(false)}
                >
                    <ActiveLink to="/shop">Shop</ActiveLink>
                    {dropdown && (
                        <ul className={styles.dropdownMenu}>
                            {['men', 'women', 'unisex', 'luxury'].map(category => (
                                <li key={category}>
                                    <NavLink
                                        to={`/shop/${category}`}>{category.charAt(0).toUpperCase() + category.slice(1)}'s
                                        Perfumes</NavLink>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>

                {["about Us", "contact Us", "blog"].map((page) => (
                    <li key={page}><ActiveLink
                        to={`/${page}`}>{page.charAt(0).toUpperCase() + page.slice(1)} </ActiveLink></li>
                ))}

                <li>
                    <form onSubmit={handleSearch} className={styles.searchForm}>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={styles.searchBar}
                        />
                    </form>
                </li>

                {["account", "favorite", "cart"].map((icon) => (
                    <li key={icon}>
                        <ActiveLink to={`/${icon}`}>{icon === "account" ? <FaUser/> : icon === "favorite" ? <FaHeart/> :
                            <FaShoppingCart/>}</ActiveLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;