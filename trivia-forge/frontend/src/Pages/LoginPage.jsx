import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { getUser, getGames } from '../Services/TF-db_services';
import useStore from '../Components/useStore';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    // set user and games as global variables
    const setCurrentUser = useStore(state => state.setCurrentUser);
    const setUserGames = useStore(state => state.setUserGames);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // call getUser function to validate user credentials 
            const user = await getUser(email, password);
            // user doesn't exist
            if (user.error !== undefined) {
                alert('Error logging in: Invalid email or password');
                return;
            }

            // get games created by user id 
            const games = await getGames(user.id);

            // set user and games in global store
            setCurrentUser(user);
            //setUserGames(games);

            // console.log('User games:', games);

            //pass user and games as state to myTrivia page
            navigate('/myTrivia', { state: { user, games } });

        } catch (error) {
            console.error('Error during login:', error);
            alert('Error logging in. Please try again.');
        }
    };

    return (
        <div className="d-flex justify-content-center mt-5">
            <title>Login</title>
            <Card style={{ width: '35rem'}}>
                <Form onSubmit={handleSubmit} className="form-group">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <p>Not a member? <Link to="/signUp">Sign Up</Link></p>
                    <div className="d-flex justify-content-center">
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
}
export default LoginPage;