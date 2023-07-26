import React from 'react';
import useAuth from '../Authntication/useAuth';

const LogOut = () => {
    const {  logout } = useAuth();


    const generateRandomString = () => {
      let randomString = '';
      let uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
      let numbers = '0123456789';
    
    
      for (let j = 0; j < 5; j++) {
        randomString += uppercaseLetters.charAt(Math.floor(Math.random() * uppercaseLetters.length));
      }
    
      for (let k = 0; k < 5; k++) {
        randomString += numbers.charAt(Math.floor(Math.random() * numbers.length));
      }
  
      for (let j = 0; j < 8; j++) {
        randomString += lowercaseLetters.charAt(Math.floor(Math.random() * uppercaseLetters.length));
      }
  
      for (let m = 0; m < 5; m++) {
        randomString += numbers.charAt(Math.floor(Math.random() * numbers.length));
      }
    
      return randomString.trim();
    }
    const code = generateRandomString()
    console.log(code);
   

    const singOut = () =>{
        // logout().then(() => {
        //     // Sign-out successful.
            
        //   }).catch((error) => {
        //     // An error happened.
        //   });

    }
    return  <button onClick={singOut} className='btn btn-sm btn-warning'>Logout</button>
};

export default LogOut;