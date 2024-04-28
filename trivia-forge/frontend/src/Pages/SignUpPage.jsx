import { useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";

function SignUpPage() {

    return (
        <>
            <Card style={{ width: '35rem', margin: '0 auto', float: 'none' }}>
                <Form className="form-group">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control className="Form-Control" type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Create Account
                    </Button>
                </Form>
            </Card>
        </>

    );

}
export default SignUpPage;