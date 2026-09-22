import React from 'react'
import { Carousel, Image } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <Carousel fade>
        <Carousel.Item>
          <video
            className="w-100"
            autoPlay
            muted
            style={{
              maxHeight: "100vh",
              objectFit: "cover",
            }}
          >
            <source
              src="https://www.pexels.com/download/video/4328786/"
              type="video/mp4"
            ></source>
          </video>

          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            src="https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg"
            alt="slider-2"
            className="w-100"
            style={{
              maxHeight: "100vh",
              objectFit: "cover",
            }}
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            src="https://images.pexels.com/photos/2131623/pexels-photo-2131623.jpeg"
            alt="slider3"
            className="w-100"
            style={{
              maxHeight: "100vh",
              objectFit: "cover",
            }}
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  )
}

export default Home
