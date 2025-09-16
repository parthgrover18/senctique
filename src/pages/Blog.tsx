import {useState} from "react";
import styles from "../styles/Blog.module.css";

interface Post {
    title: string;
    image: string;
    description: string;
}

const Blog = () => {
    const [isFeaturedExpanded, setFeaturedExpanded] = useState(false);
    const [expandedPostIndex, setExpandedPostIndex] = useState<number | null>(null);

    const handleFeaturedClick = () => {
        setFeaturedExpanded(!isFeaturedExpanded);
    };

    const handlePostClick = (index: number) => {
        setExpandedPostIndex(expandedPostIndex === index ? null : index);
    };

    const posts: Post[] = [
        {
            title: "Floral Elegance",
            image: "https://media.parfumo.com/perfume_imagery/95/958076-madame-cherie-caline_1200.jpg",
            description:
                "Floral elegance captures the timeless charm of nature’s most delicate blooms, translated into scent. A floral perfume evokes romance, grace, and freshness, often blending rose, jasmine, lily, and peony in ethereal harmony. These fragrances are ideal for daywear, weddings, or any moment when you want to feel soft yet radiant. The best floral perfumes transition beautifully from morning to evening, layering light petals with deeper musky or woody bases. Floral elegance is not just about smelling pretty—it’s a sensory celebration of femininity, serenity, and the lush gardens that inspire us. Every spritz feels like walking through a blooming paradise.",
        },
        {
            title: "Woody Wonders",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTb70Ma5_q0xd6HH6AEpbKRIMYJwq7a5MlnA&s",
            description:
                "Woody perfumes are the soul of sophistication and mystery. Built around earthy notes like sandalwood, cedar, vetiver, and patchouli, these fragrances create a grounding and sensual experience. Woody wonders are perfect for those who prefer depth and complexity in their scents. Often paired with spices, leather, or florals, they strike a beautiful balance between nature and refinement. Ideal for colder months or evening wear, woody scents envelop the wearer in a warm, lingering embrace. They evoke forests, fireplaces, and timeless elegance, making them a favorite for both men and women who want to leave a lasting, confident impression.",
        },
        {
            title: "Citrus Bliss",
            image: "https://scentsnstories.pk/cdn/shop/files/inferno_29_11zon.webp?v=1735758172",
            description:
                "Citrus bliss is a celebration of freshness, energy, and sunshine in a bottle. Bursting with zesty notes of lemon, bergamot, grapefruit, and orange blossom, citrus perfumes awaken the senses and uplift the mood instantly. These fragrances are often the go-to for summer days, post-gym refreshment, or casual everyday wear. Light and invigorating, citrus scents can stand alone or be beautifully layered with herbs, florals, or light woods. Ideal for those who love clean, crisp aromas that don’t overpower, citrus perfumes are effortlessly wearable and universally appealing. With just one spritz, you’re transported to a breezy, sun-drenched Mediterranean coast.",
        },
        {
            title: "Oriental Mystique",
            image: "https://assets-v3.wikiparfum.com/api-assets/images/49d93de89OpP54ssyuJMG6rJFludbz9msL3IWFYm-w1400-q75.jpg",
            description:
                "Oriental mystique perfumes are the epitome of exotic allure and sensual depth. Rich in spices, resins, vanilla, amber, and opulent florals, these fragrances wrap the wearer in a veil of mystery and warmth. Ideal for evening wear or romantic occasions, they unfold gradually—starting bold and evolving into a soft, lingering trail. Oriental scents often carry an intoxicating complexity, appealing to those with bold personalities and a taste for the luxurious. Whether infused with incense-like myrrh or sweet tonka bean, these perfumes offer a rich sensory journey. Each spray feels like a whisper from distant lands steeped in magic and elegance.",
        },
    ];

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Perfume Insights</h1>
                <p>Discover the essence of luxury fragrances</p>
            </header>

            <section className={styles.featuredPost}>
                <div
                    className={styles.featuredImage}
                    style={{
                        backgroundImage:
                            "url('https://assets-v3.wikiparfum.com/api-assets/images/49d93de89OpP54ssyuJMG6rJFludbz9msL3IWFYm-w1400-q75.jpg')",
                    }}
                ></div>
                <div className={styles.featuredContent}>
                    <h2>Featured Scent</h2>
                    <p>
                        Step into a world of allure with this month’s featured scent—an olfactory masterpiece designed
                        to captivate.
                        {isFeaturedExpanded && (
                            <span>
                                {" "}
                                Crafted by top perfumers, this fragrance blends rare ingredients for a truly unforgettable experience.
                                Whether you’re seeking something bold for a night out or something subtle for daily wear, our featured scent balances elegance and intensity with precision.
                                It unfolds with top notes that intrigue, heart notes that comfort, and base notes that linger seductively.
                                This perfume doesn’t just complement your presence—it defines it.
                                Perfect for fragrance connoisseurs or those looking to elevate their signature style. Discover your new obsession with our featured scent.
                            </span>
                        )}
                    </p>
                    <button className={styles.readMore} onClick={handleFeaturedClick}>
                        {isFeaturedExpanded ? "Show Less" : "Discover More"}
                    </button>
                </div>
            </section>

            <section className={styles.postsGrid}>
                {posts.map((post, index) => (
                    <div key={index} className={styles.postCard}>
                        <div
                            className={styles.postImage}
                            style={{backgroundImage: `url('${post.image}')`}}
                        ></div>
                        <h3>{post.title}</h3>
                        <p>
                            Unveil the secrets of this scent...
                            {expandedPostIndex === index && <span> {post.description}</span>}
                        </p>
                        <button
                            className={styles.readMore}
                            onClick={() => handlePostClick(index)}
                        >
                            {expandedPostIndex === index ? "Show Less" : "Read More"}
                        </button>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Blog;
