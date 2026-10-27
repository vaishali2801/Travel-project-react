
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Alert, Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import { authContext } from "../../context/AuthContext";
import { db } from "../../config/firebase";
import trips from "../../Data/trips";
import "./BookingPage.css";

const BookingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, loading } = useContext(authContext);

    const trip = trips.find((item) => String(item.id) === String(id));

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        travelers: 1,
        request: "",
    });

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (user) {
            setFormData((previous) => ({
                ...previous,
                name: previous.name || user.displayName || "",
                email: previous.email || user.email || "",
            }));
        }
    }, [user]);

    const total = trip ? Number(trip.price) * Number(formData.travelers) : 0;

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (!user) {
            navigate("/login", {
                state: { from: { pathname: `/booking/${id}` } },
            });
            return;
        }

        if (!trip) {
            setError("Trip not found. Please select a trip again.");
            return;
        }

        if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
            setError("Enter a valid 10-digit phone number.");
            return;
        }

        if (
            !formData.date ||
            new Date(`${formData.date}T00:00:00`) <
            new Date(new Date().toDateString())
        ) {
            setError("Please select today or a future departure date.");
            return;
        }

        setSubmitting(true);

        try {
            console.log("Saving booking to Firestore...");

            const bookingData = {
                userId: user.uid,
                name: formData.name.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                date: formData.date,
                travelers: Number(formData.travelers),
                total,
                request: formData.request.trim(),
                tripId: trip.id,
                tripName: trip.name,
                tripPrice: Number(trip.price),
                tripImage: trip.image,
                destination: trip.destination || "",
                status: "pending",
                createdAt: serverTimestamp(),
            };

            // Detect a Firestore request that does not finish promptly.
            let timeoutId;

            const timeoutPromise = new Promise((_, reject) => {
                timeoutId = setTimeout(() => {
                    reject(
                        new Error(
                            "Firestore is taking too long to respond. Check your internet connection and Firestore configuration."
                        )
                    );
                }, 15000);
            });

            let bookingRef;

            try {
                bookingRef = await Promise.race([
                    addDoc(collection(db, "bookings"), bookingData),
                    timeoutPromise,
                ]);
            } finally {
                clearTimeout(timeoutId);
            }

            console.log("Booking saved successfully:", bookingRef.id);

            alert("Booking successful! Redirecting to My Bookings.");

            navigate("/myBookings", { replace: true });
        } catch (err) {
            console.error("Booking save failed:", err);

            if (err.code === "permission-denied") {
                setError(
                    "Permission denied. Check your Firestore security rules."
                );
            } else if (
                err.message?.includes("too long to respond")
            ) {
                setError(err.message);
            } else {
                setError(
                    err.message || "Unable to save your booking. Please try again."
                );
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="booking-loading">
                <Spinner animation="border" />
                <p>Checking your account...</p>
            </div>
        );
    }

    if (!trip) {
        return (
            <Container className="py-5 text-center">
                <h2>Trip not found</h2>
                <p>Please return to our trips and select a destination.</p>
                <Button onClick={() => navigate("/trips")}>Browse trips</Button>
            </Container>
        );
    }

    if (!user) {
        return (
            <Container className="booking-login-required">
                <div className="booking-login-card">
                    <span className="booking-eyebrow">ONE MORE STEP</span>
                    <h2>Ready for your next adventure?</h2>
                    <p>Please sign in to book <strong>{trip.name}</strong>.</p>
                    <Button
                        className="booking-primary-btn"
                        onClick={() =>
                            navigate("/login", {
                                state: { from: { pathname: `/booking/${id}` } },
                            })
                        }
                    >
                        Sign in to continue →
                    </Button>
                    <Link to={`/trips/${id}`} className="booking-back-link">
                        Back to trip details
                    </Link>
                </div>
            </Container>
        );
    }

    return (
        <main className="booking-page">
            <Container>
                <div className="booking-topbar">
                    <button
                        type="button"
                        className="booking-back-link"
                        onClick={() => navigate(`/trips/${id}`)}
                    >
                        ← Back to trip details
                    </button>
                    <span className="booking-secure-label">YOUR JOURNEY STARTS HERE</span>
                </div>

                <div className="booking-heading">
                    <span className="booking-eyebrow">MAKE IT HAPPEN</span>
                    <h1>Book your <em>trip.</em></h1>
                    <p>Complete your details and get ready for an unforgettable escape.</p>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}
                {success && (
                    <Alert variant="success">
                        {success} Your request is saved. You can return to your trips or view
                        your bookings if that page is configured.
                    </Alert>
                )}

                <Row className="g-4 align-items-start">
                    <Col lg={5}>
                        <section className="booking-trip-card">
                            <div className="booking-trip-image">
                                <img src={trip.image} alt={trip.name} />
                                <div className="booking-trip-image-shade" />
                                <div className="booking-trip-image-caption">
                                    <span><FaMapMarkerAlt /> {trip.destination}</span>
                                    <h2>{trip.name}</h2>
                                </div>
                            </div>

                            <div className="booking-trip-info">
                                <div className="booking-trip-fact">
                                    <FaClock />
                                    <div>
                                        <small>Duration</small>
                                        <strong>{trip.duration || "See trip details"}</strong>
                                    </div>
                                </div>

                                <div className="booking-trip-fact">
                                    <FaUsers />
                                    <div>
                                        <small>Travelers</small>
                                        <strong>
                                            {formData.travelers} {Number(formData.travelers) === 1 ? "person" : "people"}
                                        </strong>
                                    </div>
                                </div>

                                <div className="booking-price-line">
                                    <span>Price per traveler</span>
                                    <strong>₹{Number(trip.price).toLocaleString("en-IN")}</strong>
                                </div>

                                <div className="booking-total">
                                    <span>Estimated total</span>
                                    <strong>₹{total.toLocaleString("en-IN")}</strong>
                                    <small>
                                        {formData.travelers} × ₹{Number(trip.price).toLocaleString("en-IN")}
                                    </small>
                                </div>

                                <p className="booking-note">
                                    Final availability and any additional charges should be confirmed
                                    with your travel provider.
                                </p>
                            </div>
                        </section>
                    </Col>

                    <Col lg={7}>
                        <section className="booking-form-card">
                            <div className="booking-form-heading">
                                <span className="booking-eyebrow">YOUR DETAILS</span>
                                <h2>Let's plan your escape.</h2>
                                <p>Tell us who is traveling and when you want to go.</p>
                            </div>

                            <Form onSubmit={handleSubmit}>
                                <Row className="g-3">
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Full name *</Form.Label>
                                            <Form.Control
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Your full name"
                                                autoComplete="name"
                                                required
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Email address *</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="you@example.com"
                                                autoComplete="email"
                                                required
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Phone number *</Form.Label>
                                            <Form.Control
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="10-digit mobile number"
                                                inputMode="numeric"
                                                pattern="[0-9]{10}"
                                                maxLength={10}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label><FaCalendarAlt className="me-2" />Departure date *</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="date"
                                                value={formData.date}
                                                onChange={handleChange}
                                                min={new Date().toLocaleDateString("en-CA")}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col xs={12}>
                                        <Form.Group>
                                            <Form.Label>Number of travelers *</Form.Label>
                                            <Form.Select
                                                name="travelers"
                                                value={formData.travelers}
                                                onChange={handleChange}
                                                required
                                            >
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((count) => (
                                                    <option key={count} value={count}>
                                                        {count} {count === 1 ? "traveler" : "travelers"}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>

                                    <Col xs={12}>
                                        <Form.Group>
                                            <Form.Label>Special requests (optional)</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={4}
                                                name="request"
                                                value={formData.request}
                                                onChange={handleChange}
                                                placeholder="Dietary needs, room preferences, or other requests..."
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <div className="booking-form-total">
                                    <span>Total for {formData.travelers} traveler(s)</span>
                                    <strong>₹{total.toLocaleString("en-IN")}</strong>
                                </div>

                                <Button
                                    type="submit"
                                    className="booking-primary-btn w-100"
                                    disabled={submitting}
                                >
                                    {submitting ? (
                                        <>
                                            <Spinner size="sm" className="me-2" />
                                            Saving booking...
                                        </>
                                    ) : (
                                        <>Book your trip · ₹{total.toLocaleString("en-IN")} →</>
                                    )}
                                </Button>

                                <p className="booking-form-footnote">
                                    Your booking request will be saved to your account. This button
                                    does not process a payment.
                                </p>
                            </Form>
                        </section>
                    </Col>
                </Row>
            </Container>
        </main>
    );
};

export default BookingPage;
