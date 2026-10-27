
import { useContext, useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase";
import { authContext } from "../../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCompass, FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./LoginPage.css";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { loading: authLoading } = useContext(authContext);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleGoogleLogin = async () => {
        setError("");
        setSubmitting(true);

        try {
            await signInWithPopup(auth, googleProvider);

            const destination = location.state?.from;
            navigate(
                destination
                    ? `${destination.pathname}${destination.search || ""}${destination.hash || ""}`
                    : "/",
                { replace: true }
            );
        } catch (err) {
            console.error("Google login error:", err);

            if (err.code === "auth/popup-closed-by-user") {
                setError("Google sign-in was cancelled.");
            } else if (err.code === "auth/account-exists-with-different-credential") {
                setError("An account already exists with a different sign-in method.");
            } else {
                setError("Unable to sign in with Google. Please try again.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            await signInWithEmailAndPassword(
                auth,
                formData.email.trim(),
                formData.password
            );

            const destination = location.state?.from;
            navigate(
                destination
                    ? `${destination.pathname}${destination.search || ""}${destination.hash || ""}`
                    : "/",
                { replace: true }
            );
        } catch (err) {
            switch (err.code) {
                case "auth/invalid-credential":
                case "auth/wrong-password":
                case "auth/user-not-found":
                    setError("Invalid email or password. Please try again.");
                    break;
                case "auth/too-many-requests":
                    setError("Too many attempts. Please try again later.");
                    break;
                case "auth/invalid-email":
                    setError("Please enter a valid email address.");
                    break;
                case "auth/network-request-failed":
                    setError("Network error. Please check your internet connection.");
                    break;
                default:
                    setError("Login failed. Please try again.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-image-panel">
                <div className="login-image-overlay" />

                <Link to="/" className="login-brand">
                    <FaCompass />
                    <span>wanderlust.</span>
                </Link>

                <div className="login-image-content">
                    <span className="login-eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
                    <h1>
                        The world is
                        <br />
                        waiting for <em>you.</em>
                    </h1>
                    <p>
                        Discover extraordinary places, create unforgettable memories,
                        and make every journey count.
                    </p>
                </div>

                <div className="login-image-footer">
                    <span>Explore more. Worry less.</span>
                    <span>01 / EXPLORE</span>
                </div>
            </div>

            <div className="login-form-panel">
                <Link to="/" className="login-mobile-brand">
                    <FaCompass />
                    <span>wanderlust.</span>
                </Link>

                <div className="login-form-wrapper">
                    <span className="login-form-label">WELCOME BACK</span>
                    <h2>Let's get you going.</h2>
                    <p className="login-subtitle">
                        Sign in to continue your journey with us.
                    </p>

                    {error && (
                        <div className="login-error" role="alert">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="login-input-group">
                            <label htmlFor="email">Email address</label>
                            <div className="login-input-wrapper">
                                <FaEnvelope className="login-input-icon" />
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="login-input-group">
                            <label htmlFor="password">Password</label>
                            <div className="login-input-wrapper">
                                <FaLock className="login-input-icon" />
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="login-submit-btn"
                            disabled={submitting || authLoading}
                        >
                            {submitting ? "Signing in..." : "Sign in"}
                            {!submitting && <span aria-hidden="true">→</span>}
                        </button>
                        <button
                            type="button"
                            className="login-google-btn"
                            onClick={handleGoogleLogin}
                            disabled={submitting || authLoading}
                        >
                            <FcGoogle size={21} />
                            <span>Continue with Google</span>
                        </button>
                    </form>

                    <p className="login-register-text">
                        New to Wanderlust?{" "}
                        <Link to="/register">Create an account</Link>
                    </p>

                    <div className="login-bottom-note">
                        <span />
                        YOUR NEXT ADVENTURE IS JUST AHEAD
                        <span />
                    </div>
                </div>

                <Link to="/" className="login-back-home">
                    ← Back to home
                </Link>
            </div>
        </div>
    );
};

export default Login;
