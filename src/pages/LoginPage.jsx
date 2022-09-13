import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { login } from '../app/firebase';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await login(
            e.target.email.value,
            e.target.password.value
        )
        if (user) {
            navigate(location.state?.return_url || '/admin-page', {
                replace: true
            })
        }
    }

    return (
        <Container fluid className='bg-light vh-100 d-flex align-items-center justify-content-center'>
            <Row>
                <Col className='d-flex justify-content-center align-items-center'>
                    <Form className=' rounded p-3' onSubmit={handleSubmit}>
                        <Form.Text className="fs-2 d-flex justify-content-center mb-2">
                            Admin Login
                        </Form.Text>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email address"
                            className="mb-3"
                        >
                            <Form.Control type="email" placeholder="name@example.com" name='email' />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                            <Form.Control type="password" placeholder="Password" name='password' />
                        </FloatingLabel>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Remember Me" />
                        </Form.Group>
                        <Button variant="primary" type="submit" className='w-100' size="lg">
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginPage