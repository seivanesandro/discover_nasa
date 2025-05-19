import Logo from "../../assets/logo.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./Navbar.css";
import styled from "styled-components";

const ImgStyle = styled.img`
  width: 130px !important;
  height: auto !important;
`;


const NavLink = styled.a`
  color: #000 !important; //TODO:change color to white
  font-size: 1.2rem !important;
  font-weight: 400 !important;
  text-decoration: none !important;
  &:hover {
    color: gold !important; 
    text-decoration: none !important;
    transition: color 0.3s ease-in-out;
  }
  &:active {
    color: gold !important; 
    text-decoration: none !important;
    transition: color 0.3s ease-in-out;
  }
  &:focus {
    color: gold !important; 
    text-decoration: none !important;
    transition: color 0.3s ease-in-out;
  }
`;

function OffcanvasExample() {
  return (
    <>
      {["lg"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="bg-transparent mb-5 border border-bottom border-bottom-light shadow shadow-light">
          <Container fluid>
            <Navbar.Brand href="#" className="d-flex justify-content-end">
              <ImgStyle src={Logo} alt="" style={{width: "130px"}} />
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-${expand}`}
              className="navbar-collapsed-style"
            />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end">
              <Offcanvas.Header closeButton className="navbar-collapsed-style">
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <ImgStyle src={Logo} alt="" style={{width: "120px"}} />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-center flex-grow-1 gap-5">
                  <NavLink href="#action1">Epic</NavLink>
                  <NavLink href="#action2">Mars</NavLink>
                  <NavLink href="#action2">Asteroids</NavLink>
                  <NavLink href="#action2">Universe</NavLink>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasExample;
