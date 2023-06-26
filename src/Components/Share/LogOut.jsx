import React from 'react';
import useAuth from '../Authntication/useAuth';

const LogOut = () => {
    const {  logout } = useAuth();
    const singOut = () =>{
        logout().then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
    }
    return  <button onClick={singOut} className='btn btn-sm btn-warning'>Logout</button>
};

export default LogOut;