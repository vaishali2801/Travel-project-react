import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import "./NavbarCom.css";

function NavbarCom() {
  return (
    <Navbar expand="lg" className="bg-green">
      <Container>
        <Navbar.Brand href="#home" className='p-2'>React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" className=''>Home</Nav.Link>
            <Nav.Link  as={NavLink} to="/trips" className=''>trips</Nav.Link>
            <Nav.Link  as={NavLink} to="/aboutUs" className=''>About us</Nav.Link>
            <Nav.Link  as={NavLink} to="/contact" className=''>Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarCom;