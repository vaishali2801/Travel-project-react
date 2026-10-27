
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Button,
    Card,
    Stack,
    Badge,
    ListGroup,
    Accordion,
} from "react-bootstrap";
import {
    FaArrowLeft,
    FaArrowRight,
    FaMapMarkerAlt,
    FaClock,
    FaStar,
    FaCheckCircle,
    FaTimesCircle,
    FaCalendarAlt,
    FaMountain,
    FaShieldAlt,
    FaHeadset,
} from "react-icons/fa";
import trips from "../../Data/trips";
import "./TripDetail.css";

const TripDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const trip = trips.find((t) => String(t.id) === id);

    if (!trip) {
        return (
            <main className="trip-not-found">
                <FaMapMarkerAlt className="not-found-icon" />
                <h2>Destination not found</h2>
                <p>The trip you're looking for may no longer be available.</p>
                <Button
                    className="detail-primary-btn"
                    onClick={() => navigate("/trips")}
                >
                    <FaArrowLeft /> Back to Trips
                </Button>
            </main>
        );
    }

    return (
        <main className="trip-detail-page">
            {/* Destination hero */}
            <section className="detail-hero">
                <img
                    src={trip.image}
                    alt={trip.name}
                    className="detail-hero-image"
                />

                <div className="detail-hero-overlay" />

                <Container className="detail-hero-content">
                    <button
                        type="button"
                        className="detail-back-link"
                        onClick={() => navigate(-1)}
                    >
                        <FaArrowLeft /> Back
                    </button>

                    <div className="detail-hero-text">
                        <span className="detail-eyebrow">
                            <FaCompassFallback />
                            YOUR NEXT ADVENTURE
                        </span>

                        <h1>{trip.name}</h1>

                        <p className="detail-hero-location">
                            <FaMapMarkerAlt />
                            {trip.destination}
                        </p>

                        <div className="detail-hero-badges">
                            <Badge className="detail-badge">
                                <FaClock /> {trip.duration}
                            </Badge>

                            <Badge className="detail-badge">
                                <FaMountain /> {trip.difficulty}
                            </Badge>

                            <Badge className="detail-badge">
                                <FaStar /> {trip.rating}
                            </Badge>
                        </div>
                    </div>

                    <div className="detail-hero-price">
                        <span>STARTING FROM</span>
                        <strong>₹ {trip.price}</strong>
                        <small>Per person</small>
                    </div>
                </Container>
            </section>

            {/* Main details */}
            <section className="detail-main-section">
                <Container>
                    <Row className="g-4">
                        <Col lg={8}>
                            {/* Overview */}
                            <section className="detail-content-block">
                                <span className="detail-section-label">GET TO KNOW THE TRIP</span>
                                <h2 className="detail-section-title">
                                    Your journey, <span>your story.</span>
                                </h2>

                                <p className="detail-overview">{trip.overview}</p>

                                <div className="detail-facts">
                                    <div className="detail-fact">
                                        <span className="detail-fact-icon">
                                            <FaClock />
                                        </span>
                                        <div>
                                            <small>Duration</small>
                                            <strong>{trip.duration}</strong>
                                        </div>
                                    </div>

                                    <div className="detail-fact">
                                        <span className="detail-fact-icon">
                                            <FaMountain />
                                        </span>
                                        <div>
                                            <small>Difficulty</small>
                                            <strong>{trip.difficulty}</strong>
                                        </div>
                                    </div>

                                    <div className="detail-fact">
                                        <span className="detail-fact-icon">
                                            <FaStar />
                                        </span>
                                        <div>
                                            <small>Trip rating</small>
                                            <strong>{trip.rating}</strong>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Highlights */}
                            <section className="detail-panel">
                                <div className="detail-panel-heading">
                                    <span className="detail-panel-icon">
                                        <FaMountain />
                                    </span>
                                    <div>
                                        <span className="detail-section-label">DON'T MISS</span>
                                        <h3>Trip Highlights</h3>
                                    </div>
                                </div>

                                <ListGroup variant="flush" className="detail-list">
                                    {(trip.highlights || []).map((item, index) => (
                                        <ListGroup.Item key={`${index}-${item}`}>
                                            <FaCheckCircle className="detail-check-icon" />
                                            <span>{item}</span>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </section>

                            {/* Itinerary */}
                            <section className="detail-panel">
                                <div className="detail-panel-heading">
                                    <span className="detail-panel-icon">
                                        <FaCalendarAlt />
                                    </span>
                                    <div>
                                        <span className="detail-section-label">THE PLAN</span>
                                        <h3>Day-wise Itinerary</h3>
                                    </div>
                                </div>

                                <p className="detail-panel-description">
                                    A closer look at what your adventure has in store.
                                </p>

                                <Accordion className="detail-accordion" alwaysOpen>
                                    {(trip.itinerary || []).map((day, index) => (
                                        <Accordion.Item
                                            eventKey={String(index)}
                                            key={`${day.day}-${index}`}
                                        >
                                            <Accordion.Header>
                                                <span className="itinerary-day">
                                                    DAY {day.day}
                                                </span>
                                                <span className="itinerary-title">
                                                    {day.title}
                                                </span>
                                            </Accordion.Header>

                                            <Accordion.Body>
                                                {day.description}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    ))}
                                </Accordion>
                            </section>

                            {/* Inclusions and exclusions */}
                            <Row className="g-4">
                                <Col md={6}>
                                    <section className="detail-panel detail-list-panel">
                                        <div className="detail-panel-heading">
                                            <FaCheckCircle className="included-heading-icon" />
                                            <h3>What's Included</h3>
                                        </div>

                                        <ListGroup variant="flush" className="detail-list">
                                            {(trip.inclusions || []).map((item, index) => (
                                                <ListGroup.Item key={`${index}-${item}`}>
                                                    <FaCheckCircle className="detail-check-icon" />
                                                    <span>{item}</span>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    </section>
                                </Col>

                                <Col md={6}>
                                    <section className="detail-panel detail-list-panel">
                                        <div className="detail-panel-heading">
                                            <FaTimesCircle className="excluded-heading-icon" />
                                            <h3>What's Excluded</h3>
                                        </div>

                                        <ListGroup variant="flush" className="detail-list">
                                            {(trip.exclusions || []).map((item, index) => (
                                                <ListGroup.Item key={`${index}-${item}`}>
                                                    <FaTimesCircle className="detail-cross-icon" />
                                                    <span>{item}</span>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    </section>
                                </Col>
                            </Row>

                            {/* Best time */}
                            <section className="best-time-panel">
                                <span className="best-time-icon">
                                    <FaCalendarAlt />
                                </span>
                                <div>
                                    <span className="detail-section-label">
                                        PLAN YOUR VISIT
                                    </span>
                                    <h3>Best Time to Visit</h3>
                                    <p>{trip.bestTimeToVisit}</p>
                                </div>
                            </section>

                            <Button
                                variant="outline-secondary"
                                className="detail-back-bottom"
                                onClick={() => navigate("/trips")}
                            >
                                <FaArrowLeft /> Explore Other Trips
                            </Button>
                        </Col>

                        {/* Booking sidebar */}
                        <Col lg={4}>
                            <aside className="detail-sidebar">
                                <Card className="booking-card">
                                    <Card.Body>
                                        <span className="booking-card-eyebrow">
                                            YOUR NEXT ESCAPE
                                        </span>

                                        <p className="booking-price-label">Trip price</p>

                                        <div className="booking-price">
                                            <span>₹</span> {trip.price}
                                        </div>

                                        <p className="booking-price-note">
                                            Listed price per person
                                        </p>

                                        <div className="booking-divider" />

                                        <div className="booking-summary-row">
                                            <span><FaClock /> Duration</span>
                                            <strong>{trip.duration}</strong>
                                        </div>

                                        <div className="booking-summary-row">
                                            <span><FaMountain /> Difficulty</span>
                                            <strong>{trip.difficulty}</strong>
                                        </div>

                                        <div className="booking-summary-row">
                                            <span><FaStar /> Rating</span>
                                            <strong>{trip.rating}</strong>
                                        </div>

                                        <button
                                            type="button"
                                            className="trip-book-btn"
                                            onClick={() => navigate(`/bookings/${trip.id}`)}
                                        >
                                            Book Your Trip <span aria-hidden="true">→</span>
                                        </button>

                                        <Button
                                            variant="outline-secondary"
                                            className="booking-secondary-btn"
                                            onClick={() => navigate("/trips")}
                                        >
                                            Browse Other Trips
                                        </Button>

                                        <div className="booking-support">
                                            <FaShieldAlt />
                                            <div>
                                                <strong>Plan with confidence</strong>
                                                <p>Contact us to discuss your trip details.</p>
                                            </div>
                                        </div>

                                        <div className="booking-support">
                                            <FaHeadset />
                                            <div>
                                                <strong>Need help?</strong>
                                                <p>Our team can help answer your questions.</p>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </aside>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    );
};

// Small icon component used in the hero eyebrow
function FaCompassFallback() {
    return <FaMapMarkerAlt />;
}

export default TripDetail;
