
import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
    FaCompass,
    FaGlobeAmericas,
    FaHeart,
    FaLeaf,
    FaArrowRight,
    FaQuoteLeft,
    FaMapMarkerAlt,
    FaUsers,
    FaRoute,
} from "react-icons/fa";
import "./AboutUs.css";

const values = [
    {
        icon: <FaCompass />,
        title: "Authentic Experiences",
        description:
            "We believe the best journeys go beyond sightseeing. Discover local cultures, hidden gems, and meaningful experiences.",
    },
    {
        icon: <FaHeart />,
        title: "Travel With Care",
        description:
            "Your comfort and experience matter to us. We want every journey to feel thoughtful, memorable, and personal.",
    },
    {
        icon: <FaLeaf />,
        title: "Explore Responsibly",
        description:
            "We encourage mindful travel that respects local communities, natural landscapes, and the places we visit.",
    },
];

const AboutUs = () => {
    const navigate = useNavigate();

    return (
        <main className="about-page">
            {/* Hero */}
            <section className="about-hero">
                <div className="about-hero-overlay" />

                <Container className="about-hero-content">
                    <span className="about-eyebrow">
                        <FaCompass /> THE STORY BEHIND WANDERLUST
                    </span>

                    <h1>
                        We believe life
                        <br />
                        is better <span>explored.</span>
                    </h1>

                    <p>
                        We're here to turn your travel dreams into meaningful
                        experiences, one destination and one unforgettable memory
                        at a time.
                    </p>

                    <Button
                        className="about-primary-btn"
                        onClick={() => navigate("/trips")}
                    >
                        Explore Our Trips <FaArrowRight />
                    </Button>
                </Container>

                <div className="about-hero-caption">
                    <span>GO FURTHER.</span>
                    <span>FEEL MORE.</span>
                    <span>LIVE FULLY.</span>
                </div>
            </section>

            {/* Our story */}
            <section className="about-story-section">
                <Container>
                    <Row className="align-items-center g-5">
                        <Col lg={6}>
                            <div className="about-story-images">
                                <img
                                    className="about-story-main-image"
                                    src="https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg"
                                    alt="Beautiful natural travel destination"
                                    loading="lazy"
                                />

                                <img
                                    className="about-story-small-image"
                                    src="https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg"
                                    alt="Travelers exploring the mountains"
                                    loading="lazy"
                                />

                                <div className="about-image-note">
                                    <FaGlobeAmericas />
                                    <span>
                                        The world is full
                                        <br />
                                        of possibilities.
                                    </span>
                                </div>
                            </div>
                        </Col>

                        <Col lg={6}>
                            <div className="about-story-content">
                                <span className="about-section-label">OUR STORY</span>

                                <h2>
                                    More than a trip.
                                    <br />
                                    <span>A feeling that stays.</span>
                                </h2>

                                <p>
                                    At Wanderlust, we believe travel is about more than
                                    reaching a destination. It's about the people you meet,
                                    the cultures you discover, and the moments that change
                                    how you see the world.
                                </p>

                                <p>
                                    Our goal is to make discovering new places feel
                                    inspiring and approachable. Whether you're seeking
                                    peaceful escapes, scenic adventures, or a fresh
                                    perspective, we're here to help you find your next
                                    journey.
                                </p>

                                <div className="about-story-highlight">
                                    <FaQuoteLeft />
                                    <p>
                                        Collect moments, discover perspectives, and let
                                        every journey tell a new story.
                                    </p>
                                </div>

                                <Button
                                    className="about-outline-btn"
                                    onClick={() => navigate("/trips")}
                                >
                                    Find Your Next Adventure <FaArrowRight />
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Mission and vision */}
            <section className="about-mission-section">
                <Container>
                    <div className="about-centered-heading">
                        <span className="about-section-label">WHY WE EXIST</span>
                        <h2>
                            Travel with <span>purpose.</span>
                        </h2>
                        <p>
                            Every great journey starts with a reason to explore.
                            Here's what guides everything we do.
                        </p>
                    </div>

                    <Row className="g-4">
                        <Col md={6}>
                            <article className="about-purpose-card">
                                <div className="about-purpose-icon">
                                    <FaCompass />
                                </div>

                                <span>01 / OUR MISSION</span>

                                <h3>Make exploration accessible.</h3>

                                <p>
                                    To inspire people to discover new destinations and
                                    create meaningful travel experiences through
                                    thoughtful planning and helpful information.
                                </p>
                            </article>
                        </Col>

                        <Col md={6}>
                            <article className="about-purpose-card about-purpose-dark">
                                <div className="about-purpose-icon">
                                    <FaGlobeAmericas />
                                </div>

                                <span>02 / OUR VISION</span>

                                <h3>A world full of discovery.</h3>

                                <p>
                                    To become a trusted companion for travelers who want
                                    to explore the world with curiosity, confidence,
                                    and respect for the places they visit.
                                </p>
                            </article>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Values */}
            <section className="about-values-section">
                <Container>
                    <div className="about-values-heading">
                        <div>
                            <span className="about-section-label">WHAT GUIDES US</span>
                            <h2>
                                The values behind
                                <br />
                                <span>every journey.</span>
                            </h2>
                        </div>

                        <p>
                            The way we travel matters just as much as where we go.
                            These principles shape the experiences we hope to inspire.
                        </p>
                    </div>

                    <Row className="g-4">
                        {values.map((value, index) => (
                            <Col md={4} key={value.title}>
                                <article className="about-value-card">
                                    <span className="about-value-number">
                                        0{index + 1}
                                    </span>

                                    <div className="about-value-icon">
                                        {value.icon}
                                    </div>

                                    <h3>{value.title}</h3>

                                    <p>{value.description}</p>

                                    <span className="about-value-line" />
                                </article>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* Travel inspiration banner */}
            <section className="about-inspiration">
                <div className="about-inspiration-overlay" />

                <Container className="about-inspiration-content">
                    <span className="about-section-label">
                        YOUR NEXT CHAPTER AWAITS
                    </span>

                    <h2>
                        The world won't
                        <br />
                        explore <span>itself.</span>
                    </h2>

                    <p>
                        Take the first step. Find a destination that inspires you
                        and start creating stories worth remembering.
                    </p>

                    <Button
                        className="about-primary-btn"
                        onClick={() => navigate("/trips")}
                    >
                        Discover Destinations <FaArrowRight />
                    </Button>
                </Container>
            </section>

            {/* Quick links */}
            <section className="about-quick-links">
                <Container>
                    <Row className="g-4">
                        <Col md={4}>
                            <div className="about-quick-card">
                                <FaRoute />
                                <h3>Find Your Journey</h3>
                                <p>Explore trips that match your sense of adventure.</p>
                                <button onClick={() => navigate("/trips")}>
                                    Browse Trips <FaArrowRight />
                                </button>
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="about-quick-card">
                                <FaUsers />
                                <h3>Let's Connect</h3>
                                <p>Have a question? We'd love to hear from you.</p>
                                <button onClick={() => navigate("/contact")}>
                                    Contact Us <FaArrowRight />
                                </button>
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="about-quick-card">
                                <FaMapMarkerAlt />
                                <h3>Get Inspired</h3>
                                <p>Discover new places and imagine your next escape.</p>
                                <button onClick={() => navigate("/trips")}>
                                    Start Exploring <FaArrowRight />
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    );
};

export default AboutUs;
