import React from "react";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Navigation() {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">

                <Nav className="me-auto">
                    <Nav.Link className="navbar-brand" href="/">Home</Nav.Link>
                    <Nav.Link href="/triviaGen">Create New Trivia</Nav.Link>
                    <Nav.Link href="/myTrivia">My Trivia</Nav.Link>
                </Nav>

            </Navbar>
        </>
    );
}
export default Navigation;