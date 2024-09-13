import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const userInfo = useSelector((state: any) => state.auth.userInfo)
    console.log('userInfo', userInfo)

    // show unauthorized screen if no user is found in redux store
    if (!userInfo) {
        return (
            <div className='unauthorized'>
                <h1>Unauthorized :(</h1>
                <span>
                    <NavLink to='/login'>Login</NavLink> to gain access
                </span>
            </div>
        )
    }

    // returns child route elements
    return <Outlet />
}
export default ProtectedRoute