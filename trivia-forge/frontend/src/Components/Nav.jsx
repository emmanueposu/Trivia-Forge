import React from "react";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom"
const loginIcon = "https://yxdrsdfocuonvorowgaa.supabase.co/storage/v1/object/sign/UI%20Assets/Login%20Icon.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJVSSBBc3NldHMvTG9naW4gSWNvbi5zdmciLCJpYXQiOjE3MTQwNDQ1NjQsImV4cCI6NDg2NzY0NDU2NH0.-IE25tSqh2pH4EwagAEHzml4lv0mJwZgptA73XO2zpY&t=2024-04-25T11%3A29%3A24.290Z"

function Navigation() {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">

                <Nav className="me-auto">
                    <Nav.Link className="navbar-brand" href="/">Home</Nav.Link>
                    <Nav.Link href="/triviaGen">Create New Trivia</Nav.Link>
                    <Nav.Link href="/myTrivia">My Trivia</Nav.Link>
                </Nav>
                <Nav>
                    <img src={loginIcon} id="test"></img>
                    <Nav.Link href="#">Log In</Nav.Link>
                </Nav>

            </Navbar>
        </>
    );
}
export default Navigation;