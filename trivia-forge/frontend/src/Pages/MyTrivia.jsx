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
// import BootstrapTable from '../Components/BootstrapTable';

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
            {games &&(
                games.length > 0 ? (
                    <Row xs={2} md={4} className="g-4 m-4">
                        {games.map((game, index) => (
                            <Col key={index}>
                                <Card>
                                    <Card.Header as="h4">{game.title}</Card.Header>
                                    <Card.Body>
                                        <Card.Title as="h6">Category:</Card.Title>
                                        <Card.Text>
                                            <GameCategories data={game}/>
                                        </Card.Text>
                                        <Card.Title as="h6">Number of Questions:</Card.Title>
                                        <Card.Text>
                                            <GameQuestions data={game}/>
                                        </Card.Text>
                                        <div className="text-center">
                                            <Button variant="success" onClick={() => handleShow(game)}>Play Game</Button>
                                        </div>
                                    </Card.Body>
                                </Card>    
                            </Col>               
                        ))}                    
                    </Row>
                    ) : (
                        <p>No games to display.</p>
                )
            )}
            <Modal show={show} onHide={handleClose} fullscreen={true}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Slideshow data={currentGame}/>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    );

}
export default MyTrivia;
// function MyTrivia() {
//     return (
//         <>
//             <p>
//                 My Trivia Page test

//             </p>
//             <BootstrapTable />
//         </>
//     );

// }
// export default MyTrivia;