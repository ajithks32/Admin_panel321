import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaDatabase } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { PiAppStoreLogoBold } from "react-icons/pi";
import "./navbar.css";

const Navbars = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded(!expanded);
  const closeNavbar = () => setExpanded(false);

  return (
    <Navbar
      expand="lg"
      className="navbar-colourchange"
      sticky="top"
      expanded={expanded} // Control collapse state
    >
      <Container fluid>
        {/* Brand Name */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold text-white d-flex align-items-center"
          onClick={closeNavbar} // Close on brand click
        >
          <PiAppStoreLogoBold className="logo me-2" /> Grace Academy
        </Navbar.Brand>

        {/* Toggle Button */}
        <Navbar.Toggle
          aria-controls="navbarScroll"
          onClick={handleToggle} // Toggle expand state
          className="text-white"
        />

        <Navbar.Collapse id="navbarScroll">
          <Nav className=" my-2 my-lg-0 ms-auto" navbarScroll>
            <Nav.Link
              as={Link}
              to="/"
              className="fw-semibold me-3 nav-hover text-white d-flex align-items-center"
              onClick={closeNavbar} // Close navbar on link click
            >
              <FaHome className="me-1 homepage-icons" />
              Homes
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/details"
              className="fw-semibold me-3 nav-hover text-white d-flex align-items-center"
              onClick={closeNavbar}
            >
              <FaDatabase className="me-1 homepage-icons" />
              Details
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/addstaff"
              className="fw-semibold me-3 nav-hover text-white d-flex align-items-center"
              onClick={closeNavbar}
            >
              <IoPersonAdd className="me-1 homepage-icons" />
              AddStaff
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/addstudent"
              className="fw-semibold me-3 nav-hover text-white d-flex align-items-center"
              onClick={closeNavbar}
            >
              <IoPersonAdd className="me-1 homepage-icons" />
              AddStudent
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              className="fw-semibold nav-hover text-white d-flex align-items-center"
              onClick={closeNavbar}
            >
              <BiSolidMessageRoundedDetail className="me-1 homepage-abouticon" />
              About
            </Nav.Link>
          </Nav>

        
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbars;
