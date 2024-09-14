import { ReactNode } from 'react';
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const userInfo = useSelector((state: any) => state.auth.userInfo)
    const storedUser = JSON.parse(localStorage.getItem('user') ?? '{}');



    if (userInfo == null && !storedUser[0]?.email) {
        return <Navigate to="/login" replace />;
    } else {
        console.log('user', userInfo, storedUser)
    }

    return children;
};

export default ProtectedRoute;