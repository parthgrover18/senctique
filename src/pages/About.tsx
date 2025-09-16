import React from 'react';
import styles from '../styles/About.module.css';

const About: React.FC = () => {
    return (

        <div className={styles.container}>
            <h2 className={styles.title}>About Senctique</h2>
            <p className={styles.description}>
                Welcome to Senctique, where fragrance meets elegance. At Senctique, we believe that a perfume is
                more than just a scent; it is an expression of individuality and a journey through the senses. Our
                mission is to curate a unique selection of exquisite perfumes from around the world, ensuring that
                each bottle captures the essence of luxury.
            </p>
            <h3 className={styles.subtitle}>Our Story</h3>
            <p className={styles.description}>
                Founded in 2024, Senctique was born out of a passion for fine fragrances and a desire to bring the
                best olfactory experiences to our customers. Our team travels to the heart of perfume-making
                regions, collaborating with renowned perfumers to source high-quality ingredients and create
                signature scents that leave a lasting impression.
            </p>
            <h3 className={styles.subtitle}>Why Choose Us?</h3>
            <ul className={styles.benefits}>
                <li>Extensive collection of exclusive perfumes</li>
                <li>Sustainable and ethically sourced ingredients</li>
                <li>Personalized fragrance consultations</li>
                <li>Fast and reliable shipping worldwide</li>
            </ul>
            <h3 className={styles.subtitle}>Join Us</h3>
            <p className={styles.description}>
                We invite you to explore our collection and discover the perfect scent that resonates with your
                personality. At Senctique, every fragrance tells a story, and we’re excited to share this journey
                with you.
            </p>
        </div>

    );
};

export default About;
