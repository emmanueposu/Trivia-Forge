import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { getUser} from '../services/triviaForgeApiService';
import useStore from '../hooks/useStore';


function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    // set user as global variable
    const setCurrentUser = useStore(state => state.setCurrentUser);
  
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
            // set user in global store
            setCurrentUser(user);
            navigate('/myTrivia');
        } catch (error) {
            console.error('Error during login:', error);
            alert('Error logging in. Please try again.');
        }
    };

    return (
        <>
            <title>Login</title>
            
            <div className="d-flex justify-content-center mt-5">
                <Card style={{ width: '35rem'}}>
                    <Form onSubmit={handleSubmit} className="form-group">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>

                        <p>Not a member? <Link to="/signUp" className="text-decoration-none">Sign Up</Link></p>

                        <div className="d-flex justify-content-center">
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </div>
                    </Form>
                </Card>
            </div>
        </>
    );
}

export default LoginPage;
