import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import trashcan from '../../../images/trashcan.svg';
import unlock from '../../../images/unlock.svg';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { UsersDataContext } from '../../../Contexts/UsersDataContext';
import { UserContext } from '../../../Contexts/UserContext';
import '../../../App.css'

const Toolbar = () => {
    const [users, setUsers] = useContext(UsersDataContext);
    const [dataUpdate, setDataUpdate] = useState(0);
    const [user, setUser] = useContext(UserContext);

    const updateUsers = async (status) => {
        if (status === 'delete') {
            await setUsers(
                users.filter(user => {
                    return user.checked === false
                })
            )
        } else {
            await setUsers(
                users.map(user => {
                    if (user.checked) {
                        user.status = status;
                    } 
                    return user
                })
            )
        }
        setDataUpdate(prevState => prevState + 1);    
    }

    const updateData = () => {
        if (dataUpdate) {
            fetch('https://user-management-table-app.herokuapp.com/users', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(users)
            })
            .then(res => 
                res.json()    
            ).then(data => {
                const currentUser = data.find(userData => {
                    return userData._id === user._id
                });
                if (!currentUser || currentUser.status === 'blocked') {
                    localStorage.removeItem("currentUser");
                    localStorage.removeItem("token");
                    window.location.reload();
                }
            })
            .catch(error => {
                console.log(error);   
            });
        }
    }

    useEffect(updateData, [dataUpdate])
    
    const blockAction = () => {
        const check = users.some(user => { return user.checked === true });
        if (check) { 
            updateUsers('blocked');
        }
    }
    const unblockAction = () => {
        const check = users.some(user => { return user.checked === true });
        if (check) { 
            updateUsers('active');
        }
    }
    const deleteAction = () => {
        const check = users.some(user => { return user.checked === true });
        if (check) { updateUsers('delete') }
    }

    return (
        <div className='d-flex justify-content-end w-100 bg-dark bg-opacity-50 mt-5'>
            <ButtonGroup aria-label="Menagement buttons" className='bg-transparent w-25' style={{ height: "65px", minWidth: "450px"}}>
                <Button onClick={() => {blockAction()}} variant='danger' className='h-100 fs-5 fw-bold' style={{ letterSpacing: "3px"}}>Block</Button>
                <Button onClick={() => {unblockAction()}} className='h-100 border-0 btn-hover py-3 unlock-user'><img src={unlock} alt='Unlock' className='h-100'/></Button>
                <Button onClick={() => {deleteAction()}} className='h-100 border-0 btn-hover py-3 delete-user'><img src={trashcan} alt='Trashcan' className='h-100'/></Button>
            </ButtonGroup>
        </div>
    )
}

export default Toolbar;