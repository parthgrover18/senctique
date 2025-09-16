import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Account from "./pages/Account";
import Favorite from "./pages/Favorite";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import Shop from "./pages/Shop";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Unisex from "./pages/Unisex";
import Luxury from "./pages/Luxury";
import ProductDetails from "./pages/ProductDetail";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy"
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderHistory from "./pages/OrderHistory.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <ScrollToTop/>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about Us" element={<About/>}/>
                <Route path="/contact Us" element={<Contact/>}/>
                <Route path="/blog" element={<Blog/>}/>
                <Route path="/account" element={<Account/>}/>
                <Route path="/favorite" element={<Favorite/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/checkOut" element={<CheckOut/>}/>
                <Route path="/shop" element={<Shop/>}/>
                <Route path="/shop/men" element={<Men/>}/>
                <Route path="/shop/women" element={<Women/>}/>
                <Route path="/shop/unisex" element={<Unisex/>}/>
                <Route path="/shop/luxury" element={<Luxury/>}/>
                <Route path="/shop/:id" element={<ProductDetails/>}/>
                <Route path="/shop/:category/:id" element={<ProductDetails/>}/>
                <Route path="/terms and conditions" element={<TermsConditions/>}/>
                <Route path="/privacy policy" element={<PrivacyPolicy/>}/>
                <Route path="/order confirmation" element={<OrderConfirmation/>}/>
                <Route path="/order-history/:userId" element={<OrderHistory/>}/>
            </Routes>
            <Footer/>
        </Router>
    );
};
export default App;
