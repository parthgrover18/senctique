import {Link, useLocation} from "react-router-dom";
import styles from "../styles/OrderConfirmation.module.css";
import {OrderData} from "../models/OrderData.tsx";

const OrderConfirmation = () => {
    const {state} = useLocation();
    const orderData: OrderData | undefined = state?.orderData;
    const orderId: number | undefined = state?.orderId;

    if (!orderData) {
        return <div>Order details not available.</div>;
    }

    return (
        <div className={styles.confirmationContainer}>
            <div className={styles.confirmationContent}>
                <h1>Order Confirmation</h1>
                <p>Thank you for your purchase!</p>
                <div className={styles.orderSummary}>
                    <h2>Order Details</h2>
                    <div><strong>Order ID:</strong> {orderId}</div>
                    {/* Display the orderId passed from previous page */}
                    <div><strong>Total Amount:</strong> £{orderData.total.toFixed(2)}</div>

                    <h3>Items:</h3>
                    {orderData.orderItems.map((item, index) => (
                        <div key={index} className={styles.itemDetails}>
                            <img src={item.product.imageUrl} alt={item.product.name} className={styles.productImage}/>
                            <div><strong>Product:</strong> {item.product.name}</div>
                            <div><strong>Brand:</strong> {item.product.brand}</div>
                            <div><strong>Quantity:</strong> {item.quantity}</div>
                            <div><strong>Unit Price:</strong> £{item.price.toFixed(2)}</div>
                            <div><strong>Total:</strong> £{item.total.toFixed(2)}</div>
                        </div>
                    ))}
                </div>
                <Link to="/shop" className={styles.continueShoppingButton}>Continue Shopping</Link>
            </div>
        </div>
    );
};

export default OrderConfirmation;

