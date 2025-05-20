import Logo from "../../assets/logo.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./Navbar.css";
import styled from "styled-components";
import {NavLink} from "react-router-dom";

const ImgStyle = styled.img`
  width: 130px ;
  height: auto ;
`;


const StyleNavLink = styled(NavLink)`
  color: #fff; //TODO:change color to white
  font-size: 1.2rem ;
  font-weight: 400 ;
  text-decoration: none ;
  cursor: pointer ;

  &.active{
    color:gold;
  }

  &:hover {
    color: gold ;
    text-decoration: none ;
    transition: color 0.3s ease-in-out ;
  }
  &:active {
    color: gold ;
    text-decoration: none ;
    transition: color 0.3s ease-in-out ;
  }
  &:focus {
    color: gold ;
    text-decoration: none ;
    transition: color 0.3s ease-in-out ;
  }
`;

function OffcanvasExample() {
  return (
    <>
      {["lg"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="bg-transparent mt-4 shadow border-bottom border-light shadow-light">
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
                  <StyleNavLink to="/" end>Epic</StyleNavLink>
                  <StyleNavLink to="/mars" end>Mars</StyleNavLink>
                  <StyleNavLink to="/asteroids" end>Asteroids</StyleNavLink>
                  <StyleNavLink to="/universe" end>Universe</StyleNavLink>
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
