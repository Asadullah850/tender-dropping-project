import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import app from './firebase.config';

export const AuthContext = createContext(null)
const auth = getAuth(app)


const Authprovider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    const newUser = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    useEffect( ()=> {
        const unSubscribed = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)

          });
          return ()=>{
            return unSubscribed()
          }
    },[])
    const authInfo = {
        user,
        loading,
        newUser,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authprovider;