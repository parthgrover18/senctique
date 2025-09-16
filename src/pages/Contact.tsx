import React, {useEffect, useState} from "react";
import styles from "../styles/ContactUs.module.css";
import banner from "../assets/b.webp";
import c from "../assets/c.jpg";
import d from "../assets/d.jpg";
import e from "../assets/e.jpg";
import f from "../assets/f.jpg";


import {CONTACT_US_URL, getLoggedInUser, INSTAGRAM_URL} from "../utils/api.tsx";

const ContactUs: React.FC = () => {
    const [formData, setFormData] = useState({name: "", email: "", phone: "", message: ""});

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getLoggedInUser();
            if (user && user.email) {
                setFormData((prev) => ({...prev, email: user.email}));
            }
        };
        fetchUser();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch(`${CONTACT_US_URL}/save`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert("Your message was sent successfully!");
            setFormData({name: "", email: formData.email, phone: "", message: ""});
        } else {
            alert("Something went wrong. Please try again.");
        }
    };


    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <img src={banner} alt="Contact Us" className={styles.bannerImage}/>
                <h1 className={styles.overlayText}>Contact Us</h1>
            </div>

            <section className={styles.formSection}>
                <h2 className={styles.heading}>Have Questions? We're Here to Help!</h2>
                <form className={styles.contactForm} onSubmit={handleSubmit}>
                    {["name", "email", "phone"].map((field) => (
                        <div className={styles.inputGroup} key={field}>
                            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                            <input
                                type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                                id={field}
                                name={field}
                                value={formData[field as keyof typeof formData]}
                                onChange={handleInputChange}
                                placeholder={`Enter your ${field}`}
                            />
                        </div>
                    ))}
                    <div className={styles.inputGroup}>
                        <label htmlFor="message">How can we help?</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Enter your message here..."
                        />
                    </div>
                    <button type="submit" className={styles.sendMessage}>Send Message</button>
                </form>
            </section>

            <section className={styles.instagramSection}>
                <h3>Follow Us on Instagram</h3>
                <p>Discover the world of luxury fragrances. Follow <b>@yourperfumeshop</b> for daily inspiration.</p>
                <div className={styles.imageGrid}>
                    <img src={c} className={styles.Images}/>
                    <img src={d} className={styles.Images}/>
                    <img src={e} className={styles.Images}/>
                    <img src={f} className={styles.Images}/>
                </div>
                <a href={INSTAGRAM_URL} className={styles.followLink} target="_blank" rel="noopener noreferrer">FOLLOW
                    US</a>
            </section>
        </div>
    );
};

export default ContactUs;
