import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const NavbarComponents = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#">User Management Dashboard</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavbarComponents;
