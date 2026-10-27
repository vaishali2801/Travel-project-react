
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Accordion,
} from "react-bootstrap";
import {
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaClock,
    FaArrowRight,
    FaPaperPlane,
    FaCompass,
    FaQuestionCircle,
    FaCheckCircle,
} from "react-icons/fa";
import "./Contact.css";

const Contact = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setSubmitted(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Frontend validation only. Connect an API or email service
        // to deliver the message to your team.
        setSubmitted(true);
    };

    const faqs = [
        {
            question: "How can I book a trip?",
            answer:
                "Visit our Trips page, select your preferred destination, and use the enquiry option to contact us about availability and booking details.",
        },
        {
            question: "Can I ask questions before booking?",
            answer:
                "Absolutely! Send us your questions through this contact form. Our team can help you understand the trip details before you decide.",
        },
        {
            question: "Can I request a customized trip?",
            answer:
                "You can contact us with your preferred destination, travel dates, and interests. Customized arrangements depend on availability and the services offered.",
        },
        {
            question: "How will I receive a response?",
            answer:
                "Please provide a valid email address and the details of your enquiry. Once a contact service is connected, your team can respond using the information you provide.",
        },
    ];

    return (
        <main className="contact-page">
            {/* Hero */}
            <section className="contact-hero">
                <div className="contact-hero-overlay" />

                <Container className="contact-hero-content">
                    <span className="contact-eyebrow">
                        <FaCompass /> LET'S START A CONVERSATION
                    </span>

                    <h1>
                        Every great journey
                        <br />
                        starts with <span>hello.</span>
                    </h1>

                    <p>
                        Have a destination in mind or a question about your next
                        adventure? We'd love to hear from you.
                    </p>

                    <Button
                        className="contact-hero-btn"
                        onClick={() =>
                            document
                                .getElementById("contact-form")
                                ?.scrollIntoView({ behavior: "smooth" })
                        }
                    >
                        Get in Touch <FaArrowRight />
                    </Button>
                </Container>

                <div className="contact-hero-caption">
                    <span>YOUR QUESTIONS.</span>
                    <span>OUR CONVERSATION.</span>
                    <span>YOUR NEXT ADVENTURE.</span>
                </div>
            </section>

            {/* Contact information */}
            <section className="contact-info-section">
                <Container>
                    <div className="contact-section-heading">
                        <span className="contact-section-label">
                            WE'RE HERE FOR YOU
                        </span>

                        <h2>
                            Let's talk about <span>your journey.</span>
                        </h2>

                        <p>
                            Whether you're planning a getaway or simply exploring
                            possibilities, we're ready to help.
                        </p>
                    </div>

                    <Row className="g-4">
                        <Col md={4}>
                            <article className="contact-info-card">
                                <div className="contact-info-icon">
                                    <FaEnvelope />
                                </div>

                                <h3>Email Us</h3>

                                <p>
                                    Send us your questions and travel enquiries.
                                </p>

                                <span className="contact-info-detail">
                                    Your email address here
                                </span>
                            </article>
                        </Col>

                        <Col md={4}>
                            <article className="contact-info-card">
                                <div className="contact-info-icon">
                                    <FaPhoneAlt />
                                </div>

                                <h3>Call Us</h3>

                                <p>
                                    Have a question? Add your business contact number.
                                </p>

                                <span className="contact-info-detail">
                                    Your phone number here
                                </span>
                            </article>
                        </Col>

                        <Col md={4}>
                            <article className="contact-info-card">
                                <div className="contact-info-icon">
                                    <FaClock />
                                </div>

                                <h3>Availability</h3>

                                <p>
                                    Send us a message whenever you need assistance.
                                </p>

                                <span className="contact-info-detail">
                                    Response times may vary
                                </span>
                            </article>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Contact form */}
            <section className="contact-form-section" id="contact-form">
                <Container>
                    <Row className="g-5 align-items-start">
                        <Col lg={5}>
                            <div className="contact-form-intro">
                                <span className="contact-section-label">
                                    DROP US A MESSAGE
                                </span>

                                <h2>
                                    Tell us what's
                                    <br />
                                    <span>on your mind.</span>
                                </h2>

                                <p>
                                    Tell us a little about what you need. Whether it's a
                                    question about a destination or help planning your
                                    next trip, we'll help you find the next step.
                                </p>

                                <div className="contact-promise">
                                    <span className="contact-promise-icon">
                                        <FaCheckCircle />
                                    </span>

                                    <div>
                                        <h4>Personal attention</h4>
                                        <p>
                                            Every enquiry deserves a thoughtful response.
                                        </p>
                                    </div>
                                </div>

                                <div className="contact-promise">
                                    <span className="contact-promise-icon">
                                        <FaCheckCircle />
                                    </span>

                                    <div>
                                        <h4>Travel guidance</h4>
                                        <p>
                                            Get help understanding your destination and trip.
                                        </p>
                                    </div>
                                </div>

                                <div className="contact-location-note">
                                    <FaMapMarkerAlt />
                                    <span>Every great adventure begins somewhere.</span>
                                </div>
                            </div>
                        </Col>

                        <Col lg={7}>
                            <div className="contact-form-card">
                                <div className="contact-form-heading">
                                    <span className="contact-form-icon">
                                        <FaPaperPlane />
                                    </span>

                                    <div>
                                        <h3>Send us a message</h3>
                                        <p>Fill in the details below.</p>
                                    </div>
                                </div>

                                {submitted && (
                                    <div
                                        className="contact-success-message"
                                        role="status"
                                    >
                                        <FaCheckCircle />
                                        <div>
                                            <strong>Form validated successfully!</strong>
                                            <p>
                                                This demo form has not sent your message.
                                                Connect a backend or email service to deliver it.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <Form onSubmit={handleSubmit}>
                                    <Row className="g-3">
                                        <Col md={6}>
                                            <Form.Group controlId="contactName">
                                                <Form.Label>Your Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="name"
                                                    placeholder="Enter your full name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    maxLength={100}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group controlId="contactEmail">
                                                <Form.Label>Email Address</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    placeholder="you@example.com"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    maxLength={254}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12}>
                                            <Form.Group controlId="contactSubject">
                                                <Form.Label>What can we help with?</Form.Label>
                                                <Form.Select
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">Select an enquiry type</option>
                                                    <option value="trip-booking">
                                                        Trip booking
                                                    </option>
                                                    <option value="destination">
                                                        Destination information
                                                    </option>
                                                    <option value="custom-trip">
                                                        Customized trip
                                                    </option>
                                                    <option value="general">
                                                        General enquiry
                                                    </option>
                                                    <option value="other">Other</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12}>
                                            <Form.Group controlId="contactMessage">
                                                <Form.Label>Your Message</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    name="message"
                                                    rows={5}
                                                    placeholder="Tell us about your plans or questions..."
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                    minLength={10}
                                                    maxLength={3000}
                                                />
                                                <Form.Text>
                                                    Minimum 10 characters.
                                                </Form.Text>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12}>
                                            <Button
                                                type="submit"
                                                className="contact-submit-btn"
                                            >
                                                Submit Enquiry <FaArrowRight />
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>

                                <p className="contact-form-footnote">
                                    Please provide accurate contact information so your
                                    team can respond when the form is connected to a
                                    delivery service.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* FAQ */}
            <section className="contact-faq-section">
                <Container>
                    <div className="contact-section-heading">
                        <span className="contact-section-label">
                            NEED A QUICK ANSWER?
                        </span>

                        <h2>
                            Frequently asked <span>questions.</span>
                        </h2>

                        <p>
                            A few helpful answers to get your travel planning started.
                        </p>
                    </div>

                    <Row className="justify-content-center">
                        <Col lg={9}>
                            <Accordion className="contact-faq-accordion">
                                {faqs.map((faq, index) => (
                                    <Accordion.Item
                                        eventKey={String(index)}
                                        key={faq.question}
                                    >
                                        <Accordion.Header>
                                            <span className="contact-faq-number">
                                                0{index + 1}
                                            </span>
                                            {faq.question}
                                        </Accordion.Header>

                                        <Accordion.Body>
                                            {faq.answer}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ))}
                            </Accordion>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Final CTA */}
            <section className="contact-bottom-cta">
                <Container>
                    <div className="contact-bottom-content">
                        <div>
                            <span className="contact-section-label">
                                READY TO EXPLORE?
                            </span>

                            <h2>
                                Your next adventure
                                <br />
                                is <span>waiting.</span>
                            </h2>
                        </div>

                        <Button
                            className="contact-hero-btn"
                            onClick={() => navigate("/trips")}
                        >
                            Explore Our Trips <FaArrowRight />
                        </Button>
                    </div>
                </Container>
            </section>
        </main>
    );
};

export default Contact;
