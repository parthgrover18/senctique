import React from 'react';
import styles from '../styles/Footer.module.css';
import {FaEnvelope, FaFacebook, FaInstagram, FaPhone, FaPinterest} from 'react-icons/fa';
import {FaLocationDot, FaXTwitter} from "react-icons/fa6";
import {FACEBOOK_URL, INSTAGRAM_URL, PINTEREST_URL, TWITTER_URL,} from "../utils/api.tsx";

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footerSections}>
                    <div className={styles.contactUs}>
                        <h3 className={styles.heading}>Contact Us</h3>
                        <address className={styles.address}>
                            <FaLocationDot className={styles.icon}/>Senctique,<br/>
                            St Mary's Rd,<br/>
                            London,<br/>
                            W5 5RF
                        </address>
                        <p className={styles.contactItem}>
                            <FaPhone className={styles.icon}/>+44 1234567890
                        </p>
                        <p className={styles.contactItem}>
                            <FaEnvelope className={styles.icon}/> 323136212@student.uwl.ac.uk
                        </p>
                    </div>

                    <div className={styles.openHours}>
                        <h3 className={styles.heading}>Open Hours</h3>
                        <ul>
                            <li>Monday-Friday: 9 AM - 5 PM</li>
                            <li>Saturday: 10 AM - 4 PM</li>
                            <li>Sunday: Closed</li>
                        </ul>
                    </div>

                    <div className={styles.socialMedia}>
                        <h3 className={styles.heading}>Follow Us</h3>
                        <div className={styles.socialIcons}>
                            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
                                <FaFacebook className={styles.socialIcon}/>
                            </a>
                            <a href={TWITTER_URL} target="_blank" rel="noopener noreferrer">
                                <FaXTwitter className={styles.socialIcon}/>
                            </a>
                            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                                <FaInstagram className={styles.socialIcon}/>
                            </a>
                            <a href={PINTEREST_URL} target="_blank" rel="noopener noreferrer">
                                <FaPinterest className={styles.socialIcon}/>
                            </a>
                        </div>
                    </div>
                </div>
                <hr className={styles.divider}/>
                <div className={styles.terms}>
                    <p>
                        <a href="/terms and conditions" className={styles.link}>Terms and
                            Conditions</a>&nbsp;|&nbsp;
                        <a href="/privacy policy" className={styles.link}>Privacy Policy</a>
                    </p>
                    <p>© 2025 Powered By Siteova</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
