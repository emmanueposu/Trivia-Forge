import { React, useState, useEffect } from "react";
import { getGames, getGamesWithDetails, deleteGame } from "../Services/TF-db_services";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import GameCategories from "../Components/GameCategories";
import GameQuestions from "../Components/GameQuestions";
import Slideshow from "../Components/Slideshow";
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import useStore from '../Components/useStore';

function MyTrivia() {
    // const [games, setGames] = useState(null); // store list of games
    const [show, setShow] = useState(false); // visibility of modal
    const [showWarning, setShowWarning] = useState(false); // visibility of warning modal
    const [currentGame, setCurrentGame] = useState(null); // store current game
    const [loaded, setLoaded] = useState(false);
    // const [gamesWithDetails, setGamesWithDetails] = useState([]); // store games from user
    const navigate = useNavigate();
    // const location = useLocation();
    const currentUser = useStore(state => state.currentUser);
    const userGames = useStore(state => state.userGames);
    const setUserGames = useStore(state => state.setUserGames);

    // const user = location.state?.user;

    // fetch game with details when the user changes
    useEffect(() => {
        if (currentUser && !loaded) {
            setLoaded(true);
            console.log("calling getGamesWithDetails");
            getGamesWithDetails(currentUser.id).then(res => {
                setUserGames(res);
            });
        }

        // Cleanup function to reset loaded when component unmounts
        return () => {
            setLoaded(false);
        };
    }, [currentUser, userGames, setUserGames]);

    useEffect(() => {
        if (currentGame) {
            setShow(true);
        }
    }, [currentGame]);

    function handleClose() {
        setShow(false);
        setCurrentGame(null);
    }

    function handleShow(game) {
        setCurrentGame(game);
        setShow(true);
    }
    function handleShowWarning(game) {
        setCurrentGame(game);
        setShowWarning(true);
    }
    function handleWarningClose() {
        setShowWarning(false);
    }
    function handleDelete(game) {
        deleteGame(game).then(res => {
            setUserGames(userGames.filter(g => g.id !== game.id));
        });
    }

    console.log(userGames);
    return (
        <>
            <title>My Trivia</title>
            {/* check if there are games ti display */}
            {userGames.length > 0 ? (
                <Row xs={2} md={4} className="g-4 m-4">
                    {/* iterate over games */}
                    {userGames.map((game, index) => (
                        <Col key={index}>
                            <Card className="" style={{ backgroundColor: "#f5f3f4" }}>
                                <Card.Header as="h4">{game.title}</Card.Header>
                                <Card.Body>
                                    <Card.Title as="h6">Categories:</Card.Title>
                                    <Card.Text>
                                        <GameCategories data={game} />
                                    </Card.Text>
                                    <Card.Title as="h6">Questions:</Card.Title>
                                    <Card.Text>
                                        <GameQuestions data={game} />
                                    </Card.Text>
                                    <div className="text-center">
                                        <Button onClick={() => handleShow(game)} variant="success" className="mx-2">Play</Button>
                                        <Button onClick={() => navigate('/review', { state: { 'game': game, 'page': 'edit' } })} variant="secondary" className="mx-2">Edit</Button>
                                        <Button onClick={() => handleShowWarning(game)} >Delete</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <h1 className="text-center mt-5">No games to display.</h1>
            )}
            <Modal show={show} onHide={handleClose} fullscreen={true}>
                <Modal.Header data-bs-theme="dark" closeButton style={{ backgroundColor: "#240046", border: "none" }}>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: "#240046" }}>
                    <Slideshow data={currentGame} />
                </Modal.Body>
            </Modal>
            <Modal show={showWarning} onHide={handleWarningClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this game?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleWarningClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={() => handleDelete(currentGame)}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default MyTrivia;