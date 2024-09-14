import { ReactNode } from 'react';
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const userInfo = useSelector((state: any) => state.auth.userInfo)
    const storedUser = JSON.parse(localStorage.getItem('user') ?? '{}');


    if (!userInfo && !storedUser) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;