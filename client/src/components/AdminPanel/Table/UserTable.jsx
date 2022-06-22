import React, { useContext, useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import TableRow from './TableRow';
import { UsersDataContext } from '../../../Contexts/UsersDataContext';



const UserTable = () => {
    const [users, setUsers] = useContext(UsersDataContext);
    const [checkedAll, setCheckedAll] = useState(false);
    const [checked, setChecked] = useState(null);


    useEffect(() => {
        fetch('https://user-management-table-app.herokuapp.com/users')
            .then(res => {
                return res.json()
            })
            .then(data => {
                const dataState = data.map(user => {
                    user.checked = false;
                    return user
                });
                setUsers(dataState);
                setChecked(dataState.map(() => {return false}));
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    useEffect(() => {
        if (checked) {
            const result = checked.every((item) => {
                return  item === checked[0]
             })
             if(result && checked[0]) {
                 setCheckedAll(true)
             } else {
                 setCheckedAll(false)
             }
        }
    }, [checked])

    useEffect(() => {
        if (users) {
            setUsers(
                users.map((user, i) => {
                    user.checked = checked[i];
                    return user 
                })
            )
        }
    }, [checked])

    const selectOne = (index) => {
        setChecked(checked.map((u, i) => { return (index === i ? !u : u )}))
    }

    const selectAll = () => {
        if (checkedAll === false) {
            setCheckedAll(true);
            setChecked(users.map(() => {return true}))
        } else {
            setCheckedAll(false);
            setChecked(users.map(() => {return false}))
        }

    }

    return (
        <Table striped bordered hover variant="secondary">
            <thead>
                <tr>
                    <th><input onClick={selectAll} type='checkbox' name='selectAll' className='checkbox' checked={checkedAll}></input></th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Last login time</th>
                    <th>Registration time</th>
                    <th>Status</th>
                </tr>
            </thead>
            {checked && <tbody>
                {users.map((user, i) => (
                    <TableRow id={user._id}
                             name={user.name} 
                             email={user.email} 
                             lastLoggedAt={user.lastLoggedAt} 
                             registeredAt={user.registeredAt} 
                             status={user.status} 
                             key={user._id}
                             checked={checked[i]}
                             onClick={() => {selectOne(i)} }
                    />
                ))}
            </tbody>}
        </Table>
    )
}

export default UserTable;