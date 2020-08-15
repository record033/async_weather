import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { NavLinksWrapper } from "./styles";

export const NavBar = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>Weather</Navbar.Brand>
        <NavLinksWrapper>
          <Navbar.Text style={{ margin: "0 10px 0 10px" }}>
            <Link to="/">Get by current position</Link>
          </Navbar.Text>
          <Navbar.Text style={{ margin: "0 10px 0 10px" }}>
            <Link to="/city">Get by input</Link>
          </Navbar.Text>
        </NavLinksWrapper>
      </Container>
    </Navbar>
  );
};
