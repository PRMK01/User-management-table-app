import React from 'react';
import { UsersDataProvider } from './Contexts/UsersDataContext';
import { UserProvider } from './Contexts/UserContext';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import AdminPanel from './components/AdminPanel/AdminPanel';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';


const App = () => {
    const user = localStorage.getItem("token");

    return (
        <BrowserRouter>
            <UserProvider>
                <UsersDataProvider>
                    <Routes>
                        {user && <Route  path="/" element={<AdminPanel/>}/>}
                        <Route path="/signup" element={<Signup/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path='/' element={<Navigate replace to='/login'/>} />
                    </Routes>
                </UsersDataProvider>
            </UserProvider>
        </BrowserRouter>
    )
}

export default App;


{/* <main>
<div className='d-flex justify-content-end w-100 bg-dark bg-opacity-50 mt-5'>
    <ButtonGroup aria-label="Menagement buttons" className='bg-transparent w-25' style={{ height: "65px", minWidth: "450px"}}>
        <Button variant='danger' className='h-100 fs-5 fw-bold' style={{ letterSpacing: "3px"}}>Block</Button>
        <Button className='h-100 border-0 btn-hover py-3 unlock-user'><img src={unlock} alt='Unlock' className='h-100'/></Button>
        <Button className='h-100 border-0 btn-hover py-3 delete-user'><img src={trashcan} alt='Trashcan' className='h-100'/></Button>
    </ButtonGroup>
</div>

<Table striped bordered hover variant="secondary">
<thead>
        <tr>
            <th><input type='checkbox' name='selectAll'></input></th>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Last login time</th>
            <th>Registration time</th>
            <th>Status</th>
        </tr>
    </thead>
    <tbody>
        {contacts.map(contact => (
            <tr>
                <td><input type='checkbox' name='selectUser'></input></td>
                <td>{contact.params.id}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.lastLoggedAt}</td>
                <td>{contact.registeredAt}</td>
                <td>{contact.status}</td>
            </tr>
        ))}
    </tbody>
</Table>
</main>  */}