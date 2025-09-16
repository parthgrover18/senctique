import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {TbTruckDelivery} from "react-icons/tb";
import {RiSecurePaymentFill} from "react-icons/ri";
import {BiSupport} from "react-icons/bi";
import {GrBackTen} from "react-icons/gr";
import styles from "../styles/Home.module.css";
import banner from "../assets/a.webp";
import sideImage from "../assets/sideImage.jpg";
import Bestsell from "../components/Bestsell.tsx";
import {ORDER_URL, SUBSCRIPTION_URL} from "../utils/api.tsx";
import {OrderData} from "../models/OrderData.tsx";

const Home: React.FC = () => {

        const [email, setEmail] = useState<string>('');
        const [message, setMessage] = useState<string>('');
        const orderTrackingHendelar = async () => {
            let orderId = prompt('Enter Order ID:');
            const response = await fetch(ORDER_URL + "/status/" + orderId, {
                credentials: "include",
                method: "GET",
            });
            let order: OrderData = response.ok ? await response.json() : null;
            if (order == null) {
                alert("Order Not Found");
            } else {
                alert("Order Status: " + order.status);
            }
        };
        const handleSubscribe = async () => {
            if (!email || !email.includes('@')) {
                setMessage('Please enter a valid email.');
                return;
            }
            const response = await fetch(`${SUBSCRIPTION_URL}/save`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email: email}),
            });

            if (response.ok) {
                setMessage('Subscribed successfully!');
                setEmail('');
            } else {
                setMessage("Something went wrong. Please try again.");
            }
        };

        return (
            <div>
                <div className={styles.topcontainer}>
                    <img src={banner} alt="Banner" className={styles.banner}/>
                    <div className={styles.overlay1}></div>
                    <h1 className={styles.heading}>Elevate Your Essence</h1>
                    <p className={styles.desc}>
                        Discover a world of captivating fragrances designed to awaken your
                        senses and elevate your essence. Indulge in luxurious, long-lasting
                        scents that reflect your personality and leave a memorable impression.
                        Experience the perfect blend of elegance, sophistication, and timeless
                        allure.
                    </p>
                </div>

                <div className={styles.horizontalContainer}>
                    {[
                        {
                            title: "Men's Perfumes",
                            path: "/shop/men",
                            image:
                                "https://hips.hearstapps.com/hmg-prod/images/f094-sauvage-eau-forte-24-p06e-pack-ingredient-l4-f39-66bcb885a1660.jpg?crop=0.737xw:1.00xh;0.122xw,0&resize=1200:*",
                        },
                        {
                            title: "Women's Perfumes",
                            path: "/shop/women",
                            image:
                                "https://media.parfumo.com/perfume_imagery/95/958076-madame-cherie-caline_1200.jpg",
                        },
                        {
                            title: "Unisex Perfumes",
                            path: "/shop/unisex",
                            image:
                                "https://m.media-amazon.com/images/I/61oPlPaUzAL._AC_SL1350_.jpg",
                        },
                        {
                            title: "Luxury Perfumes",
                            path: "/shop/luxury",
                            image:
                                "https://sdcdn.io/tf/tf_sku_TCFC01_2000x2000_1.png?height=700px&width=700px",
                        },
                    ].map(({title, path, image}, index) => (
                        <div key={index} className={styles.box}>
                            <Link to={path} className={styles.link}>
                                <div className={styles.imageContainer}>
                                    <img src={image} alt={title} className={styles.image}/>
                                    <div className={styles.overlay}></div>
                                    <div className={styles.imageText}>{title}</div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                <Bestsell/>

                <div className={styles.container}>
                    <img
                        src={sideImage}
                        alt="Declaration by Cartier"
                        className={styles.sideImage}
                    />
                    <div className={styles.textContainer}>
                        <h3>Ignite your sense</h3>
                        <p className={styles.description}>
                            Declaration by Cartier is a refined fragrance, known for its
                            sophisticated blend of fresh citrus and warm spices. Its elegant
                            woody base offers a charismatic touch, symbolizing confidence and
                            individuality. Ideal for those who value timeless elegance,
                            Déclaration expresses personality effortlessly, making it the
                            perfect fragrance choice for individuals seeking distinction and
                            style in everyday moments.
                        </p>
                    </div>
                </div>

                <div className={styles.trackingContainer}>
                    <h2 className={styles.heading2}>📦 Track Your Order</h2>
                    <p className={styles.description1}>
                        Want to know where your order is? No problem! Click the button below to check the latest status of
                        your shipment in real-time.
                    </p>
                    <button className={styles.button} onClick={orderTrackingHendelar}>
                        🚚 Track My Order
                    </button>

                    <h2 className={styles.heading1}>
                        Stay in the Scent Loop<br/>with Exclusive Updates
                    </h2>
                    <p className={styles.subtext}>
                        Discover enchanting new fragrances and get early access to special offers.
                    </p>
                    <div className={styles.inputContainer}>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    <button onClick={handleSubscribe} className={styles.button}>
                        Subscribe now
                    </button>
                    {message && (
                        <div
                            className={`${styles.message} ${
                                message.toLowerCase().includes("success") ? styles.success : styles.error
                            }`}
                        >
                            {message}
                        </div>
                    )}
                    <div className={styles.featureContainer}>
                        <div className={styles.featureBox}>
                            <div className={styles.iconContainer}>
                                <TbTruckDelivery size={40}/>
                            </div>
                            <div>
                                <p className={styles.mainText}>FREE SHIPPING</p>
                                <small>In UK</small>
                            </div>
                        </div>
                        <div className={styles.featureBox}>
                            <div className={styles.iconContainer}>
                                <RiSecurePaymentFill size={40}/>
                            </div>
                            <div>
                                <p className={styles.mainText}>QUICK PAYMENT</p>
                                <small>100% secure payment</small>
                            </div>
                        </div>
                        <div className={styles.featureBox}>
                            <div className={styles.iconContainer}>
                                <GrBackTen size={40}/>
                            </div>
                            <div>
                                <p className={styles.mainText}>FREE RETURNS</p>
                                <small>Money back in 30 days</small>
                            </div>
                        </div>
                        <div className={styles.featureBox}>
                            <div className={styles.iconContainer}>
                                <BiSupport size={40}/>
                            </div>
                            <div>
                                <p className={styles.mainText}>24/7 SUPPORT</p>
                                <small>Get Quick Support</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
;

export default Home;
