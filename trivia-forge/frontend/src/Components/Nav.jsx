import React from "react";
import { Navbar } from "react-bootstrap";
import { Nav, Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useStore from './useStore';

function Navigation() {
    const currentUser = useStore(state => state.currentUser);
    const logout = useStore(state => state.logout);
    const navigate = useNavigate();

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
                <Nav className="me-2">
                    {currentUser ? (
                        <Button onClick={handleLogout}>
                            <i className="bi bi-person-circle me-2"></i>Logout: {currentUser.username}
                        </Button>
                    ) : (
                        <Button onClick={() => navigate('/login')}>
                            <i className="bi bi-person-circle me-2"></i>Log In
                        </Button>
                    )}
                </Nav>
            </Navbar>
        </>
    );
}
export default Navigation;