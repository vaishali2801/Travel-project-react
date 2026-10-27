
import { Spinner } from "react-bootstrap";
import { FaCompass } from "react-icons/fa";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="wanderlust-loading">
      <div className="loading-content">
        <div className="loading-brand">
          <FaCompass className="loading-brand-icon" />
          <span>wanderlust.</span>
        </div>

        <div className="loading-divider" />

        <p className="loading-eyebrow">YOUR NEXT ESCAPE AWAITS</p>

        <h1>
          The world is
          <br />
          <em>waiting for you.</em>
        </h1>

        <p className="loading-description">
          Curating beautiful destinations and unforgettable experiences.
        </p>

        <div className="loading-spinner-wrapper">
          <Spinner animation="border" role="status" className="loading-spinner">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>

        <p className="loading-status">Preparing your next adventure</p>

        <div className="loading-progress-track">
          <div className="loading-progress-bar" />
        </div>

        <span className="loading-footer">
          EXPLORE MORE. WORRY LESS.
        </span>
      </div>

      <div className="loading-bottom-decoration">
        DISCOVER <span>·</span> EXPLORE <span>·</span> EXPERIENCE
      </div>
    </div>
  );
};

export default Loading;
