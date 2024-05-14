import { React, useState, useEffect } from "react";
import { getGames } from "../Services/TF-db_services";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import GameCategories from "../Components/GameCategories";
import GameQuestions from "../Components/GameQuestions";
import Slideshow from "../Components/Slideshow";
import Modal from 'react-bootstrap/Modal';

function MyTrivia() {
    const [games, setGames] = useState(null);
    const [show, setShow] = useState(false);
    const [currentGame, setCurrentGame] = useState(null)

    useEffect(() => {
        getGames().then( res => {
            setGames(res);
        });
    }, []);

    useEffect(() => {
        if(currentGame) {
            setShow(true);
        }
    }, [currentGame]);

    function handleClose() {
        setShow(false);
        setCurrentGame(null);
    }

    function handleShow(game) {
        setCurrentGame(game);
    }

    return (
        <>  
            <title>My Trivia</title>
            {games &&(
                games.length > 0 ? (
                    <Row xs={2} md={4} className="g-4 m-4">
                        {games.map((game, index) => (
                            <Col key={index}>
                                <Card className="" style={{backgroundColor: "#f5f3f4"}}>
                                    <Card.Header as="h4">{game.title}</Card.Header>
                                    <Card.Body>
                                        <Card.Title as="h6">Categories:</Card.Title>
                                        <Card.Text>
                                            <GameCategories data={game}/>
                                        </Card.Text>
                                        <Card.Title as="h6">Questions:</Card.Title>
                                        <Card.Text>
                                            <GameQuestions data={game}/>
                                        </Card.Text>
                                        <div className="text-center">
                                            <Button onClick={() => handleShow(game)} variant="success" className="mx-2">Play</Button>
                                            <Button onClick={() => navigation.navigate('/review', { state: { game }, state: { page: 'edit' }})} variant="secondary" className="mx-2">Edit</Button>
                                        </div>
                                    </Card.Body>
                                </Card>    
                            </Col>               
                        ))}                    
                    </Row>
                    ) : (
                        <h1 className="text-center mt-5">No games to display.</h1>
                )
            )}
            <Modal show={show} onHide={handleClose} fullscreen={true}>
                <Modal.Header data-bs-theme="dark" closeButton style={{backgroundColor: "#240046", border: "none"}}>
                </Modal.Header>
                <Modal.Body style={{backgroundColor: "#240046" }}>
                    <Slideshow data={currentGame}/>
                </Modal.Body>
            </Modal>
        </>
    );

}
export default MyTrivia;