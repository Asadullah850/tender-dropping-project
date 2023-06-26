import React from 'react';
import useAuth from './useAuth';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const PrivetRoute = ({ children }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const { user, loading } = useAuth()

    if (loading) {
        return <p>loading.................</p>
    }
    if (user) {
        return children
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivetRoute;