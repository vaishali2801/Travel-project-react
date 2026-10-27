
import { useContext, useState } from "react";
import {
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { auth } from "../../config/firebase";
import { authContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { googleProvider } from "../../config/firebase";
import { FcGoogle } from "react-icons/fc";
import {
    FaCompass,
    FaUser,
    FaEnvelope,
    FaLock,
} from "react-icons/fa";
import "./RegisterPage.css";

const RegisterPage = () => {
    const navigate = useNavigate();
    const { loading: authLoading } = useContext(authContext);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleGoogleRegister = async () => {
        setError("");
        setSubmitting(true);

        try {
            await signInWithPopup(auth, googleProvider);
            navigate("/", { replace: true });
        } catch (err) {
            console.error("Google registration error:", err);

            setError(
                err.code === "auth/popup-closed-by-user"
                    ? "Google sign-in was cancelled."
                    : "Unable to create an account with Google. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password.length < 6) {
            setError("Password must contain at least 6 characters.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setSubmitting(true);

        try {
            const credential = await createUserWithEmailAndPassword(
                auth,
                formData.email.trim(),
                formData.password
            );

            await updateProfile(credential.user, {
                displayName: formData.name.trim(),
            });

            navigate("/", { replace: true });
        } catch (err) {
            switch (err.code) {
                case "auth/email-already-in-use":
                    setError("This email is already registered. Please sign in.");
                    break;
                case "auth/invalid-email":
                    setError("Please enter a valid email address.");
                    break;
                case "auth/weak-password":
                    setError("Please choose a stronger password.");
                    break;
                case "auth/operation-not-allowed":
                    setError("Email/password registration is not enabled in Firebase.");
                    break;
                case "auth/network-request-failed":
                    setError("Network error. Please check your internet connection.");
                    break;
                default:
                    setError("Account creation failed. Please try again.");
                    console.error("Registration error:", err);
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="register-page">
            <section className="register-image-panel">
                <div className="register-image-overlay" />

                <Link to="/" className="register-brand">
                    <FaCompass />
                    <span>wanderlust.</span>
                </Link>

                <div className="register-image-content">
                    <span className="register-eyebrow">
                        YOUR JOURNEY BEGINS HERE
                    </span>
                    <h1>
                        Somewhere
                        <br />
                        new is calling <em>you.</em>
                    </h1>
                    <p>
                        Join Wanderlust and start discovering new destinations,
                        unforgettable experiences, and journeys worth remembering.
                    </p>
                </div>

                <div className="register-image-footer">
                    <span>Find your somewhere.</span>
                    <span>02 / DISCOVER</span>
                </div>
            </section>

            <section className="register-form-panel">
                <Link to="/" className="register-mobile-brand">
                    <FaCompass />
                    <span>wanderlust.</span>
                </Link>

                <div className="register-form-wrapper">
                    <span className="register-form-label">CREATE YOUR ACCOUNT</span>
                    <h2>Start your journey.</h2>
                    <p className="register-subtitle">
                        Sign up today and make your next trip unforgettable.
                    </p>

                    {error && (
                        <div className="register-error" role="alert">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="register-input-group">
                            <label htmlFor="register-name">Full name</label>
                            <div className="register-input-wrapper">
                                <FaUser className="register-input-icon" />
                                <input
                                    id="register-name"
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    autoComplete="name"
                                    maxLength={100}
                                    required
                                />
                            </div>
                        </div>

                        <div className="register-input-group">
                            <label htmlFor="register-email">Email address</label>
                            <div className="register-input-wrapper">
                                <FaEnvelope className="register-input-icon" />
                                <input
                                    id="register-email"
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

                        <div className="register-input-group">
                            <label htmlFor="register-password">Password</label>
                            <div className="register-input-wrapper">
                                <FaLock className="register-input-icon" />
                                <input
                                    id="register-password"
                                    type="password"
                                    name="password"
                                    placeholder="At least 6 characters"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                    minLength={6}
                                    required
                                />
                            </div>
                        </div>

                        <div className="register-input-group">
                            <label htmlFor="register-confirm-password">
                                Confirm password
                            </label>
                            <div className="register-input-wrapper">
                                <FaLock className="register-input-icon" />
                                <input
                                    id="register-confirm-password"
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Enter your password again"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                    minLength={6}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="register-submit-btn"
                            disabled={submitting || authLoading}
                        >
                            {submitting ? "Creating account..." : "Create account"}
                            {!submitting && <span aria-hidden="true">→</span>}
                        </button>
                        <button
                            type="button"
                            className="register-google-btn"
                            onClick={handleGoogleRegister}
                            disabled={submitting || authLoading}
                        >
                            <FcGoogle size={21} />
                            <span>Continue with Google</span>
                        </button>
                    </form>

                    <p className="register-login-text">
                        Already have an account?{" "}
                        <Link to="/login">Sign in</Link>
                    </p>

                    <div className="register-bottom-note">
                        <span />
                        YOUR NEXT ADVENTURE STARTS HERE
                        <span />
                    </div>
                </div>

                <Link to="/" className="register-back-home">
                    ← Back to home
                </Link>
            </section>
        </div>
    );
};

export default RegisterPage;
