import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {

    return (
        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">
                    Cake Shop</Navbar.Brand>
                <Nav className="me-auto">
                    {/* <Nav.Link href="/">Home</Nav.Link> */}
                    
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header