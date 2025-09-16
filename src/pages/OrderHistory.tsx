import React, {useEffect, useState} from "react";
import styles from "../styles/OrderHistory.module.css";
import {OrderData} from "../models/OrderData.tsx";
import {Link, useParams} from "react-router-dom";
import {ORDER_URL} from "../utils/api.tsx";

const OrderHistory: React.FC = () => {
    const {userId} = useParams();
    const [orders, setOrders] = useState<OrderData[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch(`${ORDER_URL}/${userId}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: OrderData[] = await response.json();
            setOrders(data);
        };
        if (userId) {
            fetchOrders();
        }
    }, [userId]);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Order History</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map((order) => (
                    <div key={order.id} className={styles.orderCard}>
                        <div className={styles.orderHeader}>
                            <h3>Order #{order.id}</h3>
                            <p className={styles.totalAmount}>Total: £ {order.total.toFixed(2)}</p>
                        </div>
                        <div className={styles.orderItems}>
                            {order.orderItems.map((item) => (
                                <Link key={item.productId} to={`/shop/${item.product.category}/${item.product.id}`}
                                      className={styles.item}>
                                    <img
                                        src={item.product.imageUrl}
                                        alt={item.product.name}
                                        className={styles.productImage}
                                    />
                                    <div className={styles.productDetails}>
                                        <p className={styles.productName}>{item.product.name}</p>
                                        <p className={styles.productBrand}>{item.product.brand}</p>
                                        <p className={styles.productQty}>Quantity: {item.quantity}</p>
                                        <p className={styles.productPrice}>Price:£{item.price.toFixed(2)}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default OrderHistory;
