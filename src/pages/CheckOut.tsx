import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ADDRESS_URL, getCartItems, getLoggedInUser, ORDER_URL} from "../utils/api";
import styles from "../styles/Checkout.module.css";
import {CartItem} from "../models/CartItem";

const capitalizeWords = (text: string) => {
    return text.replace(/\b\w/g, char => char.toUpperCase());
};

const Checkout = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [userInfo, setUserInfo] = useState({firstName: "", lastName: "", email: "", contact: ""});
    const [address, setAddress] = useState({addressLine1: "", addressLine2: "", city: "", postcode: "", country: ""});
    const [payment, setPayment] = useState({cardNumber: "", cvv: "", expiry: "", nameOnCard: ""});
    const [userId, setUserId] = useState<number | null>(null);
    const [addressId, setAddressId] = useState<number | null>(null);
    const [addressSaved, setAddressSaved] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const [items, loggedInUser] = await Promise.all([getCartItems(), getLoggedInUser()]);
            setCartItems(items || []);
            if (loggedInUser) {
                setUserInfo({
                    firstName: capitalizeWords(loggedInUser.firstName),
                    lastName: capitalizeWords(loggedInUser.lastName),
                    email: loggedInUser.email,
                    contact: loggedInUser.contact || ""
                });
                setUserId(loggedInUser.id);

                const addressResponse = await fetch(`${ADDRESS_URL}/${loggedInUser.id}`, {
                    credentials: "include"
                });
                const userAddress = await addressResponse.json();
                if (userAddress.length > 0) {
                    const formattedAddress = {
                        ...userAddress[0],
                        addressLine1: capitalizeWords(userAddress[0].addressLine1),
                        addressLine2: capitalizeWords(userAddress[0].addressLine2),
                        city: capitalizeWords(userAddress[0].city),
                        postcode: userAddress[0].postcode.toUpperCase(),
                        country: capitalizeWords(userAddress[0].country)
                    };
                    setAddress(formattedAddress);
                    setAddressId(userAddress[0].id);
                    setAddressSaved(true);
                }
            }
        };
        fetchData();
    }, []);

    const handleAddressSubmit = async (method: "POST" | "PUT") => {
        if (!userId) return alert("User ID not found");
        const url = method === "POST" ? `${ADDRESS_URL}/${userId}` : `${ADDRESS_URL}/${addressId}`;
        const response = await fetch(url, {
            method,
            credentials: "include",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(address)
        });
        if (response.ok) {
            const savedAddress = await response.json();
            setAddressId(savedAddress.id);
            setAddressSaved(true);
        } else {
            console.error("Failed to save address");
        }
    };

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        let value = e.target.value;

        if (field === "cardNumber") {
            value = value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
        }

        if (field === "cvv") {
            value = value.replace(/\D/g, "").slice(0, 3);
        }

        if (field === "expiry") {
            value = value.replace(/\D/g, "").slice(0, 4);
            if (value.length >= 3) {
                value = value.slice(0, 2) + "/" + value.slice(2);
            }

            if (value.length === 5) {
                const currentDate = new Date();
                const month = parseInt(value.substring(0, 2), 10);
                const year = parseInt(value.substring(3, 5), 10);
                if (month < 1 || month > 12) {
                    alert("Invalid month. Please enter a month between 01 and 12.");
                    value = "";
                } else {
                    const fullYear = (currentDate.getFullYear() - (currentDate.getFullYear() % 100)) + year;
                    const expiryDate = new Date(fullYear, month - 1);
                    if (expiryDate < currentDate) {
                        alert("The expiry date is in the past. Please enter a valid expiry date.");
                        value = "";
                    }
                }
            }
        }

        setPayment({...payment, [field]: value});
    };

    const handleProceedToPayment = async () => {
        if (!userInfo.firstName || !userInfo.lastName || !userInfo.email || !address.addressLine1 || !address.city || !address.country || !payment.cardNumber || !payment.cvv || !payment.expiry || !payment.nameOnCard) {
            return alert("Please fill in all the required fields.");
        }

        const orderData = {
            userId,
            total: cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
            address,
            payment,
            orderItems: cartItems.map(item => ({
                productId: item.product.id,
                quantity: item.quantity,
                price: item.product.price,
                total: item.product.price * item.quantity,
                product: {
                    name: item.product.name,
                    brand: item.product.brand,
                    imageUrl: item.product.imageUrl
                }
            }))
        };

        const response = await fetch(`${ORDER_URL}/save`, {
            method: "POST",
            credentials: "include",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
            const orderId = await response.json();
            navigate("/order confirmation", {state: {orderData, orderId}});
        } else {
            console.error("Failed to place the order.");
        }
    };

    return (
        <div className={styles.checkoutContainer}>
            <div className={styles.checkoutContent}>
                <div className={styles.formSection}>
                    <div className={styles.sectionTitle}>User Information</div>
                    <div className={styles.inputGroup}>
                        <input type="text" placeholder="First Name" value={userInfo.firstName}
                               onChange={(e) => setUserInfo({...userInfo, firstName: e.target.value})}/>
                        <input type="text" placeholder="Last Name" value={userInfo.lastName}
                               onChange={(e) => setUserInfo({...userInfo, lastName: e.target.value})}/>
                        <input type="email" placeholder="Email" value={userInfo.email}
                               onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}/>
                        <input type="text" placeholder="Contact Number" value={userInfo.contact}
                               onChange={(e) => setUserInfo({...userInfo, contact: e.target.value})}/>
                    </div>

                    <div className={styles.sectionTitle}>Address Information</div>
                    <div className={styles.inputGroup}>
                        <input type="text" placeholder="Address Line 1" value={address.addressLine1}
                               onChange={(e) => setAddress({...address, addressLine1: e.target.value})}/>
                        <input type="text" placeholder="Address Line 2" value={address.addressLine2}
                               onChange={(e) => setAddress({...address, addressLine2: e.target.value})}/>
                        <input type="text" placeholder="City" value={address.city}
                               onChange={(e) => setAddress({...address, city: e.target.value})}/>
                        <input type="text" placeholder="Postcode" value={address.postcode}
                               onChange={(e) => setAddress({...address, postcode: e.target.value})}/>
                        <input type="text" placeholder="Country" value={address.country}
                               onChange={(e) => setAddress({...address, country: e.target.value})}/>
                    </div>

                    <button className={styles.payButton}
                            onClick={() => handleAddressSubmit(addressSaved ? "PUT" : "POST")}>
                        {addressSaved ? "Update Address" : "Save Address"}
                    </button>

                    <div className={styles.sectionTitle}>Payment Information</div>
                    <div className={styles.inputGroup}>
                        <input type="text" placeholder="Name on Card" value={payment.nameOnCard}
                               onChange={(e) => handlePaymentChange(e, "nameOnCard")}/>
                        <input type="text" placeholder="Card Number" value={payment.cardNumber}
                               onChange={(e) => handlePaymentChange(e, "cardNumber")} maxLength={19}/>
                        <input type="text" placeholder="CVV" value={payment.cvv}
                               onChange={(e) => handlePaymentChange(e, "cvv")} maxLength={3}/>
                        <input type="text" placeholder="Expiry Date MM/YY" value={payment.expiry}
                               onChange={(e) => handlePaymentChange(e, "expiry")} maxLength={5}/>
                    </div>

                    <button className={styles.continueButton} onClick={() => navigate("/shop")}>Continue Shopping
                    </button>
                    <button className={styles.payButton} onClick={handleProceedToPayment}>Proceed to Payment</button>
                </div>

                <div className={styles.orderSummarySection}>
                    <div className={styles.orderSummaryTitle}>Order Summary</div>
                    <div className={styles.orderItems}>
                        {cartItems.map((item) => (
                            <div key={item.product.id} className={styles.orderItem}>
                                <img src={item.product.imageUrl} alt={item.product.name}
                                     className={styles.orderItemImage}/>
                                <div className={styles.orderItemInfo}>
                                    <h4>{capitalizeWords(item.product.name)}</h4>
                                    <p>{capitalizeWords(item.product.brand)}</p>
                                    <p>£{item.product.price.toFixed(2)}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.totalAmount}>
                        Total:
                        £{cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
