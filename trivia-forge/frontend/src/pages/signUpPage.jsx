import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { addUser } from '../services/triviaForgeApiService';
import { User } from '../models/user';


function SignUpPage() {
    // initialize variables as empty strings
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        // create new user object with form input values
        const user = new User(null, email, password, username); 
        // console.log('Sending user data:', user.toJsonObject());
        // call addUser function to add new user to database
        const addedUser = await addUser(user);
        if (addedUser) {
            alert('User added:', addedUser);
            navigate('/');
        } else {
            console.error('Error adding user');
        }
    }

    return (
        <>
            <title>Sign Up</title>

            <div className="d-flex justify-content-center mt-5">
                <Card style={{ width: '35rem'}}>
                    <Form onSubmit={handleSubmit} className="form-group">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </Form.Group>
                        
                        <div className="d-flex justify-content-center">
                            <Button variant="primary" type="submit">
                                Create Account
                            </Button>
                        </div>
                    </Form>
                </Card>
            </div>
        </>
    );
}

export default SignUpPage;