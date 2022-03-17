import { Outlet } from 'react-router-dom';
import { useAuthContext } from './useAuthContext';
import Login from '../Pages/Login/Login';


const ProtectedRoutes = () => {

    const { user } = useAuthContext();

    return !user ? <Login /> : <Outlet />
}

export default ProtectedRoutes;