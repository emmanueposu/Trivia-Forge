import React from "react";
import { Button, Container, Row, Col} from 'react-bootstrap';
import '../App.css';
import { FaRegFolderOpen, FaPlusCircle, FaUserCircle, FaUserPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

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
            <Row>
                <Col>
                    <Button variant="primary"> <FaUserCircle /> Login </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="primary" onClick={() => navigate('/signUp')}> <FaUserPlus /> Sign Up </Button>
                </Col>
            </Row>
        </Container>
    );
};
export default Home;

{/* // <div id="test">
    //     <h2 class="mt-5 mb-3">Customize Your Game!</h2>
    //     <div class="container">
    //         <div class="justify-content-center d-flex text-start">
    //             <form class="border rounded-4 p-5 col-5" id="customForm">
    //                 <label class="form-label">Game Name</label>
    //                 <input type="text" class="form-control" required></input>
    //                 <label class="form-label mt-3">Catgeories</label>
    //                 <div class="form-check">
    //                     <input type="checkbox" class="form-check-input" name="category"></input>
    //                     <label class="form-check-label" for="category">History</label>
    //                 </div>
    //                 <div class="form-check">
    //                     <input type="checkbox" class="form-check-input" name="category"></input>
    //                     <label class="form-check-label" for="category">Science</label>
    //                 </div>    
    //                 <div class="form-check">
    //                     <input type="checkbox" class="form-check-input" name="category"></input>
    //                     <label class="form-check-label" for="category">Geography</label>
    //                 </div>    
    //                 <div class="form-check">
    //                     <input type="checkbox" class="form-check-input" name="category"></input>
    //                     <label class="form-check-label" for="category">Sports</label>
    //                 </div>
    //                 <div class="form-check">                
    //                     <input type="checkbox" class="form-check-input" name="category"></input>
    //                     <label class="form-check-label" for="category">Art and Literature</label>
    //                 </div>
    //                 <label class="form-label mt-3">Number of Questions</label>
    //                 <input type="number" class="form-control" min="1"></input>
    //                 <label class="form-label mt-3">Difficulty</label>
    //                 <div class="form-check">
    //                     <input type="radio" class="form-check-input" name="category"></input>
    //                     <label class="form-check-label" for="category">Easy</label>
    //                 </div>
    //                 <div class="form-check">
    //                     <input type="radio" class="form-check-input" name="category"></input>
    //                     <label class="form-check-label" for="category">Medium</label>
    //                 </div>    
    //                 <div class="form-check mb-3">
    //                     <input type="radio" class="form-check-input" name="category"></input>
    //                     <label class="form-check-label" for="category">Hard</label>
    //                 </div>
    //                 <div class="text-center">        
    //                     <button type="submit" class="btn btn-warning">Submit</button>
    //                 </div>
    //             </form>
    //         </div>
    //     </div>
    // </div> */}