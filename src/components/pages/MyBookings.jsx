
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import {
    Alert,
    Button,
    Col,
    Container,
    Row,
    Spinner,
} from "react-bootstrap";
import {
    FaCalendarAlt,
    FaClock,
    FaMapMarkerAlt,
    FaUsers,
    FaCompass,
    FaArrowRight,
} from "react-icons/fa";

import { db } from "../../config/firebase";
import { authContext } from "../../context/AuthContext";
import trips from "../../Data/trips.js";
import "./MyBookings.css";

const MyBookings = () => {
    const { user, loading: authLoading } = useContext(authContext);
    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);
    const [loadingBookings, setLoadingBookings] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            setBookings([]);
            setLoadingBookings(false);
            return;
        }

        let cancelled = false;

        const fetchBookings = async () => {
            setLoadingBookings(true);
            setError("");

            try {
                const bookingsQuery = query(
                    collection(db, "bookings"),
                    where("userId", "==", user.uid)
                );

                const snapshot = await getDocs(bookingsQuery);

                const results = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                results.sort((a, b) => {
                    const timeA = a.createdAt?.seconds ?? 0;
                    const timeB = b.createdAt?.seconds ?? 0;
                    return timeB - timeA;
                });

                if (!cancelled) {
                    setBookings(results);
                }
            } catch (err) {
                console.error("Unable to fetch bookings:", err);

                if (!cancelled) {
                    setError(
                        "We couldn't load your bookings. Please check your connection and try again."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoadingBookings(false);
                }
            }
        };

        fetchBookings();

        return () => {
            cancelled = true;
        };
    }, [user, authLoading]);

    const formatPrice = (price) =>
        `₹${Number(price || 0).toLocaleString("en-IN")}`;

    const formatDate = (dateValue) => {
        if (!dateValue) return "Not selected";

        // Date strings from the booking form are YYYY-MM-DD.
        if (typeof dateValue === "string") {
            const [year, month, day] = dateValue.split("-").map(Number);

            if (!year || !month || !day) return dateValue;

            return new Date(year, month - 1, day).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
            });
        }

        return "Not selected";
    };

    if (authLoading || loadingBookings) {
        return (
            <main className="my-bookings-page my-bookings-centered">
                <Spinner animation="border" />
                <h5>Preparing your adventures...</h5>
                <p>Your travel bookings are on their way.</p>
            </main>
        );
    }

    if (!user) {
        return (
            <main className="my-bookings-page my-bookings-centered">
                <div className="my-bookings-empty">
                    <div className="my-bookings-empty-icon">
                        <FaCompass />
                    </div>
                    <span className="my-bookings-eyebrow">YOUR TRAVEL JOURNAL</span>
                    <h1>Your adventures await.</h1>
                    <p>
                        Sign in to see your reservations, travel dates, and booking details
                        in one place.
                    </p>
                    <Button
                        className="my-bookings-primary-btn"
                        onClick={() =>
                            navigate("/login", {
                                state: { from: { pathname: "/myBookings" } },
                            })
                        }
                    >
                        Sign in to continue <FaArrowRight />
                    </Button>
                </div>
            </main>
        );
    }

    return (
        <main className="my-bookings-page">
            <Container>
                <header className="my-bookings-header">
                    <div>
                        <span className="my-bookings-eyebrow">YOUR TRAVEL JOURNAL</span>
                        <h1>My <em>bookings.</em></h1>
                        <p>
                            Every journey starts somewhere. Keep all your travel plans
                            together here.
                        </p>
                    </div>

                    <Button
                        className="my-bookings-primary-btn"
                        onClick={() => navigate("/trips")}
                    >
                        <FaCompass /> Explore trips
                    </Button>
                </header>

                <div className="my-bookings-stats">
                    <div className="my-bookings-stat">
                        <span>Total bookings</span>
                        <strong>{bookings.length}</strong>
                    </div>
                    <div className="my-bookings-stat">
                        <span>Travelers booked</span>
                        <strong>
                            {bookings.reduce(
                                (sum, booking) =>
                                    sum + Number(booking.travelers ?? booking.person ?? 1),
                                0
                            )}
                        </strong>
                    </div>
                    <div className="my-bookings-stat">
                        <span>Estimated booking value</span>
                        <strong>
                            {formatPrice(
                                bookings.reduce(
                                    (sum, booking) => sum + Number(booking.total || 0),
                                    0
                                )
                            )}
                        </strong>
                    </div>
                </div>

                {error && (
                    <Alert variant="danger" className="my-bookings-alert">
                        <div>{error}</div>
                        <Button
                            variant="outline-danger"
                            size="sm"
                            className="mt-3"
                            onClick={() => window.location.reload()}
                        >
                            Try again
                        </Button>
                    </Alert>
                )}

                {!error && bookings.length === 0 && (
                    <section className="my-bookings-empty">
                        <div className="my-bookings-empty-icon">
                            <FaCompass />
                        </div>
                        <span className="my-bookings-eyebrow">A WORLD TO DISCOVER</span>
                        <h2>No trips booked yet.</h2>
                        <p>
                            Your next unforgettable memory is out there. Explore our
                            destinations and book your first adventure.
                        </p>
                        <Button
                            className="my-bookings-primary-btn"
                            onClick={() => navigate("/trips")}
                        >
                            Discover destinations <FaArrowRight />
                        </Button>
                    </section>
                )}

                {!error && bookings.length > 0 && (
                    <Row className="g-4">
                        {bookings.map((booking) => {
                            const matchingTrip = trips.find(
                                (trip) => String(trip.id) === String(booking.tripId)
                            );

                            const travelerCount = Number(
                                booking.travelers ?? booking.person ?? 1
                            );

                            const tripPrice = Number(
                                booking.tripPrice ?? matchingTrip?.price ?? 0
                            );

                            const image =
                                booking.tripImage ||
                                matchingTrip?.image ||
                                "https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg";

                            const destination =
                                booking.destination ||
                                matchingTrip?.destination ||
                                "Your destination";

                            const tripName =
                                booking.tripName || matchingTrip?.name || "Your trip";

                            const status = String(booking.status || "pending").toLowerCase();

                            const statusLabel =
                                status === "confirmed"
                                    ? "Confirmed"
                                    : status === "cancelled" || status === "canceled"
                                        ? "Cancelled"
                                        : status === "completed"
                                            ? "Completed"
                                            : "Pending";

                            return (
                                <Col key={booking.id} xs={12} md={6} xl={4}>
                                    <article className="my-booking-card">
                                        <div className="my-booking-image">
                                            <img src={image} alt={tripName} loading="lazy" />

                                            <span
                                                className={`my-booking-status status-${statusLabel.toLowerCase()}`}
                                            >
                                                {statusLabel}
                                            </span>

                                            <div className="my-booking-image-caption">
                                                <span>
                                                    <FaMapMarkerAlt /> {destination}
                                                </span>
                                                <h2>{tripName}</h2>
                                            </div>
                                        </div>

                                        <div className="my-booking-body">
                                            <div className="my-booking-reference">
                                                <span>BOOKING REFERENCE</span>
                                                <strong>{booking.id.slice(0, 8).toUpperCase()}</strong>
                                            </div>

                                            <div className="my-booking-detail">
                                                <span>
                                                    <FaCalendarAlt /> Departure
                                                </span>
                                                <strong>{formatDate(booking.date)}</strong>
                                            </div>

                                            <div className="my-booking-detail">
                                                <span>
                                                    <FaClock /> Duration
                                                </span>
                                                <strong>{matchingTrip?.duration || "See itinerary"}</strong>
                                            </div>

                                            <div className="my-booking-detail">
                                                <span>
                                                    <FaUsers /> Travelers
                                                </span>
                                                <strong>
                                                    {travelerCount} {travelerCount === 1 ? "person" : "people"}
                                                </strong>
                                            </div>

                                            <div className="my-booking-detail">
                                                <span>Price per traveler</span>
                                                <strong>{formatPrice(tripPrice)}</strong>
                                            </div>

                                            {booking.request && (
                                                <div className="my-booking-request">
                                                    <span>Special requests</span>
                                                    <p>{booking.request}</p>
                                                </div>
                                            )}

                                            <div className="my-booking-total">
                                                <span>Estimated total</span>
                                                <strong>{formatPrice(booking.total)}</strong>
                                            </div>

                                            <Button
                                                className="my-booking-view-btn"
                                                onClick={() =>
                                                    navigate(`/trips/${booking.tripId}`)
                                                }
                                            >
                                                View trip details <FaArrowRight />
                                            </Button>
                                        </div>
                                    </article>
                                </Col>
                            );
                        })}
                    </Row>
                )}
            </Container>
        </main>
    );
};

export default MyBookings;
