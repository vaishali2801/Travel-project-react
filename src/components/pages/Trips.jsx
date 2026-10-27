
import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaArrowRight, FaMapMarkerAlt, FaCompass } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import trips from "../../Data/trips.js";
import "./Trips.css";

const Trips = () => {
    const navigate = useNavigate();

    return (
        <main className="trips-page">
            {/* Hero Section */}
            <section className="trips-hero">
                <div className="trips-hero-overlay" />

                <Container className="trips-hero-content">
                    <span className="trips-eyebrow">
                        <FaCompass /> YOUR NEXT ADVENTURE STARTS HERE
                    </span>

                    <h1>
                        Explore the world,
                        <br />
                        <span>one trip at a time.</span>
                    </h1>

                    <p>
                        Discover incredible destinations, breathtaking landscapes,
                        and unforgettable experiences waiting for you.
                    </p>

                    <Button
                        className="trips-hero-btn"
                        onClick={() =>
                            document
                                .getElementById("all-trips")
                                ?.scrollIntoView({ behavior: "smooth" })
                        }
                    >
                        Discover Trips <FaArrowRight />
                    </Button>
                </Container>

                <div className="trips-hero-bottom">
                    <span>TRAVEL MORE. WORRY LESS.</span>
                    <span>MAKE MEMORIES THAT LAST.</span>
                </div>
            </section>

            {/* Trips Section */}
            <section className="trips-list-section" id="all-trips">
                <Container>
                    <div className="trips-section-heading">
                        <div>
                            <span className="trips-section-label">
                                FIND YOUR NEXT ESCAPE
                            </span>

                            <h2>
                                Discover our <span>trips.</span>
                            </h2>
                        </div>

                        <p>
                            Every destination has a story.
                            <br />
                            Which one will you discover next?
                        </p>
                    </div>

                    {trips.length > 0 ? (
                        <Row className="g-4">
                            {trips.map((t, index) => (
                                <Col lg={4} md={6} sm={12} key={t.id}>
                                    <Card className="trip-card">
                                        <div className="trip-image-wrapper">
                                            <Card.Img
                                                variant="top"
                                                src={t.image}
                                                alt={t.name}
                                                className="trip-card-image"
                                                loading="lazy"
                                            />

                                            <span className="trip-number">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>

                                            <div className="trip-image-overlay" />
                                        </div>

                                        <Card.Body className="trip-card-body">
                                            <div className="trip-card-topline">
                                                <span className="trip-category">
                                                    <FaMapMarkerAlt />
                                                    DESTINATION
                                                </span>
                                            </div>

                                            <Card.Title className="trip-card-title">
                                                {t.name}
                                            </Card.Title>

                                            <Card.Text className="trip-card-description">
                                                {t.overview}
                                            </Card.Text>

                                            <Button
                                                className="trip-view-btn"
                                                onClick={() => navigate(`/trips/${t.id}`)}
                                                aria-label={`View details for ${t.name}`}
                                            >
                                                View Trip Details
                                                <span className="trip-btn-icon">
                                                    <FaArrowRight />
                                                </span>
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <div className="trips-empty-state">
                            <FaCompass />
                            <h3>Your next adventure is coming soon.</h3>
                            <p>Check back later to discover new destinations.</p>
                        </div>
                    )}
                </Container>
            </section>

            {/* Bottom CTA */}
            <section className="trips-cta">
                <Container>
                    <div className="trips-cta-content">
                        <div>
                            <span className="trips-section-label">
                                THE WORLD IS WAITING
                            </span>

                            <h2>
                                Your next story
                                <br />
                                starts <span>here.</span>
                            </h2>
                        </div>

                        <Button
                            className="trips-cta-btn"
                            onClick={() =>
                                document
                                    .getElementById("all-trips")
                                    ?.scrollIntoView({ behavior: "smooth" })
                            }
                        >
                            Find Your Trip <FaArrowRight />
                        </Button>
                    </div>
                </Container>
            </section>
        </main>
    );
};

export default Trips;
