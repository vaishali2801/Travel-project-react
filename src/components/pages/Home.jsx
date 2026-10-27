
import React from "react";
import { Carousel, Container, Navbar, Nav, Button } from "react-bootstrap";
import { FaArrowRight, FaPlay, FaCompass } from "react-icons/fa";
import "./Home.css";

const slides = [
  {
    type: "video",
    src: "https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_25fps.mp4",
    eyebrow: "DISCOVER SOMETHING NEW",
    title: "Find your next",
    highlight: "great escape.",
    description:
      "Explore breathtaking destinations, unforgettable experiences, and places that make every journey special.",
    button: "Explore Destinations",
    image: "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg",
  },
  {
    type: "image",
    src: "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg",
    eyebrow: "CHASE THE EXTRAORDINARY",
    title: "Adventure is",
    highlight: "out there.",
    description:
      "From peaceful landscapes to thrilling adventures, your next favorite memory is waiting to happen.",
    button: "Start Exploring",
  },
  {
    type: "image",
    src: "https://images.pexels.com/photos/2131623/pexels-photo-2131623.jpeg",
    eyebrow: "MAKE EVERY MOMENT COUNT",
    title: "See the world",
    highlight: "differently.",
    description:
      "Discover beautiful places, experience different cultures, and turn your travel dreams into reality.",
    button: "Discover More",
  },
];

const Home = () => {
  return (
    <main className="travel-home">

      <section className="hero-section" id="home">
        <Carousel
          fade
          interval={6000}
          pause={false}
          controls={true}
          indicators={true}
          className="hero-carousel"
        >
          {slides.map((slide, index) => (
            <Carousel.Item key={slide.title}>
              {slide.type === "video" ? (
                <video
                  className="hero-media"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={slide.image}
                >
                  <source src={slide.src} type="video/mp4" />
                </video>
              ) : (
                <img
                  className="hero-media"
                  src={slide.src}
                  alt={`${slide.title} ${slide.highlight}`}
                />
              )}

              <div className="hero-overlay" />

              <Container className="hero-content-container">
                <div className="hero-content" key={index}>
                  <span className="hero-eyebrow">
                    <span className="eyebrow-line" />
                    {slide.eyebrow}
                  </span>

                  <h1>
                    {slide.title}
                    <br />
                    <span>{slide.highlight}</span>
                  </h1>

                  <p className="hero-description">{slide.description}</p>

                  <div className="hero-actions">
                    <Button
                      className="hero-primary-btn"
                      onClick={() =>
                        document
                          .getElementById("destinations")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                    >
                      {slide.button}
                      <FaArrowRight />
                    </Button>

                    <a
                      href="#experiences"
                      className="hero-secondary-btn"
                    >
                      <span className="play-icon">
                        <FaPlay />
                      </span>
                      Explore the journey
                    </a>
                  </div>

                  <div className="hero-bottom-info">
                    <div className="hero-stat">
                      <strong>120+</strong>
                      <span>Destinations</span>
                    </div>
                    <div className="stat-divider" />
                    <div className="hero-stat">
                      <strong>50k+</strong>
                      <span>Happy explorers</span>
                    </div>
                  </div>
                </div>
              </Container>

              <div className="hero-side-label">
                TRAVEL • EXPLORE • REPEAT
              </div>
            </Carousel.Item>
          ))}
        </Carousel>

        <div className="scroll-indicator">
          <span />
          Scroll to discover
        </div>
      </section>

      <section className="destination-section" id="destinations">
        <Container>
          <div className="destination-heading">
            <div>
              <span className="section-eyebrow">YOUR NEXT ADVENTURE</span>
              <h2>
                Places that take
                <br />
                your breath <span>away.</span>
              </h2>
            </div>

            <p>
              The world is full of beautiful places.
              Find the one that speaks to you.
            </p>
          </div>

          <div className="destination-grid">
            <article className="destination-card destination-large">
              <img
                src="https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg"
                alt="Mountain adventure"
                loading="lazy"
              />
              <div className="destination-card-overlay">
                <span>01 / ADVENTURE</span>
                <h3>Into the wild</h3>
                <p>Find your own path.</p>
              </div>
            </article>

            <article className="destination-card">
              <img
                src="https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg"
                alt="Beautiful tropical destination"
                loading="lazy"
              />
              <div className="destination-card-overlay">
                <span>02 / ESCAPE</span>
                <h3>Island dreams</h3>
                <p>Slow down and breathe.</p>
              </div>
            </article>

            <article className="destination-card">
              <img
                src="https://images.pexels.com/photos/2131623/pexels-photo-2131623.jpeg"
                alt="Scenic travel destination"
                loading="lazy"
              />
              <div className="destination-card-overlay">
                <span>03 / DISCOVERY</span>
                <h3>Beyond the ordinary</h3>
                <p>Make memories that last.</p>
              </div>
            </article>
          </div>
        </Container>
      </section>

      <section className="experience-section" id="experiences">
        <Container>
          <span className="section-eyebrow">THE WORLD IS WAITING</span>
          <h2>Don't just dream it. Live it.</h2>
          <p>
            Your next unforgettable story starts with a single step.
          </p>
          <Button
            className="hero-primary-btn"
            onClick={() =>
              document
                .getElementById("home")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Begin Your Journey <FaArrowRight />
          </Button>
        </Container>
      </section>

      <footer className="home-footer" id="about">
        <Container className="footer-content">
          <a href="#home" className="brand-logo">
            <span className="brand-icon">
              <FaCompass />
            </span>
            wander<span>lust.</span>
          </a>
          <p>Made for the moments that matter.</p>
          <span>© {new Date().getFullYear()} Wanderlust. All rights reserved.</span>
        </Container>
      </footer>
    </main>
  );
};

export default Home;
