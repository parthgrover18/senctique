import {useEffect, useState} from "react";
import styles from "../styles/Account.module.css";
import {getLoggedInUser, USER_URL} from "../utils/api.tsx";
import {useNavigate} from "react-router-dom";
import {BiSolidHide, BiSolidShow} from "react-icons/bi";

const Account = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [message, setMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [forgotPassword, setForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [resetPasswordMessage, setResetPasswordMessage] = useState("");
    const [changingPassword, setChangingPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [changePasswordMsg, setChangePasswordMsg] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [newPasswordError, setNewPasswordError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getLoggedInUser().then((data: any) => {
            if (data) {
                setUser(data);
                setIsLoggedIn(true);
            } else {
                setUser(null);
                setIsLoggedIn(false);
            }
        });
    }, []);

    const toggleForm = () => setIsSignUp(!isSignUp);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = isSignUp ? `${USER_URL}/signup` : `${USER_URL}/login`;
        const userData = {firstName, lastName, email, password, contact};

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?.&]{6,}$/;

        if (isSignUp && !passwordRegex.test(password)) {
            setPasswordError("Password must be at least 6 characters and include letters, numbers, and symbols.");
            return;
        } else {
            setPasswordError("");
        }

        const response = await fetch(url, {
            credentials: "include",
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            setMessage(isSignUp ? "User successfully created! Please log in." : "Login successful!");
            if (isSignUp) {
                setIsSignUp(false);
            } else {
                getLoggedInUser().then((data) => {
                    if (data) {
                        setUser(data);
                        setIsLoggedIn(true);
                    }
                });
            }
        } else {
            setMessage(isSignUp ? "Error signing up!" : "Invalid email or password.");
        }
    };

    const handleLogout = async () => {
        const response = await fetch(`${USER_URL}/logout`, {method: "POST", credentials: "include"});

        if (response.ok) {
            setIsLoggedIn(false);
            setUser(null);
            setMessage("Logged out successfully.");
        } else {
            setMessage("Error during logout.");
        }
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch(`${USER_URL}/forgotPassword`, {
            credentials: "include",
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: resetEmail}),
        });

        if (response.ok) {
            setResetPasswordMessage("A new password has been sent to your email address.");
            setResetEmail("");

            setTimeout(() => {
                setForgotPassword(false);
            }, 2000);
        } else {
            const errorMessage = await response.text();
            setResetPasswordMessage(errorMessage || "Error: Unable to process your request.");
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?.&]{6,}$/;

        if (!passwordRegex.test(newPassword)) {
            setNewPasswordError("Password must be at least 6 characters and include letters, numbers, and symbols.");
            return;
        } else {
            setNewPasswordError("");
        }

        const response = await fetch(`${USER_URL}/changePassword`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({oldPassword, newPassword}),
        });

        const message = await response.text();
        setChangePasswordMsg(message);

        if (response.ok) {
            setOldPassword("");
            setNewPassword("");
            setTimeout(() => setChangingPassword(false), 2000);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                {isLoggedIn && user ? (
                    <>
                        {!changingPassword && (
                            <>
                                <h2 className={styles.title}>
                                    Welcome Back, {user.firstName} {user.lastName}!
                                </h2>
                                <div className={styles.buttonGroup}>
                                    <button
                                        onClick={() => navigate(`/order-history/${user.id}`)}
                                        className={styles.submitBtn}
                                    >
                                        View Order History
                                    </button>
                                    <button onClick={handleLogout} className={styles.submitBtn}>
                                        Log Out
                                    </button>
                                    <p className={styles.loginText}>
                                        Want to change your password?{" "}
                                        <a href="#" onClick={() => setChangingPassword(true)}
                                           className={styles.loginLink}>
                                            Change Password
                                        </a>
                                    </p>
                                </div>
                            </>
                        )}

                        {changingPassword && (
                            <>
                                <h2 className={styles.title}>Change Password</h2>
                                <form onSubmit={handleChangePassword} className={styles.changePasswordForm}>
                                    <div className={styles.inputWrapper}>
                                        <input
                                            type={showOldPassword ? "text" : "password"}
                                            placeholder="Old Password"
                                            className={styles.chenge}
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className={styles.toggleBtn}
                                            onClick={() => setShowOldPassword((prev) => !prev)}
                                            aria-label={showOldPassword ? "Hide old password" : "Show old password"}
                                        >
                                            {showOldPassword ? <BiSolidHide size={20}/> : <BiSolidShow size={20}/>}
                                        </button>
                                    </div>
                                    <div className={styles.inputWrapper}>
                                        <input
                                            type={showNewPassword ? "text" : "password"}
                                            placeholder="New Password"
                                            className={`${styles.chenge} ${newPasswordError ? styles.inputError : ""}`}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className={styles.toggleBtn}
                                            onClick={() => setShowNewPassword((prev) => !prev)}
                                            aria-label={showNewPassword ? "Hide new password" : "Show new password"}
                                        >
                                            {showNewPassword ? <BiSolidHide size={20}/> : <BiSolidShow size={20}/>}
                                        </button>
                                    </div>
                                    {newPasswordError && <p className={styles.errorText}>{newPasswordError}</p>}

                                    <button type="submit" className={styles.submitBtn}>Submit</button>
                                    {changePasswordMsg && <div className={styles.message}>{changePasswordMsg}</div>}
                                </form>
                                <p className={styles.loginText}>
                                    <a href="#" onClick={() => setChangingPassword(false)} className={styles.loginLink}>
                                        Back to Account
                                    </a>
                                </p>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        {forgotPassword ? (
                            <div>
                                <h2 className={styles.title}>Forgot Password</h2>
                                <form onSubmit={handleForgotPassword}>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className={styles.input}
                                        value={resetEmail}
                                        onChange={(e) => setResetEmail(e.target.value)}
                                    />
                                    <button type="submit" className={styles.submitBtn}>
                                        Reset Password
                                    </button>
                                </form>
                                {resetPasswordMessage && (
                                    <div className={styles.message}>{resetPasswordMessage}</div>
                                )}
                                <p className={styles.loginText}>
                                    Remembered your password?{" "}
                                    <a href="#" onClick={() => setForgotPassword(false)} className={styles.loginLink}>
                                        Log In
                                    </a>
                                </p>
                            </div>
                        ) : (
                            <>
                                <h2 className={styles.title}>{isSignUp ? "Sign Up" : "Log In"}</h2>
                                <form onSubmit={handleSubmit}>
                                    {isSignUp && (
                                        <div className={styles.inputGroup}>
                                            <input
                                                type="text"
                                                placeholder="First Name"
                                                className={styles.input}
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Last Name"
                                                className={styles.input}
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Contact"
                                                className={styles.input}
                                                value={contact}
                                                onChange={(e) => setContact(e.target.value)}
                                            />
                                        </div>
                                    )}
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className={styles.input}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <div className={styles.inputWrapper}>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Password"
                                            className={`${styles.input} ${passwordError ? styles.inputError : ""}`}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className={styles.toggleBtn}
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? <BiSolidHide size={20}/> : <BiSolidShow size={20}/>}
                                        </button>
                                    </div>
                                    {passwordError && <p className={styles.errorText}>{passwordError}</p>}

                                    <button type="submit" className={styles.submitBtn}>
                                        {isSignUp ? "Sign Up" : "Log In"}
                                    </button>
                                </form>
                                <p className={styles.loginText}>
                                    {isSignUp ? (
                                        <>
                                            Already a member?{" "}
                                            <a href="#" onClick={toggleForm} className={styles.loginLink}>
                                                Log in
                                            </a>
                                        </>
                                    ) : (
                                        <>
                                            Don't have an account?{" "}
                                            <a href="#" onClick={toggleForm} className={styles.loginLink}>
                                                Sign up
                                            </a>
                                            <br/>
                                            <a href="#" onClick={() => setForgotPassword(true)}
                                               className={styles.loginLink}>
                                                Forgot password?
                                            </a>
                                        </>
                                    )}
                                </p>
                            </>
                        )}
                    </>
                )}
                {message && <div className={styles.message}>{message}</div>}
                <p className={styles.termsText}>
                    By continuing, you agree to our{" "}
                    <a href="/terms and conditions" className={styles.termsLink}>
                        Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a href="/privacy policy" className={styles.termsLink}>
                        Privacy Policy
                    </a>.
                </p>
            </div>
        </div>
    );
};

export default Account;
