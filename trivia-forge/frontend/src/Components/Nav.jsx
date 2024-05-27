import React from "react";
import { Navbar } from "react-bootstrap";
import { Nav, Button, Modal, Form } from "react-bootstrap";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import useStore from './useStore';

function Navigation() {
    const [show, setShow] = useState(false);
    const currentUser = useStore(state => state.currentUser);
    const logout = useStore(state => state.logout);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogout = () => {
        logout();
        navigate('/');
    }


    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">

                <Nav className="me-auto">
                    <Nav.Link className="navbar-brand" href="/">Home</Nav.Link>
                    <Nav.Link href="/triviaGen">Create New Trivia</Nav.Link>
                    <Nav.Link href="/myTrivia">My Trivia</Nav.Link>
                </Nav>
                <Nav style={{ marginRight: ".5rem" }}>
                    {currentUser ? (
                        <Button onClick={handleLogout}>
                            <i className="bi bi-person-circle" style={{ marginRight: ".5rem" }}></i>Logout: {currentUser.username}
                        </Button>
                    ) : (
                        <Button onClick={handleShow}>
                            <i className="bi bi-person-circle" style={{ marginRight: ".5rem" }}></i>Log In
                        </Button>
                    )}
                </Nav>

            </Navbar>
            <Modal show={show} onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Label htmlFor="inputEmail">Email</Form.Label>
                        <Form.Control
                            type="email"
                            id="inputEmail"
                        />
                        <Form.Label htmlFor="inputPassword">Password</Form.Label>
                        <Form.Control
                            type="password"
                            id="inputPassword"
                        />
                    </Form>
                    <p>Not a member? <Link onClick={handleClose} to="/signUp">Sign Up</Link></p>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={handleClose} variant="secondary">Close</Button>
                    <Button variant="primary">Sign In</Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}
export default Navigation;