import React from "react";
import { Button, Container, Row, Col} from 'react-bootstrap';
import '../App.css';
import { FaRegFolderOpen, FaPlusCircle, FaUserCircle, FaUserPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import useStore from "../hooks/useStore";

function Home() {
    const navigate = useNavigate();
    const currentUser = useStore(state => state.currentUser);

    return (
        <Container className="homepage-container">
            <title>Home</title>
            <Row>
                <Col>
                    <svg className="header-animation">
                        <text x="50%" y="50%" dy=".35em" textAnchor="middle">
			                Trivia Forge
		                </text>
                    </svg>
                </Col >
            </Row>
            <Row>
                <Col>
                    <Button variant="primary" onClick={() => navigate('/myTrivia')}> <FaRegFolderOpen /> My Trivia Games </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="primary" onClick={() => navigate('/triviagen')}> <FaPlusCircle /> Create New Game </Button>
                </Col>
            </Row>
            {!currentUser && (
                <>
                    <Row>
                        <Col>
                            <Button variant="primary" onClick={() => navigate('/login')}> <FaUserCircle /> Login </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="primary" onClick={() => navigate('/signUp')}> <FaUserPlus /> Sign Up </Button>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
};
export default Home;
