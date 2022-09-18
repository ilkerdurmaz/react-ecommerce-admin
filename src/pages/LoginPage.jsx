import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { login } from '../app/firebase';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const localUser = localStorage.getItem('user');

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

    useEffect(() => {
        if (localUser)
            navigate(location.state?.return_url || '/admin-page', {
                replace: true
            })
    }, [])


    return (

        <Container className='d-flex align-items-center justify-content-center'>

            <Form className='border rounded p-3 shadow mt-3' onSubmit={handleSubmit}>
                <Form.Text className="fs-2 d-flex justify-content-center mb-3">
                    Admin Login
                </Form.Text>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control required type="email" placeholder="name@example.com" name='email' />
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                    <Form.Control required type="password" placeholder="Password" name='password' />
                </FloatingLabel>

                <Button variant="primary" type="submit" className='w-100' size="lg">
                    Login
                </Button>
            </Form>

        </Container>

    )
}

export default LoginPage