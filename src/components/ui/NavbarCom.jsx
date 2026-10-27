
import { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { authContext } from "../../context/AuthContext";
import {
  FaCompass,
  FaArrowRight,
  FaBars,
  FaUserCircle,
  FaSuitcase,
  FaSignOutAlt,
} from "react-icons/fa";
import "./NavbarCom.css";

function NavbarCom() {
  const { user, loading } = useContext(authContext);
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setExpanded(false);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const closeMenu = () => setExpanded(false);

  return (
    <Navbar
      expand="lg"
      expanded={expanded}
      onToggle={setExpanded}
      className="travel-navbar"
    >
      <Container>
        <Navbar.Brand
          as={NavLink}
          to="/"
          className="travel-brand"
          onClick={closeMenu}
        >
          <span className="travel-brand-icon">
            <FaCompass />
          </span>

          <span className="travel-brand-name">
            wander<span>lust.</span>
          </span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="travel-navbar-menu"
          className="travel-navbar-toggle"
          aria-label="Toggle navigation"
        >
          <FaBars />
        </Navbar.Toggle>

        <Navbar.Collapse id="travel-navbar-menu">
          <Nav className="mx-auto travel-nav-links">
            <Nav.Link as={NavLink} to="/" end onClick={closeMenu}>
              Home
            </Nav.Link>

            <Nav.Link as={NavLink} to="/trips" onClick={closeMenu}>
              Trips
            </Nav.Link>

            <Nav.Link as={NavLink} to="/aboutUs" onClick={closeMenu}>
              About Us
            </Nav.Link>

            <Nav.Link as={NavLink} to="/contact" onClick={closeMenu}>
              Contact
            </Nav.Link>

            {user && (
              <Nav.Link
                as={NavLink}
                to="/myBookings"
                onClick={closeMenu}
              >
                <FaSuitcase className="me-2" />
                My Bookings
              </Nav.Link>
            )}
          </Nav>

          <div className="travel-navbar-actions">
            {!loading && (
              user ? (
                <>
                  <span className="travel-user-label">
                    <FaUserCircle />
                    {user.displayName || user.email || "Traveler"}
                  </span>

                  <Button
                    type="button"
                    className="travel-navbar-cta"
                    onClick={handleLogout}
                  >
                    Logout
                    <FaSignOutAlt className="travel-cta-arrow" />
                  </Button>
                </>
              ) : (
                <Button
                  as={NavLink}
                  to="/login"
                  className="travel-navbar-cta"
                  onClick={closeMenu}
                >
                  Login
                  <FaArrowRight className="travel-cta-arrow" />
                </Button>
              )
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarCom;
