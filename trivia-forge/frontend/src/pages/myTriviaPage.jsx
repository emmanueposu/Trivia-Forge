import { React, useState, useEffect } from "react";
import { getGamesWithDetails, deleteGame } from "../services/triviaForgeApiService";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import UnorderedCategoriesList from "../components/UnorderedCategoriesList";
import QuestionsCount from "../components/QuestionsCount";
import Slideshow from "../components/Slideshow";
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from "react-router-dom";
import useStore from '../hooks/useStore';


function MyTriviaPage() {
    const [showGame, setShowGame] = useState(false); // visibility of game modal
    const [spinnerDisplay, setSpinnerDisplay] = useState("none");
    const [noGamesMsgDisplay, setNoGamesMsgDisplay] = useState("none");
    const [showWarning, setShowWarning] = useState(false); // visibility of warning modal
    const [currentGame, setCurrentGame] = useState(null); // store current game
    const navigate = useNavigate();
    const currentUser = useStore(state => state.currentUser);
    const userGames = useStore(state => state.userGames);
    const setUserGames = useStore(state => state.setUserGames);
    const loaded = useStore(state => state.loaded);
    const setLoaded = useStore(state => state.setLoaded);

    useEffect(() => {
        if (!currentUser) {
            setNoGamesMsgDisplay("");
        }
    }, []);
    // fetch game with details when the user changes
    useEffect(() => {
        if (currentUser && loaded === false) {
            setSpinnerDisplay("flex");
            // console.log("calling getGamesWithDetails");
            getGamesWithDetails(currentUser.id).then(res => {
                if (res.length > 0) {
                    setUserGames(res);
                } else {
                    setNoGamesMsgDisplay("");
                }
                setLoaded(true);
                setSpinnerDisplay("none")
            });
        } else if (currentUser && loaded === true) {
            if (userGames.length === 0) {
                setNoGamesMsgDisplay("");
            }
        }
    }, [userGames]);

    function handleGameShow(game) {
        setCurrentGame(game);
        setShowGame(true);
    };
    function handleGameClose() {
        setShowGame(false);
    };

    function handleShowWarning(game) {
        setCurrentGame(game);
        setShowWarning(true);
    };
    function handleWarningClose() {
        setShowWarning(false);
    };
    function handleDelete() {
        deleteGame(currentGame).then(res => {
            setUserGames(userGames.filter(g => g.id !== currentGame.id));
        });
        setShowWarning(false);
    };

    return (
        <>
            <title>My Trivia</title>

            <div className="justify-content-center align-items-center" style={{ height: "50rem", display: spinnerDisplay }}>
                <Spinner animation="border" role="status" variant="warning" className="" style={{ height: "9rem", width: "9rem" }} />
            </div>
            {/* check if there are games to display */}
            {userGames.length > 0 && (
                <Row xs={2} md={4} className="g-4 m-4">
                    {/* iterate over games */}
                    {userGames.map((game, index) => (
                        <Col key={index}>
                            <Card className="" style={{ backgroundColor: "#f5f3f4" }}>
                                <Card.Header as="h4">{game.title}</Card.Header>

                                <Card.Body>
                                    <Card.Title as="h6">Categories:</Card.Title>
                                    <Card.Text>
                                        <UnorderedCategoriesList data={game} />
                                    </Card.Text>

                                    <Card.Title as="h6">Questions:</Card.Title>
                                    <Card.Text>
                                        <QuestionsCount data={game} />
                                    </Card.Text>

                                    <div className="text-center">
                                        <Button onClick={() => handleGameShow(game)} variant="success">Play</Button>
                                        <Button onClick={() => navigate('/review', { state: { 'game': game, 'page': 'edit' } })} variant="secondary" className="mx-3">Edit</Button>
                                        <Button onClick={() => handleShowWarning(game)} variant="dark">Delete</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            <div className="text-center mt-5" style={{ display: noGamesMsgDisplay }}>
                <h1>No games to display</h1>

                <Link to="/triviaGen" className="text-decoration-none">Add Game</Link>
            </div>

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

            <Modal show={showGame} onHide={handleGameClose} fullscreen={true}>
                <Modal.Header data-bs-theme="dark" closeButton style={{ backgroundColor: "#240046", border: "none" }}>
                </Modal.Header>

                <Modal.Body style={{ backgroundColor: "#240046" }}>
                    <Slideshow data={currentGame} />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default MyTriviaPage;
