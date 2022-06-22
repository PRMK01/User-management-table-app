import React from 'react';
import Navigation from './Navigation/Navigation';
import Toolbar from './Toolbar/Toolbar';
import UserTable from './Table/UserTable';

const AdminPanel = () => {
  return (
    <>
        <Navigation/>
        <main className='p-0'>
            <Toolbar/>
            <UserTable/>
        </main>
    </>
  )
}

export default AdminPanel