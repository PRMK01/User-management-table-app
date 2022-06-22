import React, { useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Button, Nav} from 'react-bootstrap';
import { UserContext } from '../../../Contexts/UserContext.js';


const Navigation = () => {
    const [user, setUser] = useContext(UserContext);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("currentUser")));
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("token");
        window.location.reload();
    }

    return (
        <nav>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    {user && <Navbar.Brand>Welcome {user.name}</Navbar.Brand>}
                
                    <Nav className="me-auto"></Nav>
                    <Nav><Button onClick={handleLogout} variant='light' className='px-4 py-2 fw-bold'>Logout</Button></Nav>
                </Container>
            </Navbar>
        </nav>
    )
}

export default Navigation;