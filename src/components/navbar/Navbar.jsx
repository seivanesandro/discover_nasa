import Logo from "../../assets/logo.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./Navbar.css";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const ImgStyle = styled.img`
  width: 130px;
  height: auto;
`;

const StyleNavLink = styled(NavLink)`
  color: #fff; //TODO:change color to white
  font-size: 1.2rem;
  font-weight: 400;
  text-decoration: none;
  cursor: pointer;

  &.active {
    color: gold;
  }

  &:hover {
    color: gold;
    text-decoration: none;
    transition: color 0.3s ease-in-out;
  }
  &:active {
    color: gold;
    text-decoration: none;
    transition: color 0.3s ease-in-out;
  }
  &:focus {
    color: gold;
    text-decoration: none;
    transition: color 0.3s ease-in-out;
  }
`;

function OffcanvasExample() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {["lg"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className={`fixed-top border-bottom border-style ${scrolled ? "navbar-dark-bg" : "bg-transparent"}`}>
          <Container fluid>
            <Navbar.Brand
              as="div"
              className="d-flex justify-content-end"
              style={{cursor: "pointer"}}
              onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}>
              <ImgStyle src={Logo} alt="" style={{width: "130px"}} />
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-${expand}`}
              className="navbar-collapsed-style text-light"
            />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              className="bg-black mt-4 text-light">
              <Offcanvas.Header closeButton className="navbar-collapsed-style">
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <ImgStyle src={Logo} alt="" style={{width: "120px"}} />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-center flex-grow-1 gap-5">
                  <StyleNavLink to="/" end>
                    Epic
                  </StyleNavLink>
                  <StyleNavLink to="/mars" end>
                    Mars
                  </StyleNavLink>
                  <StyleNavLink to="/library" end>
                    Library
                  </StyleNavLink>
                  <StyleNavLink to="/universe" end>
                    Universe
                  </StyleNavLink>
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
